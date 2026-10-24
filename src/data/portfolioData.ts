export interface CaseStudyMetric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'Web Development' | 'Mobile Development' | 'Game Development';
  status: 'In Progress' | 'Completed';
  year: string;
  clientOrContext: string;
  readTime: string;
  bentoSpan: 'wide' | 'standard';
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  summary: string;
  problem: string;
  architecture: string;
  executionHighlights: string[];
  outcomes: CaseStudyMetric[];
  skills: string[];
}

export interface SkillGroup {
  index: string;
  domain: string;
  description: string;
  skills: {
    name: string;
    proficiency: string;
    years: string;
  }[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Portrait Photography' | 'UI & Layout Architecture' | 'Case Study Visuals' | 'Editorial Copywriting';
  useCase: string;
  aspectRatio: string;
  promptText: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  location: string;
  availability: string;
  headlinePrimary: string;
  headlineSerifAccent: string;
  leadBio: string;
  editorialPhilosophy: string;
  email: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  portraitUrl: string;
  portraitFilter: 'leica-mono' | 'silver-gelatin' | 'high-contrast' | 'natural';
  portraitCaption: string;
  metrics: {
    value: string;
    label: string;
    timeframe: string;
  }[];
}

// High-detail monochrome editorial SVG artwork encoded as data URIs for zero-broken-image guarantee
const createSvgDataUri = (svgString: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;

export const DEFAULT_PORTRAIT_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200">
  <defs>
    <radialGradient id="studioLight" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#3f3f46" />
      <stop offset="45%" stop-color="#18181b" />
      <stop offset="100%" stop-color="#050505" />
    </radialGradient>
    <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fafafa" stop-opacity="0.85" />
      <stop offset="35%" stop-color="#a1a1aa" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#09090b" stop-opacity="0.95" />
    </linearGradient>
    <linearGradient id="suitGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#27272a" />
      <stop offset="50%" stop-color="#0f0f12" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.06" />
      </feComponentTransfer>
      <feBlend mode="overlay" in2="SourceGraphic" />
    </filter>
  </defs>

  <!-- Studio Backdrop -->
  <rect width="900" height="1200" fill="url(#studioLight)" />

  <!-- Subtle Architectural Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
    <line x1="150" y1="0" x2="150" y2="1200" />
    <line x1="450" y1="0" x2="450" y2="1200" />
    <line x1="750" y1="0" x2="750" y2="1200" />
    <line x1="0" y1="240" x2="900" y2="240" />
    <line x1="0" y1="600" x2="900" y2="600" />
    <line x1="0" y1="960" x2="900" y2="960" />
  </g>

  <!-- Dramatic Architectural Shadow Slash -->
  <polygon points="0,0 520,0 180,1200 0,1200" fill="#050505" opacity="0.48" />

  <!-- Halo / Studio Backlight Ring -->
  <circle cx="450" cy="430" r="240" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
  <circle cx="450" cy="430" r="310" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1" stroke-dasharray="6 8" />

  <!-- Sculptural Minimalist Editorial Portrait Silhouette -->
  <!-- Shoulders & Minimalist Turtleneck -->
  <path d="M140,1200 C150,930 250,820 450,820 C650,820 750,930 760,1200 Z" fill="url(#suitGrad)" stroke="#3f3f46" stroke-width="1.5" />
  <!-- Rim light on left shoulder -->
  <path d="M142,1200 C152,935 252,824 445,820" fill="none" stroke="url(#rimLight)" stroke-width="3.5" />

  <!-- Turtleneck Collar -->
  <path d="M365,735 L535,735 L555,845 C485,868 415,868 345,845 Z" fill="#141417" stroke="#52525b" stroke-width="1.2" />

  <!-- Neck & Jaw Shadow -->
  <path d="M380,630 L520,630 L525,750 L375,750 Z" fill="#27272a" />
  <path d="M380,630 L455,630 L455,750 L375,750 Z" fill="#3f3f46" />

  <!-- Head Sculptural Form (Split Chiaroscuro Lighting) -->
  <path d="M320,410 C320,275 375,210 450,210 C525,210 580,275 580,410 C580,545 530,665 450,665 C370,665 320,545 320,410 Z" fill="#18181b" stroke="#52525b" stroke-width="1.5" />
  <!-- Lit Left Side of Face (Chiaroscuro) -->
  <path d="M320,410 C320,275 375,210 450,210 L450,665 C370,665 320,545 320,410 Z" fill="#d4d4d8" opacity="0.88" />

  <!-- Minimalist Architectural Glasses Frame -->
  <g stroke="#fafafa" stroke-width="3" fill="none">
    <rect x="342" y="388" width="86" height="54" rx="8" fill="#09090b" fill-opacity="0.25" />
    <rect x="472" y="388" width="86" height="54" rx="8" fill="#09090b" fill-opacity="0.65" />
    <line x1="428" y1="410" x2="472" y2="410" />
  </g>
  <!-- Eyeglass Lens Specular Reflection -->
  <line x1="358" y1="396" x2="395" y2="434" stroke="#ffffff" stroke-width="2" stroke-opacity="0.7" />
  <line x1="488" y1="396" x2="525" y2="434" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.35" />

  <!-- Hair / Brow Architectural Contour -->
  <path d="M316,385 C312,265 375,195 458,195 C540,195 588,265 582,375 C565,315 520,278 448,278 C378,278 335,320 316,385 Z" fill="#09090b" />
  <path d="M316,385 C312,265 375,195 458,195" fill="none" stroke="#fafafa" stroke-width="2.5" stroke-opacity="0.8" />

  <!-- Fine Editorial Camera Frame Marks -->
  <g stroke="#a1a1aa" stroke-width="1.5" fill="none" opacity="0.6">
    <path d="M60,80 L60,60 L80,60" />
    <path d="M840,80 L840,60 L820,60" />
    <path d="M60,1120 L60,1140 L80,1140" />
    <path d="M840,1120 L840,1140 L820,1140" />
    <line x1="440" y1="600" x2="460" y2="600" stroke-width="1" />
    <line x1="450" y1="590" x2="450" y2="610" stroke-width="1" />
  </g>

  <!-- EXIF Monochrome Metadata Stamp inside negative edge -->
  <text x="65" y="1115" fill="#71717a" font-family="monospace" font-size="13" letter-spacing="2">LEICA M11 MONOCHROM · SUMMILUX 35MM F/1.4 · ISO 125</text>
  <rect width="900" height="1200" filter="url(#grain)" opacity="0.35" />
</svg>
`);

export const PROJECT_PLATES = {
  aether: createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141417" />
      <stop offset="50%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.03" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg1)" />
  <!-- Architectural Sunlight Geometry -->
  <polygon points="0,0 980,0 1420,900 320,900" fill="url(#beam)" />
  <!-- Swiss Grid System Lines -->
  <g stroke="#ffffff" stroke-opacity="0.07" stroke-width="1">
    <line x1="200" y1="0" x2="200" y2="900" />
    <line x1="600" y1="0" x2="600" y2="900" />
    <line x1="1000" y1="0" x2="1000" y2="900" />
    <line x1="1400" y1="0" x2="1400" y2="900" />
    <line x1="0" y1="180" x2="1600" y2="180" />
    <line x1="0" y1="450" x2="1600" y2="450" />
    <line x1="0" y1="720" x2="1600" y2="720" />
  </g>
  <!-- Isometric System Canvas Frame -->
  <g transform="translate(220, 140)">
    <rect x="0" y="0" width="1160" height="620" rx="12" fill="#09090b" stroke="#3f3f46" stroke-width="1.5" />
    <line x1="0" y1="52" x2="1160" y2="52" stroke="#27272a" stroke-width="1" />
    <circle cx="28" cy="26" r="5" fill="#52525b" />
    <circle cx="48" cy="26" r="5" fill="#52525b" />
    <circle cx="68" cy="26" r="5" fill="#52525b" />
    <text x="580" y="31" fill="#a1a1aa" font-family="monospace" font-size="13" text-anchor="middle" letter-spacing="2">AETHER // SPATIAL COMPUTATION ENGINE — 120FPS</text>

    <!-- Left Architectural Node Graph -->
    <rect x="44" y="92" width="680" height="484" rx="6" fill="#050505" stroke="#27272a" />
    <g stroke="#e4e4e7" stroke-width="1.5" fill="none">
      <circle cx="240" cy="260" r="88" stroke-opacity="0.8" />
      <circle cx="460" cy="260" r="88" stroke-opacity="0.4" />
      <circle cx="350" cy="390" r="88" stroke-opacity="0.6" />
      <line x1="240" y1="260" x2="460" y2="260" stroke="#ffffff" stroke-width="2" />
      <line x1="240" y1="260" x2="350" y2="390" stroke="#ffffff" stroke-width="2" />
      <line x1="460" y1="260" x2="350" y2="390" stroke="#ffffff" stroke-width="2" />
    </g>
    <circle cx="240" cy="260" r="7" fill="#ffffff" />
    <circle cx="460" cy="260" r="7" fill="#ffffff" />
    <circle cx="350" cy="390" r="7" fill="#ffffff" />

    <!-- Right Telemetry Column -->
    <rect x="756" y="92" width="360" height="228" rx="6" fill="#0c0c0e" stroke="#27272a" />
    <text x="784" y="134" fill="#71717a" font-family="monospace" font-size="12" letter-spacing="1.5">FRAME BUDGET DISTRIBUTION</text>
    <text x="784" y="188" fill="#fafafa" font-family="sans-serif" font-size="42" font-weight="700">1.84 ms</text>
    <polyline points="784,268 830,252 875,260 920,225 965,232 1010,198 1055,204 1088,176" fill="none" stroke="#fafafa" stroke-width="2.5" />

    <rect x="756" y="348" width="360" height="228" rx="6" fill="#0c0c0e" stroke="#27272a" />
    <text x="784" y="390" fill="#71717a" font-family="monospace" font-size="12" letter-spacing="1.5">ZERO-ALLOCATION PIPELINE</text>
    <g fill="#e4e4e7">
      <rect x="784" y="420" width="290" height="8" rx="4" fill="#27272a" />
      <rect x="784" y="420" width="256" height="8" rx="4" fill="#fafafa" />
      <rect x="784" y="458" width="290" height="8" rx="4" fill="#27272a" />
      <rect x="784" y="458" width="218" height="8" rx="4" fill="#a1a1aa" />
      <rect x="784" y="496" width="290" height="8" rx="4" fill="#27272a" />
      <rect x="784" y="496" width="274" height="8" rx="4" fill="#fafafa" />
    </g>
  </g>
</svg>
`),

