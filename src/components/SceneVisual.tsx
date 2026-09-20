import type { StoryScene } from '@/types';

interface SceneVisualProps {
  visual: StoryScene['visual'] | string;
  className?: string;
}

export default function SceneVisual({ visual, className = '' }: SceneVisualProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      {renderVisual(visual as StoryScene['visual'])}
    </div>
  );
}

function renderVisual(visual: StoryScene['visual'] | string) {
  switch (visual) {
    /* ==================== JAVA DEDICATED VISUAL DIAGRAMS ==================== */

    case 'inheritance-intro':
    case 'inheritance-family':
    case 'single-inheritance':
      return (
        <svg viewBox="0 0 340 190" className="h-full w-full max-w-[380px]">
          <rect x="20" y="8" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="24" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            👨‍👦 1. Single Inheritance: Father ➔ Son
          </text>
          <g>
            <rect x="90" y="40" width="160" height="52" rx="8" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="170" y="58" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">👨 SUPER CLASS: Father</text>
            <text x="170" y="72" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">house(), surname="Sharma"</text>
            <text x="170" y="84" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#6e7864">(Parent Class)</text>
          </g>
          <path d="M170 93 L170 118" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arr-inh-fam)" />
          <rect x="180" y="100" width="100" height="18" rx="4" fill="#f59e0b" />
          <text x="230" y="113" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" fill="#fff">extends Father</text>
          <g>
            <rect x="70" y="122" width="200" height="58" rx="10" fill="#ffd24a" stroke="#b45309" strokeWidth="2" />
            <text x="170" y="140" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">👦 SUB CLASS: Son</text>
            <text x="170" y="154" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#92400e">Inherits: house(), surname</text>
            <text x="170" y="168" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#b45309">+ Own Skill: driveCar()</text>
          </g>
          <defs>
            <marker id="arr-inh-fam" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      );

    case 'multilevel-inheritance':
      return (
        <svg viewBox="0 0 340 195" className="h-full w-full max-w-[380px]">
          <rect x="20" y="6" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="22" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🪜 2. Multilevel: Grandfather ➔ Father ➔ Son
          </text>
          <rect x="70" y="36" width="200" height="34" rx="6" fill="#1f412c" stroke="#479a63" strokeWidth="1.5" />
          <text x="170" y="52" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">👴 Grandfather (Super Class)</text>
          <text x="170" y="64" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#a7f3d0">landProp = "50 Acres"</text>
          <path d="M170 71 L170 85" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arr-ml)" />
          <rect x="70" y="87" width="200" height="36" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="1.5" />
          <text x="170" y="103" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">👨 Father extends Grandfather</text>
          <text x="170" y="116" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#347d4d">house = "Villa" (Sub &amp; Super)</text>
          <path d="M170 124 L170 138" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arr-ml)" />
          <rect x="70" y="140" width="200" height="42" rx="6" fill="#ffd24a" stroke="#b45309" strokeWidth="2" />
          <text x="170" y="156" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">👦 Son extends Father</text>
          <text x="170" y="172" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700" fill="#92400e">Inherits landProp + house + owns car</text>
          <defs>
            <marker id="arr-ml" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      );

    case 'inheritance-animal':
    case 'hierarchical-inheritance':
      return (
        <svg viewBox="0 0 340 195" className="h-full w-full max-w-[380px]">
          <rect x="20" y="6" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="22" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🌿 3. Hierarchical: Father ➔ Son &amp; Daughter
          </text>
          <g>
            <rect x="85" y="36" width="170" height="48" rx="8" fill="#1f412c" stroke="#479a63" strokeWidth="2" />
            <text x="170" y="54" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">👨 PARENT: Father</text>
            <text x="170" y="70" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#a7f3d0">familyTitle = "Rao", land()</text>
          </g>
          <path d="M130 85 L85 112" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-anim)" />
          <path d="M210 85 L255 112" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arr-anim-red)" />
          <g>
            <rect x="15" y="115" width="140" height="68" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="85" y="133" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1e40af">👦 Son extends Father</text>
            <text x="85" y="148" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#1e40af">Inherits familyTitle, land()</text>
            <text x="85" y="162" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#2563eb">+ skill: Engineer</text>
          </g>
          <g>
            <rect x="185" y="115" width="140" height="68" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="255" y="133" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#991b1b">👧 Daughter extends Father</text>
            <text x="255" y="148" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#991b1b">Inherits familyTitle, land()</text>
            <text x="255" y="162" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#dc2626">+ skill: Doctor</text>
          </g>
          <defs>
            <marker id="arr-anim" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#3b82f6" />
            </marker>
            <marker id="arr-anim-red" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      );

    case 'multiple-inheritance':
    case 'interface-inheritance':
      return (
        <svg viewBox="0 0 340 195" className="h-full w-full max-w-[380px]">
          <rect x="20" y="6" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="22" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            ⚡ 4. Multiple Inheritance via Interface (Father &amp; Mother)
          </text>
          <rect x="15" y="38" width="145" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <text x="87" y="55" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" fill="#1e40af">&lt;&lt;interface&gt;&gt;</text>
          <text x="87" y="70" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1e40af">👨 Father (Driveable)</text>
          <rect x="180" y="38" width="145" height="50" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
          <text x="252" y="55" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" fill="#78350f">&lt;&lt;interface&gt;&gt;</text>
          <text x="252" y="70" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">👩 Mother (Cookable)</text>
          <path d="M87 89 L130 118" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="3 3" markerEnd="url(#arr-mi-b)" />
          <path d="M252 89 L210 118" stroke="#b45309" strokeWidth="2.5" strokeDasharray="3 3" markerEnd="url(#arr-mi-o)" />
          <rect x="50" y="122" width="240" height="60" rx="10" fill="#10b981" stroke="#047857" strokeWidth="2" />
          <text x="170" y="140" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#fff">🧒 Child Class</text>
          <text x="170" y="156" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#ecfdf5">implements Father, Mother</text>
          <text x="170" y="170" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#d1fae5">(Inherits both driving &amp; cooking traits!)</text>
          <defs>
            <marker id="arr-mi-b" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#3b82f6" />
            </marker>
            <marker id="arr-mi-o" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#b45309" />
            </marker>
          </defs>
        </svg>
      );

    case 'hybrid-inheritance':
      return (
        <svg viewBox="0 0 340 195" className="h-full w-full max-w-[380px]">
          <rect x="20" y="6" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="22" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🔀 5. Hybrid: Combo (Multilevel + Interface)
          </text>
          {/* Top: Grandfather */}
          <rect x="100" y="34" width="140" height="30" rx="6" fill="#1f412c" stroke="#479a63" strokeWidth="1.5" />
          <text x="170" y="52" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">👴 Grandfather Class</text>
          <path d="M170 65 L120 90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arr-hyb)" />
          {/* Middle Left: Father */}
          <rect x="40" y="92" width="140" height="32" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="1.5" />
          <text x="110" y="110" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">👨 Father extends GF</text>
          {/* Middle Right: Mother Interface */}
          <rect x="200" y="92" width="125" height="32" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
          <text x="262" y="110" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">👩 Mother Interface</text>
          {/* Down to Child */}
          <path d="M110 125 L145 145" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arr-hyb)" />
          <path d="M262 125 L200 145" stroke="#b45309" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arr-hyb-o)" />
          {/* Bottom: Child */}
          <rect x="60" y="148" width="220" height="40" rx="8" fill="#ffd24a" stroke="#b45309" strokeWidth="2" />
          <text x="170" y="165" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">🧒 Child (extends Father implements Mother)</text>
          <text x="170" y="179" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#92400e">Has GF, Father &amp; Mother Traits!</text>
          <defs>
            <marker id="arr-hyb" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#f59e0b" />
            </marker>
            <marker id="arr-hyb-o" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#b45309" />
            </marker>
          </defs>
        </svg>
      );

    case 'encapsulation':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🔒 Encapsulation: Private Fields + Public Getters
          </text>
          <rect x="40" y="45" width="260" height="120" rx="20" fill="#e3f4e8" stroke="#479a63" strokeWidth="3" />
          <rect x="60" y="60" width="100" height="90" rx="10" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          <text x="110" y="80" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#fff">🔒 Private Data</text>
          <text x="110" y="98" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#fef2f2">private int balance</text>
          <text x="110" y="112" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#fef2f2">private String pin</text>
          <text x="110" y="132" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#ffd24a">(Direct Access Blocked)</text>
          <g>
            <path d="M162 105 L178 105" stroke="#f59e0b" strokeWidth="3" />
            <rect x="180" y="65" width="105" height="80" rx="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="232" y="85" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#fff">🔑 Public API</text>
            <text x="232" y="102" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#dbeafe">getBalance()</text>
            <text x="232" y="120" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#dbeafe">setBalance()</text>
          </g>
        </svg>
      );

    case 'polymorphism':
    case 'method-overloading':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🎭 Polymorphism: Method Overloading &amp; Overriding
          </text>
          <g>
            <rect x="30" y="48" width="130" height="110" rx="10" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="95" y="68" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">⚡ Overloading</text>
            <rect x="40" y="80" width="110" height="30" rx="5" fill="#fff" stroke="#479a63" />
            <text x="95" y="98" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">add(int a, int b)</text>
            <rect x="40" y="118" width="110" height="30" rx="5" fill="#ffd24a" stroke="#b45309" />
            <text x="95" y="136" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#78350f">add(double a, double b)</text>
          </g>
          <g>
            <rect x="180" y="48" width="130" height="110" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="245" y="68" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1e40af">🔄 Overriding</text>
            <rect x="190" y="80" width="110" height="30" rx="5" fill="#fff" stroke="#3b82f6" />
            <text x="245" y="98" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1e40af">Animal: makeSound()</text>
            <rect x="190" y="118" width="110" height="30" rx="5" fill="#ecfdf5" stroke="#10b981" />
            <text x="245" y="136" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#047857">Dog: makeSound() 🐶</text>
          </g>
        </svg>
      );

    case 'abstraction':
    case 'abstract-class':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🧩 Abstraction: Abstract Class &amp; Implementation
          </text>
          <g>
            <rect x="70" y="45" width="200" height="50" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2" />
            <text x="170" y="65" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#78350f">abstract class Vehicle</text>
            <text x="170" y="82" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="#b45309">abstract void startEngine();</text>
          </g>
          <path d="M170 95 L170 118" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-abs)" />
          <g>
            <rect x="70" y="120" width="200" height="48" rx="8" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="170" y="138" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#1f412c">class Car extends Vehicle</text>
            <text x="170" y="154" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">@Override void startEngine() 🚗</text>
          </g>
          <defs>
            <marker id="arr-abs" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      );

    case 'packages':
    case 'import-package':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            📦 Packages &amp; Namespaces (import com.myapp.models)
          </text>
          <rect x="30" y="45" width="280" height="120" rx="12" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
          <g>
            <rect x="45" y="60" width="110" height="90" rx="8" fill="#fff" stroke="#347d4d" strokeWidth="1.5" />
            <text x="100" y="78" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">📁 com.myapp.models</text>
            <rect x="55" y="90" width="90" height="22" rx="4" fill="#ffd24a" />
            <text x="100" y="105" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#78350f">Student.class</text>
            <rect x="55" y="120" width="90" height="22" rx="4" fill="#ffd24a" />
            <text x="100" y="135" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#78350f">Course.class</text>
          </g>
          <path d="M160 105 L180 105" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-pkg)" />
          <g>
            <rect x="185" y="60" width="115" height="90" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="242" y="78" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1e40af">📄 Main.java</text>
            <text x="242" y="100" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700" fill="#1d4ed8">import com.myapp...</text>
            <text x="242" y="125" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1f412c">Student s1;</text>
          </g>
          <defs>
            <marker id="arr-pkg" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      );

    case 'exception-handling':
    case 'try-catch':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            🛡️ Exception Handling (try - catch - finally)
          </text>
          <g>
            <rect x="30" y="45" width="280" height="40" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="170" y="62" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#78350f">try &#123; int result = 10 / 0; &#125;</text>
            <text x="170" y="76" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#b45309">⚠️ ArithmeticException Triggered!</text>
          </g>
          <path d="M170 85 L170 98" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arr-ex)" />
          <g>
            <rect x="30" y="100" width="280" height="35" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="170" y="117" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#991b1b">catch (ArithmeticException e) &#123; ... &#125;</text>
            <text x="170" y="129" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#dc2626">🛡️ Catches Error Gracefully &amp; Prevents Crash</text>
          </g>
          <g>
            <rect x="30" y="140" width="280" height="30" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="1.5" />
            <text x="170" y="159" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1f412c">finally &#123; cleanup(); &#125; (Always Runs)</text>
          </g>
          <defs>
            <marker id="arr-ex" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      );

    case 'jvm':
    case 'wora':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          {/* 1. Java Source Code */}
          <g>
            <rect x="15" y="45" width="70" height="50" rx="8" fill="#1f412c" stroke="#479a63" strokeWidth="2" />
            <text x="50" y="68" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#ffd24a">Main.java</text>
            <text x="50" y="82" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#fff">Source Code</text>
          </g>

          {/* Arrow to Compiler */}
          <path d="M88 70 L108 70" stroke="#479a63" strokeWidth="2.5" markerEnd="url(#arr-jvm)" />

          {/* 2. Compiler (javac) */}
          <g>
            <rect x="110" y="50" width="55" height="40" rx="6" fill="#f59e0b" />
            <text x="137" y="70" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#fff">javac</text>
            <text x="137" y="82" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#fff">Compiler</text>
          </g>

          {/* Arrow to Bytecode */}
          <path d="M168 70 L188 70" stroke="#479a63" strokeWidth="2.5" markerEnd="url(#arr-jvm)" />

          {/* 3. Bytecode (.class) */}
          <g>
            <rect x="190" y="45" width="65" height="50" rx="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="222" y="68" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">Main.class</text>
            <text x="222" y="82" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#93c5fd">Bytecode</text>
          </g>

          {/* Arrow to JVM */}
          <path d="M258 70 L278 70" stroke="#479a63" strokeWidth="2.5" markerEnd="url(#arr-jvm)" />

          {/* 4. JVM Engine */}
          <g>
            <rect x="280" y="40" width="50" height="60" rx="10" fill="#10b981" />
            <text x="305" y="66" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="800" fill="#fff">JVM</text>
            <text x="305" y="80" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#ecfdf5">Engine</text>
          </g>

          {/* Platform OS Boxes below JVM */}
          <g>
            <line x1="305" y1="102" x2="305" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
            <rect x="15" y="130" width="315" height="35" rx="8" fill="#e3f4e8" stroke="#479a63" strokeWidth="1.5" />
            <text x="70" y="152" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#1f412c">🪟 Windows</text>
            <text x="165" y="152" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#1f412c">🍎 macOS</text>
            <text x="260" y="152" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#1f412c">🐧 Linux</text>
          </g>

          {/* WORA Banner */}
          <rect x="60" y="12" width="220" height="22" rx="6" fill="#1f412c" />
          <text x="170" y="27" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            WORA: Write Once, Run Anywhere
          </text>

          <defs>
            <marker id="arr-jvm" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#479a63" />
            </marker>
          </defs>
        </svg>
      );

    case 'heap-stack':
      return (
        <svg viewBox="0 0 340 190" className="h-full w-full max-w-[380px]">
          {/* JVM Memory Header */}
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            JVM Memory Architecture (Stack vs Heap)
          </text>

          {/* 1. STACK MEMORY (Left Column) */}
          <g>
            <rect x="20" y="42" width="135" height="135" rx="10" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="87" y="60" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">🥞 JVM STACK</text>
            
            {/* Primitive int age = 20 */}
            <rect x="30" y="70" width="115" height="28" rx="6" fill="#fff" stroke="#479a63" strokeWidth="1.5" />
            <text x="87" y="88" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">int age = 20</text>

            {/* Reference Variable s1 */}
            <rect x="30" y="108" width="115" height="32" rx="6" fill="#ffd24a" stroke="#b45309" strokeWidth="2" />
            <text x="87" y="124" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#b45309">Student s1</text>
            <text x="87" y="136" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#78350f">ref: 0x4A80</text>
          </g>

          {/* Pointer Arrow from Stack s1 to Heap Object */}
          <path d="M145 124 C 170 124, 160 110, 182 110" stroke="#ef4444" strokeWidth="3" fill="none" markerEnd="url(#arr-hs)" className="animate-pulse" />

          {/* 2. HEAP MEMORY (Right Column) */}
          <g>
            <rect x="185" y="42" width="135" height="135" rx="10" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="252" y="60" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">🏔️ JVM HEAP</text>
            
            {/* Object Instance */}
            <rect x="195" y="75" width="115" height="90" rx="8" fill="#fff" stroke="#f59e0b" strokeWidth="2" />
            <text x="252" y="93" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#b45309">Student Object</text>
            <text x="252" y="105" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#92400e">Addr: 0x4A80</text>

            <line x1="200" y1="112" x2="305" y2="112" stroke="#fde68a" strokeWidth="1.5" />

            <text x="205" y="128" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1f412c">name: "Kavi"</text>
            <text x="205" y="145" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1f412c">mark: 95</text>
          </g>

          <defs>
            <marker id="arr-hs" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      );

    case 'class-object':
      return (
        <svg viewBox="0 0 340 190" className="h-full w-full max-w-[380px]">
          {/* Top: Class Blueprint */}
          <g>
            <rect x="90" y="10" width="160" height="55" rx="8" fill="#1f412c" stroke="#479a63" strokeWidth="2" />
            <text x="170" y="28" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">📐 CLASS BLUEPRINT</text>
            <text x="170" y="44" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">class Student</text>
            <text x="170" y="56" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#a7f3d0">String name; int mark;</text>
          </g>

          {/* Split Instantiation Arrows */}
          <path d="M140 67 L90 98" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arr-co)" />
          <text x="95" y="80" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#f59e0b">new Student()</text>

          <path d="M200 67 L250 98" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arr-co)" />
          <text x="225" y="80" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#f59e0b">new Student()</text>

          {/* Bottom Left: Object 1 */}
          <g>
            <rect x="20" y="102" width="135" height="75" rx="10" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="87" y="120" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#1f412c">s1 (Object Instance 1)</text>
            <rect x="30" y="128" width="115" height="40" rx="6" fill="#fff" stroke="#347d4d" strokeWidth="1" />
            <text x="40" y="144" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">name = "Kavi"</text>
            <text x="40" y="158" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">mark = 95</text>
          </g>

          {/* Bottom Right: Object 2 */}
          <g>
            <rect x="185" y="102" width="135" height="75" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="252" y="120" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#1e40af">s2 (Object Instance 2)</text>
            <rect x="195" y="128" width="115" height="40" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
            <text x="205" y="144" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1e40af">name = "Arul"</text>
            <text x="205" y="158" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#1e40af">mark = 90</text>
          </g>

          <defs>
            <marker id="arr-co" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      );

    case 'string-pool':
      return (
        <svg viewBox="0 0 340 180" className="h-full w-full max-w-[380px]">
          {/* Header */}
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            Java String Constant Pool Memory Optimization
          </text>

          {/* Left: Stack Variables */}
          <g>
            <rect x="20" y="45" width="110" height="120" rx="8" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="75" y="64" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#1f412c">STACK</text>

            <rect x="30" y="75" width="90" height="24" rx="4" fill="#ffd24a" stroke="#b45309" strokeWidth="1.5" />
            <text x="75" y="91" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#b45309">s1 = "Java"</text>

            <rect x="30" y="108" width="90" height="24" rx="4" fill="#ffd24a" stroke="#b45309" strokeWidth="1.5" />
            <text x="75" y="124" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#b45309">s2 = "Java"</text>
          </g>

          {/* Right: Heap with String Pool */}
          <g>
            <rect x="155" y="45" width="165" height="120" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <text x="237" y="64" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#78350f">HEAP MEMORY</text>

            {/* String Pool Box */}
            <rect x="165" y="75" width="145" height="75" rx="8" fill="#fff" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
            <text x="237" y="91" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#b45309">String Constant Pool</text>

            <rect x="180" y="100" width="115" height="35" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="237" y="122" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="800" fill="#047857">"Java"</text>
            <text x="237" y="132" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono" fill="#065f46">Shared Address: 0x101</text>
          </g>

          {/* Arrows pointing from s1 & s2 to single "Java" literal */}
          <path d="M120 87 L178 110" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arr-sp)" />
          <path d="M120 120 L178 120" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arr-sp)" />

          <defs>
            <marker id="arr-sp" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      );

    case 'scanner-input':
      return (
        <svg viewBox="0 0 340 170" className="h-full w-full max-w-[380px]">
          {/* Header */}
          <rect x="20" y="10" width="300" height="24" rx="6" fill="#1f412c" />
          <text x="170" y="26" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            Java Scanner Input Stream Pipeline
          </text>

          {/* 1. Keyboard */}
          <g>
            <rect x="15" y="55" width="65" height="50" rx="8" fill="#374151" stroke="#1f2937" strokeWidth="2" />
            <text x="47" y="78" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#fff">⌨️ Input</text>
            <text x="47" y="92" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill="#fbbf24">"20"</text>
          </g>

          <path d="M82 80 L102 80" stroke="#479a63" strokeWidth="2.5" markerEnd="url(#arr-sc)" />

          {/* 2. System.in Stream */}
          <g>
            <rect x="104" y="55" width="70" height="50" rx="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="139" y="78" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" fill="#fff">System.in</text>
            <text x="139" y="92" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans" fill="#93c5fd">Input Stream</text>
          </g>

          <path d="M176 80 L196 80" stroke="#479a63" strokeWidth="2.5" markerEnd="url(#arr-sc)" />

          {/* 3. Scanner Object */}
          <g>
            <rect x="198" y="50" width="75" height="60" rx="10" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <text x="235" y="75" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#fff">Scanner</text>
            <text x="235" y="90" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">nextInt()</text>
          </g>

          <path d="M275 80 L293 80" stroke="#479a63" strokeWidth="2.5" markerEnd="url(#arr-sc)" />

          {/* 4. Java Int Variable */}
          <g>
            <rect x="295" y="55" width="40" height="50" rx="8" fill="#10b981" stroke="#047857" strokeWidth="2" />
            <text x="315" y="78" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" fill="#fff">int n</text>
            <text x="315" y="94" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fontWeight="800" fill="#ffd24a">20</text>
          </g>

          <text x="170" y="145" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#479a63">
            Scanner converts keyboard text stream into integer variable 20
          </text>

          <defs>
            <marker id="arr-sc" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#479a63" />
            </marker>
          </defs>
        </svg>
      );

    case 'method-stack':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full max-w-[360px]">
          {/* Outer Stack Container */}
          <path d="M80 20 L80 145 L240 145 L240 20" stroke="#479a63" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Stack Frame 1 (bottom): main() */}
          <g>
            <rect x="90" y="105" width="140" height="32" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="160" y="125" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">main(String[] args)</text>
          </g>

          {/* Stack Frame 2 (top): add(10, 20) */}
          <g>
            <rect x="90" y="65" width="140" height="32" rx="6" fill="#ffd24a" stroke="#b45309" strokeWidth="2" className="animate-pulse" />
            <text x="160" y="85" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="800" fill="#b45309">add(int x=10, y=20)</text>
          </g>

          {/* Return Arrow */}
          <path d="M245 80 C270 80 270 120 235 120" stroke="#ef4444" strokeWidth="2.5" fill="none" markerEnd="url(#arr-ms)" />
          <text x="280" y="100" fontSize="9" fontFamily="JetBrains Mono" fontWeight="800" fill="#ef4444">return 30</text>

          {/* Stack Caption */}
          <rect x="70" y="155" width="180" height="20" rx="4" fill="#1f412c" />
          <text x="160" y="169" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#ffd24a">
            JVM Method Call Stack Execution
          </text>

          <defs>
            <marker id="arr-ms" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      );

    /* ==================== EXISTING C VISUAL DIAGRAMS ==================== */

    case 'stack':
      return (
        <svg viewBox="0 0 240 180" className="h-full w-full max-w-[320px]">
          <path d="M60 20 L60 140 L180 140 L180 20" stroke="#479a63" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g>
            <rect x="70" y="104" width="100" height="28" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="120" y="122" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">Plate 1 [10]</text>
            <rect x="70" y="70" width="100" height="28" rx="6" fill="#ffd24a" opacity="0.9" stroke="#b45309" strokeWidth="2" />
            <text x="120" y="88" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="700" fill="#b45309">Plate 2 [20]</text>
            <rect x="70" y="36" width="100" height="28" rx="6" fill="#479a63" stroke="#1f412c" strokeWidth="2.5" className="animate-pulse" />
            <text x="120" y="54" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">Plate 3 [30]</text>
          </g>
          <g>
            <path d="M195 50 L175 50" stroke="#ef4444" strokeWidth="2.5" fill="none" markerEnd="url(#arr-top)" />
            <text x="210" y="54" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ef4444">TOP 🔝</text>
          </g>
          <g>
            <text x="30" y="45" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#479a63">Push ↑</text>
            <text x="30" y="85" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#f59e0b">Pop ↓</text>
          </g>
          <rect x="50" y="152" width="140" height="22" rx="6" fill="#1f412c" />
          <text x="120" y="167" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#ffd24a">
            Stack LIFO (Last In First Out)
          </text>
          <defs>
            <marker id="arr-top" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
          </defs>
        </svg>
      );

    case 'queue':
      return (
        <svg viewBox="0 0 260 180" className="h-full w-full max-w-[340px]">
          <line x1="20" y1="50" x2="240" y2="50" stroke="#479a63" strokeWidth="3" strokeDasharray="6 4" />
          <line x1="20" y1="120" x2="240" y2="120" stroke="#479a63" strokeWidth="3" strokeDasharray="6 4" />
          <g>
            <rect x="30" y="60" width="56" height="50" rx="8" fill="#479a63" stroke="#1f412c" strokeWidth="2" />
            <text x="58" y="85" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">[10]</text>
            <text x="58" y="100" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#ffd24a">1st Person</text>
            <path d="M58 32 L58 48" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arr-q)" />
            <text x="58" y="24" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ef4444">FRONT ➔</text>
          </g>
          <g>
            <rect x="102" y="60" width="56" height="50" rx="8" fill="#ffd24a" stroke="#b45309" strokeWidth="2" />
            <text x="130" y="85" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="700" fill="#b45309">[20]</text>
            <text x="130" y="100" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#b45309">2nd Person</text>
          </g>
          <g>
            <rect x="174" y="60" width="56" height="50" rx="8" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
            <text x="202" y="85" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">[30]</text>
            <text x="202" y="100" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#347d4d">3rd Person</text>
            <path d="M202 32 L202 48" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr-q-blue)" />
            <text x="202" y="24" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#3b82f6">REAR ➔</text>
          </g>
          <text x="15" y="90" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ef4444">Dequeue ➔</text>
          <text x="245" y="90" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#3b82f6">Enqueue ➔</text>
          <rect x="60" y="148" width="140" height="22" rx="6" fill="#1f412c" />
          <text x="130" y="163" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#ffd24a">
            Queue FIFO (First In First Out)
          </text>
          <defs>
            <marker id="arr-q" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#ef4444" />
            </marker>
            <marker id="arr-q-blue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      );

    case 'lunchbox':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
          <defs>
            <linearGradient id="lb-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd24a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path d="M70 40 Q100 20 130 40" stroke="#b45309" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="40" y="40" width="120" height="24" rx="8" fill="#f59e0b" />
          <rect x="40" y="58" width="120" height="80" rx="12" fill="url(#lb-body)" stroke="#b45309" strokeWidth="2" />
          <rect x="48" y="50" width="8" height="14" rx="2" fill="#b45309" />
          <rect x="144" y="50" width="8" height="14" rx="2" fill="#b45309" />
          <rect x="78" y="78" width="44" height="22" rx="4" fill="#fff" opacity="0.9" />
          <text x="100" y="93" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#b45309">Kavi</text>
          <circle cx="68" cy="118" r="6" fill="#479a63" />
          <circle cx="100" cy="120" r="7" fill="#347d4d" />
          <circle cx="130" cy="118" r="6" fill="#6bb684" />
        </svg>
      );

    case 'memory':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[280px]">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 42}
                y={20 + row * 32}
                width="36"
                height="26"
                rx="4"
                fill={row === 1 && col === 2 ? '#479a63' : '#e3f4e8'}
                stroke={row === 1 && col === 2 ? '#347d4d' : '#c7e8d1'}
                strokeWidth="1.5"
              />
            ))
          )}
          <rect x="104" y="52" width="36" height="26" rx="4" fill="#479a63" />
          <text x="122" y="70" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">20</text>
          <text x="122" y="48" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#347d4d">age</text>
          <text x="100" y="150" textAnchor="middle" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600" fill="#6e7864">computer memory</text>
        </svg>
      );

    case 'containers':
      return (
        <svg viewBox="0 0 220 160" className="h-full w-full max-w-[300px]">
          {[
            { x: 20, color: '#479a63', label: 'int', val: '5' },
            { x: 86, color: '#f59e0b', label: 'float', val: '3.14' },
            { x: 152, color: '#347d4d', label: 'char', val: 'A' },
          ].map((b) => (
            <g key={b.label}>
              <rect x={b.x} y="40" width="54" height="70" rx="8" fill={b.color} opacity="0.15" stroke={b.color} strokeWidth="2" />
              <rect x={b.x + 6} y="56" width="42" height="40" rx="4" fill="#fff" stroke={b.color} strokeWidth="1.5" />
              <text x={b.x + 27} y="80" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700" fill={b.color}>{b.val}</text>
              <text x={b.x + 27} y="34" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill={b.color}>{b.label}</text>
            </g>
          ))}
        </svg>
      );

    case 'calculator':
      return (
        <svg viewBox="0 0 160 180" className="h-full w-full max-w-[220px]">
          <rect x="30" y="20" width="100" height="140" rx="12" fill="#fff" stroke="#479a63" strokeWidth="2.5" />
          <rect x="40" y="30" width="80" height="26" rx="4" fill="#1f412c" />
          <text x="116" y="48" textAnchor="end" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700" fill="#6bb684">2 + 3 = 5</text>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={40 + c * 26} y={66 + r * 26} width="22" height="22" rx="4" fill="#e3f4e8" stroke="#c7e8d1" />
            ))
          )}
          <rect x="118" y="66" width="22" height="74" rx="4" fill="#f59e0b" />
          <text x="129" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">=</text>
        </svg>
      );

    case 'signal':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
          <rect x="96" y="50" width="8" height="100" rx="2" fill="#565e4f" />
          <rect x="60" y="40" width="80" height="90" rx="8" fill="#393f36" />
          <circle cx="100" cy="60" r="10" fill="#ef4444" opacity="0.3" />
          <circle cx="100" cy="85" r="10" fill="#f59e0b" opacity="0.3" />
          <circle cx="100" cy="110" r="10" fill="#479a63" className="animate-pulse" />
          <circle cx="100" cy="110" r="16" fill="#479a63" opacity="0.3" className="animate-pulse-ring" />
        </svg>
      );

    case 'repeat':
      return (
        <svg viewBox="0 0 200 160" className="h-full w-full max-w-[260px]">
          <path
            d="M50 80 A50 50 0 1 1 150 80 A50 50 0 1 1 50 80"
            fill="none"
            stroke="#479a63"
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="animate-spin"
            style={{ transformOrigin: 'center', animationDuration: '6s' }}
          />
          <path d="M150 80 L142 70 L142 90 Z" fill="#479a63" />
          <circle cx="100" cy="80" r="26" fill="#fff" stroke="#479a63" strokeWidth="2.5" />
          <text x="100" y="86" textAnchor="middle" fontSize="18" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">i=0</text>
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx={100 + 50 * Math.cos((deg * Math.PI) / 180)}
              cy={80 + 50 * Math.sin((deg * Math.PI) / 180)}
              r="4"
              fill="#f59e0b"
            />
          ))}
        </svg>
      );

    case 'machine':
      return (
        <svg viewBox="0 0 220 140" className="h-full w-full max-w-[300px]">
          <rect x="10" y="50" width="40" height="40" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
          <text x="30" y="74" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">in</text>
          <path d="M54 70 L86 70" stroke="#479a63" strokeWidth="3" fill="none" markerEnd="url(#arr)" />
          <rect x="90" y="40" width="60" height="60" rx="10" fill="#f59e0b" />
          <text x="120" y="74" textAnchor="middle" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" fill="#fff">fn()</text>
          <path d="M154 70 L186 70" stroke="#479a63" strokeWidth="3" fill="none" markerEnd="url(#arr)" />
          <rect x="190" y="50" width="40" height="40" rx="6" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
          <text x="210" y="74" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">out</text>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#479a63" />
            </marker>
          </defs>
        </svg>
      );

    case 'lockers':
      return (
        <svg viewBox="0 0 220 140" className="h-full w-full max-w-[300px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={20 + i * 38} y="30" width="32" height="80" rx="4" fill="#e3f4e8" stroke="#479a63" strokeWidth="2" />
              <rect x={20 + i * 38 + 6} y="40" width="20" height="14" rx="2" fill="#fff" stroke="#c7e8d1" />
              <text x={36 + i * 38} y="92" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#347d4d">{i * 10}</text>
              <text x={36 + i * 38} y="22" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600" fill="#6e7864">[{i}]</text>
            </g>
          ))}
        </svg>
      );

    case 'address':
      return (
        <svg viewBox="0 0 220 160" className="h-full w-full max-w-[300px]">
          <path d="M40 80 L70 50 L100 80 L100 130 L40 130 Z" fill="#e3f4e8" stroke="#479a63" strokeWidth="2.5" />
          <rect x="60" y="100" width="20" height="30" rx="2" fill="#479a63" />
          <path d="M150 30 C170 30 180 50 160 70 C140 50 150 30 150 30 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <circle cx="160" cy="48" r="6" fill="#fff" />
          <path d="M150 60 Q120 90 100 100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <text x="70" y="148" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" fill="#347d4d">value</text>
          <text x="165" y="24" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600" fill="#b45309">address</text>
        </svg>
      );

    case 'code':
      return (
        <svg viewBox="0 0 200 140" className="h-full w-full max-w-[260px]">
          <rect x="20" y="20" width="160" height="100" rx="10" fill="#1f412c" />
          <circle cx="34" cy="34" r="3" fill="#ef4444" />
          <circle cx="44" cy="34" r="3" fill="#f59e0b" />
          <circle cx="54" cy="34" r="3" fill="#6bb684" />
          <text x="100" y="70" textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono" fontWeight="600" fill="#6bb684">int age = 20;</text>
          <text x="100" y="92" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="#ffd24a">printf(age);</text>
        </svg>
      );

    case 'flowchart':
    case 'generic':
    default:
      return (
        <svg viewBox="0 0 320 160" className="h-full w-full max-w-[360px]">
          <rect x="20" y="15" width="280" height="130" rx="12" fill="#1f412c" stroke="#479a63" strokeWidth="2" />
          {/* Mac window control buttons */}
          <circle cx="40" cy="32" r="4" fill="#ef4444" />
          <circle cx="54" cy="32" r="4" fill="#f59e0b" />
          <circle cx="68" cy="32" r="4" fill="#10b981" />
          
          <text x="160" y="36" textAnchor="middle" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="800" fill="#ffd24a">
            ⚡ CodeKathai Visual Execution Engine
          </text>

          <rect x="35" y="52" width="250" height="75" rx="8" fill="#0f2918" stroke="#347d4d" strokeWidth="1.5" />
          
          <text x="50" y="74" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#479a63">1</text>
          <text x="70" y="74" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#f59e0b">public class</text>
          <text x="155" y="74" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">Main &#123;</text>

          <text x="50" y="94" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#479a63">2</text>
          <text x="80" y="94" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#60a5fa">  System.out.println</text>
          <text x="210" y="94" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#ffd24a">("Success");</text>

          <text x="50" y="114" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#479a63">3</text>
          <text x="70" y="114" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#fff">&#125;</text>

          <path d="M260 80 L275 80 L275 105 L260 105" stroke="#10b981" strokeWidth="2" fill="none" className="animate-pulse" />
        </svg>
      );
  }
}
