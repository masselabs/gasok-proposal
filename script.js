const slides = Array.from(document.querySelectorAll(".slide"));
const shell = document.querySelector(".deck-shell");
const nav = document.getElementById("slideNav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentSlide = document.getElementById("currentSlide");
const totalSlides = document.getElementById("totalSlides");
const stage = document.getElementById("stage");
const languageButtons = Array.from(document.querySelectorAll(".lang-button"));
const mobileSlideSelect = document.getElementById("mobileSlideSelect");

const copy = {
  en: {
    meta: {
      title: "ZKProofport - Private Dojang Pass for GIWA",
      description: "An interactive GASOK application deck for ZKProofport's Private Dojang Pass.",
    },
    brandSub: "",
    jumpLabel: "Slide",
    nav: [
      "Proposal",
      "Problem",
      "Solution",
      "Wallet Flow",
      "Proof Types",
      "Build Scope",
      "Existing Proof",
      "GASOK Plan",
      "Team",
      "Tech Detail",
      "Demo",
    ],
    controls: {
      prev: "Previous slide",
      next: "Next slide",
    },
    cover: {
      eyebrow: "GASOK / GIWA Acceleration Application",
      title: "Private Dojang Pass",
      lede:
        "Dojang's trust, without the exposure. Zero-knowledge proofs, native to GIWA Wallet.",
      tags: ["Dojang", "GIWA Wallet", "Wallet Privacy", "ZK Proofs"],
      passportPrivate: "PRIVATE",
      passportTitle: "Dojang",
      stampTop: "Verified Address",
      stampBottom: "Proof, not exposure",
      bottom: ["Issuer: Upbit Korea", "Verifier: GIWA dApps"],
    },
    problem: {
      eyebrow: "Problem",
      title: "Dojang is useful because it is trusted. It becomes sensitive when every dApp reads it directly.",
      labels: ["Before", "After"],
      titles: [
        "Direct address checks",
        "Private proof checks",
      ],
      bodies: [
        "A dApp checks a wallet against Dojang and may connect KYC status, balance conditions, and app behavior to the same public wallet graph.",
        "A dApp verifies a proof that one condition is true. The source wallet, exact balance, and personal identity stay private.",
      ],
      note:
        "<b>Why this matters:</b> the more useful Dojang becomes for DeFi, RWA, quests, and verified communities, the more important selective disclosure becomes.",
    },
    solution: {
      eyebrow: "Solution",
      title: "Make Dojang proofs private and wallet-friendly, with a path to GIWA Wallet-native UX.",
      smalls: ["Issuer and trust source", "User proof surface", "dApp integration"],
      names: ["Upbit / Dojang", "ZKProofport App / GIWA Wallet", "GIWA dApps"],
      bodies: [
        "Verified Address and Verified Balance attestations",
        "Mobile proving, approval UX, selective disclosure",
        "SDK requests and GIWA verifier contracts consume the proof",
      ],
      layerTitle: "Progressive integration",
      layerBody:
        "Private Dojang Pass can run today through the ZKProofport mobile app and @zkproofport/giwa SDK. The same proof request and verifier model can later be embedded into GIWA Wallet for the smoothest user experience.",
      claimTitles: ["dApp learns", "dApp does not learn", "Integration path"],
      claimBodies: [
        "KYC passed, balance threshold met, purpose-bound nullifier, verification result",
        "source wallet, exact balance, attestation raw data, personal identity",
        "Works today with the ZKProofport app and SDK, then moves toward a GIWA Wallet-native flow",
      ],
    },
    wallet: {
      eyebrow: "Integration paths",
      title: "Two ways to request Dojang proofs through ZKProofport.",
      pathBadges: ["Available now", "With wallet team"],
      pathTitles: ["ZKProofport App", "GIWA Wallet Native"],
      pathDescs: [
        "The dApp triggers the ZKProofport mobile app via SDK.",
        "The proof request appears inside the GIWA Wallet itself.",
      ],
      pathSteps: [
        "dApp requests proof via @zkproofport/giwa SDK",
        "User opens ZKProofport app via QR or deep link",
        "User approves and generates proof on-device",
        "Proof is verified by GIWA verifier contract",
        "dApp requests proof via @zkproofport/giwa SDK",
        "GIWA Wallet shows proof request popup",
        "User approves inside the wallet",
        "Proof is verified by GIWA verifier contract",
      ],
      sharedTitle: "Shared with dApp",
      sharedItems: ["KYC: verified \u2713", "Balance: threshold met", "Nullifier: scoped"],
      privateTitle: "Stays private",
      privateItems: ["Wallet address", "Exact balance", "Personal identity"],
    },
    build: {
      eyebrow: "Build scope",
      title: "What we will build during GASOK.",
      note:
        "We focus on building the core end-to-end pipeline first: privacy-preserving KYC proof, balance threshold proof, GIWA verifier, SDK request, and a showcase dApp.",
      codes: ["CIRCUIT", "CONTRACT", "SDK", "WALLET", "MOBILE", "dApp"],
      titles: [
        "Dojang proof circuits",
        "GIWA verifier contracts",
        "@zkproofport/giwa",
        "Wallet-compatible proof request flow",
        "mopro mobile proving",
        "Showcase dApp",
      ],
      bodies: [
        "Privacy-preserving KYC proof path first, with balance threshold proof using the same model.",
        "Verifier contracts deployed on GIWA Sepolia for dApp-side proof checks.",
        "dApps request proofs and verify against GIWA contracts without circuit-specific code.",
        "A proof request flow that works through the ZKProofport mobile app today and can be adapted into a GIWA Wallet-native approval experience.",
        "Client-side proof generation and local verification checks on mobile without exposing private Dojang data to dApps.",
        "A testnet dApp that demonstrates privacy-preserving verified access and balance-threshold eligibility.",
      ],
    },
    credentials: {
      eyebrow: "Dojang proof types",
      title: "Two proof types that protect what Dojang makes useful.",
      heroLabels: ["Verified Address", "Verified Balance"],
      heroTitles: ["Privacy-preserving KYC proof", "Privacy-preserving threshold proof"],
      heroBodies: [
        "The current PoC proves KYC status from a trusted Dojang credential without exposing the source wallet or identity graph.",
        "Verified Balance follows the same privacy model next, letting dApps check thresholds without learning exact amounts or wallet history.",
      ],
      table: [
        "Proof type",
        "What dApp learns",
        "What stays private",
        "Verified Address / KYC",
        "User is verified by an approved Dojang issuer",
        "wallet address, identity graph, raw attestation",
        "Verified Balance",
        "User meets a threshold or eligibility rule",
        "exact balance, asset history, source wallet",
        "Shared primitive",
        "condition result, scope, nullifier, verifier result",
        "personal identity and reusable cross-dApp identity links",
      ],
    },
    traction: {
      eyebrow: "Existing proof",
      title: "We are not starting from zero. We are adapting proven proof infrastructure for the GIWA ecosystem.",
      labels: ["EAS / KYC proof PoC", "mopro mobile proving", "Aztec / Noir grant", "Agent path"],
      titles: [
        "Working EAS-based proof path",
        "Client-side proofs on mobile",
        "Circuit implementation recognized",
        "Automation-ready proof model",
      ],
      bodies: [
        "We have experience with Ethereum Attestation Service (EAS)-based systems and circuit implementation. KYC attestation proofs already work across proof generation and verifier contract flow.",
        "We already have mobile client-side proving experience using mopro and React Native runtime integration.",
        "Aztec / Noir grant support validates our circuit implementation capability.",
        "Agents can request credential proofs and rely on the same verifier contract model.",
      ],
      ledger: ["Aztec / Noir grant", "EAS attestation system experience", "mopro mobile proving capability"],
    },
    architecture: {
      eyebrow: "Reference architecture",
      title: "The dApp uses the SDK; GIWA verifier contracts do the proof check.",
      nodeLabels: ["dApp + SDK", "Proof surface", "ZK proof generation", "GIWA Chain", "dApp policy"],
      nodeTitles: [
        "Request proof",
        "Open app or wallet flow",
        "Generate proof",
        "Verifier contract",
        "Grant access",
      ],
      nodeBodies: [
        "The dApp asks for KYC status or balance eligibility through @zkproofport/giwa.",
        "Today the user opens ZKProofport through QR or deep link. Later, the same request can become a GIWA Wallet-native approval.",
        "The mobile app creates the proof now; the same model can move into the wallet-native surface later.",
        "Proof validity is checked by contracts deployed on GIWA.",
        "The dApp applies access, one-user-one-action, or threshold rules.",
      ],
      integrationTitle: "DApp integration model",
      integrationBody:
        "The dApp integrates the SDK, requests a proof, and verifies it against the GIWA verifier contract. Builders should not need to write circuit-specific verification code.",
      agentTitle: "Two integration modes",
      agentBody:
        "<b>Available path:</b> dApp -> SDK -> ZKProofport app via QR/deep link -> proof -> GIWA verifier<br><b>Native path:</b> dApp -> GIWA Wallet proof request -> in-wallet proving/approval -> GIWA verifier",
      privacyTitle: "Privacy boundary",
      boundaryLabels: ["Kept private", "Shared", "Important"],
      boundaryBodies: [
        "source wallet, raw attestation, exact balance, email, identity graph",
        "proof, scope, nullifier, verifier result, optional attester ID",
        "The transaction sender must not be the same address being hidden. Relayer, session account, or off-chain session patterns should be part of the integration guidance.",
      ],
    },
    roadmap: {
      eyebrow: "GASOK execution plan",
      title: "A phased plan that works now and gets closer to wallet-native UX.",
      times: ["May", "Jun-Jul", "Aug-Sep", "Oct"],
      titles: ["Research & design PoC", "App-based proof flow", "Testing & documentation", "KBW Demo Day"],
      bodies: [
        "Dojang schema analysis, circuit design, verifier architecture, proof-of-concept on testnet.",
        "End-to-end proof flow via ZKProofport app + SDK on GIWA Sepolia. If wallet team collaboration is available, begin in-app integration.",
        "User testing, edge case hardening, developer documentation, and integration guide for GIWA builders.",
        "Live demo at Korea Blockchain Week: app-based proof, wallet-native path, and balance threshold preview.",
      ],
    },
    team: {
      eyebrow: "Team",
      title: "A small technical team that already built across the full stack.",
      roles: ["Co-founder", "Co-founder"],
      names: ["Sooyoung Hyun", "Jaehyuk Hyun"],
      bodies: [
        "Career\n- Ethereum Remix IDE Developer\n- DSRV Team Leader\n- Aztec Genesis Sequencer\n- Inha University",
        "Career\n- NHN Cloud Distributed Storage Team Lead\n- Tmax Soft Engineer\n- KAIST",
      ],
      closeTitle: "Why GASOK matters to us",
      closeBody:
        "Our vision is for ZKProofport to become the privacy layer that makes Dojang more useful for GIWA users and easier for dApp builders to integrate. As GIWA expands into regulated areas like KRW stablecoins and RWA, the ability to prove compliance without exposing personal data becomes essential. GASOK gives us the technical alignment and ecosystem feedback to build this into a GIWA-native product.",
    },
    appendixTech: {
      eyebrow: "Appendix A \u2014 Technical Architecture",
      title: "From Dojang attestation to on-chain verification: the full proof pipeline.",
      stageLabels: ["Dojang / EAS", "Mobile App", "Noir Circuit", "Verifier Contract"],
      stageTitles: ["Attestation source", "On-device proving", "ZK proof generation", "On-chain verification"],
      stageBodies: [
        "KYC attestation TX recorded on-chain via EAS",
        "mopro Rust engine via UniFFI bindings",
        "UltraHonk proof system (Aztec/Noir)",
        "Solidity verifier: verify(proof, publicInputs)",
      ],
      cardLabels: ["CIRCUIT", "PROVING", "VERIFY"],
      cardTitles: ["Noir ZK Circuit", "mopro Mobile Proving", "On-chain Verifier"],
      cardItems: [
        "User ownership: ECDSA signature verification",
        "TX authenticity: attestation transaction parsing",
        "Signer validation: Merkle proof against authorized list",
        "Sybil resistance: deterministic nullifier generation",
        "Rust-based prover compiled for iOS and Android",
        "UltraHonk proof system with low memory mode",
        "3\u201310 seconds on-device proof generation",
        "Circuit files downloaded and cached at runtime",
        "Auto-generated Solidity from Noir circuit",
        "verify(bytes proof, bytes32[] publicInputs) \u2192 bool",
        "View function call \u2014 no gas cost for verification",
        "Deployed on Giwa Network",
      ],
      privateTitle: "Private inputs (never revealed)",
      privateItems: ["wallet address", "attestation TX", "user signature", "signer pubkey"],
      publicTitle: "Public inputs (shared with verifier)",
      publicItems: ["signal_hash", "signer merkle root", "scope", "nullifier"],
    },
    demo: {
      eyebrow: "Appendix B \u2014 Live Demo",
      title: "Privacy-preserving KYC verification on a real testnet environment.",
      setupTitle: "Demo environment",
      setupItems: [
        "EAS contracts deployed on testnet",
        "KYC-verified addresses registered as real attestations",
        "ZKProofport mobile app generating proofs on-device",
        "GIWA verifier contract validating proofs on-chain",
      ],
      flowTitle: "What the demo shows",
      flowSteps: [
        "A user with a KYC-verified Dojang address opens the sample dApp",
        "The dApp requests a KYC proof via @zkproofport/giwa SDK",
        "The user generates a zero-knowledge proof on their mobile device",
        "The proof is verified on-chain — without revealing the wallet address",
      ],
      videoLabel: "Demo video will be embedded here",
      note: "This demo runs on a testnet environment that mirrors mainnet conditions: real EAS attestations, real proof generation, and real on-chain verification.",
    },
  },
  ko: {
    meta: {
      title: "ZKProofport - GIWA를 위한 Private Dojang Pass",
      description: "ZKProofport의 Private Dojang Pass GASOK 신청용 인터랙티브 덱입니다.",
    },
    brandSub: "",
    jumpLabel: "슬라이드",
    nav: [
      "핵심 제안",
      "문제",
      "해결",
      "지갑 흐름",
      "증명 유형",
      "구축 범위",
      "기존 성과",
      "GASOK 계획",
      "팀",
      "기술 상세",
      "데모",
    ],
    controls: {
      prev: "이전 슬라이드",
      next: "다음 슬라이드",
    },
    cover: {
      eyebrow: "GASOK / GIWA Acceleration Application",
      title: "Private Dojang Pass",
      lede:
        "Dojang의 신뢰는 그대로, 개인정보는 비공개로. GIWA Wallet 안에서 영지식 증명으로 작동합니다.",
      tags: ["Dojang", "GIWA Wallet", "프라이버시", "ZK Proof", "KYC", "Balance"],
      passportPrivate: "PRIVATE",
      passportTitle: "Dojang",
      stampTop: "Verified Address",
      stampBottom: "노출 없는 증명",
      bottom: ["Issuer: Upbit Korea", "Verifier: GIWA dApps"],
    },
    problem: {
      eyebrow: "문제",
      title: "Dojang은 신뢰할 수 있는 데이터로서 유용하지만, dApp이 이를 직접 조회하게 되면 프라이버시 침해 위험이 발생합니다.",
      labels: ["Before", "After"],
      titles: [
        "주소를 직접 조회하는 방식",
        "증명만 검증하는 방식",
      ],
      bodies: [
        "dApp이 Dojang을 통해 지갑을 직접 대조할 경우, 사용자의 KYC 상태와 잔고 조건, 앱 사용 기록이 퍼블릭 지갑 그래프에 그대로 노출되고 연결될 수 있습니다.",
        "dApp은 특정 조건이 충족되었다는 '증명(Proof)'만을 검증합니다. 원본 지갑 주소나 정확한 잔고, 개인의 민감한 신원 정보는 완벽히 보호됩니다.",
      ],
      note:
        "<b>왜 중요한가:</b> Dojang이 DeFi, RWA, 퀘스트, 인증 사용자 커뮤니티에서 더 많이 쓰일수록 필요한 정보만 공개하는 방식이 중요해집니다.",
    },
    solution: {
      eyebrow: "해결",
      title: "Dojang Attestation을 프라이버시가 보장되는 지갑 친화적 경험으로 전환하고, GIWA Wallet 네이티브 UX로 나아갑니다.",
      smalls: ["발행자와 신뢰 원천", "사용자 증명 접점", "dApp 통합"],
      names: ["Upbit / Dojang", "ZKProofport 앱 / GIWA Wallet", "GIWA dApps"],
      bodies: ["Verified Address와 Verified Balance attestation", "모바일 증명 생성, 승인 UX, 선택적 공개", "SDK 요청과 GIWA 검증기 컨트랙트가 증명을 사용합니다"],
      layerTitle: "단계적 통합",
      layerBody:
        "Private Dojang Pass는 현재 ZKProofport 모바일 앱과 @zkproofport/giwa SDK를 통해 동작할 수 있습니다. 같은 증명 요청과 verifier 모델을 이후 GIWA Wallet 안에 통합하면 가장 매끄러운 사용자 경험을 만들 수 있습니다.",
      claimTitles: ["dApp에 공유되는 정보", "보호되는 프라이버시 정보", "통합 경로"],
      claimBodies: [
        "KYC 통과 여부, 잔고 기준 충족 여부, 목적별 nullifier, 검증 결과",
        "원본 지갑 주소, 정확한 잔고, attestation 원본 데이터, 개인 신원",
        "현재 ZKProofport 앱과 SDK로 동작하고, 이후 GIWA Wallet 네이티브 흐름으로 확장합니다",
      ],
    },
    wallet: {
      eyebrow: "연동 방식",
      title: "dApp이 ZKProofport를 통해 Dojang 증명을 요청하는 두 가지 방식입니다.",
      pathBadges: ["빠르게 가능", "지갑 팀 협업 시"],
      pathTitles: ["ZKProofport 앱", "GIWA Wallet 네이티브"],
      pathDescs: [
        "dApp이 SDK를 통해 ZKProofport 모바일 앱을 호출합니다.",
        "증명 요청이 GIWA Wallet 안에서 바로 나타납니다.",
      ],
      pathSteps: [
        "dApp이 @zkproofport/giwa SDK로 증명 요청",
        "QR 또는 딥링크로 ZKProofport 앱 실행",
        "사용자가 앱에서 증명 생성 승인",
        "GIWA 검증기 컨트랙트로 증명 검증",
        "dApp이 @zkproofport/giwa SDK로 증명 요청",
        "GIWA Wallet에서 증명 요청 팝업 표시",
        "사용자가 지갑 안에서 승인",
        "GIWA 검증기 컨트랙트로 증명 검증",
      ],
      sharedTitle: "공개되는 정보",
      sharedItems: ["KYC: 인증됨 \u2713", "잔고: 기준 충족", "Nullifier: 목적별"],
      privateTitle: "보호되는 정보",
      privateItems: ["지갑 주소", "정확한 잔고", "개인 신원"],
    },
    build: {
      eyebrow: "구축 범위",
      title: "GASOK 기간 내 개발 목표",
      note:
        "먼저 핵심적인 엔드투엔드(End-to-End) 파이프라인 구축에 집중합니다: 개인정보 노출 없는 KYC 증명, 잔고 기준 증명, GIWA verifier, SDK 요청, 쇼케이스 dApp.",
      codes: ["CIRCUIT", "CONTRACT", "SDK", "WALLET", "MOBILE", "dApp"],
      titles: [
        "Dojang 증명 서킷",
        "GIWA 검증기 컨트랙트",
        "@zkproofport/giwa",
        "지갑 호환 증명 요청 흐름",
        "mopro 모바일 증명 생성",
        "쇼케이스 dApp",
      ],
      bodies: [
        "개인정보 노출 없는 KYC 증명부터 시작하고, 같은 모델로 잔고 기준 증명까지 확장합니다.",
        "dApp이 증명을 확인할 수 있도록 GIWA Sepolia에 검증기 컨트랙트를 배포합니다.",
        "dApp이 서킷별 검증 코드를 직접 쓰지 않고 증명을 요청하고 검증할 수 있게 합니다.",
        "현재는 ZKProofport 모바일 앱으로 동작하고, 이후 GIWA Wallet-native 승인 경험으로 확장할 수 있는 증명 요청 흐름을 만듭니다.",
        "민감한 Dojang 데이터를 dApp에 넘기지 않고 모바일 클라이언트에서 증명을 생성하고 로컬 검증 체크까지 수행합니다.",
        "테스트넷 dApp에서 프라이버시를 보호하는 인증 사용자 접근과 잔고 기준 조건을 실제로 보여줍니다.",
      ],
    },
    credentials: {
      eyebrow: "Dojang 증명 유형",
      title: "Dojang이 제공하는 신뢰 데이터를 보호하는 두 가지 증명 유형입니다.",
      heroLabels: ["Verified Address", "Verified Balance"],
      heroTitles: ["KYC 프라이버시 증명", "잔고 기준 충족 증명"],
      heroBodies: [
        "신뢰할 수 있는 Dojang 정보를 바탕으로 KYC 상태를 증명하면서 원본 지갑과 신원 그래프를 노출하지 않습니다.",
        "잔고 기준 충족 여부만 증명하고, 정확한 금액이나 지갑 주소는 공개하지 않습니다.",
      ],
      table: [
        "증명 유형",
        "dApp이 알게 되는 것",
        "보호되는 정보",
        "Verified Address / KYC",
        "승인된 Dojang 발행자가 인증한 사용자임",
        "지갑 주소, 신원 그래프, 인증 데이터 원본",
        "Verified Balance",
        "사용자가 잔고 기준 또는 참여 조건을 충족함",
        "정확한 잔고, 자산 이력, 원본 지갑",
        "공통 프라이버시 구조",
        "조건 결과, 목적, nullifier, 검증 결과",
        "개인식별정보와 dApp 간 재사용 가능한 신원 연결",
      ],
    },
    traction: {
      eyebrow: "기존 성과",
      title: "우리는 제로 베이스에서 시작하지 않습니다. 이미 검증이 완료된 증명 인프라를 GIWA 생태계에 맞춰 최적화합니다.",
      labels: ["EAS / KYC 증명 PoC", "mopro 모바일 증명", "Aztec / Noir 그랜트", "에이전트 경로"],
      titles: [
        "EAS 기반 KYC 증명 흐름",
        "모바일 클라이언트 증명 생성",
        "서킷 구현 기술력 인정",
        "자동화에 맞는 증명 모델",
      ],
      bodies: [
        "Ethereum Attestation Service(EAS) 기반 시스템 경험과 서킷 구현 역량을 바탕으로, KYC Attestation 증명은 증명 생성부터 검증 컨트랙트까지 이미 정상 작동하고 있습니다.",
        "mopro와 React Native 런타임 통합을 통해 모바일 클라이언트 사이드 증명 생성 경험을 보유하고 있습니다.",
        "Aztec / Noir 그랜트를 통해 서킷 구현 역량을 인정받았습니다.",
        "AI 에이전트도 같은 자격 증명 요청과 검증 모델을 사용할 수 있습니다.",
      ],
      ledger: ["Aztec / Noir 그랜트", "EAS 기반 Attestation 경험", "mopro 모바일 증명 역량"],
    },
    architecture: {
      eyebrow: "레퍼런스 아키텍처",
      title: "dApp은 SDK로 증명을 요청하고, GIWA 검증기 컨트랙트가 검증을 처리합니다.",
      nodeLabels: ["dApp + SDK", "증명 접점", "ZK 증명 생성", "GIWA Chain", "dApp 정책"],
      nodeTitles: [
        "증명 요청",
        "앱 또는 지갑 흐름 실행",
        "ZK 증명 생성",
        "검증기 컨트랙트",
        "접근 허용",
      ],
      nodeBodies: [
        "dApp은 @zkproofport/giwa SDK를 통해 KYC 여부 또는 잔고 조건 증명을 요청합니다.",
        "현재는 QR 또는 deep link로 ZKProofport 앱을 실행하고, 이후 같은 요청을 GIWA Wallet-native 승인 흐름으로 확장할 수 있습니다.",
        "지금은 모바일 앱에서 증명을 생성하고, 같은 모델을 이후 wallet-native로 옮길 수 있습니다.",
        "GIWA에 배포된 검증기 컨트랙트가 증명의 유효성을 확인합니다.",
        "dApp은 접근 권한, 1인 1회 참여, 임계값 조건 등을 적용합니다.",
      ],
      integrationTitle: "dApp 통합 방식",
      integrationBody:
        "dApp은 SDK로 증명을 요청하고, 받은 증명을 GIWA 검증기 컨트랙트로 확인하면 됩니다. 빌더가 서킷별 검증 코드를 직접 작성하지 않아도 되는 구조를 목표로 합니다.",
      agentTitle: "두 가지 연동 방식",
      agentBody:
        "<b>즉시 가능한 방식:</b> dApp -> SDK -> QR/deep link로 ZKProofport 앱 실행 -> proof 생성 -> GIWA verifier 검증<br><b>네이티브 방식:</b> dApp -> GIWA Wallet 증명 요청 -> 지갑 안에서 승인/증명 생성 -> GIWA verifier 검증",
      privacyTitle: "프라이버시 경계",
      boundaryLabels: ["보호되는 정보", "공유되는 것", "중요한 통합 원칙"],
      boundaryBodies: [
        "원본 지갑 주소, attestation 원본 데이터, 정확한 잔고, 이메일, 신원 그래프",
        "증명, 목적, nullifier, 검증 결과, 필요 시 발행자 ID",
        "숨기려는 주소가 트랜잭션 sender가 되면 안 됩니다. relayer, session account, off-chain session 같은 패턴을 통합 가이드에 포함해야 합니다.",
      ],
    },
    roadmap: {
      eyebrow: "GASOK 실행 계획",
      title: "지금 실행 가능한 흐름에서 wallet-native UX로 단계적으로 확장합니다.",
      times: ["5월", "6-7월", "8-9월", "10월"],
      titles: ["리서치 및 설계 PoC", "앱 기반 증명 플로우", "테스트 및 문서화", "KBW Demo Day"],
      bodies: [
        "Dojang 스키마 분석, 서킷 설계, 검증기 아키텍처 설계, 테스트넷에서 PoC 구현.",
        "ZKProofport 앱 + SDK 기반 엔드투엔드 증명 플로우를 GIWA Sepolia에서 구현. 지갑 팀 협업이 가능하면 인앱 통합 시작.",
        "사용자 테스트, 예외 케이스 검증, 개발자 문서화, GIWA 빌더용 통합 가이드 작성.",
        "Korea Blockchain Week에서 라이브 데모: 앱 기반 증명, 지갑 네이티브 경로, 주소 공개 없이 KYC와 잔액 증명.",
      ],
    },
    team: {
      eyebrow: "팀",
      title: "풀스택 개발 경험을 보유한 소수 정예 기술 팀입니다.",
      roles: ["공동창업자", "공동창업자"],
      names: ["현수영", "현제혁"],
      bodies: [
        "경력\n- Ethereum Remix IDE 개발자\n- DSRV Team Leader\n- Aztec Genesis Sequencer\n- Inha University",
        "경력\n- NHN Cloud 분산 스토리지 팀장\n- Tmax Soft 엔지니어\n- KAIST",
      ],
      closeTitle: "GASOK에 참가하는 이유",
      closeBody:
        "우리의 비전은 ZKProofport가 GIWA 사용자들에게 Dojang의 활용도와 안전성을 높여주고, dApp 빌더들이 손쉽게 연동할 수 있는 프라이버시 레이어로 자리 잡는 것입니다. GIWA가 원화 스테이블코인이나 RWA 같은 규제 영역으로 확장될수록, 개인정보 노출 없이 규정 준수를 증명할 수 있는 능력이 필수적입니다. GASOK을 통해 기술적 얼라인먼트와 생태계의 피드백을 얻어, 이를 GIWA 네이티브 프로덕트로 발전시키고자 합니다.",
    },
    appendixTech: {
      eyebrow: "부록 A \u2014 기술 아키텍처",
      title: "Dojang attestation에서 온체인 검증까지: 전체 증명 파이프라인.",
      stageLabels: ["Dojang / EAS", "모바일 앱", "Noir 서킷", "검증기 컨트랙트"],
      stageTitles: ["Attestation 소스", "디바이스 증명", "ZK 증명 생성", "온체인 검증"],
      stageBodies: [
        "KYC attestation TX가 EAS를 통해 온체인에 기록",
        "mopro Rust 엔진 (UniFFI 바인딩)",
        "UltraHonk 증명 시스템 (Aztec/Noir)",
        "Solidity 검증기: verify(proof, publicInputs)",
      ],
      cardLabels: ["CIRCUIT", "PROVING", "VERIFY"],
      cardTitles: ["Noir ZK 서킷", "mopro 모바일 증명", "온체인 검증기"],
      cardItems: [
        "사용자 소유권: ECDSA 서명 검증",
        "TX 진본성: attestation 트랜잭션 파싱",
        "서명자 검증: 인가된 목록 대조 Merkle proof",
        "시빌 저항: 결정적 nullifier 생성",
        "iOS/Android용 Rust 기반 프로버",
        "UltraHonk 증명 시스템 (Low Memory 모드)",
        "3\u201310초 디바이스 증명 생성",
        "서킷 파일 런타임 다운로드 및 캐싱",
        "Noir 서킷에서 자동 생성된 Solidity 코드",
        "verify(bytes proof, bytes32[] publicInputs) \u2192 bool",
        "View 함수 호출 \u2014 검증에 가스 비용 없음",
        "Giwa Network에 배포",
      ],
      privateTitle: "Private inputs (비공개)",
      privateItems: ["지갑 주소", "attestation TX", "사용자 서명", "서명자 공개키"],
      publicTitle: "Public inputs (검증기에 공유)",
      publicItems: ["signal_hash", "signer merkle root", "scope", "nullifier"],
    },
    demo: {
      eyebrow: "부록 B \u2014 라이브 데모",
      title: "실제 테스트넷 환경에서 주소 공개 없이 KYC를 증명합니다.",
      setupTitle: "데모 환경",
      setupItems: [
        "EAS 컨트랙트를 테스트넷에 배포",
        "KYC 인증된 주소를 실제 attestation으로 등록",
        "ZKProofport 모바일 앱에서 증명 생성",
        "GIWA 검증기 컨트랙트로 온체인 검증",
      ],
      flowTitle: "데모에서 보여주는 것",
      flowSteps: [
        "KYC 인증된 Dojang 주소를 가진 사용자가 샘플 dApp을 실행합니다",
        "dApp이 @zkproofport/giwa SDK를 통해 KYC 증명을 요청합니다",
        "사용자가 모바일 기기에서 영지식 증명을 생성합니다",
        "지갑 주소를 공개하지 않고 온체인에서 증명이 검증됩니다",
      ],
      videoLabel: "데모 영상이 여기에 표시됩니다",
      note: "이 데모는 메인넷과 동일한 조건의 테스트넷 환경에서 실행됩니다: 실제 EAS attestation, 실제 증명 생성, 실제 온체인 검증.",
    },
  },
};

const bindings = [
  { selector: ".rail-brand span", key: "brandSub" },
  { selector: ".mobile-jump span", key: "jumpLabel" },
  { selector: ".cover .eyebrow", key: "cover.eyebrow" },
  { selector: ".cover h1", key: "cover.title" },
  { selector: ".cover .lede", key: "cover.lede" },
  { selector: ".cover-tags span", key: "cover.tags", all: true },
  { selector: ".passport-top span", key: "cover.passportPrivate" },
  { selector: ".passport-top strong", key: "cover.passportTitle" },
  { selector: ".passport-stamp span", key: "cover.stampTop" },
  { selector: ".passport-stamp b", key: "cover.stampBottom" },
  { selector: ".passport-bottom span", key: "cover.bottom", all: true },
  { selector: ".problem .problem-note", key: "problem.note", html: true },
  { selector: ".problem .eyebrow", key: "problem.eyebrow" },
  { selector: ".problem h2", key: "problem.title" },
  { selector: ".comparison-card > span", key: "problem.labels", all: true },
  { selector: ".comparison-card h3", key: "problem.titles", all: true },
  { selector: ".comparison-card p", key: "problem.bodies", all: true },
  { selector: ".solution .eyebrow", key: "solution.eyebrow" },
  { selector: ".solution h2", key: "solution.title" },
  { selector: ".pipe-node small", key: "solution.smalls", all: true },
  { selector: ".pipe-node strong", key: "solution.names", all: true },
  { selector: ".pipe-node > span", key: "solution.bodies", all: true },
  { selector: ".embedded-layer b", key: "solution.layerTitle" },
  { selector: ".embedded-layer p", key: "solution.layerBody" },
  { selector: ".claim-strip b", key: "solution.claimTitles", all: true },
  { selector: ".claim-strip p", key: "solution.claimBodies", all: true },
  { selector: ".wallet .eyebrow", key: "wallet.eyebrow" },
  { selector: ".wallet h2", key: "wallet.title" },
  { selector: ".path-badge", key: "wallet.pathBadges", all: true },
  { selector: ".path-card h3", key: "wallet.pathTitles", all: true },
  { selector: ".path-desc", key: "wallet.pathDescs", all: true },
  { selector: ".path-flow li", key: "wallet.pathSteps", all: true },
  { selector: ".disc-shared b", key: "wallet.sharedTitle" },
  { selector: ".disc-shared span", key: "wallet.sharedItems", all: true },
  { selector: ".disc-private b", key: "wallet.privateTitle" },
  { selector: ".disc-private span", key: "wallet.privateItems", all: true },
  { selector: ".build .eyebrow", key: "build.eyebrow" },
  { selector: ".build h2", key: "build.title" },
  { selector: ".build .build-priority", key: "build.note" },
  { selector: ".deliverables .deliverable-code", key: "build.codes", all: true },
  { selector: ".deliverables h3", key: "build.titles", all: true },
  { selector: ".deliverables p", key: "build.bodies", all: true },
  { selector: ".credentials .eyebrow", key: "credentials.eyebrow" },
  { selector: ".credentials h2", key: "credentials.title" },
  { selector: ".balance-hero article > span", key: "credentials.heroLabels", all: true },
  { selector: ".balance-hero h3", key: "credentials.heroTitles", all: true },
  { selector: ".balance-hero p", key: "credentials.heroBodies", all: true },
  { selector: ".credential-table .table-row span", key: "credentials.table", all: true },
  { selector: ".credentials .bottom-note", key: "credentials.note" },
  { selector: ".traction .eyebrow", key: "traction.eyebrow" },
  { selector: ".traction h2", key: "traction.title" },
  { selector: ".evidence-grid span", key: "traction.labels", all: true },
  { selector: ".evidence-grid h3", key: "traction.titles", all: true },
  { selector: ".evidence-grid p", key: "traction.bodies", all: true },
  { selector: ".proof-ledger span", key: "traction.ledger", all: true },
  { selector: ".architecture .eyebrow", key: "architecture.eyebrow" },
  { selector: ".architecture h2", key: "architecture.title" },
  { selector: ".arch-node small", key: "architecture.nodeLabels", all: true },
  { selector: ".arch-node h3", key: "architecture.nodeTitles", all: true },
  { selector: ".arch-node p", key: "architecture.nodeBodies", all: true },
  { selector: ".sdk-callout b", key: "architecture.integrationTitle" },
  { selector: ".sdk-callout p", key: "architecture.integrationBody" },
  { selector: ".agent-callout b", key: "architecture.agentTitle" },
  { selector: ".agent-callout p", key: "architecture.agentBody", html: true },
  { selector: ".privacy-box h3", key: "architecture.privacyTitle" },
  { selector: ".boundary-row span", key: "architecture.boundaryLabels", all: true },
  { selector: ".boundary-row p", key: "architecture.boundaryBodies", all: true },
  { selector: ".roadmap .eyebrow", key: "roadmap.eyebrow" },
  { selector: ".roadmap h2", key: "roadmap.title" },
  { selector: ".timeline time", key: "roadmap.times", all: true },
  { selector: ".timeline h3", key: "roadmap.titles", all: true },
  { selector: ".timeline p", key: "roadmap.bodies", all: true },
  { selector: ".team .eyebrow", key: "team.eyebrow" },
  { selector: ".team h2", key: "team.title" },
  { selector: ".person span", key: "team.roles", all: true },
  { selector: ".person h3", key: "team.names", all: true },
  { selector: ".person p", key: "team.bodies", all: true },
  { selector: ".team-close b", key: "team.closeTitle" },
  { selector: ".team-close p", key: "team.closeBody" },
  { selector: ".appendix-tech .eyebrow", key: "appendixTech.eyebrow" },
  { selector: ".appendix-tech h2", key: "appendixTech.title" },
  { selector: ".tech-stage small", key: "appendixTech.stageLabels", all: true },
  { selector: ".tech-stage strong", key: "appendixTech.stageTitles", all: true },
  { selector: ".tech-stage > span", key: "appendixTech.stageBodies", all: true },
  { selector: ".tech-card > span", key: "appendixTech.cardLabels", all: true },
  { selector: ".tech-card h3", key: "appendixTech.cardTitles", all: true },
  { selector: ".tech-card li", key: "appendixTech.cardItems", all: true },
  { selector: ".tech-private b", key: "appendixTech.privateTitle" },
  { selector: ".tech-private span", key: "appendixTech.privateItems", all: true },
  { selector: ".tech-public b", key: "appendixTech.publicTitle" },
  { selector: ".tech-public span", key: "appendixTech.publicItems", all: true },
  { selector: ".demo .eyebrow", key: "demo.eyebrow" },
  { selector: ".demo h2", key: "demo.title" },
  { selector: ".demo-setup b", key: "demo.setupTitle" },
  { selector: ".demo-setup li", key: "demo.setupItems", all: true },
  { selector: ".demo-flow b", key: "demo.flowTitle" },
  { selector: ".demo-flow li", key: "demo.flowSteps", all: true },
  { selector: ".demo-video-label", key: "demo.videoLabel" },
  { selector: ".demo .problem-note", key: "demo.note" },
];

let index = 0;
let language = getInitialLanguage();
let touchStartX = 0;
let touchStartY = 0;

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem("gasok-deck-language");
    if (saved === "en" || saved === "ko") return saved;
  } catch {
    // Local files can be opened in contexts where storage is unavailable.
  }

  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function readCopy(path) {
  return path.split(".").reduce((value, segment) => value?.[segment], copy[language]);
}

