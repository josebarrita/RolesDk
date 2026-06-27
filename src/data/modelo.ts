/* ============================================================================
   MODELO DE ROLES DE DATOS E IA — CONTENIDO EDITABLE
   ============================================================================

   📝 ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS TOCAR PARA CAMBIAR TEXTOS.

   Aquí vive TODO el contenido que se ve en la app: roles, niveles,
   descripciones, flujos del grafo, tipos de proyecto, Agile Manager y RACI.
   No hay lógica de programación en este archivo, solo datos.

   ----------------------------------------------------------------------------
   CÓMO EDITAR SIN ROMPER NADA — 5 REGLAS DE ORO
   ----------------------------------------------------------------------------
   1. Solo cambia el texto que está ENTRE COMILLAS "...".
      Ejemplo:  mission: "Garantizar que..."   ← cambia solo lo de adentro.

   2. NO borres las comillas, ni las comas, ni las llaves { } o corchetes [ ].
      Son la "estructura". Si borras una, la app deja de compilar.

   3. Si un texto lleva comillas dentro, usa comillas simples adentro:
      CORRECTO:  "Define el 'qué' y el 'cómo'."
      EVITA:     "Define el "qué" y el "cómo"."   ← rompe el texto.

   4. Después de editar, prueba SIEMPRE con  npm run dev  antes de publicar.
      Si la terminal muestra texto en rojo, deshaz tu último cambio.

   5. Cada elemento de una lista termina en coma. Respeta ese patrón.

   ----------------------------------------------------------------------------
   MAPA RÁPIDO DE ESTE ARCHIVO
   ----------------------------------------------------------------------------
   ROLE_ORDER ...... El orden de los 4 roles en el grafo.
   ROLES ........... El contenido principal: cada rol con sus 5 niveles.
   LEVELS .......... Los nombres de los 5 niveles de seniority.
   DIMS ............ Las 5 fichas de cada nivel (Responsabilidades, etc.).
   VALUE_FLOW ...... Las flechas del grafo y sus etiquetas.
   PROJECT_TYPES ... El selector de tipo de proyecto y qué flujos activa.
   LATERAL ......... Los movimientos laterales entre roles.
   AGILE ........... Los textos de la pestaña Agile Manager.
   RACI ............ Las filas de la matriz RACI.
   RACI_COLS ....... Los encabezados de la tabla RACI.
   RACI_COLORS ..... El color de cada letra (A/R, R, C, I).

   ----------------------------------------------------------------------------
   ⚠️  CAMBIOS QUE NECESITAN MÁS CUIDADO (avisa a quien programe)
   ----------------------------------------------------------------------------
   - Cambiar 'icon:' de un rol → requiere importar el ícono nuevo arriba.
   - Cambiar 'color:' o 'pos:' de un rol → afecta el dibujo del grafo.
   - Agregar/quitar un ROL completo o un NIVEL → afecta la lógica; coordínalo.
   - Los 'id' de VALUE_FLOW y las 'key' de PROJECT_TYPES son identificadores
     internos: cámbialos solo si sabes lo que haces.
   ============================================================================ */

import { Database, Brain, BarChart3, Sparkles, ListChecks, Wrench, Compass, Target, Gauge } from "lucide-react";

export const ROLE_ORDER = ["de", "ds", "bi", "ia"];

