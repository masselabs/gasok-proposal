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
        "We will ship a focused end-to-end pipeline first: privacy-preserving KYC proof, GIWA verifier, SDK request, and a showcase dApp. Balance threshold proof follows the same model as the next expansion.",
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
        "Working EAS-based KYC proof path",
        "Mobile client-side proof generation",
        "Circuit capability recognized by Aztec",
        "Automation-ready proof model",
      ],
      bodies: [
        "Building on our experience with Ethereum Attestation Service (EAS) and circuit implementation, our KYC attestation proof already works end-to-end across proof generation and verifier contract flow.",
        "We have hands-on experience with mobile client-side proving through mopro and React Native runtime integration.",
        "Our circuit implementation capability has been recognized through an Aztec / Noir grant.",
        "AI agents can use the same credential proof request and verifier contract model.",
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
      contractsTitle: "Deployed & verified contracts on GIWA Sepolia",
      contractLabels: ["EAS", "Verifier"],
      contractDescs: ["Ethereum Attestation Service", "On-chain proof verifier"],
      note: "This demo runs on a testnet environment that mirrors mainnet conditions: real EAS attestations, real proof generation, and real on-chain verification.",
    },
  },
  ko: {
    meta: {
      title: "ZKProofport - GIWA를 위한 Private Dojang Pass",
      description: "ZKProofport의 Private Dojang Pass GASOK 프로그램 지원을 위한 피치덱입니다.",
    },
    brandSub: "",
    jumpLabel: "슬라이드 선택",
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
      prev: "이전 슬라이드",
      next: "다음 슬라이드",
    },
    cover: {
      eyebrow: "GASOK / GIWA Acceleration Application",
      title: "Private Dojang Pass",
      lede:
        "Dojang의 신뢰는 그대로 유지하되, 신원 노출은 완벽히 차단합니다. GIWA Wallet에 네이티브로 내장되는 영지식 증명(ZK) 솔루션.",
      tags: ["Dojang", "GIWA Wallet", "Wallet Privacy", "ZK Proofs"],
      passportPrivate: "PRIVATE",
      passportTitle: "Dojang",
      stampTop: "Verified Address",
      stampBottom: "Proof, not exposure",
      bottom: ["Issuer: Upbit Korea", "Verifier: GIWA dApps"],
    },
    problem: {
      eyebrow: "Problem",
      title: "Dojang은 유용한 신뢰 데이터를 제공하지만, dApp이 이를 직접 조회하면 지갑의 세부 정보가 그대로 드러날 수 있어 프라이버시 보호 장치가 필요합니다.",
      labels: ["Before", "After"],
      titles: [
        "지갑 주소 직접 조회 (기존 방식)",
        "프라이버시 보존형 증명 검증 (개선 방식)",
      ],
      bodies: [
        "dApp이 Dojang을 통해 지갑 주소를 직접 대조합니다. 이 과정에서 사용자의 KYC 상태, 자산 잔고, 앱 내 활동 기록이 퍼블릭 지갑 그래프 상에 그대로 노출되고 연결됩니다.",
        "dApp은 사용자가 특정 조건(KYC 여부 등)을 충족했다는 '증명(Proof)'만 검증합니다. 원본 지갑 주소, 정확한 잔고, 개인 신원 정보는 사용자 기기 외부에 절대 노출되지 않습니다.",
      ],
      note:
        "<b>왜 중요한가:</b> Dojang이 DeFi, RWA, 퀘스트, 인증 커뮤니티 등 Web3 생태계 전반에서 유용해질수록, 필요한 정보만 골라 공개하는 <b>선택적 공개(Selective Disclosure)</b> 인프라가 반드시 필요합니다.",
    },
    solution: {
      eyebrow: "Solution",
      title: "Dojang 증명을 프라이버시 친화적으로 구현하고, 궁극적으로 GIWA Wallet에 네이티브하게 내장되는 UX를 제공합니다.",
      smalls: ["신뢰 원천 및 발급처", "사용자 증명 환경(UX)", "dApp 연동 파이프라인"],
      names: ["Upbit / Dojang", "ZKProofport 앱 or GIWA Wallet", "GIWA dApps"],
      bodies: ["Verified Address 및 Verified Balance 자격 증명(Attestation)", "모바일 기기 내 증명 생성, 승인 UX, 선택적 정보 공개", "SDK 요청 및 GIWA 검증기(Verifier) 컨트랙트를 통한 검증"],
      layerTitle: "단계적 통합 경로 (Progressive Integration)",
      layerBody:
        "Private Dojang Pass는 ZKProofport 모바일 앱과 @zkproofport/giwa SDK를 통해 동작 가능합니다. 향후 이와 동일한 증명 요청 및 생성, 검증 모델을 GIWA Wallet 내부에 직접 임베딩하여 가장 매끄러운 유저 경험을 완성할 계획입니다.",
      claimTitles: ["dApp이 확인하는 항목", "dApp이 알 수 없는 정보 (데이터 관리 부담 제로)", "통합 경로"],
      claimBodies: [
        "KYC 통과 여부, 잔고 임계값 충족 여부, 검증 결과",
        "원본 지갑 주소, 정확한 잔고 액수, 자격 증명 원본 데이터, 개인 식별 정보 (dApp의 데이터 유출 책임 및 보관 부담을 근본적으로 제거)",
        "현재 ZKProofport 앱 및 SDK 구성으로 작동하며, 향후 GIWA Wallet 네이티브 흐름으로 확장됩니다.",
      ],
    },
    wallet: {
      eyebrow: "Integration paths",
      title: "dApp이 ZKProofport를 통해 Dojang 증명을 요청하는 두 가지 연동 방식",
      pathBadges: ["즉시 도입 가능", "지갑 팀 협업 시"],
      pathTitles: ["ZKProofport 앱 연동", "GIWA Wallet 네이티브 내장"],
      pathDescs: [
        "dApp이 SDK를 통해 ZKProofport 모바일 앱을 호출하여 증명을 생성합니다.",
        "증명 요청 및 승인 팝업이 GIWA Wallet 내부에서 원스톱으로 처리됩니다.",
      ],
      pathSteps: [
        "dApp이 @zkproofport/giwa SDK로 증명 요청",
        "QR 코드 또는 딥링크를 통해 ZKProofport 앱 실행",
        "사용자가 모바일 기기 자체(On-device)에서 증명 생성 및 승인",
        "GIWA 검증기 컨트랙트를 통한 온체인 증명 검증",
        "dApp이 @zkproofport/giwa SDK로 증명 요청",
        "GIWA Wallet 내에서 증명 요청 팝업 표시",
        "사용자가 지갑 내부에서 즉시 승인 및 증명 생성",
        "GIWA 검증기 컨트랙트를 통한 온체인 증명 검증",
      ],
      sharedTitle: "dApp에 공유되는 항목",
      sharedItems: ["KYC: 인증 완료", "잔고: 기준 조건 충족", "Nullifier: 스코프 지정 완료"],
      privateTitle: "안전하게 보호되는 정보",
      privateItems: ["지갑 주소", "정확한 잔고 수량", "개인 식별 신원"],
    },
    build: {
      eyebrow: "Build scope",
      title: "GASOK 프로그램 기간 중 구축할 개발 범위",
      note:
        "우리는 먼저 핵심적인 엔드투엔드(End-to-End) 파이프라인을 신속하게 구현하는 데 집중합니다: 프라이버시가 보장되는 KYC 증명, GIWA 검증기 컨트랙트, SDK 요청 플로우, 그리고 이를 검증할 쇼케이스 dApp을 우선 출시하고, 잔고 기준 증명은 동일한 모델 기반의 다음 확장 스텝으로 진행합니다.",
      codes: ["CIRCUIT", "CONTRACT", "SDK", "WALLET", "MOBILE", "dApp"],
      titles: [
        "Dojang 증명 서킷 (Circuits)",
        "GIWA 검증기 컨트랙트 (Verifier)",
        "@zkproofport/giwa SDK",
        "지갑 호환형 증명 요청 플로우",
        "mopro 기반 모바일 증명 생성",
        "쇼케이스 dApp",
      ],
      bodies: [
        "프라이버시 보존형 KYC 증명 경로를 우선 구축한 뒤, 동일한 아키텍처를 확장하여 잔고 임계값 증명을 추가합니다.",
        "dApp 단에서 온체인 증명 검증이 가능하도록 GIWA Sepolia 테스트넷에 검증기 컨트랙트를 배포합니다.",
        "dApp 빌더들이 영지식 증명 전용 코드를 직접 작성하지 않고도 손쉽게 증명을 요청하고 검증할 수 있는 환경을 제공합니다.",
        "현재 ZKProofport 모바일 앱으로 즉시 구동 가능하며, 향후 GIWA Wallet 네이티브 경험으로 확장하기 용이한 증명 생성 요청 표준을 정립합니다.",
        "민감한 Dojang 데이터를 외부 서버나 dApp에 전송하지 않고, 모바일 클라이언트 자체에서 3~10초 내로 영지식 증명을 생성(On-device proving)하도록 구현합니다.",
        "테스트넷 환경에서 프라이버시가 보호되는 '인증 사용자 접근 제어'와 '잔고 조건 충족 여부'를 실제로 시연하는 샘플 dApp을 구축합니다.",
      ],
    },
    credentials: {
      eyebrow: "Dojang proof types",
      title: "Dojang의 신뢰 가치를 지키면서 프라이버시를 보호하는 두 가지 증명 유형",
      heroLabels: ["Verified Address", "Verified Balance"],
      heroTitles: ["프라이버시 보존형 KYC 증명", "프라이버시 보존형 자산 임계값 증명"],
      heroBodies: [
        "신뢰할 수 있는 Dojang 자격 증명을 기반으로 사용자의 KYC 상태를 증명하되, 원본 지갑 주소나 온체인 신원 그래프는 일절 노출하지 않습니다.",
        "사용자가 dApp이 요구하는 특정 자산 기준을 충족했는지 여부만 증명하며, 정확한 보유 잔고나 과거 거래 이력은 완벽히 은폐합니다.",
      ],
      table: [
        "증명 유형",
        "dApp이 획득하는 데이터",
        "철저히 비공개되는 정보",
        "Verified Address / KYC",
        "사용자가 인가된 Dojang 발급처로부터 인증을 완료했음",
        "원본 지갑 주소, 온체인 신원 그래프, 원본 Attestation 데이터",
        "Verified Balance",
        "사용자가 dApp의 참여 조건이나 특정 자산 임계값을 충족했음",
        "정확한 잔고 액수, 자산 트랜잭션 이력, 원본 지갑 주소",
        "Shared primitive (공통 구조)",
        "조건 충족 결과, 타깃 스코프, 일회용 식별자(Nullifier), 검증 성공 여부",
        "개인식별정보(PII) 및 여러 dApp 간 사용자를 추적·프로파일링할 수 있는 연결 고리",
      ],
    },
    traction: {
      eyebrow: "Existing proof",
      title: "우리는 제로 베이스에서 시작하지 않습니다. 이미 검증된 ZK 인프라를 GIWA 생태계에 최적화합니다.",
      labels: ["EAS / KYC 증명 PoC", "mopro 모바일 증명", "Aztec / Noir 그랜트", "에이전트 확장성"],
      titles: [
        "작동 가능한 EAS 기반 KYC 증명 경로",
        "모바일 클라이언트 사이드 증명 기술",
        "Aztec 팀을 통해 검증된 서킷 구현 역량",
        "AI 에이전트 대응 증명 모델",
      ],
      bodies: [
        "Ethereum Attestation Service(EAS) 기반 시스템과 서킷 구현에 대한 깊은 노하우를 보유하고 있습니다. 당사의 KYC Attestation 증명 기술은 이미 증명 생성부터 검증 컨트랙트 연동까지 엔드투엔드로 정상 작동하고 있습니다.",
        "mopro 및 React Native 런타임 통합을 통해 사용자 모바일 기기에서 영지식 증명을 뽑아내는 클라이언트 사이드 증명 기술력을 확보하고 있습니다.",
        "글로벌 탑티어 ZK 프로젝트인 Aztec / Noir 팀으로부터 그랜트(Grant)를 수여받아 당사의 서킷 설계 능력을 공식 인정받았습니다.",
        "인간 사용자뿐만 아니라 AI 에이전트 환경에서도 동일한 자격 증명 요청 및 온체인 검증기 컨트랙트 모델을 그대로 적용할 수 있도록 설계되었습니다.",
      ],
      ledger: ["Aztec / Noir 그랜트 수여", "EAS 기반 Attestation 시스템 아키텍처 노하우", "mopro 기반 모바일 온디바이스 증명 역량"],
    },
    architecture: {
      eyebrow: "Reference architecture",
      title: "dApp은 SDK로 증명을 요청하고, 온체인 배포된 GIWA 검증기 컨트랙트가 유효성을 검증합니다.",
      nodeLabels: ["dApp + SDK", "증명 접점(UX)", "ZK 증명 생성", "GIWA Chain", "dApp 정책 적용"],
      nodeTitles: [
        "증명 요청",
        "앱 호출 또는 지갑 플로우 실행",
        "영지식 증명 생성",
        "검증기 컨트랙트",
        "접근 권한 부여",
      ],
      nodeBodies: [
        "dApp이 @zkproofport/giwa SDK를 사용하여 사용자의 KYC 여부나 잔고 조건 충족 증명을 호출합니다.",
        "현재는 QR 코드나 딥링크를 통해 ZKProofport 앱을 실행하지만, 향후 동일한 요청 구조가 GIWA Wallet 네이티브 승인 UI로 확장될 수 있습니다.",
        "현재는 외부 모바일 앱이 프로버(Prover) 역할을 수행하며, 장기적으로 지갑 내부(In-wallet)로 고스란히 이식될 수 있는 구조입니다.",
        "GIWA 네트워크에 배포된 Solidity 검증기 컨트랙트가 온체인 상에서 증명의 수학적 유효성을 최종 체크합니다.",
        "dApp은 검증 결과를 바탕으로 접근 권한 제어, 1인 1회 참여 제한(Sybil 저항), 임계값 기반 VIP 통과 등의 정책을 즉각 반영합니다.",
      ],
      integrationTitle: "dApp 연동 프로세스",
      integrationBody:
        "dApp 빌더는 SDK를 통해 증명을 요청하고, 리턴된 값을 GIWA 검증기 컨트랙트로 전달해 확인하기만 하면 됩니다. 서킷 지식이 없는 일반 Web3 빌더도 복잡한 수학적 검증 코드 없이 프라이버시 기능을 도입할 수 있습니다.",
      agentTitle: "두 가지 연동 아키텍처",
      agentBody:
        "<b>즉시 도입 가능한 경로 (Available):</b> dApp -> SDK -> QR/딥링크 호출 -> ZKProofport 모바일 앱에서 증명 생성 -> GIWA 검증기 컨트랙트<br><b>지갑 네이티브 가상 경로 (Native):</b> dApp -> GIWA Wallet 증명 팝업 -> 지갑 내장 엔진을 통한 온디바이스 증명 및 승인 -> GIWA 검증기 컨트랙트",
      privacyTitle: "프라이버시 경계선 (Privacy Boundary)",
      boundaryLabels: ["완벽히 은폐되는 정보", "온체인 공유 항목", "중요 연동 원칙"],
      boundaryBodies: [
        "원본 지갑 주소, Attestation 원본 데이터, 정확한 잔고 액수, 이메일 등 개인식별정보(PII) 및 신원 그래프",
        "생성된 영지식 증명(Proof), 특정 목적(Scope), 일회용 식별자(Nullifier), 검증기 리턴값, 필요 시 발급처 ID",
        "익명성을 보장받으려는 타깃 지갑 주소가 해당 가스비를 지불하는 트랜잭션 전송자(Sender) 주소와 일치해서는 안 됩니다. 릴레이어(Relayer), 세션 어카운트, 또는 오프체인 세션 검증 패턴이 연동 가이드에 함께 제공되어야 합니다.",
      ],
    },
    roadmap: {
      eyebrow: "GASOK execution plan",
      title: "당장 실행 가능한 플로우에서 출발하여 단계적으로 지갑 네이티브 UX로 나아가는 로드맵",
      times: ["5월", "6월 - 7월", "8월 - 9월", "10월"],
      titles: ["리서치 및 PoC 설계", "앱 기반 증명 흐름 완성", "안정성 테스트 및 문서화", "KBW 데모데이 시연"],
      bodies: [
        "Dojang 데이터 스키마 분석, 영지식 서킷 설계, 검증기 아키텍처 조율 및 테스트넷 상에서의 PoC(개념 증명) 구현 완료.",
        "ZKProofport 모바일 앱 및 SDK를 조합한 엔드투엔드 증명 파이프라인을 GIWA Sepolia 테스트넷에 완전히 구현. 지갑 팀과의 기술 협업 세션 개시 시 즉각 인앱(In-app) 통합 절차 착수.",
        "실제 사용자 대상 밀착 UX 테스트, 예외 처리 및 에지 케이스 예방 코드 고도화, GIWA 빌더들을 위한 상세 개발자 가이드 및 API 문서 구축.",
        "Korea Blockchain Week (KBW) Demo Day 현장에서 라이브 데모 시연: 앱 기반 증명 흐름, 지갑 네이티브 프로토타입 제시, 주소 노출 없는 KYC 및 잔고 증명 쇼케이스.",
      ],
    },
    team: {
      eyebrow: "Team",
      title: "영지식 증명 서킷부터 프론트엔드, 코어 인프라까지 풀스택 개발 역량을 갖춘 소수 정예 팀",
      roles: ["Co-founder", "Co-founder"],
      names: ["현수영", "현제혁"],
      bodies: [
        "주요 이력\n- Ethereum Remix IDE 개발자\n- DSRV Team Leader\n- Aztec Genesis Sequencer\n- Inha University",
        "주요 이력\n- NHN Cloud 분산 스토리지 팀장\n- Tmax Soft 엔지니어\n- KAIST",
      ],
      closeTitle: "우리가 GASOK 프로그램을 통해 이루고자 하는 것",
      closeBody:
        "우리의 비전은 ZKProofport를 GIWA 생태계의 핵심 프라이버시 레이어로 안착시키는 것입니다. 특히 GIWA 생태계가 원화 스테이블코인, RWA(실물자산) 등 강력한 규제 준수가 요구되는 영역으로 확장될수록, dApp 빌더들에게는 '사용자의 민감 정보를 직접 수집·보관하지 않음으로써 데이터 유출 법적 책임(Data Liability)을 원천 차단하면서도 규제 요건을 확실히 증명하는 인프라'가 필수재가 될 것입니다. GASOK 프로그램을 통해 생태계 빌더들과의 밀접한 피드백을 주고받으며, 본 솔루션을 GIWA 생태계의 강력한 네이티브 인프라 프로덕트로 빌드업하고자 합니다.",
    },
    appendixTech: {
      eyebrow: "Appendix A \u2014 Technical Architecture",
      title: "Dojang Attestation 발급부터 온체인 최종 확인까지의 전체 영지식 파이프라인",
      stageLabels: ["Dojang / EAS", "Mobile App", "Noir Circuit", "Verifier Contract"],
      stageTitles: ["Attestation 발급 원천", "디바이스 내 증명 생성", "영지식 증명(ZK) 빌드", "온체인 최종 검증"],
      stageBodies: [
        "사용자의 KYC 인증 트랜잭션이 EAS를 통해 온체인에 기록됨",
        "모바일 기기 내 mopro Rust 엔진 구동",
        "Aztec/Noir 기반 차세대 UltraHonk 증명 시스템 활용",
        "Solidity 검증기: verify(proof, publicInputs) 수행",
      ],
      cardLabels: ["CIRCUIT", "PROVING", "VERIFY"],
      cardTitles: ["Noir ZK 서킷 구조", "mopro 모바일 증명 엔진", "온체인 검증기 (Verifier)"],
      cardItems: [
        "사용자 지갑 소유권: ECDSA 디지털 서명 유효성 검증",
        "트랜잭션 진본성: Attestation 데이터 내부 패킷 파싱 및 분석",
        "발급처 신뢰성: 승인된 발급자 목록과 대조하는 Merkle Proof 검증",
        "시빌 공격 방지: 중복 참여를 방어하는 결정론적(Deterministic) Nullifier 생성",
        "iOS 및 Android 환경을 모두 지원하는 Rust 기반 프로버(Prover) 빌드",
        "저사양 모바일 기기를 고려한 Low Memory 모드 기반 UltraHonk 시스템",
        "사용자 기기 내부에서 서버 통신 없이 3~10초 내로 증명 완성",
        "서킷 파일을 런타임에 동적으로 다운로드 및 안전하게 캐싱 처리",
        "Noir 서킷 소스코도로부터 컴파일 타임에 생성하는 퓨어 Solidity 검증기",
        "verify(bytes proof, bytes32[] publicInputs) → bool 아웃풋 반환",
        "Gas-free 검증: 온체인 상태를 변경하지 않는 View 함수 구조로 가스 비용 전무",
        "Giwa Network 상에 스마트 컨트랙트로 배포 및 영구 동작",
      ],
      privateTitle: "Private inputs (외부에 절대 노출되지 않는 비밀 값)",
      privateItems: ["사용자 지갑 주소 (wallet address)", "인증 트랜잭션 원본 (attestation TX)", "기기 단 서명값 (user signature)", "발급처 공개키 (signer pubkey)"],
      publicTitle: "Public inputs (온체인 검증기와 dApp에 공유되는 값)",
      publicItems: ["컨텍스트 해시 (signal_hash)", "머클 루트 (signer merkle root)", "검증 목적 스코프 (scope)", "일회용 식별값 (nullifier)"],
    },
    demo: {
      eyebrow: "Appendix B \u2014 Live Demo",
      title: "실제 테스트넷 환경에서 구현된 주소 노출 없는 KYC 검증 시스템",
      setupTitle: "데모 구동 환경",
      setupItems: [
        "GIWA Sepolia 테스트넷 상에 EAS 스마트 컨트랙트 배포 완료",
        "KYC 인증을 가정한 지갑 주소들을 고유 Attestation 데이터로 등록 완료",
        "ZKProofport 모바일 앱 내부에서 유저 기기 연산만으로 영지식 증명 실시간 생성",
        "GIWA 온체인 검증기 컨트랙트를 통해 생성된 증명의 무결성을 실시간 검증",
      ],
      flowTitle: "데모 핵심 파이프라인",
      flowSteps: [
        "KYC 인증을 완료한 Dojang 패스 보유 사용자가 샘플 dApp에 접속합니다.",
        "dApp이 내장된 @zkproofport/giwa SDK를 호출하여 사용자의 KYC 증명을 요청합니다.",
        "사용자는 자신의 모바일 기기 내부에서 안전하게 영지식 증명을 생성합니다.",
        "지갑 주소나 어떠한 신원 정보도 노출하지 않은 채, 온체인 상에서 해당 사용자가 '인증된 유저'임이 판명됩니다.",
      ],
      contractsTitle: "GIWA Sepolia 테스트넷에 배포 및 익스플로러 검증 완료된 컨트랙트 목록",
      contractLabels: ["EAS", "Verifier"],
      contractDescs: ["Ethereum Attestation Service", "온체인 증명 검증기 컨트랙트"],
      note: "본 라이브 데모는 실제 메인넷 가동 환경과 100% 동일한 테스트넷 조건 하에 구동됩니다 (실제 EAS Attestation 파싱, 실제 기기 연산 증명 생성, 실제 온체인 스마트 컨트랙트 검증).",
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
  { selector: ".deployed-contracts > b", key: "demo.contractsTitle" },
  { selector: ".contract-label", key: "demo.contractLabels", all: true },
  { selector: ".contract-desc", key: "demo.contractDescs", all: true },
  { selector: ".demo-note", key: "demo.note" },
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

  // Update data-label attributes on credential table for mobile display
  const tableHeaders = readCopy("credentials.table");
  if (tableHeaders) {
    const headerLabels = tableHeaders.slice(0, 3);
    document.querySelectorAll(".table-row:not(.table-head) span").forEach((span) => {
      const cellIndex = Array.from(span.parentNode.children).indexOf(span);
      if (cellIndex >= 0 && cellIndex < headerLabels.length) {
        span.dataset.label = headerLabels[cellIndex];
      }
    });
  }
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
