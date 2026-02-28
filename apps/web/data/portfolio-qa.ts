export type SupportedLocale = "en" | "fr";

export type QAEntry = {
  id: string;
  question: string;
  answer: string;
};

export const portfolioQA: Record<SupportedLocale, QAEntry[]> = {
  en: [
    {
      id: "stack-core",
      question: "What stack is used for this portfolio?",
      answer:
        "The web app uses Next.js App Router, TypeScript, Tailwind, and next-intl with locale-aware routes.",
    },
    {
      id: "architecture-summary",
      question: "How is the system architecture organized?",
      answer:
        "Mobile clients hit a Go API layer, which coordinates domain services and integrates with Postgres, FCM, and observability tooling.",
    },
    {
      id: "case-study-focus",
      question: "What is the MoovOn case study about?",
      answer:
        "It details an event discovery system: ingestion normalization, fast facet search, ranking, and operational telemetry decisions.",
    },
    {
      id: "services-offer",
      question: "What services do you offer?",
      answer:
        "Three core offers: MVP Delivery, Infra Architecture, and AI Integration with practical deliverables for production teams.",
    },
    {
      id: "labs-purpose",
      question: "What are the Dev Labs for?",
      answer:
        "Dev Labs hosts practical experiments like API Playground, AI Demo Tool, and Live Metrics previews.",
    },
    {
      id: "i18n-routing",
      question: "How does localization routing work?",
      answer:
        "Routing is locale-aware with explicit switching paths. EN and FR content are loaded from localized message and MDX sources.",
    },
    {
      id: "observability-approach",
      question: "How is observability handled?",
      answer:
        "Request paths are instrumented with metrics, logs, and traces, plus lag/error alerts for ingestion and API reliability.",
    },
  ],
  fr: [
    {
      id: "stack-core",
      question: "Quelle stack est utilisée pour ce portfolio ?",
      answer:
        "L'application web utilise Next.js App Router, TypeScript, Tailwind et next-intl avec un routage localisé.",
    },
    {
      id: "architecture-summary",
      question: "Comment l'architecture système est-elle organisée ?",
      answer:
        "Les clients mobiles passent par une API Go, qui orchestre les services métier et les intégrations Postgres, FCM et observabilité.",
    },
    {
      id: "case-study-focus",
      question: "De quoi parle l'étude de cas MoovOn ?",
      answer:
        "Elle décrit un système de découverte d'événements : normalisation ingestion, recherche à facettes rapide, ranking et télémétrie opérationnelle.",
    },
    {
      id: "services-offer",
      question: "Quels services proposes-tu ?",
      answer:
        "Trois offres principales : Livraison MVP, Architecture Infra et Intégration IA, avec des livrables concrets pour la production.",
    },
    {
      id: "labs-purpose",
      question: "À quoi servent les Dev Labs ?",
      answer:
        "Les Dev Labs regroupent des expérimentations utiles comme API Playground, Outil démo IA et aperçu de métriques live.",
    },
    {
      id: "i18n-routing",
      question: "Comment fonctionne le routage multilingue ?",
      answer:
        "Le routage est localisé avec des chemins explicites pour le changement de langue. Les contenus EN/FR viennent de sources dédiées.",
    },
    {
      id: "observability-approach",
      question: "Comment est gérée l'observabilité ?",
      answer:
        "Les flux sont instrumentés avec métriques, logs et traces, avec alertes sur les erreurs et retards d'ingestion/API.",
    },
  ],
};
