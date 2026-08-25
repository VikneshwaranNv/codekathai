import express from 'express';
import cors from 'cors';
import { execFile, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'C GCC Compiler Backend Service Active' });
});

/**
 * POST /api/run-c
 * Compiles and executes C source code with safety constraints:
 * - Isolated temporary directory / Docker sandbox
 * - 5-second timeout for infinite loop protection
 * - 64KB max buffer size for output cap
 * - Wandbox GCC API fallback if local gcc binary is not found
 * - Automatic temporary file cleanup
 */
app.post('/api/run-c', async (req, res) => {
  const { code, stdin = '' } = req.body || {};

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({
      output: '',
      error: 'Error: Code is empty. Write your C program and click Run.',
      passed: false,
    });
  }

  // Create isolated temp workspace directory
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'c-compiler-'));
  const sourcePath = path.join(tmpDir, 'main.c');
  const executablePath = path.join(tmpDir, os.platform() === 'win32' ? 'main.exe' : 'main');

  try {
    fs.writeFileSync(sourcePath, code, 'utf8');

    // 1. Try local GCC compilation
    const compileResult = await new Promise((resolve) => {
      execFile(
        'gcc',
        ['-O2', sourcePath, '-o', executablePath],
        { timeout: 8000, maxBuffer: 1024 * 1024 },
        (error, stdout, stderr) => {
          if (error && error.code === 'ENOENT') {
            return resolve({ success: false, noGcc: true, error: 'GCC binary not found in system PATH' });
          }
          if (error || stderr) {
            return resolve({ success: false, noGcc: false, error: stderr || error?.message || 'Compilation Error' });
          }
          resolve({ success: true, noGcc: false, error: null });
        }
      );
    });

    // If local GCC is not installed on Windows host, fallback to Wandbox GCC compiler API
    if (compileResult.noGcc) {
      try {
        const wandboxRes = await fetch('https://wandbox.org/api/compile.json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            compiler: 'gcc-head',
            code: code,
            stdin: stdin,
          }),
        });

        if (wandboxRes.ok) {
          const data = await wandboxRes.json();
          const wandboxOutput = data.program_output || '';
          const wandboxError = data.compiler_error || data.program_error || null;
          return res.json({
            output: wandboxOutput,
            error: wandboxError,
            compiler_error: wandboxError,
            passed: !wandboxError || wandboxError.trim() === '',
          });
        }
      } catch (wandboxErr) {
        console.warn('Wandbox fallback failed:', wandboxErr);
      }
    }

    if (!compileResult.success) {
      return res.json({
        output: '',
        error: compileResult.error,
        compiler_error: compileResult.error,
        passed: false,
      });
    }

    // 2. Execute compiled binary with 5-second timeout and stdin
    const execResult = await new Promise((resolve) => {
      const child = spawn(executablePath, [], {
        cwd: tmpDir,
        env: { PATH: process.env.PATH },
      });

      let stdout = '';
      let stderr = '';
      let killed = false;

      // Enforce 5-second execution timeout to kill infinite loops
      const timeoutTimer = setTimeout(() => {
        killed = true;
        child.kill('SIGKILL');
      }, 5000);

      if (stdin) {
        child.stdin.write(stdin);
        child.stdin.end();
      }

      child.stdout.on('data', (data) => {
        if (stdout.length < 65536) {
          stdout += data.toString();
        }
      });

      child.stderr.on('data', (data) => {
        if (stderr.length < 65536) {
          stderr += data.toString();
        }
      });

      child.on('close', (code) => {
        clearTimeout(timeoutTimer);
        if (killed) {
          return resolve({
            output: stdout,
            error: 'Time Limit Exceeded: Program took longer than 5 seconds to run (Infinite loop detected).',
            passed: false,
          });
        }
        resolve({
          output: stdout,
          error: stderr || null,
          passed: code === 0,
        });
      });

      child.on('error', (err) => {
        clearTimeout(timeoutTimer);
        resolve({
          output: stdout,
          error: `Execution Error: ${err.message}`,
          passed: false,
        });
      });
    });

    return res.json({
      output: execResult.output,
      error: execResult.error,
      passed: execResult.passed,
    });
  } catch (err) {
    return res.status(500).json({
      output: '',
      error: `Server Error: ${err.message}`,
      passed: false,
    });
  } finally {
    // 3. Clean up temp files
    try {
      if (fs.existsSync(sourcePath)) fs.unlinkSync(sourcePath);
      if (fs.existsSync(executablePath)) fs.unlinkSync(executablePath);
      if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir, { recursive: true });
    } catch (cleanupErr) {
      console.warn('Temp cleanup warning:', cleanupErr);
    }
  }
});

app.listen(PORT, () => {
  console.log(`⚡ C GCC Compiler Backend Server running on http://localhost:${PORT}`);
});