export const ROLES = {
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

export const LEVELS = ["Junior", "Semisenior", "Senior", "Líder Técnico", "Líder Especialista"];
export const DIMS = [
  { key: "resp", label: "Responsabilidades", icon: ListChecks },
  { key: "hab", label: "Habilidades", icon: Wrench },
  { key: "alc", label: "Alcance", icon: Compass },
  { key: "aut", label: "Autonomía", icon: Target },
  { key: "kpi", label: "KPIs", icon: Gauge },
];

export const VALUE_FLOW: { id: string; a: string; b: string; label: string }[] = [
  { id: "de-ds", a: "de", b: "ds", label: "datos limpios" },
  { id: "de-ia", a: "de", b: "ia", label: "datos para IA" },
  { id: "de-bi", a: "de", b: "bi", label: "datos modelados" },
  { id: "ds-ia", a: "ds", b: "ia", label: "modelos" },
  { id: "ds-bi", a: "ds", b: "bi", label: "insights" },
  { id: "ia-bi", a: "ia", b: "bi", label: "features IA" },
];

// Tipos de proyecto: qué flujos están activos en cada uno.
// "opt" marca flujos opcionales (se ven atenuados con etiqueta "opcional").
export const PROJECT_TYPES: { key: string; label: string; active: string[]; opt?: string[] }[] = [
  { key: "all", label: "Ver todo", active: ["de-ds", "de-ia", "de-bi", "ds-ia", "ds-bi", "ia-bi"] },
  { key: "chatbot", label: "Chatbot / LLM externo", active: ["de-ia", "ia-bi"] },
  { key: "modelo", label: "Modelo propio en producción", active: ["de-ds", "ds-ia", "ia-bi"] },
  { key: "rag", label: "RAG corporativo", active: ["de-ia", "ia-bi"], opt: ["ds-ia"] },
  { key: "analitica", label: "Analítica / Dashboard", active: ["de-ds", "de-bi", "ds-bi"] },
  { key: "agentes", label: "Agentes SQL", active: ["de-ia", "de-bi", "ia-bi"] },
];
export const LATERAL = [
  { a: "de", b: "ia", note: "Aporta fortaleza en infraestructura; debe sumar conocimiento de LLMs y evals." },
  { a: "ds", b: "ia", note: "Aporta dominio de modelos; debe sumar ingeniería de producción y costos." },
  { a: "bi", b: "ds", note: "Aporta conocimiento de negocio; debe reforzar Python y estadística." },
  { a: "de", b: "ds", note: "Movimiento al mismo nivel o uno abajo, con plan de nivelación de 3-6 meses." },
];

export const AGILE: Record<string, { facilitates: string; expects: string; cadence: string; friction: string }> = {
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

export const RACI = [
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
export const RACI_COLS = ["Ing. Datos", "Científico", "Analista BI", "Ing. IA", "Agile Mgr", "Líder T./E."];
export const RACI_COLORS: Record<string, string> = { "A/R": "#0d9488", "A": "#1aa3c4", "R": "#0a6fb8", "C": "#f59e0b", "I": "#94a3b8" };


/* ============================================================================
   ASIGNACIONES DE PERSONAS  (USER_ASSIGNMENTS)
   ============================================================================
   Tabla que conecta a cada persona con su rol, su nivel y el proyecto en el
   que está. Permite que alguien elija su nombre y la app lo lleve directo a
   su vista, con el tipo de proyecto ya prefiltrado.

   ----------------------------------------------------------------------------
   CÓMO AGREGAR O EDITAR UNA PERSONA
   ----------------------------------------------------------------------------
   Copia una línea existente y cambia los valores. Cada persona es un objeto:

     { email: "ana.perez@dataknow.io", name: "Ana Pérez",
       role: "de", level: "Senior", project: "rag" },

   Significado de cada campo:
   - email ...  Correo corporativo. Hoy es solo un identificador.
                🔮 EL DÍA QUE IT HABILITE ENTRA ID, este es el dato que el
                login devolverá automáticamente para reconocer a la persona.
                Por eso conviene usar el correo real desde ya.
   - name ....  Nombre que se muestra en pantalla.
   - role ....  Rol. Debe ser uno de: "de", "ds", "bi", "ia"
                (de=Ing. Datos, ds=Científico, bi=Analista BI, ia=Ing. IA)
   - level ...  Nivel. Debe ser uno de los de LEVELS:
                "Junior", "Semisenior", "Senior", "Líder Técnico", "Líder Especialista"
   - project .  Proyecto asignado. Debe ser una 'key' de PROJECT_TYPES:
                "all", "chatbot", "modelo", "rag", "analitica", "agentes"
                (usa "all" si la persona no está en un proyecto específico)

   ⚠️ Los valores de role, level y project deben coincidir EXACTAMENTE con los
      definidos arriba, o la persona no se mostrará bien. Respeta mayúsculas.

   NOTA: Estos son datos de ejemplo. Reemplázalos por personas reales.
   ============================================================================ */
export const USER_ASSIGNMENTS: { email: string; name: string; role: string; level: string; project: string }[] = [
  { email: "ana.perez@dataknow.io",    name: "Ana Pérez",      role: "de", level: "Senior",          project: "rag" },
  { email: "carlos.gomez@dataknow.io", name: "Carlos Gómez",   role: "ds", level: "Semisenior",      project: "modelo" },
  { email: "lucia.rojas@dataknow.io",  name: "Lucía Rojas",    role: "ia", level: "Junior",          project: "chatbot" },
  { email: "marta.diaz@dataknow.io",   name: "Marta Díaz",     role: "bi", level: "Líder Técnico",   project: "analitica" },
  { email: "jose.barrita@dataknow.io", name: "José Barrita",   role: "ia", level: "Senior",          project: "agentes" },
];