function setNodeValue(node, value, useHtml) {
  if (!node || value === undefined) return;
  if (useHtml) {
    node.innerHTML = value;
    return;
  }
  node.textContent = value;
}

function applyBindings() {
  bindings.forEach((binding) => {
    const value = readCopy(binding.key);
    const nodes = binding.all
      ? Array.from(document.querySelectorAll(binding.selector))
      : [document.querySelector(binding.selector)];

    nodes.forEach((node, nodeIndex) => {
      const nodeValue = Array.isArray(value) ? value[nodeIndex] : value;
      setNodeValue(node, nodeValue, binding.html);
    });
  });
}

function buildNavigation() {
  totalSlides.textContent = padNumber(slides.length);

  slides.forEach((slide, slideIndex) => {
    const button = document.createElement("button");
    const number = document.createElement("span");
    const title = document.createElement("strong");

    button.type = "button";
    button.className = "slide-tab";
    button.dataset.index = String(slideIndex);
    number.textContent = padNumber(slideIndex + 1);
    title.textContent = slide.dataset.title;
    button.append(number, title);
    button.addEventListener("click", () => showSlide(slideIndex, true));
    nav.appendChild(button);

    const option = document.createElement("option");
    option.value = String(slideIndex);
    option.textContent = `${padNumber(slideIndex + 1)}. ${slide.dataset.title}`;
    mobileSlideSelect.appendChild(option);
  });
}

