Basándome en todo el contexto de la sesión y en lo que generan los proyectos más maduros de SDD para agentes de IA, aquí está el mapa completo y definitivo:

---

## Capa 1 — Contexto Global del Proyecto

Estos archivos existen una sola vez por proyecto. El agente los lee en toda sesión de trabajo.

---

### `constitution.md`
**Propósito:** Es el contrato inmutable del proyecto. Define las reglas que nunca cambian y que el agente debe respetar sin excepción. Si hay conflicto entre cualquier otro archivo y la constitution, la constitution gana.

| Sección | Propósito |
|---|---|
| **Core Principles** | Los principios filosóficos del proyecto: qué se prioriza (velocidad vs robustez, pragmatismo vs purismo) y cómo se toman decisiones cuando hay trade-offs. |
| **Canonical Stack** | El stack tecnológico aprobado con versiones exactas. El agente no puede proponer ni usar tecnologías fuera de esta lista. |
| **Conventions** | Convenciones de nomenclatura de archivos, carpetas, variables, funciones, clases, ramas de git, mensajes de commit. Con ejemplos concretos. |
| **Code Style** | Reglas de formato: indentación, longitud máxima de línea, uso de punto y coma, comillas simples o dobles, etc. |
| **Non-Negotiables** | Cosas que el agente nunca debe hacer bajo ninguna circunstancia: nunca usar `any` en TypeScript, nunca hacer commits directos a `main`, nunca instalar dependencias sin aprobarlas, etc. |
| **Error Handling Policy** | Cómo se manejan los errores en el proyecto: patrón Result vs try/catch, logging obligatorio, qué errores se propagan vs se absorben. |

---

### `product.md`
**Propósito:** Define el "por qué" del producto. Permite al agente tomar decisiones de producto alineadas con la visión, sin necesidad de preguntar constantemente.

| Sección | Propósito |
|---|---|
| **Vision** | Una o dos frases que describen el mundo que existe gracias a este producto. |
| **Problem Statement** | El problema concreto y doloroso que resuelve. Con contexto del estado actual (cómo lo hacen hoy los usuarios y por qué es malo). |
| **Target Users** | Descripción de los usuarios primarios y secundarios: quiénes son, qué saben, qué necesitan, qué no toleran. |
| **Value Proposition** | Qué hace este producto que ningún otro hace igual, o qué hace mucho mejor. |
| **Success Metrics** | Cómo se mide el éxito: métricas concretas (DAU, tiempo en tarea, NPS, errores por sesión). |
| **Out of Scope (Product)** | Qué problemas explícitamente no resuelve este producto, para evitar feature creep. |

---

### `architecture.md`
**Propósito:** Describe el sistema completo. Permite al agente entender dónde vive cada pieza, cómo se comunican y qué decisiones arquitectónicas ya están tomadas y por qué.

| Sección | Propósito |
|---|---|
| **System Overview** | Diagrama de alto nivel (Mermaid) del sistema completo. Muestra todos los componentes y sus relaciones. |
| **Components** | Descripción de cada componente o servicio: qué hace, qué no hace, quién lo consume, quién lo produce. |
| **Data Flow** | Cómo fluye la información entre componentes: diagramas de secuencia para los flujos más importantes del sistema. |
| **Data Model** | El modelo de datos central: entidades principales, sus atributos y las relaciones entre ellas. Puede ser ERD en Mermaid. |
| **External Services** | Servicios de terceros integrados: APIs externas, SDKs, proveedores cloud. Para cada uno: por qué se eligió y qué alternativas se descartaron. |
| **Security Model** | Modelo de autenticación y autorización. Quién puede hacer qué. Cómo se protegen los datos sensibles. |
| **Architecture Decision Records (ADRs)** | Registro de decisiones arquitectónicas importantes. Para cada decisión: contexto, opciones evaluadas, decisión tomada, consecuencias. |

---

### `agents.md`
**Propósito:** Manual operativo del agente de IA. Es el archivo más importante para que el agente funcione correctamente. Sin este archivo, el agente adivina cómo operar. Con él, sabe exactamente qué hacer en cada situación.

