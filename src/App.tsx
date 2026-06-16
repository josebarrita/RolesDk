import { useState } from "react";
import { Database, Brain, BarChart3, Sparkles, Cloud, Target, Wrench, ListChecks, Compass, Gauge, ArrowRight, ArrowLeft, Network, Table2, Workflow, ChevronRight } from "lucide-react";

/* ----------------------------- DATA ----------------------------- */
const ROLE_ORDER = ["de", "ds", "bi", "ia"];

const ROLES = {
  de: {
    name: "Ingeniero de Datos", short: "Ing. Datos", icon: Database,
    color: "#0a6fb8", soft: "rgba(10,111,184,0.10)",
    cloud: "Compute + Storage + Networking", cloudShort: "Infraestructura base",
    mission: "Garantizar que los datos correctos lleguen al lugar correcto, en el momento correcto, con la calidad correcta.",
    pos: { x: 150, y: 310 },
    levels: {
      Junior: {
        resp: "Desarrolla pipelines de datos básicos bajo supervisión directa. Ejecuta procesos ETL simples ya diseñados. Documenta procesos técnicos. Limpia y valida datasets. Resuelve bugs de baja complejidad.",
        hab: "Python y SQL básico-intermedio. Git (branching, PRs). Conceptos de ETL. Linux básico (bash, cron). Una herramienta de orquestación básica.",
        alc: "Pipelines pequeños y aislados. Datasets < 1GB. Solo ambientes de desarrollo. Cero decisiones de arquitectura. Siempre con revisión de un SS o Senior.",
        aut: "Baja. Tareas asignadas y acotadas. Check-ins diarios con su mentor.",
        kpi: "Pipelines completados por sprint. Bugs resueltos. % de PRs aprobados sin re-trabajo mayor. Documentación entregada." },
      Semisenior: {
        resp: "Diseña e implementa pipelines ETL/ELT completos de complejidad media. Optimiza queries y procesos existentes. Da soporte técnico a Científicos y Analistas. Hace debugging en producción. Mentorea a Juniors.",
        hab: "Python y SQL avanzado. Docker. Apache Spark básico. Bases relacionales y NoSQL. Airflow/Prefect. CI/CD básico. Modelado de datos intermedio.",
        alc: "Pipelines medianos end-to-end. Datasets < 100GB. Pre-producción y producción no crítica. Decisiones técnicas dentro de su pipeline.",
        aut: "Media. Recibe el 'qué' y define el 'cómo'. Consulta decisiones que afecten a otros equipos.",
        kpi: "Performance de pipelines (mejora ≥10%). Calidad de datos > 99%. Tiempo de resolución de incidentes. Juniors mentoreados." },
      Senior: {
        resp: "Diseña la arquitectura de la plataforma de datos. Optimiza sistemas a escala. Lidera técnicamente iniciativas grandes. Define estándares de ingeniería de datos. Es el escalation point técnico del equipo.",
        hab: "Spark a escala. Arquitectura de datos (lakehouse, medallion). Cloud (AWS/GCP/Azure). Kubernetes. Streaming (Kafka). IaC (Terraform). Data governance técnico.",
        alc: "Pipelines empresariales críticos. Datasets > 1TB. Producción crítica 24/7. Decisiones arquitectónicas que afectan a múltiples equipos.",
        aut: "Alta. Define el 'qué' y el 'cómo' técnico. Solo escala decisiones de presupuesto o estrategia.",
        kpi: "Uptime > 99.9%. Latencia dentro de SLA. Reducción de costos cloud ≥ 15%. Reducción de deuda técnica. Arquitecturas adoptadas." },
      "Líder Técnico": {
        resp: "Dirige técnicamente al equipo de Data Engineering (5-10 personas). Define la estrategia técnica a 6-12 meses. Coachea Seniors. Toma decisiones de arquitectura empresa-wide. Gestiona el roadmap técnico.",
        hab: "Arquitectura empresarial. FinOps. MLOps/DataOps. Gestión de personas técnicas. Comunicación con ejecutivos. Negociación de prioridades.",
        alc: "Todo el ecosistema de datos: data lake, warehouse, streaming. Presupuesto técnico del área. Roadmap del equipo.",
        aut: "Muy alta. Responde por resultados del equipo, no por tareas individuales.",
        kpi: "Delivery del equipo ≥ 95%. eNPS / retención del equipo. Velocidad de onboarding. Tecnologías evaluadas y adoptadas." },
      "Líder Especialista": {
        resp: "Define la estrategia global de datos a 2-3 años. Establece estándares y gobernanza de toda la organización. Investiga tecnologías emergentes. Conecta la estrategia de datos con la de negocio.",
        hab: "Visión de negocio. Gobernanza de datos empresarial. Dirección estratégica. Pensamiento sistémico. Influencia a nivel C-level.",
        alc: "Transformación digital data-centric de toda la empresa. Roadmaps multi-año. Múltiples equipos e iniciativas.",
        aut: "Total dentro de su dominio. Reporta a nivel ejecutivo.",
        kpi: "ROI de iniciativas de datos. Time-to-market de productos de datos. Adopción de estándares (%). Valor económico generado." },
    },
    progression: [
      { to: "Semisenior", time: "1.5 - 2.5 años", criteria: "Diseña pipelines completos sin supervisión. Domina su stack. Resuelve incidentes solo. Ha mentoreado al menos informalmente.", change: "De ejecutar tareas asignadas → a diseñar soluciones completas dentro de su pipeline." },
      { to: "Senior", time: "2 - 3 años", criteria: "Decisiones arquitectónicas correctas demostradas. Impacto cross-team. Referente técnico. Maneja producción crítica con calma.", change: "De ejecutor de soluciones → a arquitecto. Su impacto se mide en sistemas, no en tareas." },
      { to: "Líder Técnico", time: "2 - 4 años (opcional)", criteria: "Habilidades de gestión demostradas. Quiere desarrollar personas. Visión más allá de lo técnico. Es un cambio de carrera, no un ascenso obligatorio.", change: "De manos en el teclado → a multiplicar al equipo. Su éxito es el éxito de otros." },
      { to: "Líder Especialista", time: "3 - 5 años", criteria: "Resultados sostenidos del equipo. Influencia ejecutiva. Visión estratégica probada.", change: "De dirigir un equipo → a definir la estrategia de datos de la organización." },
    ],
  },
  ds: {
    name: "Científico de Datos", short: "Científico", icon: Brain,
    color: "#1aa3c4", soft: "rgba(26,163,196,0.10)",
    cloud: "Servicios de ML gestionado", cloudShort: "Motor de inteligencia",
    mission: "Resolver problemas de negocio mediante modelos estadísticos y de machine learning que generen valor medible.",
    pos: { x: 500, y: 120 },
    levels: {
      Junior: {
        resp: "Realiza análisis exploratorio (EDA) supervisado. Construye modelos simples (regresión, árboles) con guía. Prepara y limpia datos. Apoya en visualizaciones. Documenta experimentos.",
        hab: "Python (pandas, numpy). scikit-learn básico. Estadística descriptiva e inferencial básica. Jupyter. SQL básico. Visualización (matplotlib/seaborn).",
        alc: "Análisis descriptivos. Modelos lineales/básicos. Datasets ya curados. Proyectos de bajo riesgo. Siempre con revisión.",
        aut: "Baja. Hipótesis y enfoques definidos por su mentor.",
        kpi: "Análisis completados. Modelos baseline entregados. Precisión > 75% en problemas asignados. Calidad de documentación." },
      Semisenior: {
        resp: "Desarrolla modelos predictivos de complejidad media-alta. Hace feature engineering avanzado. Valida modelos rigurosamente. Diseña y ejecuta A/B tests. Comunica insights a negocio.",
        hab: "Python avanzado. XGBoost/LightGBM. TensorFlow/PyTorch básico. SQL intermedio. Estadística inferencial sólida. Storytelling de datos.",
        alc: "Modelos predictivos en producción de riesgo medio. Datasets complejos < 100GB. Experimentos multi-variable. Decide enfoque de modelado.",
        aut: "Media. Recibe el problema de negocio y define el enfoque técnico.",
        kpi: "F1/AUC según problema (típico > 85%). Time-to-production de modelos. Modelos adoptados por negocio. Rigor experimental." },
      Senior: {
        resp: "Diseña sistemas de ML end-to-end. Optimiza modelos complejos en producción. Define la estrategia de features y experimentación. Lidera iniciativas grandes. Innova en técnicas (causal inference, deep learning).",
        hab: "ML avanzado. Feature stores. MLOps (monitoring, retraining). Deep learning. Plataformas cloud ML. Inferencia causal. Diseño experimental complejo.",
        alc: "Sistemas ML críticos a escala. Modelos que mueven dinero/decisiones clave. Datasets > 1TB. Mentoring técnico del equipo.",
        aut: "Alta. Define enfoques, prioriza experimentos, decide trade-offs técnicos.",
        kpi: "ROI atribuible a modelos. Latencia de inferencia en SLA. Drift detection activo. Impacto de negocio cuantificado en $." },
      "Líder Técnico": {
        resp: "Dirige al equipo de Data Science (5-10 personas). Define metodologías y estándares de ML. Establece la gobernanza de modelos. Prioriza el portafolio de iniciativas con negocio.",
        hab: "ML enterprise. MLOps avanzado. Gestión de talento científico. Comunicación ejecutiva. Priorización por valor de negocio.",
        alc: "Portafolio completo de modelos en producción. Centro de excelencia ML. Presupuesto del área.",
        aut: "Muy alta. Responde por el valor generado por todo el portafolio de DS.",
        kpi: "Valor en $ generado por DS. % de modelos en producción vs. prototipos. Madurez ML del equipo. Retención de talento." },
      "Líder Especialista": {
        resp: "Define la visión de IA/ML de la empresa a 2-3 años. Investiga y evalúa técnicas emergentes. Diseña el roadmap de innovación. Asegura que la IA genere ventaja competitiva real.",
        hab: "Estrategia de IA. Conocimiento profundo de fronteras (GenAI, RL, etc.). Visión de negocio. Liderazgo ejecutivo. Gestión de riesgo de IA.",
        alc: "Transformación con IA de toda la organización. Diferencial competitivo. Múltiples equipos.",
        aut: "Total dentro de su dominio. Influye en estrategia corporativa.",
        kpi: "Iniciativas de IA implementadas con éxito. Ahorro/ingreso generado. Posicionamiento competitivo. Pipeline de innovación." },
    },
    progression: [
      { to: "Semisenior", time: "1.5 - 2.5 años", criteria: "Modelos en producción con impacto medible. Rigor estadístico sin supervisión. Comunica insights a negocio efectivamente.", change: "De ejecutar análisis definidos → a resolver problemas de negocio con autonomía técnica." },
      { to: "Senior", time: "2 - 3 años", criteria: "Sistemas ML end-to-end exitosos. Innovación técnica demostrada. Mentoring activo. Impacto en $ cuantificable.", change: "De construir modelos → a diseñar sistemas de ML y estrategias de experimentación." },
      { to: "Líder Técnico", time: "2 - 4 años (opcional)", criteria: "Gestión de portafolio demostrada. Priorización por valor. Desarrollo de personas. Cambio de carrera, no obligatorio.", change: "De científico individual → a multiplicador del valor de todo el equipo de DS." },
      { to: "Líder Especialista", time: "3 - 5 años", criteria: "Portafolio con ROI sostenido. Visión de frontera tecnológica. Influencia C-level.", change: "De dirigir DS → a definir cómo la IA transforma el negocio." },
    ],
  },
  bi: {
    name: "Analista de Datos (BI)", short: "Analista BI", icon: BarChart3,
    color: "#f59e0b", soft: "rgba(245,158,11,0.10)",
    cloud: "Capa de presentación / API Gateway", cloudShort: "Interfaz con el negocio",
    mission: "Que cada decisión de negocio relevante esté soportada por datos confiables, accesibles y entendibles.",
    pos: { x: 500, y: 500 },
    levels: {
      Junior: {
        resp: "Construye reportes operacionales básicos. Crea dashboards simples a partir de specs. Responde consultas de datos de stakeholders. Mantiene reportes existentes. Documenta fuentes y métricas.",
        hab: "SQL básico. Power BI o Tableau fundamentales. Excel avanzado. Comprensión básica del negocio. Visualización básica.",
        alc: "Reportes departamentales. Datos históricos simples. Datasets < 1GB. Trabajo con specs claras y revisión.",
        aut: "Baja. Requerimientos detallados y validación de su SS/Senior.",
        kpi: "Reportes entregados por sprint. Tiempo de respuesta < 24-48h. Adopción de sus reportes. Errores detectados en QA." },
      Semisenior: {
        resp: "Diseña dashboards analíticos completos. Modela datos para BI (esquemas estrella, métricas). Optimiza performance. Hace análisis multi-dimensional. Traduce preguntas vagas en análisis concretos.",
        hab: "SQL avanzado. Power BI/Tableau avanzado (DAX, LOD). Modelado dimensional. Estadística descriptiva. Storytelling. Conocimiento sólido del negocio.",
        alc: "Dashboards empresariales de un área completa. Datos cuasi-real-time. Decide diseño y modelo de datos de sus soluciones.",
        aut: "Media. Recibe la pregunta de negocio y define la solución analítica.",
        kpi: "Performance de dashboards (carga < 5s). Precisión > 99%. Usuarios activos mensuales. Insights que generaron acción." },
      Senior: {
        resp: "Diseña la arquitectura de la plataforma BI. Define la capa semántica y el catálogo de métricas corporativas. Lidera iniciativas cross-área. Mentorea analistas. Es el puente entre negocio y los roles técnicos.",
        hab: "BI enterprise. Data warehousing (Snowflake, BigQuery). Capa semántica. Python para análisis. Data governance funcional. Influencia con stakeholders.",
        alc: "Plataforma BI corporativa. Múltiples líneas de negocio. Definición de métricas oficiales de la empresa.",
        aut: "Alta. Define estándares analíticos y prioriza el backlog de su dominio.",
        kpi: "Time-to-insight (pregunta → respuesta). % de adopción de analytics por área. Reducción de reportes ad-hoc. Single source of truth." },
      "Líder Técnico": {
        resp: "Lidera el equipo de BI/Analytics (4-8 personas). Establece la gobernanza de métricas y datos de consumo. Define estándares de visualización y self-service. Construye la cultura analítica.",
        hab: "Estrategia de BI. Data governance. Gestión de equipos. Change management. Comunicación ejecutiva.",
        alc: "Centro de excelencia en BI. Gobernanza de métricas empresa-wide. Roadmap analítico.",
        aut: "Muy alta. Responde por la confiabilidad y adopción de todo el ecosistema analítico.",
        kpi: "Madurez analítica organizacional. Data quality score > 95%. Capacidad del equipo. % de decisiones soportadas por datos." },
      "Líder Especialista": {
        resp: "Define la estrategia de decisiones basadas en datos para toda la empresa. Lidera la transformación cultural hacia data-driven. Integra analytics en los procesos ejecutivos de decisión.",
        hab: "Estrategia de BI corporativa. Change management avanzado. Visión de negocio profunda. Liderazgo ejecutivo.",
        alc: "Cultura data-driven de toda la organización. Procesos de decisión ejecutiva.",
        aut: "Total dentro de su dominio. Asesor de C-level.",
        kpi: "Mejora medible en calidad de decisiones. Impacto de negocio en $. Velocidad de decisión. Madurez data-driven (assessment anual)." },
    },
    progression: [
      { to: "Semisenior", time: "1 - 2 años", criteria: "Dashboards adoptados por negocio. Modela datos correctamente. Traduce preguntas vagas en análisis. Domina su herramienta BI.", change: "De construir según specs → a diseñar soluciones analíticas desde la pregunta de negocio." },
      { to: "Senior", time: "2 - 3 años", criteria: "Soluciones cross-área exitosas. Define métricas corporativas. Referente de negocio y técnico. Stakeholder management probado.", change: "De analista de un área → a arquitecto de la plataforma analítica y puente con negocio." },
      { to: "Líder Técnico", time: "2 - 4 años (opcional)", criteria: "Construcción de cultura analítica. Gestión de equipo. Gobernanza implementada.", change: "De resolver con sus manos → a construir la capacidad analítica de la organización." },
      { to: "Líder Especialista", time: "3 - 5 años", criteria: "Transformación cultural medible. Influencia en decisiones ejecutivas.", change: "De liderar BI → a transformar cómo decide toda la empresa." },
    ],
  },
  ia: {
    name: "Ingeniero de IA", short: "Ing. IA", icon: Sparkles,
    color: "#0d9488", soft: "rgba(13,148,136,0.10)",
    cloud: "IA gestionada / Serverless", cloudShort: "Capa más cercana al producto",
    mission: "Convertir capacidades de IA (modelos propios y de terceros) en productos de producción que generen valor, con seguridad, observabilidad y costos controlados.",
    pos: { x: 850, y: 310 },
    levels: {
      Junior: {
        resp: "Implementa integraciones básicas con APIs de LLMs bajo supervisión. Escribe y prueba prompts. Construye prototipos simples (chatbots, clasificadores con LLM). Documenta fallos. Ejecuta evaluaciones definidas por otros.",
        hab: "Python intermedio. APIs REST. Prompt engineering básico. Git. Conceptos de LLMs (tokens, contexto, temperatura). Un framework básico (LangChain/LlamaIndex inicial).",
        alc: "Prototipos y POCs. Features de bajo riesgo. Sin acceso a producción crítica. Prompts y flujos revisados por SS/Senior.",
        aut: "Baja. Casos de uso y diseño definidos por su mentor.",
        kpi: "Prototipos entregados. Calidad de prompts (pass rate en evals). Casos de fallo documentados. Velocidad de iteración." },
      Semisenior: {
        resp: "Desarrolla aplicaciones de IA completas: RAG, function calling, fine-tuning ligero. Diseña pipelines de evaluación. Implementa guardrails y manejo de errores. Optimiza costos de tokens y latencia. Integra IA en productos.",
        hab: "Python avanzado. RAG (embeddings, vector DBs). Frameworks de orquestación. Evals sistemáticas. Observabilidad de LLMs (tracing). Fine-tuning básico. Seguridad básica (prompt injection).",
        alc: "Features de IA en producción de riesgo medio. Sistemas RAG completos. Decide arquitectura de sus features.",
        aut: "Media. Recibe el caso de uso y define la solución técnica.",
        kpi: "Calidad de respuestas (eval scores > umbral). Costo por interacción (optimización ≥ 20%). Latencia p95 en SLA. Tasa de alucinación/error." },
      Senior: {
        resp: "Diseña la arquitectura de sistemas de IA a escala: agentes multi-paso, orquestación de modelos, routing inteligente. Define la estrategia de evaluación y seguridad. Decide build vs. buy. Lidera iniciativas de GenAI. Establece estándares de LLMOps.",
        hab: "Arquitectura de sistemas de IA. Agentes y tool use. Fine-tuning y RLHF conceptual. LLMOps completo. Seguridad de IA (jailbreaks, data leakage). Optimización de inferencia. FinOps de IA.",
        alc: "Sistemas de IA críticos en producción. Plataforma de IA interna. Decisiones de modelo/proveedor empresa-wide.",
        aut: "Alta. Define arquitecturas, estándares y trade-offs costo/calidad/latencia.",
        kpi: "Confiabilidad de sistemas IA (> 99.5%). Costo total de IA optimizado. Incidentes de seguridad = 0. Adopción de la plataforma interna. Time-to-production de features." },
      "Líder Técnico": {
        resp: "Dirige al equipo de AI Engineering. Define la estrategia técnica a 6-12 meses. Establece la gobernanza de IA (uso responsable, compliance, privacidad). Coordina con DS y DE. Gestiona la relación con proveedores de modelos.",
        hab: "Estrategia de plataforma de IA. AI governance y regulación (EU AI Act, etc.). Gestión de equipos. Vendor management. Comunicación ejecutiva. Evaluación de riesgo de IA.",
        alc: "Toda la plataforma y portafolio de productos con IA. Presupuesto de IA (APIs + infra). Políticas de uso de IA.",
        aut: "Muy alta. Responde por el valor, costo y riesgo de toda la IA en producción.",
        kpi: "Valor generado por features de IA ($). ROI del gasto en IA. Compliance de gobernanza (100%). Capacidad y retención del equipo." },
      "Líder Especialista": {
        resp: "Define la visión de IA aplicada de la empresa a 2-3 años. Anticipa cambios en el ecosistema. Identifica oportunidades de diferenciación. Lidera la transformación de productos y procesos con IA. Representa a la empresa en el ecosistema de IA.",
        hab: "Visión estratégica de IA. Frontera tecnológica (agentes autónomos, multimodal). Economía de la IA. Liderazgo ejecutivo. Gestión de riesgo estratégico.",
        alc: "Estrategia de IA de toda la organización. Transformación de productos y operaciones. Posicionamiento competitivo.",
        aut: "Total dentro de su dominio. Asesor directo de C-level en IA.",
        kpi: "Ventaja competitiva atribuible a IA. Nuevos productos/ingresos habilitados por IA. Velocidad de adopción vs. mercado. Riesgo de IA gestionado." },
    },
    progression: [
      { to: "Semisenior", time: "1 - 2 años (acelerado por demanda del mercado)", criteria: "Features de IA en producción funcionando. Evals sistemáticas implementadas. Domina RAG y orquestación. Entiende trade-offs costo/calidad.", change: "De prototipos supervisados → a features completas de IA en producción." },
      { to: "Senior", time: "2 - 3 años", criteria: "Arquitecturas de IA a escala exitosas. Decisiones build vs. buy correctas. Cero incidentes graves de seguridad. Referente en LLMOps.", change: "De construir features → a diseñar la plataforma y los estándares de IA." },
      { to: "Líder Técnico", time: "2 - 3 años (opcional)", criteria: "Gobernanza de IA implementada. Gestión de presupuesto y vendors. Coordinación efectiva con DS y DE.", change: "De arquitecto de IA → a responsable del valor, costo y riesgo de toda la IA." },
      { to: "Líder Especialista", time: "3 - 4 años", criteria: "Productos de IA con ventaja competitiva demostrada. Anticipación correcta de tendencias. Influencia ejecutiva.", change: "De liderar la plataforma → a definir cómo la IA redefine el negocio." },
    ],
  },
};

