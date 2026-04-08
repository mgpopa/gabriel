    // Mark JS as enabled (so reveal animations only apply when JS actually runs)
    document.documentElement.classList.add('js');

    // reveal on scroll
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)){
      els.forEach(el => el.classList.add('visible'));
    } else {
      const io = new IntersectionObserver((entries)=>{
        for (const e of entries) if (e.isIntersecting) e.target.classList.add('visible');
      }, {threshold: 0.08});
      els.forEach(el => io.observe(el));
    }

    // Always make hero visible immediately
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
    });

    // marquee: finite list, infinite loop with reset
    const marquee = document.querySelector('.marquee');
    const track = document.querySelector('.track');
    let x = 0;
    let speed = 0.4; // px per frame
    let paused = false;

    // drag-to-scroll state
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;

    function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

    if (marquee && track){
      marquee.addEventListener('mouseenter', () => paused = true);
      marquee.addEventListener('mouseleave', () => { if(!dragging) paused = false; });

      marquee.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragging = true;
        paused = true;
        marquee.classList.add('dragging');
        marquee.setPointerCapture?.(e.pointerId);
        dragStartX = e.clientX;
        dragStartOffset = x;
        e.preventDefault();
      });

      marquee.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const end = track.scrollWidth - marquee.clientWidth;
        if (end <= 0) return;
        const dx = e.clientX - dragStartX;
        const next = dragStartOffset + dx;
        x = clamp(next, -end, 0);
        track.style.transform = `translateX(${x}px)`;
        e.preventDefault();
      });

      function stopDrag(e){
        if (!dragging) return;
        dragging = false;
        marquee.classList.remove('dragging');
        const r = marquee.getBoundingClientRect();
        const inside = (e && 'clientX' in e)
          ? (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom)
          : false;
        if (!inside) paused = false;
      }

      marquee.addEventListener('pointerup', stopDrag);
      marquee.addEventListener('pointercancel', stopDrag);
      marquee.addEventListener('pointerleave', (e) => { if (dragging) stopDrag(e); });

      function animate(){
        if(!paused){
          const end = track.scrollWidth - marquee.clientWidth;
          if (end > 0){
            x -= speed;
            if (Math.abs(x) >= end) x = 0;
            track.style.transform = `translateX(${x}px)`;
          } else {
            track.style.transform = `translateX(0px)`;
          }
        }
        requestAnimationFrame(animate);
      }
      animate();
    }

    // --- Language toggle (EN/DE) ---
    const t = {
      en: {
        navAbout: 'About',
        navSkills: 'Skills',
        navProjects: 'Projects',
        navCerts: 'Certifications',
        hdrContact: 'Contact',

        heroEyebrow: 'Data Engineer • Zurich',
        heroTitle: 'Architecting <span class="gradient">production-grade</span><br/>data platforms with clarity &amp; speed.',
        heroLead: 'I design reliable pipelines, data models, and platform components with a focus on automation, observability, and secure delivery.',
        heroBtnProjects: 'View Projects',
        heroBtnSkills: 'See Skills',
        heroBtnCV: 'Download CV (PDF)',

        pills: {
          foundry: 'Palantir Foundry',
          aip: 'Palantir AIP',
          gotham: 'Palantir Gotham',
          azure: 'Microsoft Azure',
          ts: 'TypeScript',
          databricks: 'Databricks',
          pyspark: 'PySpark',
          polars: 'Polars',
          cicd: 'CI/CD',
          dq: 'Data Quality',
          obs: 'Observability',
          sql: 'SQL',
          snowflake: 'Snowflake',
          dbt: 'dbt'
        },

        panelBadge: 'At a glance',
        panelTitle: 'End-to-end product engineering',
        panelLead: 'I operate as an all-rounder across the full product lifecycle - from idea generation and problem discovery to design, prototyping, and production delivery. I\'m a hands-on engineer who translates business intent into robust, scalable systems.',
        panelLi1: 'Identify the true constraint limiting a partner\'s mission',
        panelLi2: 'Decompose complex problems into clear workflows and decisions',
        panelLi3: 'Align business stakeholders around a shared solution direction',
        panelLi4: 'Solve backwards from real user workflows',
        panelLi5: 'Build and ship the software that move the organisation forward',

        aboutEyebrow: 'About',
        aboutTitle: 'Engineering-first, recruiter-friendly',
        aboutBody: 'I am a Senior Data Engineer with over nine years of experience designing and operating reliable, production-grade data platforms. I focus on turning complex, real‑world inputs into trusted datasets and systems that scale. I work at the intersection of engineering and strategy, combining strong technical foundations with a pragmatic business mindset to deliver measurable, high‑impact outcomes.',

        skillsEyebrow: 'Skills',
        skillsTitle: 'What I work with',
        skillsLead: 'Platforms, languages, and engineering practices used in production.',
        s1Title: 'Data Engineering',
        s1Body: 'Programming and query languages used to build data-intensive systems.',
        s2Title: 'Platforms',
        s2Body: 'Enterprise data platforms used for analytics, planning, and decision support.',
        s3Title: 'Engineering Practices',
        s3Body: 'Practices that keep systems reliable, testable, and maintainable in production.',
        s4Title: 'Analytics & Visualisation',
        s4Body: 'Building insights, metrics, and decision-support views on top of data platforms.',

        projectsEyebrow: 'Projects',
        projectsTitle: 'Proof of capability',
        projectsLead: 'Swap these placeholders with your real repos or case studies.',

        p0Title: 'Strategic Workforce Planning (SWP) Platform',
        p0Badge: 'Enterprise',
        p0Body: 'Designed, architected, and implemented a Strategic Workforce Planning platform to align workforce supply with long‑term business strategy through forecasting, skills analysis, scenario modelling, and talent optimisation.',
        p0Li1: 'Partnered with Business Units and Group Functions to capture requirements and define a shared planning model',
        p0Li2: 'Enabled scenario‑based planning and skills gap insights to support strategic talent decisions',
        p0Li3: 'Delivered executive-ready analytics to improve planning consistency and decision speed across the organisation',
        p0Note: 'Proprietary internal platform - no public repository available.',

        pPCPTitle: 'People & Cost Planning Platform',
        pPCPBadge: 'Enterprise',
        pPCPBody: 'Designed and implemented the People & Cost Planning Platform, serving as the single source of truth for group-wide FTE planning and people cost projections.',
        pPCPLi1: 'Acts as the Swiss Re hub for P6 / P9 projections and annual bottom-up FTE cost planning',
        pPCPLi2: 'Implements strict access control and security markings for confidential salary data',
        pPCPLi3: 'Improved accuracy, transparency, and execution of plans, enabling leaders to decide faster and take accountability',
        pPCPNote: 'Proprietary internal platform - no public repository available.',

        pXTitle: 'PII‑Safe Semantic Search for Insurance Claims',
        pXBadge: 'Personal',
        pXBody: 'A personal project exploring how to enable semantic search and RAG over sensitive insurance claims notes without storing personally identifiable information (PII) in the vector index.',
        pXLi1: 'Unlocks semantic search on sensitive text while keeping PII out of vector stores',
        pXLi2: 'Reduces compliance risk by separating masked embeddings from governed raw text',
        pXLi3: 'Improves analyst productivity by enabling meaning‑based search instead of exact keywords',
        pXLi4: 'De‑risks vendor exposure by keeping vectors local and reusing existing governed data stores',
        pXRepo: 'GitHub',
        pXArticle: 'Article',

        pITDWHTitle: 'ITDWH Decommissioning & Cloud Migration',
        pITDWHBadge: 'Enterprise',
        pITDWHBody: 'Led the decommissioning of the legacy ITDWH platform and transition of private, public, and on‑prem consumption sources to Microsoft Azure and Palantir Foundry.',
        pITDWHLi1: 'Migrated 200+ customer‑facing interfaces to Palantir Foundry, including value services and distribution logic',
        pITDWHLi2: 'Transitioned diverse data sources (Oracle, Postgres, DB2 Mainframe, CSV, SharePoint, Pull‑printing) to Azure‑based consumption',
        pITDWHLi3: 'Delivered an estimated cost saving of ~$120k per month through decommissioning and platform consolidation',
        pITDWHLi4: 'Implemented health checks across Microsoft Azure and Palantir Foundry to ensure operational stability',
        pITDWHNote: 'Proprietary internal platform - no public repository available.',

        p1Title: 'Lakehouse Pipeline with Quality Gates',
        p1Badge: 'Featured',
        p1Body: 'Ingestion → transformations → curated marts with tests, freshness checks, and deploy-time validation.',
        p1Li1: 'Contract checks block deploy on breaking schema or quality failures',
        p1Li2: 'Latency and volume anomaly monitoring with actionable alerts',
        p1Li3: 'Reproducible dev env with Docker + documented runbook',
        p1Repo: 'Repo',
        p1Writeup: 'Write-up',

        p2Title: 'Airflow DAG Factory + Standards',
        p2Badge: 'Ops',
        p2Body: 'A reusable library that standardizes retries, SLAs, alerts, and docs across pipelines.',
        p2Li1: 'One-line bootstrap for new pipelines',
        p2Li2: 'Consistent metadata and logging for faster debugging',
        p2Li3: 'Reduced on-call noise via tuned alert rules',
        p2Repo: 'Repo',
        p2Docs: 'Docs',

        certsEyebrow: 'Certifications',
        certsTitle: 'Learning timeline',
        certsLead: 'Chronological view, prioritising relevance and recency.',
        verifyLabel: 'Verify',
        certAzureSA: 'Renewed annually through 2026',
        certAzureDE: 'Renewed annually through 2025',
        certsFoot: 'Full list available on <a href="https://www.linkedin.com/in/p-gabriel" target="_blank" rel="noopener">LinkedIn</a>.',

        contactEyebrow: 'Contact',
        contactTitle: 'Let\'s talk',
        contactLead: 'Replace the email below with your real address when you\'re ready.',
        contactEmail: 'Email',
        contactLinkedIn: 'LinkedIn',
        contactGitHub: 'GitHub',

        footerText: '© 2026 Gabriel Popa - Portfolio Preview',

        volEyebrow: 'Volunteering & Community',
        volTitle: 'Giving back beyond work',
        volLead: 'Selected non-technical volunteering activities in Switzerland and abroad.',
        vol1Title: 'Rotaract Club Bucharest - Member & Past President',
        vol1Body: 'Active member of Rotaract, a global Rotary-sponsored service organisation. Served as Club President (2016–2017), leading initiatives focused on leadership development, community service, and international cooperation.',
        vol2Title: 'Foundation St. Jakob - Zürich',
        vol2Body: 'Supported initiatives creating employment and training opportunities for people with disabilities across gastronomy, crafts, and commercial activities.',
        vol3Title: 'CYBATHLON - ETH Zürich',
        vol3Body: 'Volunteer contributor to CYBATHLON, a global initiative promoting assistive technologies and inclusion for people with disabilities.',
        vol4Title: 'Bergwaldprojekt - Canton Graubünden',
        vol4Body: 'Participated in forest conservation work, including building hiking paths and installing protective measures for young trees against avalanches.'
      },
      de: {
        navAbout: 'Über mich',
        navSkills: 'Fähigkeiten',
        navProjects: 'Projekte',
        navCerts: 'Zertifizierungen',
        hdrContact: 'Kontakt',

        heroEyebrow: 'Data Engineer • Zürich',
        heroTitle: 'Ich entwickle <span class="gradient">produktionsreife</span><br/>Datenplattformen – klar, robust und skalierbar.',
        heroLead: 'Ich entwickle zuverlässige Pipelines, Datenmodelle und Plattform-Bausteine – mit Fokus auf Automatisierung, Observability und sichere Auslieferung.',
        heroBtnProjects: 'Projekte ansehen',
        heroBtnSkills: 'Skills ansehen',
        heroBtnCV: 'Lebenslauf (PDF)',

        pills: {
          foundry: 'Palantir Foundry',
          aip: 'Palantir AIP',
          gotham: 'Palantir Gotham',
          azure: 'Microsoft Azure',
          ts: 'TypeScript',
          databricks: 'Databricks',
          pyspark: 'PySpark',
          polars: 'Polars',
          cicd: 'CI/CD',
          dq: 'Datenqualität',
          obs: 'Observability',
          sql: 'SQL',
          snowflake: 'Snowflake',
          dbt: 'dbt'
        },

        panelBadge: 'Auf einen Blick',
        panelTitle: 'End-to-End Produktentwicklung',
        panelLead: 'Ich agiere als Allrounder über den gesamten Produktlebenszyklus hinweg – von Ideenfindung und Problemverständnis über Design und Prototyping bis hin zur produktiven Umsetzung. Ich bin ein hands-on Engineer, der Business-Ziele in robuste, skalierbare Systeme übersetzt.',
        panelLi1: 'Die entscheidende Einschränkung identifizieren, die die Mission eines Partners limitiert',
        panelLi2: 'Komplexe Probleme in klare Workflows und Entscheidungen zerlegen',
        panelLi3: 'Business-Stakeholder auf eine gemeinsame Lösungsrichtung ausrichten',
        panelLi4: 'Vom realen Nutzer-Workflow rückwärts denken und lösen',
        panelLi5: 'Software entwickeln und liefern, die die Organisation messbar voranbringt',

        aboutEyebrow: 'Über mich',
        aboutTitle: 'Engineering-first, recruiterfreundlich',
        aboutBody: 'Ich bin Senior Data Engineer mit über neun Jahren Erfahrung im Design, Aufbau und Betrieb robuster, produktionsreifer Datenplattformen. Mein Fokus liegt darauf, komplexe reale Daten in verlässliche, skalierbare Datensätze und Systeme zu überführen, die im Alltag tatsächlich genutzt werden. Ich arbeite an der Schnittstelle von Engineering und Strategie und verbinde fundiertes technisches Know-how mit einem pragmatischen Business-Verständnis, um nachhaltigen Mehrwert und messbare Ergebnisse zu erzielen.',

        skillsEyebrow: 'Fähigkeiten',
        skillsTitle: 'Womit ich arbeite',
        skillsLead: 'Plattformen, Sprachen und Engineering-Praktiken für produktive Systeme.',
        s1Title: 'Data Engineering',
        s1Body: 'Programmier- und Abfragesprachen für datenintensive Systeme.',
        s2Title: 'Plattformen',
        s2Body: 'Enterprise-Plattformen für Analytics, Planung und Entscheidungsunterstützung.',
        s3Title: 'Engineering-Praktiken',
        s3Body: 'Praktiken für zuverlässige, testbare und wartbare Systeme in Produktion.',
        s4Title: 'Analytics & Visualisierung',
        s4Body: 'Insights, Kennzahlen und decision-support Views auf Datenplattformen.',

        projectsEyebrow: 'Projekte',
        projectsTitle: 'Nachweise aus der Praxis',
        projectsLead: 'Ersetze die Platzhalter durch reale Repos oder Case Studies.',

        p0Title: 'Strategische Workforce-Planungsplattform (SWP)',
        p0Badge: 'Enterprise',
        p0Body: 'Konzeption, Architektur und Implementierung einer Strategic-Workforce-Planning-Plattform zur langfristigen Ausrichtung von Personalbestand und Geschäftsstrategie mittels Prognosen, Skill-Analysen, Szenario-Modellierung und Talentoptimierung.',
        p0Li1: 'Zusammenarbeit mit Business Units und Group Functions zur Aufnahme von Anforderungen und Definition eines gemeinsamen Planungsmodells',
        p0Li2: 'Szenariobasierte Planung und Skill-Gap-Analysen als Grundlage für strategische Talententscheidungen',
        p0Li3: 'Executive-taugliche Analysen zur Verbesserung von Konsistenz und Geschwindigkeit in der Planung über die Organisation hinweg',
        p0Note: 'Unternehmensinterne Plattform - kein öffentliches Repository verfügbar.',

        pPCPTitle: 'People- & Cost-Planning-Plattform',
        pPCPBadge: 'Enterprise',
        pPCPBody: 'Konzeption und Implementierung der People- & Cost-Planning-Plattform als zentrale Quelle für gruppenweite FTE-Planung und Personalkostenprojektionen.',
        pPCPLi1: 'Zentrale Plattform für P6- / P9-Projektionen und jährliche Bottom-up-FTE-Kostenplanung',
        pPCPLi2: 'Striktes Rollen- und Berechtigungskonzept für vertrauliche Gehaltsdaten mittels Security Markings',
        pPCPLi3: 'Erhöhte Genauigkeit und Transparenz der Planung sowie schnellere Entscheidungsfindung und klare Verantwortlichkeiten',
        pPCPNote: 'Unternehmensinterne Plattform - kein öffentliches Repository verfügbar.',

        pXTitle: 'PII‑sichere semantische Suche für Versicherungsschäden',
        pXBadge: 'Persönlich',
        pXBody: 'Persönliches Projekt zur Ermöglichung semantischer Suche und RAG über sensible Schadennotizen, ohne personenbezogene Daten (PII) im Vektorindex zu speichern.',
        pXLi1: 'Ermöglicht semantische Suche über sensible Texte ohne Speicherung von PII in Vektoren',
        pXLi2: 'Reduziert Compliance‑Risiken durch Trennung von maskierten Embeddings und reguliertem Klartext',
        pXLi3: 'Beschleunigt die Arbeit von Analysten durch bedeutungsbasierte Suche statt exakter Schlüsselwörter',
        pXLi4: 'Minimiert Anbieterabhängigkeiten durch lokale Vektoren und Nutzung bestehender, regulierter Datenspeicher',
        pXRepo: 'GitHub',
        pXArticle: 'Artikel',

        pITDWHTitle: 'ITDWH Decommissioning & Cloud Migration',
        pITDWHBadge: 'Enterprise',
        pITDWHBody: 'Decommissioning der Legacy-ITDWH-Plattform und Transition von Private-, Public- und On-Prem-Consumption-Quellen nach Microsoft Azure und Palantir Foundry.',
        pITDWHLi1: 'Migration von 200+ kundennahen Interfaces nach Palantir Foundry inkl. Value Services und Distribution Logic',
        pITDWHLi2: 'Transition heterogener Quellen (Oracle, Postgres, DB2 Mainframe, CSV, SharePoint, Pull‑printing) auf Azure-basierten Consumption',
        pITDWHLi3: 'Geschätzte Kosteneinsparung von ~$120k pro Monat durch Decommissioning und Konsolidierung',
        pITDWHLi4: 'Health Checks über Microsoft Azure und Palantir Foundry zur Sicherstellung der operativen Stabilität',
        pITDWHNote: 'Unternehmensinterne Plattform - kein öffentliches Repository verfügbar.',

        p1Title: 'Lakehouse-Pipeline mit Quality Gates',
        p1Badge: 'Highlight',
        p1Body: 'Ingestion → Transformationen → Data Marts mit Tests, Freshness-Checks und Deploy-Validierung.',
        p1Li1: 'Contract-Checks blockieren Deploys bei Schema- oder Qualitätsproblemen',
        p1Li2: 'Monitoring für Latenz und Volumen-Anomalien mit klaren Alerts',
        p1Li3: 'Reproduzierbares Setup mit Docker + dokumentiertem Runbook',
        p1Repo: 'Repo',
        p1Writeup: 'Write-up',

        p2Title: 'Airflow DAG Factory + Standards',
        p2Badge: 'Ops',
        p2Body: 'Wiederverwendbare Library für Retries, SLAs, Alerts und Doku über alle Pipelines hinweg.',
        p2Li1: 'One-Liner Bootstrap für neue Pipelines',
        p2Li2: 'Konsistente Metadaten und Logging für schnelleres Debugging',
        p2Li3: 'Weniger On-Call-Noise durch getunte Alert-Regeln',
        p2Repo: 'Repo',
        p2Docs: 'Docs',

        certsEyebrow: 'Zertifizierungen',
        certsTitle: 'Lernverlauf',
        certsLead: 'Chronologische Ansicht – Fokus auf Relevanz & Aktualität.',
        verifyLabel: 'Nachweis',
        certAzureSA: 'Jährlich erneuert bis 2026',
        certAzureDE: 'Jährlich erneuert bis 2025',
        certsFoot: 'Vollständige Liste auf <a href="https://www.linkedin.com/in/p-gabriel" target="_blank" rel="noopener">LinkedIn</a>.',

        contactEyebrow: 'Kontakt',
        contactTitle: 'Kontakt aufnehmen',
        contactLead: 'Ersetze die E-Mail unten, sobald du deine echte Adresse eintragen möchtest.',
        contactEmail: 'E-Mail',
        contactLinkedIn: 'LinkedIn',
        contactGitHub: 'GitHub',

        footerText: '© 2026 Gabriel Popa - Portfolio (Vorschau)',

        volEyebrow: 'Engagement & Ehrenamt',
        volTitle: 'Engagement über den Beruf hinaus',
        volLead: 'Ausgewählte ehrenamtliche Tätigkeiten in der Schweiz und im Ausland.',
        vol1Title: 'Rotaract Club Bukarest - Mitglied & ehemaliger Präsident',
        vol1Body: 'Aktives Mitglied von Rotaract, einer globalen, von Rotary unterstützten Service-Organisation. Tätigkeit als Clubpräsident (2016–2017) mit Verantwortung für Führung, Organisation und Umsetzung sozialer Initiativen.',
        vol2Title: 'Stiftung St. Jakob - Zürich',
        vol2Body: 'Unterstützung von Projekten zur Schaffung von Arbeits- und Ausbildungsplätzen für Menschen mit Behinderungen in Gastronomie, Handwerk und Gewerbe.',
        vol3Title: 'CYBATHLON - ETH Zürich',
        vol3Body: 'Mitwirkung am CYBATHLON, einer internationalen Initiative zur Förderung assistiver Technologien und gesellschaftlicher Inklusion.',
        vol4Title: 'Bergwaldprojekt - Kanton Graubünden',
        vol4Body: 'Mitarbeit bei Waldschutz- und Pflegearbeiten, inklusive Bau von Wanderwegen und Schutz junger Bäume vor Lawinen.'
      }
    };

    const langToggle = document.getElementById('langToggle');

    function applyLang(lang){
      // reflect current language on the toggle (CSS + accessibility)
      if (langToggle){
        langToggle.setAttribute('data-lang', lang);
        langToggle.setAttribute('aria-pressed', lang === 'de' ? 'true' : 'false');
      }
      const dict = t[lang] || t.en;
      document.documentElement.lang = (lang === 'de') ? 'de' : 'en';

      for (const [id, value] of Object.entries(dict)){
        const el = document.getElementById(id);
        if (!el) continue;

        // hero title handled by typewriter on first load
        if (id === 'heroTitle'){
          if (sessionStorage.getItem('heroTyped') === '1') el.innerHTML = value;
          continue;
        }

        // allow innerHTML where we intentionally include markup
        if (id === 'certsFoot'){
          el.innerHTML = value;
          continue;
        }

        el.textContent = value;
      }

      // update marquee pills
      document.querySelectorAll('[data-pill]').forEach(p => {
        const key = p.getAttribute('data-pill');
        if (dict.pills && dict.pills[key]) p.textContent = dict.pills[key];
      });

      // verify labels
      document.querySelectorAll('[data-i18n="verify"]').forEach(a => a.textContent = dict.verifyLabel || 'Verify');

      // renewal notes
      const sa = document.getElementById('certAzureSA'); if (sa && dict.certAzureSA) sa.textContent = dict.certAzureSA;
      const deEl = document.getElementById('certAzureDE'); if (deEl && dict.certAzureDE) deEl.textContent = dict.certAzureDE;

      // language-specific CV download link
      const cvLink = document.getElementById('heroBtnCV');
      if (cvLink){
        cvLink.href = (lang === 'de')
          ? './assets/Gabriel_Popa_CV_DE.pdf'
          : './assets/Gabriel_Popa_CV_EN.pdf';
      }

      localStorage.setItem('lang', lang);

      const enChip = langToggle?.querySelector('[data-k="en"]');
      const deChip = langToggle?.querySelector('[data-k="de"]');
      if (enChip && deChip){
        enChip.classList.toggle('active', lang === 'en');
        deChip.classList.toggle('active', lang === 'de');
      }
    }

    // --- Simple self-tests (console) ---
    function runSelfTests(){
      const required = ['projectsEyebrow','skillsTitle','heroTitle'];
      for (const k of required){
        if (!(k in t.en)) throw new Error(`i18n test failed: missing t.en.${k}`);
        if (!(k in t.de)) throw new Error(`i18n test failed: missing t.de.${k}`);
      }
      applyLang('en');
      applyLang('de');
      console.log('[OK] i18n self-test passed');
    }

    try { runSelfTests(); } catch (e) { console.error(e); }

    const saved = localStorage.getItem('lang');
    const initialLang = (saved === 'de') ? 'de' : 'en';
    applyLang(initialLang);

    // --- Hero typewriter (runs once per session) ---
    function typeHeroTitle(lang){
      const h1 = document.getElementById('heroTitle');
      if (!h1) return;
      const dict = t[lang] || t.en;

      const partsByLang = {
        en: [
          {text:'Architecting '},
          {gradient:'production-grade'},
          {br:true},
          {text:'data platforms with clarity & speed.'}
        ],
        de: [
          {text:'Ich entwickle '},
          {gradient:'produktionsreife'},
          {br:true},
          {text:'Datenplattformen – klar, robust und skalierbar.'}
        ]
      };

      const parts = partsByLang[lang] || partsByLang.en;
      h1.innerHTML = '';

      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.textContent = '▍';

      let gradientSpan = null;

      function ensureCaret(){
        if (caret.parentNode) caret.parentNode.removeChild(caret);
        h1.appendChild(caret);
      }
      ensureCaret();

      const queue = [];
      for (const p of parts){
        if (p.br) queue.push({type:'br'});
        else if (p.gradient) queue.push({type:'gradient', value:p.gradient});
        else queue.push({type:'text', value:p.text || ''});
      }

      let qi = 0;
      let ci = 0;

      function step(){
        const item = queue[qi];
        if (!item){
          if (caret.parentNode) caret.parentNode.removeChild(caret);
          sessionStorage.setItem('heroTyped', '1');
          h1.innerHTML = dict.heroTitle;
          return;
        }

        if (item.type === 'br'){
          h1.insertBefore(document.createElement('br'), caret);
          qi++; ci = 0;
          setTimeout(step, 120);
          return;
        }

        let target = h1;
        if (item.type === 'gradient'){
          if (!gradientSpan){
            gradientSpan = document.createElement('span');
            gradientSpan.className = 'gradient';
            h1.insertBefore(gradientSpan, caret);
          }
          target = gradientSpan;
        } else {
          gradientSpan = null;
          target = h1;
        }

        const text = item.value;
        if (ci < text.length){
          const ch = text.charAt(ci);
          if (target === h1) h1.insertBefore(document.createTextNode(ch), caret);
          else target.appendChild(document.createTextNode(ch));
          ci++;
          const base = 22;
          const jitter = Math.random() * 18;
          setTimeout(step, base + jitter);
          return;
        }

        qi++; ci = 0;
        setTimeout(step, 80);
      }

      setTimeout(step, 350);
    }

    if (sessionStorage.getItem('heroTyped') !== '1'){
      typeHeroTitle(initialLang);
    }

    // Wire up the language toggle / GitHub Pages safe
    if (langToggle){
      let lastToggleAt = 0;
      const toggleLang = () => {
        const now = Date.now();
        if (now - lastToggleAt < 250) return; // guard against double-fire
        lastToggleAt = now;

        const current = (localStorage.getItem('lang') === 'de') ? 'de' : 'en';
        const next = (current === 'de') ? 'en' : 'de';
        applyLang(next);

        // If the hero typewriter is still running (first load), ensure the headline swaps too.
        const h1 = document.getElementById('heroTitle');
        if (h1 && sessionStorage.getItem('heroTyped') !== '1'){
          h1.innerHTML = (t[next] || t.en).heroTitle;
        }
      };

      // Expose a global handler as a last-resort fallback (some GH Pages/mobile edge cases)
      window.__toggleLang = toggleLang;

      // Primary handlers
      langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLang();
      });
      langToggle.addEventListener('touchstart', () => toggleLang(), {passive:true});
      langToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          toggleLang();
        }
      });

      // Capture-phase delegation fallback (helps if something swallows the bubbling click)
      document.addEventListener('click', (e) => {
        const btn = e.target && e.target.closest ? e.target.closest('#langToggle') : null;
        if (!btn) return;
        e.preventDefault();
        toggleLang();
      }, true);
    }