  kinetix: createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <rect width="1200" height="900" fill="#08080a" />
  <g stroke="#ffffff" stroke-opacity="0.06" stroke-width="1">
    <line x1="120" y1="0" x2="120" y2="900" />
    <line x1="600" y1="0" x2="600" y2="900" />
    <line x1="1080" y1="0" x2="1080" y2="900" />
    <line x1="0" y1="150" x2="1200" y2="150" />
    <line x1="0" y1="750" x2="1200" y2="750" />
  </g>
  <!-- Swiss Editorial Spread -->
  <rect x="160" y="130" width="880" height="640" fill="#f4f4f5" rx="4" />
  <line x1="600" y1="130" x2="600" y2="770" stroke="#d4d4d8" stroke-width="1.5" />
  <!-- Left Page -->
  <text x="210" y="220" fill="#09090b" font-family="serif" font-size="78" font-style="italic">Aa</text>
  <text x="210" y="290" fill="#52525b" font-family="monospace" font-size="13" letter-spacing="2">OPTICAL SIZE 12..96 · SWISS GRID</text>
  <line x1="210" y1="325" x2="550" y2="325" stroke="#09090b" stroke-width="2" />
  <rect x="210" y="365" width="330" height="14" fill="#18181b" />
  <rect x="210" y="395" width="290" height="14" fill="#3f3f46" />
  <rect x="210" y="425" width="310" height="14" fill="#71717a" />
  <circle cx="380" cy="595" r="95" fill="#09090b" />
  <circle cx="425" cy="595" r="65" fill="none" stroke="#fafafa" stroke-width="2" />
  <!-- Right Page -->
  <g transform="translate(650, 195)">
    <path d="M0,360 C90,360 110,40 330,40" fill="none" stroke="#09090b" stroke-width="4" />
    <line x1="0" y1="360" x2="90" y2="360" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="110" y1="40" x2="330" y2="40" stroke="#71717a" stroke-width="1.5" stroke-dasharray="4 4" />
    <circle cx="90" cy="360" r="7" fill="#09090b" />
    <circle cx="110" cy="40" r="7" fill="#09090b" />
    <text x="0" y="435" fill="#09090b" font-family="monospace" font-size="14" font-weight="600">cubic-bezier(0.16, 1, 0.3, 1)</text>
    <text x="0" y="468" fill="#52525b" font-family="monospace" font-size="12">COMPOSITOR-ONLY SPRING INTERPOLATION</text>
  </g>
</svg>
`),

  chronos: createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <rect width="1200" height="900" fill="#060608" />
  <!-- Dieter Rams Inspired Precision Dial & E-Ink Module -->
  <circle cx="600" cy="450" r="320" fill="#0e0e11" stroke="#27272a" stroke-width="2" />
  <circle cx="600" cy="450" r="275" fill="#09090b" stroke="#3f3f46" stroke-width="1.5" stroke-dasharray="3 9" />
  <circle cx="600" cy="450" r="210" fill="#141418" stroke="#52525b" stroke-width="2" />
  <circle cx="600" cy="450" r="145" fill="#050505" stroke="#27272a" stroke-width="1.5" />
  <!-- Precision Indicator Line -->
  <line x1="600" y1="450" x2="735" y2="315" stroke="#fafafa" stroke-width="4" stroke-linecap="round" />
  <circle cx="600" cy="450" r="12" fill="#fafafa" />
  <!-- Tabular Readout -->
  <text x="600" y="515" fill="#a1a1aa" font-family="monospace" font-size="14" text-anchor="middle" letter-spacing="3">99.998% CONSENSUS</text>
  <text x="600" y="835" fill="#52525b" font-family="monospace" font-size="13" text-anchor="middle" letter-spacing="2">CHRONOS // DETERMINISTIC STATE ENGINE</text>
</svg>
`),

  monolith: createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <rect width="1600" height="900" fill="#050505" />
  <g stroke="#27272a" stroke-width="1">
    <line x1="0" y1="450" x2="1600" y2="450" />
    <line x1="800" y1="0" x2="800" y2="900" />
  </g>
  <!-- Acoustic Waveform Sculpture in Monochrome -->
  <g transform="translate(180, 220)" stroke="#fafafa" fill="none">
    <rect x="0" y="0" width="1240" height="460" rx="12" fill="#0a0a0c" stroke="#27272a" stroke-width="1.5" />
    <!-- Vertical Harmonic Bars -->
    <g stroke-width="4" stroke-linecap="round">
      <line x1="120" y1="200" x2="120" y2="260" stroke="#52525b" />
      <line x1="160" y1="170" x2="160" y2="290" stroke="#71717a" />
      <line x1="200" y1="120" x2="200" y2="340" stroke="#a1a1aa" />
      <line x1="240" y1="85" x2="240" y2="375" stroke="#fafafa" />
      <line x1="280" y1="140" x2="280" y2="320" stroke="#d4d4d8" />
      <line x1="320" y1="185" x2="320" y2="275" stroke="#71717a" />
      <line x1="360" y1="150" x2="360" y2="310" stroke="#a1a1aa" />
      <line x1="400" y1="95" x2="400" y2="365" stroke="#fafafa" />
      <line x1="440" y1="65" x2="440" y2="395" stroke="#ffffff" />
      <line x1="480" y1="110" x2="480" y2="350" stroke="#e4e4e7" />
      <line x1="520" y1="165" x2="520" y2="295" stroke="#a1a1aa" />
      <line x1="560" y1="195" x2="560" y2="265" stroke="#52525b" />
      <line x1="600" y1="145" x2="600" y2="315" stroke="#a1a1aa" />
      <line x1="640" y1="90" x2="640" y2="370" stroke="#fafafa" />
      <line x1="680" y1="75" x2="680" y2="385" stroke="#ffffff" />
      <line x1="720" y1="130" x2="720" y2="330" stroke="#d4d4d8" />
      <line x1="760" y1="175" x2="760" y2="285" stroke="#71717a" />
      <line x1="800" y1="125" x2="800" y2="335" stroke="#e4e4e7" />
      <line x1="840" y1="80" x2="840" y2="380" stroke="#ffffff" />
      <line x1="880" y1="115" x2="880" y2="345" stroke="#d4d4d8" />
      <line x1="920" y1="160" x2="920" y2="300" stroke="#a1a1aa" />
      <line x1="960" y1="190" x2="960" y2="270" stroke="#71717a" />
      <line x1="1000" y1="140" x2="1000" y2="320" stroke="#a1a1aa" />
      <line x1="1040" y1="175" x2="1040" y2="285" stroke="#71717a" />
      <line x1="1080" y1="205" x2="1080" y2="255" stroke="#52525b" />
      <line x1="1120" y1="215" x2="1120" y2="245" stroke="#3f3f46" />
    </g>
    <text x="60" y="52" fill="#a1a1aa" font-family="monospace" font-size="13" letter-spacing="2">MONOLITH DSP // WEBAUDIO WORKLET SYNTHESIS</text>
    <text x="1180" y="52" fill="#fafafa" font-family="monospace" font-size="13" text-anchor="end">48.0 kHz · 32-BIT FLOAT</text>
  </g>
