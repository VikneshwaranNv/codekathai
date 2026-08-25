import http from 'http';

const BASE_URL = 'http://localhost:3001/api/run-c';

function runTest(testName, code, stdin = '') {
  return new Promise((resolve) => {
    console.log(`\n--------------------------------------------------`);
    console.log(`🧪 Running Test: ${testName}`);
    console.log(`--------------------------------------------------`);

    const payload = JSON.stringify({ code, stdin });

    const req = http.request(
      BASE_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`OUTPUT:\n${data.output || '(empty output)'}`);
            if (data.error) console.log(`ERROR / STDErr:\n${data.error}`);
            console.log(`PASSED: ${data.passed}`);
            resolve(data);
          } catch (e) {
            console.error('Failed to parse response JSON:', body);
            resolve(null);
          }
        });
      }
    );

    req.on('error', (err) => {
      console.error(`❌ Test Error (${testName}): ${err.message}`);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

async function runTestSuite() {
  console.log('🚀 Starting Backend C GCC Compiler Test Suite...');

  // 1. Valid Program
  await runTest(
    'Valid C Program (Hello World)',
    '#include <stdio.h>\nint main() { printf("Hello Code Kathai!\\n"); return 0; }'
  );

  // 2. Program with Compile Errors
  await runTest(
    'Compile Error (Missing Quote)',
    '#include <stdio.h>\nint main() { printf("Hello); return 0; }'
  );

  // 3. Program with STDIN Input
  await runTest(
    'STDIN Input (Factorial of 9)',
    `#include <stdio.h>
int main() {
    int n;
    unsigned long long fact = 1;
    printf("Enter number: ");
    if (scanf("%d", &n) == 1) {
        for (int i = 1; i <= n; i++) fact *= i;
        printf("Factorial of %d = %llu\\n", n, fact);
    }
    return 0;
}`,
    '9'
  );

  // 4. Infinite Loop Timeout Enforcer
  await runTest(
    'Infinite Loop Timeout Enforcer (5s limit)',
    '#include <stdio.h>\nint main() { while(1); return 0; }'
  );

  console.log('\n✅ All C GCC Compiler Backend Tests Completed!');
}

runTestSuite();