| Sección | Propósito |
|---|---|
| **Commands** | Todos los comandos del proyecto con sus flags exactos: `pnpm dev`, `pnpm build`, `pnpm test --coverage`, `pnpm lint --fix`. Sin abreviar. |
| **Project Structure** | El árbol de carpetas del proyecto con una línea explicando qué vive en cada carpeta. El agente lo usa para saber dónde crear y buscar archivos. |
| **Testing Strategy** | Framework de testing, dónde viven los tests, cómo se nombran, qué se testea unitariamente vs e2e, comando para correr tests. |
| **Git Workflow** | Estrategia de branches, formato de mensajes de commit, cuándo hacer PR, proceso de revisión. |
| **Development Workflow** | Cómo es el ciclo de desarrollo: cómo arrancar el entorno, cómo probar cambios, cómo hacer debug. |
| **Boundaries** | Lo que el agente nunca debe tocar sin permiso explícito: archivos de configuración de producción, secrets, esquema de base de datos en producción, código de terceros. |
| **When to Ask** | Lista de situaciones donde el agente debe detenerse y preguntar en lugar de asumir: cuando necesita credenciales, cuando un cambio afecta la API pública, cuando hay ambigüedad en los requisitos. |
| **Debugging Guide** | Problemas comunes que ocurren en el proyecto y cómo resolverlos. Evita que el agente pierda tiempo en errores conocidos. |

---

## Capa 2 — Especificación por Feature

Estos tres archivos se crean por cada feature y forman un flujo lineal: primero `requirements`, luego `design`, luego `tasks`.

---

### `requirements.md`
**Propósito:** Define qué se construye y por qué, desde la perspectiva del usuario y del negocio. El agente no escribe código hasta que este archivo existe y está aprobado. Es el contrato entre producto y engineering.

| Sección | Propósito |
|---|---|
| **Overview** | Resumen ejecutivo de la feature en 3-5 líneas: qué es, qué problema resuelve, cuál es el resultado esperado. |
| **User Stories** | Historias de usuario en formato `As a [rol], I want [acción], so that [valor]`. Cada historia tiene un ID único (US-001, US-002). |
| **Acceptance Criteria** | Criterios verificables y binarios por cada User Story. Usan formato Given/When/Then o lista de condiciones. Son la definición de "done" para QA y el agente. |
| **Functional Requirements** | Requisitos funcionales explícitos que no caben en una User Story: reglas de negocio, cálculos específicos, validaciones, comportamientos edge case. |
| **Non-Functional Requirements** | Requisitos de rendimiento, seguridad, accesibilidad, compatibilidad. Con valores numéricos concretos cuando aplica (p95 < 200ms, WCAG AA). |
| **Out of Scope** | Lo que esta feature explícitamente no hace. Igual de importante que lo que sí hace. Previene malentendidos y scope creep. |
| **Open Questions** | Preguntas sin respuesta que bloquean o afectan el diseño. Cada pregunta tiene un responsable y una fecha límite para resolverse. |
| **Dependencies** | Otras features o sistemas de los que depende esta feature para poder implementarse. |

---

### `design.md`
**Propósito:** Define cómo se construye la feature técnicamente. Es el puente entre los requisitos y las tareas de implementación. El agente usa este documento como su referencia técnica durante el desarrollo.

| Sección | Propósito |
|---|---|
| **Technical Approach** | Explicación de la solución técnica elegida en prosa: qué patrón se usa, cómo encaja en la arquitectura existente, qué librerías se involucran. |
| **Alternative Approaches** | Alternativas que se evaluaron y por qué se descartaron. Evita que futuros desarrolladores o el agente "redescubran" caminos ya explorados. |
| **Data Model Changes** | Cambios al modelo de datos existente: nuevas tablas, nuevos campos, cambios a relaciones, migraciones necesarias. |
| **API Design** | Endpoints nuevos o modificados: método HTTP, path, request body, response body, códigos de estado, errores posibles. En formato OpenAPI o similar. |
| **Component Design** | Para features de frontend: qué componentes se crean, cuáles se reutilizan, árbol de componentes, props y estado. |
| **Sequence Diagrams** | Diagramas de secuencia (Mermaid) para los flujos más complejos: qué actores participan, en qué orden, qué mensajes se intercambian. |
| **Error Handling** | Cómo maneja esta feature cada tipo de error: errores de validación, errores de red, errores de base de datos, estados edge. |
| **Security Considerations** | Vectores de ataque relevantes para esta feature y cómo se mitigan: autenticación requerida, autorización, validación de inputs, rate limiting. |
| **Performance Considerations** | Cuellos de botella potenciales y cómo se resuelven: queries que necesitan índices, datos que se cachean, paginación, lazy loading. |
| **Testing Strategy (Feature)** | Qué se testea de esta feature específica: qué casos unitarios son críticos, qué flujos requieren tests de integración, si necesita tests e2e. |
| **Constraints & Assumptions** | Limitaciones técnicas conocidas y suposiciones que se tomaron al diseñar. Si una suposición resulta falsa, el diseño puede necesitar revisión. |