</svg>
`)
};

export const INITIAL_PROFILE: PortfolioProfile = {
  name: 'Jhuly Godinez III',
  role: 'IT Student · Full-Stack, Mobile & Game Developer',
  location: 'Cebu · Remote Worldwide',
  availability: 'Available for internships, freelance & collaborative projects',
  headlinePrimary: "Hi, I'm ThordyyDev — Building practical software with",
  headlineSerifAccent: 'purpose and curiosity.',
  leadBio:
    'An Information Technology student from Cebu focused on web development, mobile applications, game development, and modern cloud databases.',
  editorialPhilosophy:
    'I believe in learning by building, experimenting with new technologies, and turning concepts into real-world projects.',
  email: 'jhulygodinezedu@gmail.com',
  githubUsername: 'ThordyyDev',
  githubUrl: 'https://github.com/ThordyyDev',
  linkedinUrl: 'https://linkedin.com',
  portraitUrl: '/photo.png',
  portraitFilter: 'natural',
  portraitCaption: 'Jhuly Godinez III (@ThordyyDev)',
  metrics: [
    {
      value: '6+',
      label: 'Core Repositories & Academic Works',
      timeframe: 'Coursework & practical builds'
    },
    {
      value: '10+',
      label: 'Core Technologies & Frameworks',
      timeframe: 'TypeScript, Mobile, C++, Supabase, Postgres'
    },
    {
      value: '100%',
      label: 'Practical Learning by Building',
      timeframe: 'Continuous implementation'
    },
    {
      value: '2026',
      label: 'Target Graduation & Career Horizon',
      timeframe: 'IT Degree Program'
    }
  ]
};

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'night-harvest',
    index: '00',
    title: 'Night-Harvest',
    subtitle: 'A farming survival game made with Godot 4',
    category: 'Game Development',
    status: 'Completed',
    year: '2026',
    clientOrContext: 'Personal Project · LimbrasonaDev & ThordyyDev',
    readTime: '4 min read',
    bentoSpan: 'wide',
    imageUrl: 'NightHarvest.png',
    githubUrl: 'https://github.com/lilzamdev/Night-Harvest',
    liveUrl: 'https://github.com/lilzamdev/Night-Harvest',
    summary:
      'Night-Harvest is a nocturnal survival and farming simulation game made with Godot 4, featuring wheat farming algorithms, idle animal behavior state machines, custom atmospheric shaders, and versioned releases.',
    problem:
      'Designing decoupled game systems that manage crop growth cycles, entity AI behaviors, and procedural environmental lighting without performance hitches.',
    architecture:
      'Engineered in Godot 4 using custom nodes, modular scene architecture, crop growth state machines, nocturnal lighting shaders, and organized release tags (v1.4.3).',
    executionHighlights: [
      'Implemented crop lifecycle algorithms including planting, growth ticks, and harvesting mechanics.',
      'Developed state machine AI for idle animals and wildlife interactions.',
      'Authored custom shaders and lighting pipelines to establish an immersive nocturnal atmosphere.',
      'Maintained versioned deployment pipelines with changelog tracking up to release v1.4.3.'
    ],
    outcomes: [
      {
        label: 'Release Tag',
        value: 'v1.4.3',
        context: 'Versioned deployment & active changelogs'
      },
      {
        label: 'Engine',
        value: 'Godot 4',
        context: 'Custom gameplay systems & shaders'
      },
      {
        label: 'Co-Creators',
        value: 'Collab',
        context: 'LimbrasonaDev & ThordyyDev'
      }
    ],
    skills: ['Godot 4', 'Game Development', 'GDScript / C#', 'Shaders', 'Pixel Art / 2D', 'State Machines']
  },
  {
    id: 'fitness-nutrition-app',
    index: '01',
    title: 'Fitness & Nutrition App',
    subtitle: 'Mobile-first fitness and daily nutrition tracking application',
    category: 'Mobile Development',
    status: 'In Progress',
    year: '2026',
    clientOrContext: 'Personal Project · Creator',
    readTime: '4 min read',
    bentoSpan: 'standard',
    imageUrl: 'nutrition.webp',
    githubUrl: 'https://github.com/ThordyyDev/fitness-app',
    liveUrl: 'https://github.com/ThordyyDev/fitness-app',
    summary:
      'Designing and developing a personal mobile fitness and nutrition tracking app to monitor daily macronutrients, workout routines, and wellness metrics with intuitive, clean interfaces.',
    problem:
      'Existing fitness apps are often cluttered with invasive paywalls, unnecessary social feeds, and excessive latency for simple daily logging.',
    architecture:
      'Engineered with TypeScript and modern mobile component architecture, integrating Supabase and PostgreSQL for seamless authentication and synchronized cloud logging.',
    executionHighlights: [
      'Implemented fluid macro tracking and calorie calculation modules with responsive card views.',
      'Configured Supabase and PostgreSQL cloud storage for real-time data persistence.',
      'Integrated typed local state storage for zero-lag logging during daily workouts.'
    ],
    outcomes: [
      {
        label: 'Daily Utility',
        value: 'Daily Use',
        context: 'Built for practical everyday lifestyle tracking'
      },
      {
        label: 'Type Safety',
        value: '100%',
        context: 'TypeScript static analysis coverage'
      },
      {
        label: 'Interface Latency',
        value: '< 16ms',
        context: 'Responsive 60fps interaction speed'
      }
    ],
    skills: ['TypeScript', 'Mobile Development', 'Supabase', 'PostgreSQL', 'Responsive Design']
  },
  {
    id: 'fixmo',
    index: '02',
    title: 'FixMo',
    subtitle: 'Mobile app for reporting and tracking infrastructure repair requests',
    category: 'Mobile Development',
    status: 'In Progress',
    year: '2026',
    clientOrContext: 'Personal Project · Creator',
    readTime: '4 min read',
    bentoSpan: 'wide',
    imageUrl: 'fixmo.gif',
    githubUrl: 'https://github.com/ThordyyDev/FixMo',
    liveUrl: 'https://github.com/ThordyyDev/FixMo',
    summary:
      'FixMo is a mobile application built to simplify the reporting and monitoring of infrastructure repair requests, enabling users to submit, track, and manage maintenance issues efficiently.',
    problem:
      'Reporting infrastructure issues like broken roads or damaged facilities is often fragmented, relies on manual processes, and gives citizens no visibility into resolution progress.',
    architecture:
      'Built with TypeScript and a modern mobile component architecture, integrated with Supabase and PostgreSQL for real-time data sync, user authentication, and structured report storage.',
    executionHighlights: [
      'Designed a clean, intuitive report submission flow with image capture and location tagging.',
      'Configured Supabase real-time subscriptions for live status updates on submitted reports.',
      'Implemented role-based views separating citizen reporters from admin responders.'
    ],
    outcomes: [
      {
        label: 'Platform',
        value: 'Mobile',
        context: 'TypeScript-powered mobile app'
      },
      {
        label: 'Backend',
        value: 'Supabase',
        context: 'Real-time PostgreSQL database'
      },
      {
        label: 'Focus',
        value: 'Civic Tech',
        context: 'Practical community-impact tool'
      }
    ],
    skills: ['TypeScript', 'Mobile Development', 'Supabase', 'PostgreSQL', 'Responsive Design']
  },
  {
    id: 'first-year-web-projects',
    index: '03',
    title: 'First-Year Web Suite',
    subtitle: 'Curated collection of responsive web development and UI experiments',
    category: 'Web Development',
    status: 'Completed',
    year: '2025',
    clientOrContext: 'Academic Coursework & Web Lab',
    readTime: '3 min read',
    bentoSpan: 'standard',
    imageUrl: PROJECT_PLATES.monolith,
    githubUrl: 'https://github.com/ThordyyDev/first-year-web-projects',
    liveUrl: 'https://github.com/ThordyyDev/first-year-web-projects',
    summary:
      'A hands-on collection of beginner to intermediate web projects focused on mastering semantic HTML, modern responsive CSS layouts, and dynamic JavaScript/TypeScript interactions.',
    problem:
      'Bridging the gap between fundamental web theory and building robust, cross-device compatible web pages that look polished on every screen size.',
    architecture:
      'Progressive implementation of responsive design principles using CSS Grid, Flexbox, accessible DOM structures, and clean modular event handling.',
    executionHighlights: [
      'Built multi-page responsive websites with fluid media queries and mobile-first typography.',
      'Authored clean DOM manipulation scripts for interactive UI elements and form validation.',
      'Demonstrated semantic accessibility and cross-browser visual fidelity.'
    ],
    outcomes: [
      {
        label: 'Core Stack',
        value: 'HTML5/CSS',
        context: 'Solid modern web foundation'
      },
      {
        label: 'Responsiveness',
        value: '100%',
        context: 'Mobile, tablet, and desktop fidelity'
      },
      {
        label: 'Code Quality',
        value: 'Modular',
        context: 'Clean separation of structure and style'
      }
    ],
    skills: ['HTML5', 'CSS Architecture', 'JavaScript', 'TypeScript', 'Responsive Design']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    index: '01',
    domain: 'Web & Mobile Development',
    description: 'Modern frontend interfaces, mobile application architecture, responsive design, and typed logic.',
    skills: [
      { name: 'TypeScript', proficiency: 'Learning', years: '3 mo' },
      { name: 'Mobile Development', proficiency: 'Intermediate', years: '1 yr' },
      { name: 'JavaScript', proficiency: 'Advanced', years: '3 yrs' },
      { name: 'HTML5', proficiency: 'Advanced', years: '3 yrs' },
      { name: 'CSS3 / Responsive', proficiency: 'Advanced', years: '3 yrs' },
      { name: 'Responsive Web Design', proficiency: 'Advanced', years: '3 yrs' }
    ]
  },
  {
    index: '02',
    domain: 'Game Development & Systems OOP',
    description: 'Game mechanics, class hierarchies, state transitions, algorithms, and object-oriented architecture.',
    skills: [
      { name: 'Game Development', proficiency: 'Intermediate', years: '2 yrs' },
      { name: 'C++', proficiency: 'Intermediate', years: '2 yrs' },
      { name: 'C#', proficiency: 'Intermediate', years: '2 yrs' },
      { name: 'Python', proficiency: 'Advanced', years: '3 yrs' },
      { name: 'Java', proficiency: 'Intermediate', years: '2 yrs' },
      { name: 'C', proficiency: 'Intermediate', years: '2 yrs' }
    ]
  },
  {
    index: '03',
    domain: 'Databases, Cloud & Backend Tools',
    description: 'Relational databases, realtime backends, schema design, Git versioning, and developer tooling.',
    skills: [
      { name: 'PostgreSQL', proficiency: 'Intermediate', years: '1 yr' },
      { name: 'Supabase', proficiency: 'Intermediate', years: '1 yr' },
      { name: 'MySQL', proficiency: 'Intermediate', years: '2 yrs' },
      { name: 'Django', proficiency: 'Intermediate', years: '1 yr' },
      { name: 'PHP', proficiency: 'Intermediate', years: '2 yrs' },
      { name: 'Git & GitHub', proficiency: 'Advanced', years: '3 yrs' }
    ]
  }
];

export const PORTFOLIO_PROMPTS: PromptTemplate[] = [
  {
    id: 'prompt-leica-portrait',
    title: '01. Editorial Monochrome Portrait (Leica M11 Aesthetic)',
    category: 'Portrait Photography',
    useCase: 'Use in Midjourney v6, Imagen 3, or Flux to generate or restyle your personal author portrait.',
    aspectRatio: '3:4',
    promptText:
      'High-contrast black-and-white editorial studio portrait of a software architect and designer wearing a minimalist matte black turtleneck, dramatic side chiaroscuro rim lighting, shot on Leica M11 Monochrom with Summilux 35mm f/1.4 lens, subtle silver gelatin film grain, deep charcoal background (#050505), razor-sharp focus on eyes, quiet intellectual confidence, architectural magazine monograph aesthetic --ar 3:4 --style raw'
  },
  {
    id: 'prompt-swiss-ui-architecture',
    title: '02. Minimalist Monochrome Portfolio Layout System',
    category: 'UI & Layout Architecture',
    useCase: 'System prompt for generating or extending minimalist black-and-white portfolio sections with Swiss typography.',
    aspectRatio: '16:9',
    promptText:
      'Design a stark black-and-white (#050505 canvas, #FAFAFA primary ink, #27272A 1px structural hairlines) editorial engineering portfolio inspired by Josef Müller-Brockmann and Dieter Rams. Pair a bold neo-grotesque display face (Bricolage Grotesque) with an italic editorial serif accent (Cormorant Garamond) and tabular monospace metrics (JetBrains Mono). Enforce zero pill badges: render all metadata as clean inline text separated by middle dots (·). Animate only transform and opacity using cubic-bezier(0.16, 1, 0.3, 1) settling curves.'
  },
  {
    id: 'prompt-case-study-plate',
    title: '03. Architectural Case Study Cover Plate',
    category: 'Case Study Visuals',
    useCase: 'Generate cohesive monochrome cover imagery for engineering case studies and system diagrams.',
    aspectRatio: '16:9',
    promptText:
      'Minimalist black-and-white studio photography of precision anodized matte black aluminum hardware and brutalist architectural geometry, dramatic directional sunlight casting sharp diagonal shadows across a dark slate surface, Swiss typographic grid overlay, high contrast silver gelatin tone curve, 8k commercial editorial photography --ar 16:9'
  },
  {
    id: 'prompt-case-study-writer',
    title: '04. Executive Engineering Case Study Synthesizer',
    category: 'Editorial Copywriting',
    useCase: 'Prompt for turning a GitHub repository README and commit history into a rigorous portfolio case study.',
    aspectRatio: 'Document',
    promptText:
      'Transform the following GitHub repository into a concise, senior-level engineering case study. Avoid marketing fluff or vague superlatives. Structure the output into four exact parts: (1) One-sentence architectural thesis, (2) The bottleneck or failure mode of existing approaches, (3) The deterministic system architecture and data structures chosen, and (4) Three quantitative outcomes with explicit units, benchmarks, and measurement contexts.'
  }
];