const LEVELS = ["Junior", "Semisenior", "Senior", "Líder Técnico", "Líder Especialista"];
const DIMS = [
  { key: "resp", label: "Responsabilidades", icon: ListChecks },
  { key: "hab", label: "Habilidades", icon: Wrench },
  { key: "alc", label: "Alcance", icon: Compass },
  { key: "aut", label: "Autonomía", icon: Target },
  { key: "kpi", label: "KPIs", icon: Gauge },
];

const VALUE_FLOW: { id: string; a: string; b: string; label: string }[] = [
  { id: "de-ds", a: "de", b: "ds", label: "datos limpios" },
  { id: "de-ia", a: "de", b: "ia", label: "datos para IA" },
  { id: "de-bi", a: "de", b: "bi", label: "datos modelados" },
  { id: "ds-ia", a: "ds", b: "ia", label: "modelos" },
  { id: "ds-bi", a: "ds", b: "bi", label: "insights" },
  { id: "ia-bi", a: "ia", b: "bi", label: "features IA" },
];

// Tipos de proyecto: qué flujos están activos en cada uno.
// "opt" marca flujos opcionales (se ven atenuados con etiqueta "opcional").
const PROJECT_TYPES: { key: string; label: string; active: string[]; opt?: string[] }[] = [
  { key: "all", label: "Ver todo", active: ["de-ds", "de-ia", "de-bi", "ds-ia", "ds-bi", "ia-bi"] },
  { key: "chatbot", label: "Chatbot / LLM externo", active: ["de-ia", "ia-bi"] },
  { key: "modelo", label: "Modelo propio en producción", active: ["de-ds", "ds-ia", "ia-bi"] },
  { key: "rag", label: "RAG corporativo", active: ["de-ia", "ia-bi"], opt: ["ds-ia"] },
  { key: "analitica", label: "Analítica / Dashboard", active: ["de-ds", "de-bi", "ds-bi"] },
  { key: "agentes", label: "Agentes SQL", active: ["de-ia", "de-bi", "ia-bi"] },
];
const LATERAL = [
  { a: "de", b: "ia", note: "Aporta fortaleza en infraestructura; debe sumar conocimiento de LLMs y evals." },
  { a: "ds", b: "ia", note: "Aporta dominio de modelos; debe sumar ingeniería de producción y costos." },
  { a: "bi", b: "ds", note: "Aporta conocimiento de negocio; debe reforzar Python y estadística." },
  { a: "de", b: "ds", note: "Movimiento al mismo nivel o uno abajo, con plan de nivelación de 3-6 meses." },
];