---

### `tasks.md`
**Propósito:** Es el plan de trabajo concreto y accionable para implementar la feature. El agente ejecuta estas tareas en orden. Cada tarea es lo suficientemente pequeña como para completarse en una sesión de trabajo sin perder contexto.

| Sección | Propósito |
|---|---|
| **US-001: [Nombre de la User Story]** | Agrupa las tareas que implementan la primera User Story. Cada User Story tiene su propia sección para facilitar entrega incremental. |
| → Tarea `[T001]` | Tarea atómica con: descripción de lo que hace, archivos que afecta, criterio de verificación (cómo saber que está done). |
| → Tarea `[T002]` | Siguiente tarea. Si puede ejecutarse en paralelo con otra, se marca con `[P]`. |
| **US-002: [Nombre de la User Story]** | Segunda User Story con sus tareas. |
| **Shared / Infrastructure Tasks** | Tareas que no pertenecen a una User Story específica pero son necesarias: setup de base de datos, configuración de feature flags, creación de tipos compartidos. |
| **Verification Checklist** | Lista final de verificación antes de considerar la feature completa: todos los acceptance criteria pasados, tests escritos y pasando, documentación actualizada, PR creado. |

---

## Capa 3 — Documentos de Soporte (opcionales pero recomendados)

---

### `decisions.md` (a nivel proyecto)
**Propósito:** Log centralizado de decisiones importantes que no encajan en un ADR de arquitectura pero que son relevantes para entender por qué el proyecto está como está.

| Sección | Propósito |
|---|---|
| **[YYYY-MM-DD] Título de la decisión** | Cada decisión tiene fecha, contexto, opciones consideradas, decisión tomada y consecuencias. El agente lo consulta antes de proponer cambios que podrían revertir decisiones ya tomadas. |

---

### `glossary.md` (a nivel proyecto)
**Propósito:** Diccionario de términos del dominio del negocio. Evita ambigüedades cuando el lenguaje del negocio difiere del lenguaje técnico.

| Sección | Propósito |
|---|---|
| **Term: [Término]** | Definición exacta del término en el contexto de este proyecto. Si hay sinónimos o términos que se usan indistintamente, se documenta aquí cuál es el término canónico. |

---

### `progress.md` (a nivel feature, generado por el agente)
**Propósito:** El agente lo escribe y actualiza. Es el diario de trabajo de la implementación. Permite retomar el contexto después de una sesión interrumpida sin empezar de cero.

| Sección | Propósito |
|---|---|
| **Current Status** | Qué está done, qué está en progreso, qué está bloqueado. |
| **Last Session Summary** | Qué se hizo en la última sesión, qué decisiones se tomaron, qué problemas se encontraron. |
| **Next Steps** | Las próximas 3-5 acciones concretas a ejecutar. |
| **Blockers** | Qué impide avanzar y qué se necesita para desbloquearse. |
| **Context for Agent** | Información técnica específica que el agente necesita recordar entre sesiones: variables de entorno usadas, rutas de archivos importantes, decisiones locales tomadas durante la implementación. |

---

## Resumen visual del sistema completo

```
proyecto/
│
├── constitution.md     → reglas inmutables
├── product.md          → visión y usuarios  
├── architecture.md     → sistema completo
├── agents.md           → manual del agente
├── decisions.md        → log de decisiones
├── glossary.md         → diccionario del dominio
│
└── features/
    └── {nombre-feature}/
        ├── requirements.md  → qué se construye
        ├── design.md        → cómo se construye
        ├── tasks.md         → plan de ejecución
        └── progress.md      → diario del agente
```

**Total: 10 tipos de archivo, 67 secciones definidas.** Eso es lo que tu editor debe tener pre-cargado, esperando contenido.