function updateNavigationLabels() {
  const labels = copy[language].nav;
  Array.from(nav.children).forEach((button, slideIndex) => {
    const label = labels[slideIndex] ?? slides[slideIndex].dataset.title;
    button.querySelector("strong").textContent = label;
  });
  Array.from(mobileSlideSelect.options).forEach((option, slideIndex) => {
    const label = labels[slideIndex] ?? slides[slideIndex].dataset.title;
    option.textContent = `${padNumber(slideIndex + 1)}. ${label}`;
  });
}

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.title = copy[language].meta.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", copy[language].meta.description);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  prevBtn.setAttribute("aria-label", copy[language].controls.prev);
  nextBtn.setAttribute("aria-label", copy[language].controls.next);
  mobileSlideSelect.setAttribute("aria-label", copy[language].jumpLabel);
  applyBindings();
  updateNavigationLabels();

  try {
    localStorage.setItem("gasok-deck-language", language);
  } catch {
    // Non-critical persistence.
  }
}

function showSlide(nextIndex, shouldUpdateHash = false) {
  index = Math.max(0, Math.min(slides.length - 1, nextIndex));

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
    slide.setAttribute("aria-hidden", slideIndex === index ? "false" : "true");
    if (slideIndex === index) {
      slide.scrollTop = 0;
    }
  });

  Array.from(nav.children).forEach((button, slideIndex) => {
    button.classList.toggle("active", slideIndex === index);
    button.setAttribute("aria-current", slideIndex === index ? "true" : "false");
  });

  currentSlide.textContent = padNumber(index + 1);
  mobileSlideSelect.value = String(index);
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === slides.length - 1;
  shell.dataset.slideIndex = String(index);

  if (shouldUpdateHash) {
    const hash = `slide-${index + 1}`;
    history.replaceState(null, "", `#${hash}`);
  }
}

function step(delta) {
  showSlide(index + delta, true);
}

function readHash() {
  const match = window.location.hash.match(/slide-(\d+)/);
  if (!match) return 0;
  return Number(match[1]) - 1;
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

mobileSlideSelect.addEventListener("change", () => {
  showSlide(Number(mobileSlideSelect.value), true);
});

prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") {
    return;
  }

  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    step(1);
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    step(-1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    showSlide(0, true);
  }

  if (event.key === "End") {
    event.preventDefault();
    showSlide(slides.length - 1, true);
  }
});

stage.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  },
  { passive: true },
);

stage.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      step(dx < 0 ? 1 : -1);
    }
  },
  { passive: true },
);

buildNavigation();
applyLanguage(language);
showSlide(readHash(), false);