const AGILE: Record<string, { facilitates: string; expects: string; cadence: string; friction: string }> = {
  de: {
    facilitates: "Protege el tiempo de trabajo profundo. Gestiona dependencias con Infra y Seguridad. Equilibra features nuevas vs. deuda técnica. Visibiliza el trabajo 'invisible' de plataforma ante stakeholders.",
    expects: "Estimaciones honestas (incluyendo incertidumbre). Escalación temprana de blockers. Visibilidad del estado de pipelines críticos. Participación activa en refinement.",
    cadence: "Daily (15 min). Refinement semanal. Sprint planning quincenal. Retro quincenal. 1:1 quincenal.",
    friction: "Urgencias de datos de negocio vs. trabajo de plataforma de largo plazo. El AM debe defender la inversión en infraestructura." },
  ds: {
    facilitates: "Adapta el marco ágil a la naturaleza incierta de la experimentación. Gestiona expectativas sobre tiempos de ML. Facilita acceso a datos vía Data Engineers.",
    expects: "Hipótesis claras antes de cada experimento. Criterios de éxito/abandono definidos. Timeboxing de exploraciones. Comunicación de resultados negativos también.",
    cadence: "Standup 3x/semana (trabajo profundo). Experiment review semanal. Planning quincenal con objetivos, no tareas. Retro quincenal.",
    friction: "La investigación no encaja en sprints rígidos. El AM usa objetivos de aprendizaje en vez de entregables fijos." },
  bi: {
    facilitates: "Filtra y prioriza el flujo constante de requests. Protege al equipo de la 'tiranía de lo urgente'. Negocia SLAs realistas. Da visibilidad del backlog a las áreas.",
    expects: "Clasificación de requests (urgente/importante). Estimaciones rápidas. Feedback sobre carga de trabajo. Documentación de requerimientos recibidos.",
    cadence: "Daily (15 min). Triage de requests 2x/semana. Delivery review semanal con stakeholders. Retro quincenal.",
    friction: "Sobrecarga de pedidos ad-hoc que impide trabajo estratégico. El AM implementa intake y priorización transparente." },
  ia: {
    facilitates: "Gestiona la presión de 'hay que tener IA ya' con expectativas realistas. Coordina dependencias triples: datos, modelos y producto. Facilita ciclos prototipo → eval → producción. Gestiona el presupuesto de APIs.",
    expects: "Transparencia sobre madurez de prototipos (demo ≠ producción). Evals antes de prometer fechas. Alertas tempranas de costos de API. Comunicación de riesgos de seguridad/calidad.",
    cadence: "Daily (15 min). Demo interna semanal (se evalúa viendo). Planning quincenal. Retro quincenal. Review de costos mensual.",
    friction: "Hype de stakeholders vs. realidad técnica (alucinaciones, costos, latencia). El AM traduce expectativas en ambas direcciones." },
};

const RACI = [
  { act: "Arquitectura de la plataforma de datos", v: ["A/R", "C", "C", "C", "I", "I"] },
  { act: "Desarrollo de pipelines ETL/ELT", v: ["R", "C", "I", "C", "I", "A"] },
  { act: "Calidad y gobernanza de datos", v: ["A/R", "C", "R", "C", "I", "C"] },
  { act: "Desarrollo de modelos ML propios", v: ["C", "A/R", "I", "C", "I", "I"] },
  { act: "Experimentación y A/B testing", v: ["I", "A/R", "C", "C", "I", "C"] },
  { act: "Features de IA en producto (GenAI/LLMs)", v: ["C", "C", "I", "A/R", "I", "C"] },
  { act: "Evaluación y seguridad de sistemas de IA", v: ["I", "C", "I", "A/R", "I", "C"] },
  { act: "Gestión de costos de IA (APIs, cómputo)", v: ["C", "C", "I", "A/R", "C", "I"] },
  { act: "Dashboards y métricas corporativas", v: ["C", "C", "A/R", "C", "I", "I"] },
  { act: "Definición de métricas de negocio", v: ["I", "C", "R", "I", "I", "A"] },
  { act: "Planificación de sprints y delivery", v: ["C", "C", "C", "C", "A/R", "I"] },
  { act: "Gestión de dependencias externas", v: ["C", "C", "C", "C", "A/R", "I"] },
  { act: "Priorización del backlog", v: ["C", "C", "C", "C", "R", "A"] },
  { act: "Promociones y evaluación técnica", v: ["C", "C", "C", "C", "C", "A/R"] },
];
const RACI_COLS = ["Ing. Datos", "Científico", "Analista BI", "Ing. IA", "Agile Mgr", "Líder T./E."];
const RACI_COLORS: Record<string, string> = { "A/R": "#0d9488", "A": "#1aa3c4", "R": "#0a6fb8", "C": "#f59e0b", "I": "#94a3b8" };

/* ----------------------------- HELPERS ----------------------------- */
function edge(a: {x: number, y: number}, b: {x: number, y: number}, r = 86) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  return { x1: a.x + (dx / len) * r, y1: a.y + (dy / len) * r, x2: b.x - (dx / len) * r, y2: b.y - (dy / len) * r,
    mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
}

/* ----------------------------- COMPONENTS ----------------------------- */
function GraphView({ onSelect }: { onSelect: (key: string) => void }) {
  const [mode, setMode] = useState("value");
  const [hover, setHover] = useState<string | null>(null);
  const [project, setProject] = useState("all");

  const proj = PROJECT_TYPES.find((p) => p.key === project) ?? PROJECT_TYPES[0];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">Grafo de roles y flujo</h2>
          <p className="text-xs sm:text-sm text-slate-500">Toca un rol para ver sus 5 niveles y su carrera. Cada rol es un "recurso de nube".</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1 ring-1 ring-slate-200">
          <button onClick={() => setMode("value")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition ${mode === "value" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            Flujo de valor
          </button>
          <button onClick={() => setMode("lateral")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition ${mode === "lateral" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            Movimientos laterales
          </button>
        </div>
      </div>

      {/* selector de tipo de proyecto */}
      {mode === "value" && (
        <div className="mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Tipo de proyecto</div>
          <div className="flex flex-wrap gap-1.5">
            {PROJECT_TYPES.map((p) => {
              const on = project === p.key;
              return (
                <button key={p.key} onClick={() => setProject(p.key)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                  style={{
                    background: on ? "linear-gradient(135deg,#0a6fb8,#1aa3c4)" : "#ffffff",
                    color: on ? "#fff" : "#64748b",
                    border: `1px solid ${on ? "transparent" : "#e2e8f0"}`,
                    boxShadow: on ? "0 3px 10px -3px rgba(10,111,184,0.4)" : "none",
                  }}>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative rounded-2xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-200 overflow-hidden">
        <svg viewBox="0 0 1000 620" className="w-full" style={{ display: "block" }}>
          <defs>
            <marker id="arrowV" markerWidth="12" markerHeight="12" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#0a6fb8" />
            </marker>
            <marker id="arrowL" markerWidth="12" markerHeight="12" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
            </marker>
          </defs>
          <rect x="0" y="0" width="1000" height="620" fill="transparent" />

          {mode === "value" && VALUE_FLOW.map((f, i) => {
            const e = edge(ROLES[f.a].pos, ROLES[f.b].pos);
            const isActive = proj.active.includes(f.id);
            const isOpt = proj.opt?.includes(f.id) ?? false;
            const on = isActive || isOpt;
            const hovered = hover === f.a || hover === f.b;
            // atenuado si: no aplica al proyecto, o hay hover en otro rol
            const dimmed = !on || (hover && !hovered);
            const strokeColor = dimmed ? "#cbd5e1" : ROLES[f.a].color;
            const labelText = isOpt ? `${f.label} (opcional)` : f.label;
            const labelW = isOpt ? 112 : 88;
            return (
              <g key={i} opacity={dimmed ? 0.2 : 1}>
                <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                  stroke={strokeColor} strokeWidth={hovered && on ? 3.5 : 2.5}
                  strokeDasharray={isOpt ? "7 5" : undefined}
                  markerEnd="url(#arrowV)" />
                <g transform={`translate(${e.mx}, ${e.my})`}>
                  <rect x={-labelW / 2} y="-11" width={labelW} height="22" rx="11"
                    fill="white" stroke={dimmed ? "#e2e8f0" : ROLES[f.a].color} strokeWidth="1.5" />
                  <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="600"
                    fill={dimmed ? "#94a3b8" : ROLES[f.a].color}>{labelText}</text>
                </g>
              </g>
            );
          })}

          {mode === "lateral" && LATERAL.map((l, i) => {
            const e = edge(ROLES[l.a].pos, ROLES[l.b].pos);
            const active = hover === l.a || hover === l.b;
            return <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={active ? ROLES[l.a].color : "#94a3b8"} strokeWidth={active ? 3 : 2}
              strokeDasharray="7 6" markerEnd="url(#arrowL)" markerStart="url(#arrowL)"
              opacity={hover && !active ? 0.2 : 0.85} />;
          })}

          {ROLE_ORDER.map((k) => {
            const r = ROLES[k];
            const Icon = r.icon;
            const x = r.pos.x - 98, y = r.pos.y - 64;
            const hl = hover === k;
            return (
              <foreignObject key={k} x={x} y={y} width="196" height="128" style={{ overflow: "visible" }}>
                <div
                  onClick={() => onSelect(k)}
                  onMouseEnter={() => setHover(k)}
                  onMouseLeave={() => setHover(null)}
                  className="h-full w-full rounded-2xl p-3 cursor-pointer select-none transition-all duration-200 flex flex-col justify-between bg-white"
                  style={{
                    border: `2px solid ${hl ? r.color : "#e2e8f0"}`,
                    boxShadow: hl ? `0 0 0 4px ${r.soft}, 0 12px 28px -10px ${r.color}55` : "0 4px 14px -6px rgba(15,23,42,0.12)",
                    transform: hl ? "translateY(-3px)" : "none",
                  }}>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: r.soft }}>
                      <Icon size={18} style={{ color: r.color }} />
                    </span>
                    <span className="text-[13px] font-bold leading-tight text-slate-800">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Cloud size={12} className="text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 leading-tight">{r.cloudShort}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: r.soft, color: r.color }}>5 niveles</span>
                    <span className="flex items-center gap-0.5 text-[10px] font-medium" style={{ color: r.color }}>
                      Ver <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </foreignObject>
            );
          })}
        </svg>

        <div className="border-t border-slate-100 px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-500">
          {mode === "value" ? (
            <>
              <span className="flex items-center gap-1.5">
                <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#0a6fb8" strokeWidth="2.5" markerEnd="url(#arrowV)"/></svg>
                Flujo activo
              </span>
              {proj.opt && proj.opt.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#0a6fb8" strokeWidth="2.5" strokeDasharray="5 3"/></svg>
                  Flujo opcional
                </span>
              )}
              <span className="text-slate-400">
                {project === "all"
                  ? "Mostrando todos los flujos posibles. Elige un tipo de proyecto para resaltar solo los que aplican."
                  : `Flujos activos para "${proj.label}". Los demás se atenúan.`}
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1.5">
              <svg width="24" height="8"><line x1="0" y1="4" x2="24" y2="4" stroke="#64748b" strokeWidth="2" strokeDasharray="4 3"/></svg>
              Movimiento lateral entre roles (nivelación de 3-6 meses)
            </span>
          )}
        </div>
      </div>

      {mode === "lateral" && (
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          {LATERAL.map((l, i) => (
            <div key={i} className="rounded-xl bg-white ring-1 ring-slate-200 p-3 text-xs shadow-sm">
              <div className="flex items-center gap-2 mb-1 font-semibold text-slate-700">
                <span style={{ color: ROLES[l.a].color }}>{ROLES[l.a].short}</span>
                <ArrowRight size={13} className="text-slate-400" />
                <span style={{ color: ROLES[l.b].color }}>{ROLES[l.b].short}</span>
              </div>
              <p className="text-slate-500 leading-snug">{l.note}</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-[11px] text-slate-400">Ruta alternativa para perfiles técnicos (IC): Senior → Staff → Principal, sin gestión de personas.</p>
    </div>
  );
}

function RoleDetail({ roleKey, onBack }: { roleKey: string; onBack: () => void }) {
  const r = ROLES[roleKey];
  const Icon = r.icon;
  const [level, setLevel] = useState("Junior");
  const lvlIndex = LEVELS.indexOf(level);
  const data = r.levels[level as keyof typeof r.levels];
  const prog = lvlIndex < 4 ? r.progression[lvlIndex] : null;

  return (
    <div className="w-full">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-3 transition">
        <ArrowLeft size={15} /> Volver al grafo
      </button>

      <div className="rounded-2xl p-4 sm:p-5 mb-4" style={{ background: r.soft, border: `1px solid ${r.color}33` }}>
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center rounded-xl shrink-0 bg-white" style={{ width: 46, height: 46, boxShadow: `0 2px 8px -2px ${r.color}44` }}>
            <Icon size={24} style={{ color: r.color }} />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{r.name}</h2>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Cloud size={13} /> {r.cloud}
            </p>
            <p className="text-sm text-slate-600 mt-2 leading-snug">{r.mission}</p>
          </div>
        </div>
      </div>

      <div className="flex items-stretch gap-1.5 mb-4 overflow-x-auto pb-1">
        {LEVELS.map((lv, i) => {
          const sel = lv === level;
          return (
            <button key={lv} onClick={() => setLevel(lv)}
              className="flex-1 min-w-[88px] rounded-xl px-2 py-2.5 text-center transition-all bg-white"
              style={{
                background: sel ? r.soft : "#ffffff",
                border: `1.5px solid ${sel ? r.color : "#e2e8f0"}`,
              }}>
              <div className="text-[10px] font-semibold tracking-wide" style={{ color: sel ? r.color : "#94a3b8" }}>TIER {i + 1}</div>
              <div className={`text-xs font-bold leading-tight mt-0.5 ${sel ? "text-slate-800" : "text-slate-500"}`}>{lv}</div>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {DIMS.map((d) => {
          const DIcon = d.icon;
          return (
            <div key={d.key} className="rounded-xl bg-white ring-1 ring-slate-200 p-3.5 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <DIcon size={15} style={{ color: r.color }} />
                <span className="text-sm font-semibold text-slate-700">{d.label}</span>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed">{data[d.key as keyof typeof data]}</p>
            </div>
          );
        })}
      </div>

      {prog && (
        <div className="mt-4 rounded-xl p-4 bg-white" style={{ border: `1px dashed ${r.color}66` }}>
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
            <Workflow size={15} style={{ color: r.color }} />
            Progresión: {level} <ArrowRight size={14} style={{ color: r.color }} /> {prog.to}
            <span className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: r.soft, color: r.color }}>{prog.time}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1 font-semibold">Criterios de promoción</div>
              <p className="text-[13px] text-slate-500 leading-relaxed">{prog.criteria}</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1 font-semibold">Cambio fundamental</div>
              <p className="text-[13px] text-slate-600 leading-relaxed italic">{prog.change}</p>
            </div>
          </div>
        </div>
      )}
      {!prog && (
        <div className="mt-4 rounded-xl p-3.5 text-center text-[13px] text-slate-500 bg-white" style={{ border: `1px solid ${r.color}44` }}>
          Nivel cúspide de la ruta. Define la estrategia a 2-3 años y conecta con el nivel ejecutivo.
        </div>
      )}
    </div>
  );
}

function AgileView() {
  const [sel, setSel] = useState("de");
  const r = ROLES[sel];
  const a = AGILE[sel];
  const blocks = [
    { t: "Qué le facilita el AM", v: a.facilitates, c: "#0d9488" },
    { t: "Qué espera el AM del rol", v: a.expects, c: "#0a6fb8" },
    { t: "Cadencia de interacción", v: a.cadence, c: "#1aa3c4" },
    { t: "Fricción típica y cómo se gestiona", v: a.friction, c: "#f59e0b" },
  ];
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-slate-800">El Agile Manager como orquestador</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-4">No es un rol técnico: es el "control plane" del equipo. Selecciona un rol para ver su interacción.</p>

      <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-200 p-4 mb-4">
        <div className="text-center text-[11px] text-slate-400 mb-2">↑ Liderazgo ejecutivo · Product Owner / Negocio ↑</div>
        <div className="mx-auto max-w-md rounded-xl py-2.5 text-center font-bold text-white mb-3"
          style={{ background: "linear-gradient(135deg,#0a6fb8,#1aa3c4)", boxShadow: "0 6px 18px -8px rgba(10,111,184,0.5)" }}>
          AGILE MANAGER
          <div className="text-[10px] font-normal text-sky-100">orquestador / control plane</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {ROLE_ORDER.map((k) => {
            const rr = ROLES[k]; const RIcon = rr.icon; const on = sel === k;
            return (
              <button key={k} onClick={() => setSel(k)}
                className="rounded-lg p-2 text-center transition-all bg-white"
                style={{ background: on ? rr.soft : "#ffffff", border: `1.5px solid ${on ? rr.color : "#e2e8f0"}` }}>
                <RIcon size={16} className="mx-auto" style={{ color: rr.color }} />
                <div className={`text-[10px] font-semibold mt-1 leading-tight ${on ? "text-slate-800" : "text-slate-500"}`}>{rr.short}</div>
              </button>
            );
          })}
        </div>
        <div className="text-center text-[11px] text-slate-400 mt-3">↓ Infraestructura · Seguridad/Compliance · Otros equipos ↓</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {blocks.map((b) => (
          <div key={b.t} className="rounded-xl bg-white ring-1 ring-slate-200 p-3.5 shadow-sm">
            <div className="text-sm font-semibold mb-1.5" style={{ color: b.c }}>{b.t}</div>
            <p className="text-[13px] text-slate-500 leading-relaxed">{b.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RaciView() {
  const [hl, setHl] = useState<number | null>(null);
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-slate-800">Matriz RACI de actividades clave</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-3">Pasa el cursor sobre una columna para resaltarla. A = Accountable · R = Responsible · C = Consulted · I = Informed.</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {Object.entries(RACI_COLORS).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="inline-block w-3 h-3 rounded" style={{ background: c }} />
            <b className="text-slate-700">{k}</b>
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl ring-1 ring-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="sticky left-0 z-10 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-600 min-w-[200px]">Actividad</th>
              {RACI_COLS.map((c, i) => (
                <th key={c} onMouseEnter={() => setHl(i)} onMouseLeave={() => setHl(null)}
                  className="px-2 py-2.5 text-[11px] font-semibold text-center cursor-default transition"
                  style={{ background: hl === i ? "#e0f2fe" : undefined, color: hl === i ? "#0a6fb8" : "#475569" }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACI.map((row, ri) => (
              <tr key={ri} className={ri % 2 ? "bg-slate-50/50" : "bg-white"}>
                <td className="sticky left-0 z-10 px-3 py-2 text-[12px] text-slate-600 font-medium" style={{ background: ri % 2 ? "#f8fafc" : "#ffffff" }}>{row.act}</td>
                {row.v.map((val, ci) => (
                  <td key={ci} onMouseEnter={() => setHl(ci)} onMouseLeave={() => setHl(null)}
                    className="px-2 py-2 text-center transition"
                    style={{ background: hl === ci ? "#f0f9ff" : undefined }}>
                    <span className="inline-flex items-center justify-center rounded-md text-[11px] font-bold px-1.5 py-0.5"
                      style={{
                        color: RACI_COLORS[val] ?? "#94a3b8",
                        background: `${RACI_COLORS[val] ?? "#94a3b8"}1f`,
                        border: `1px solid ${RACI_COLORS[val] ?? "#94a3b8"}55`,
                        opacity: hl !== null && hl !== ci ? 0.35 : 1,
                      }}>{val}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Solo un <b>A</b> (Accountable) por fila. "A/R" indica que el mismo rol ejecuta y es responsable final.</p>
    </div>
  );
}

/* ----------------------------- ROOT ----------------------------- */
export default function App() {
  const [tab, setTab] = useState("graph");
  const [role, setRole] = useState<string | null>(null);

  const tabs = [
    { k: "graph", label: "Roles y flujo", icon: Network },
    { k: "agile", label: "Agile Manager", icon: Workflow },
    { k: "raci", label: "Matriz RACI", icon: Table2 },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-700">
      <div className="mx-auto max-w-5xl px-3 sm:px-5 py-5">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="flex items-center justify-center rounded-xl" style={{ width: 38, height: 38, background: "linear-gradient(135deg,#0a6fb8,#1aa3c4)" }}>
            <Cloud size={20} className="text-white" />
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">Modelo de Roles de Datos e IA</h1>
            <p className="text-[11px] sm:text-xs text-slate-500">Roles como recursos de nube · niveles · carrera · interacciones</p>
          </div>
        </div>

        <div className="flex gap-1.5 my-4 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const TIcon = t.icon;
            const active = tab === t.k;
            return (
              <button key={t.k} onClick={() => { setTab(t.k); setRole(null); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: active ? "linear-gradient(135deg,#0a6fb8,#1aa3c4)" : "#ffffff",
                  color: active ? "#fff" : "#64748b",
                  border: `1px solid ${active ? "transparent" : "#e2e8f0"}`,
                  boxShadow: active ? "0 4px 12px -4px rgba(10,111,184,0.4)" : "none",
                }}>
                <TIcon size={15} /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 sm:p-5 shadow-sm">
          {tab === "graph" && (role ? <RoleDetail roleKey={role} onBack={() => setRole(null)} /> : <GraphView onSelect={setRole} />)}
          {tab === "agile" && <AgileView />}
          {tab === "raci" && <RaciView />}
        </div>

        <p className="text-center text-[10px] text-slate-400 mt-4">Basado en el informe "Modelo de Roles del Equipo de Datos e IA" · revisión sugerida cada 12 meses.</p>
      </div>
    </div>
  );
}
