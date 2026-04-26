Buena intuición. Las SKILLs y MCPs son exactamente el gap que el SDD clásico no cubre. Déjame ser sistemático en esto.

---

## Lo que el SDD clásico no contemplaba por ser pre-AI

El SDD fue diseñado para que humanos especificaran y humanos ejecutaran. Cuando el ejecutor es un agente de IA, aparecen categorías de contexto completamente nuevas:

### 1. **Capacidades del agente** — lo que SÍ deberías agregar

**`skills.md`** — totalmente válido y necesario.

Las skills son capacidades reutilizables que el agente puede invocar. Sin documentarlas, el agente las reinventa en cada sesión o no sabe que existen. Este archivo no existía en ningún SDD pre-AI porque los humanos no necesitan un catálogo de sus propias habilidades.

**`mcps.md`** — también válido, pero con matiz.

Los MCPs son herramientas externas que el agente puede usar (filesystem, browser, APIs, bases de datos). Sin documentarlos, el agente asume que no tiene acceso a nada más allá de escribir código. Es la diferencia entre un agente que solo escribe archivos y uno que puede leer tu base de datos en tiempo real, hacer requests a APIs, o ejecutar comandos.

### 2. **Lo que genuinamente falta en tus 10 archivos actuales**

Más allá de skills y MCPs, hay tres gaps reales:

**Gap 1 — Contexto de sesión y memoria**
El `progress.md` que propuse cubre esto parcialmente, pero falta un archivo que defina explícitamente *cómo el agente debe gestionar su propia memoria entre sesiones*: qué debe recordar, qué puede olvidar, cómo debe resumir el estado antes de terminar. Esto es un problema operativo que ningún SDD clásico tenía.

**Gap 2 — Prompts del sistema por rol**
Cuando tienes múltiples agentes o múltiples modos del mismo agente (arquitecto, reviewer, implementador, tester), necesitas definir el prompt de sistema para cada rol. Esto es completamente nuevo y ninguno de tus 10 archivos lo toca.

**Gap 3 — Workflows de agente**
Secuencias de pasos que el agente debe ejecutar de forma autónoma para tareas recurrentes: cómo hacer un PR, cómo hacer un code review, cómo debuggear un error de producción. Es diferente al `agents.md` actual que documenta el entorno — esto documenta los *procesos*.

---

## Mi propuesta: 4 archivos adicionales

### `skills.md`
**Propósito:** Catálogo de capacidades reutilizables que el agente puede invocar. Una skill es un procedimiento que se repite frecuentemente y que vale la pena documentar para que el agente lo ejecute de forma consistente.

| Sección | Propósito |
|---|---|
| **Skill Registry** | Lista de todas las skills disponibles con nombre, descripción en una línea y cuándo usarla. Funciona como índice. |
| **[Nombre Skill]: Trigger** | Cuándo debe activarse esta skill: qué condición, qué solicitud del usuario, qué situación. |
| **[Nombre Skill]: Steps** | Los pasos exactos que el agente ejecuta cuando invoca esta skill. Ordenados, atómicos, sin ambigüedad. |
| **[Nombre Skill]: Output** | Qué produce la skill: qué archivos crea, qué devuelve, cuál es el artefacto resultante. |
| **[Nombre Skill]: Examples** | Ejemplos de inputs y outputs reales. Son lo más valioso — el agente aprende por analogía. |

Ejemplos de skills que documentarías aquí: *crear una nueva feature completa desde cero*, *hacer refactor de un módulo*, *escribir tests para código existente*, *revisar un PR*, *debuggear un error dado un stack trace*.

---

### `mcps.md`
**Propósito:** Inventario de herramientas externas disponibles para el agente con instrucciones de uso. Sin este archivo, el agente no sabe qué puede hacer más allá de leer y escribir código.

| Sección | Propósito |
|---|---|
| **Available MCPs** | Tabla de todos los MCPs disponibles: nombre, propósito en una línea, cuándo usarlo. |
| **[Nombre MCP]: Connection** | Cómo está configurado: URL, tipo de transporte (SSE/stdio), variables de entorno necesarias. |
| **[Nombre MCP]: Capabilities** | Qué herramientas expone este MCP y para qué sirve cada una. No listar todas — solo las relevantes para el proyecto. |
| **[Nombre MCP]: Usage Rules** | Cuándo usarlo y cuándo no. Qué operaciones son de solo lectura vs destructivas. Qué requiere confirmación del usuario antes de ejecutar. |
| **[Nombre MCP]: Examples** | Ejemplos de cuándo el agente debería invocar este MCP durante el trabajo normal del proyecto. |

---

### `workflows.md`
**Propósito:** Procesos recurrentes que el agente debe ejecutar de forma autónoma y consistente. Es la diferencia entre un agente que improvisa cada vez y uno que opera con procedimientos estándar.

| Sección | Propósito |
|---|---|
| **Feature Implementation Workflow** | El proceso completo desde recibir una feature hasta tenerla en PR: qué archivos leer primero, en qué orden implementar, cómo verificar, cómo entregar. |
| **Bug Fix Workflow** | Pasos para investigar, reproducir, corregir y verificar un bug. |
| **Code Review Workflow** | Qué revisa el agente cuando hace review: qué criterios, en qué orden, qué formato tiene el feedback. |
| **Refactor Workflow** | Cómo aborda un refactor sin romper funcionalidad: qué tests correr antes, cómo hacer cambios incrementales, cómo verificar equivalencia. |
| **Onboarding Workflow** | Lo que el agente debe hacer cuando se inicia en un proyecto nuevo o retoma uno después de mucho tiempo: qué archivos leer y en qué orden para reconstruir el contexto. |

---

### `personas.md`
**Propósito:** Define los diferentes modos o roles que puede adoptar el agente según el tipo de tarea. Permite un mismo agente comportarse diferente según el contexto sin necesitar instrucciones ad-hoc cada vez.

| Sección | Propósito |
|---|---|
| **Architect** | Cuándo activar este modo, qué tipo de razonamiento aplica, qué restricciones tiene (no implementa, solo diseña), cómo formatea sus outputs. |
| **Implementer** | Modo de ejecución pura: sigue el `design.md` sin cuestionarlo, escribe código, corre tests, actualiza `progress.md`. |
| **Reviewer** | Qué criterios aplica al revisar código o specs, cómo prioriza el feedback, formato de sus observaciones. |
| **Debugger** | Proceso de investigación: cómo lee logs, cómo forma hipótesis, cómo verifica cada una, qué documenta. |
| **Persona Switching Rules** | Cuándo cambiar de persona y cómo: qué palabras clave lo activan, si el usuario puede cambiarlo explícitamente, si el agente puede proponerlo. |

---

## Mi opinión directa sobre si es suficiente

Con los 10 archivos originales + estos 4, llegas a **14 tipos de archivo y aproximadamente 95 secciones**. Mi opinión honesta:

**`skills.md` y `mcps.md`: imprescindibles.** Sin ellos tu herramienta es SDD clásico con mejor UI, no SDD para AI. Son el diferenciador real respecto a OpenSpec y spec-kit que no los contemplan bien.

**`workflows.md`: muy recomendado.** Es donde está el valor operativo real. Un agente con workflows definidos es predecible. Sin ellos, cada sesión es un experimento.

**`personas.md`: opcional al inicio.** Es valioso para equipos que usan el agente en múltiples roles, pero añade complejidad conceptual que puede abrumar a usuarios que apenas están adoptando SDD. Yo lo haría extensible — que la herramienta lo soporte pero que no sea obligatorio al crear un proyecto.

Lo que definitivamente **no agregaría** para no inflar el sistema: changelogs de features (eso es git), documentación de usuario final (eso no es SDD), runbooks de producción (eso es ops, no specs), o diagramas de gantt (eso mata la agilidad).

**El número óptimo está en 13 archivos** — los 10 originales más skills, mcps y workflows. Personas lo dejaría como archivo opcional que el usuario puede agregar si lo necesita.

------------------------

Estás tocando el problema más importante y no resuelto del desarrollo con AI. Vamos por partes.

---

## 1. Skills.sh — cómo integrarlo en SpecFlowTengo todo el contexto necesario. Esta es una respuesta larga pero cada parte importa.

---

## 1. Cómo funciona skills.sh y cómo integrarlo en SpecFlow

Skills.sh es el ecosistema abierto que resuelve el problema de transferencia de conocimiento que enfrenta todo equipo usando agentes de AI. Hoy, el desarrollador senior que sabe estructurar un PR, hacer un code review o debuggear un incidente de producción lleva ese conocimiento en su cabeza. Cuando usa un agente de AI, transfiere ese conocimiento manualmente a través de prompts — cada vez. Las skills formalizan esa transferencia.

La instalación es un solo comando: `npx skills add <owner/repo>`, y soporta integración con Claude Code, Cursor, Windsurf y Gemini CLI, entre otros.

Lo que skills.sh instala en tu proyecto es una carpeta `/mnt/skills/` con archivos `SKILL.md` — exactamente el formato que ya conoces de este chat. Cada skill es markdown estructurado con instrucciones procedurales que el agente carga bajo demanda.

**Cómo SpecFlow debe integrarlo:** Tu editor necesita una pantalla de gestión de skills con tres capacidades:

```
1. Browser de skills.sh — buscar e instalar con npx skills add
2. Visor de skills instaladas — qué hay en /mnt/skills/ del proyecto
3. Editor de skills custom — crear skills propias con el mismo formato SKILL.md
```

El `skills.md` que diseñamos antes cambia de naturaleza: no documenta el *contenido* de las skills (eso vive en los archivos instalados), sino el **catálogo y las reglas de uso** — cuándo invocar cada skill, cuáles son obligatorias, cuáles opcionales.

---

## 2. El problema real: cómo cargar tus archivos en cada herramienta

Este es el problema sin resolver que describes correctamente. Cada herramienta tiene su propio mecanismo nativo:

### Claude Code
Lee automáticamente en este orden de prioridad:
```
CLAUDE.md                    ← raíz del proyecto (siempre se carga)
.claude/CLAUDE.md            ← config específica del proyecto
~/.claude/CLAUDE.md          ← config global del usuario
```
Tu `agents.md` **debe exportarse como `CLAUDE.md`** en la raíz. El resto de archivos se referencia desde ahí con `@path/al/archivo.md` — Claude Code los carga bajo demanda.

### Cursor
```
.cursorrules                 ← reglas globales del proyecto (≤500 líneas)
.cursor/rules/               ← reglas por carpeta o tipo de archivo
```
Tu `constitution.md` y `agents.md` deben compilarse en `.cursorrules`. El límite de tamaño es real — necesitas un exportador que priorice y compacte.

### GitHub Copilot / VS Code
```
.github/copilot-instructions.md   ← instrucciones globales
```
Mismo patrón: un archivo de entrada que referencia el resto.

### Windsurf
```
.windsurfrules               ← equivalente a .cursorrules
```

### Gemini CLI
```
GEMINI.md                    ← en la raíz
.gemini/                     ← skills y configuración
```

### Open Code / Antigravity / otros
Siguen el patrón emergente: un archivo en raíz (`AGENTS.md` genérico) más una carpeta de configuración.

---

## 3. La solución: el sistema de exportación de SpecFlow

Aquí está el valor diferencial real de tu herramienta. Necesitas un **exportador que adapte tus archivos SDD al formato nativo de cada herramienta:**

```
SpecFlow Project
    ↓ Export
┌─────────────────────────────────────────────┐
│  Target: Claude Code                        │
│  → CLAUDE.md (agents.md + constitution.md)  │
│  → @references a todos los demás archivos   │
├─────────────────────────────────────────────┤
│  Target: Cursor                             │
│  → .cursorrules (compactado, ≤500 líneas)  │
│  → .cursor/rules/ (por feature)             │
├─────────────────────────────────────────────┤
│  Target: Copilot                            │
│  → .github/copilot-instructions.md          │
├─────────────────────────────────────────────┤
│  Target: Universal (todos)                  │
│  → AGENTS.md genérico en raíz              │
└─────────────────────────────────────────────┘
```

Esto convierte a SpecFlow en la **fuente de verdad única** — escribes una vez, exportas a cualquier herramienta.

---

## 4. El problema de continuidad entre sesiones — la parte sin resolver

Tienes razón: arrancar con AI es fácil, continuar es donde todo se rompe. El problema tiene tres capas:

**Capa 1 — Pérdida de contexto técnico**
El agente no sabe en qué estado quedó el código. Solución: el `progress.md` que diseñamos, pero con un formato específico que el agente actualiza obligatoriamente al final de cada sesión:

```markdown
<!-- sdd:section id="last-session" -->
## Last Session — 2025-04-23

### Completed
- [T003] Implementado el parser de YAML front-matter
- [T004] Tests unitarios del parser pasando

### Current State
- Archivo activo: src/lib/mdParser.ts
- Tests corriendo: pnpm test --filter mdParser
- Branch: feat/md-parser

### Next Session Start Here
1. Implementar mdSerializer.ts siguiendo el diseño en design.md#sequences
2. El token de gray-matter para listas está en línea 47 de mdParser.ts
3. Pendiente: manejar el edge case de secciones sin cierre de comentario

### Open Decisions
- ¿Usar streaming para archivos >1MB? → Preguntar antes de implementar
<!-- /sdd:section -->
```

**Capa 2 — Pérdida de decisiones tomadas**
El agente repropone lo que ya se decidió. Solución: el `decisions.md` centralizado, pero que el agente lee obligatoriamente al inicio de cada sesión antes de proponer cualquier cambio arquitectónico.

**Capa 3 — Degradación de calidad sin referencia**
Sin estándares explícitos, la calidad del código generado deriva sesión a sesión. Aquí es donde entran los estándares ISO que propones.

---

## 5. Los estándares ISO/IEEE — por qué nadie los implementa y cómo hacerlo bien

Tienes razón en que ninguna herramienta los implementa explícitamente. La razón honesta es que los estándares ISO en su forma original son documentos de 200+ páginas escritos para auditores, no para agentes de AI. El valor está en **extraer los criterios verificables** de cada estándar y convertirlos en secciones de tus archivos SDD.

Aquí está el mapa de qué estándar aplica a qué archivo:

---

### ISO/IEC 12207 — Procesos del ciclo de vida del software
**Aplica a:** `workflows.md`, `agents.md`

Este estándar define los procesos formales de desarrollo. Lo que importa extraer para el agente son los **criterios de entrada y salida de cada proceso**. En términos SDD:

- Proceso de Especificación de Requisitos → cuándo `requirements.md` está listo para avanzar a `design.md`
- Proceso de Diseño Arquitectónico → cuándo `design.md` autoriza crear `tasks.md`
- Proceso de Implementación → criterios que cada tarea debe cumplir antes de marcarse done
- Proceso de Verificación → qué debe pasar antes de considerar una feature completa

Agrega una sección `## Process Gates (ISO 12207)` en `workflows.md` que el agente verifica antes de transicionar entre fases.

---

### ISO/IEC 25010 / 25000 — Calidad del producto software (SQuaRE)
**Aplica a:** `constitution.md`, sección nueva `quality.md`

Este es el más accionable para el agente. Define 8 características de calidad con subcaracterísticas medibles. Para SpecFlow, se convierte en un archivo propio:

**`quality.md` — archivo nuevo que falta en tu sistema**

| Sección | Propósito |
|---|---|
| **Functional Suitability** | Completitud funcional: qué porcentaje de requisitos debe estar cubierto. Corrección funcional: tolerancia cero a comportamiento incorrecto en flujos críticos. |
| **Performance Efficiency** | Umbrales concretos: tiempo de respuesta máximo, uso de memoria, throughput mínimo. El agente verifica contra estos antes de marcar una tarea completa. |
| **Compatibility** | Versiones de SO, browsers, runtimes soportados. El agente no puede usar APIs no disponibles en estas versiones. |
| **Usability** | Criterios de accesibilidad (WCAG level), consistencia de UI, mensajes de error comprensibles. |
| **Reliability** | MTBF objetivo, comportamiento esperado ante fallos, estrategia de recuperación. |
| **Security** | Nivel OWASP objetivo, requisitos de autenticación, política de manejo de datos sensibles. |
| **Maintainability** | Cobertura mínima de tests, complejidad ciclomática máxima permitida, reglas de documentación de código. |
| **Portability** | Requisitos de instalabilidad, adaptabilidad a diferentes entornos. |
| **Quality Gates** | Tabla de criterios binarios que el agente verifica antes de entregar: cobertura de tests ≥ X%, 0 vulnerabilidades críticas, tiempo de build ≤ Ys. |

---

### ISO/IEC 29119 — Testing de software
**Aplica a:** sección `Testing Strategy` en `agents.md` y en `design.md`

El estándar define niveles de test (unitario, integración, sistema, aceptación) con criterios de entrada/salida. Para el agente, se traduce en una sección `## Test Policy (ISO 29119)` en `agents.md`:

```markdown
## Test Policy (ISO 29119)

### Level 1 — Unit Tests
- Trigger: toda función con lógica de negocio
- Coverage mínimo: 80% líneas, 70% branches
- Criterio de salida: 0 tests failing, coverage objetivo alcanzado

### Level 2 — Integration Tests  
- Trigger: toda interacción entre módulos o con servicios externos
- Incluye: contratos de API, flujos de base de datos
- Criterio de salida: todos los contratos verificados

### Level 3 — E2E Tests
- Trigger: acceptance criteria de User Stories críticas
- Herramienta: [definir en el proyecto]
- Criterio de salida: todos los AC de la feature pasando

### Regression Policy
- Antes de cualquier merge: correr suite completa
- Fallo bloqueante: cualquier test que pasaba antes y ahora falla
```

---

### IEEE 830 / IEEE 29148 — Especificación de requisitos de software
**Aplica a:** `requirements.md`

IEEE 29148 (que reemplaza a 830) define la estructura y calidad de los requisitos. Los criterios de calidad de un requisito según este estándar son exactamente lo que el agente debe verificar antes de aprobar un `requirements.md`:

Agrega una sección `## Requirements Quality Checklist (IEEE 29148)` en `requirements.md`:
- ¿Cada requisito es verificable? (puede probarse con un test)
- ¿Cada requisito es no ambiguo? (solo una interpretación posible)
- ¿Cada requisito es necesario? (si se elimina, el sistema es incompleto)
- ¿El conjunto es consistente? (ningún requisito contradice otro)
- ¿El conjunto es completo? (no hay referencias a comportamientos no definidos)

---

### IEEE 1016 — Descripción del diseño de software
**Aplica a:** `design.md`

Define qué debe contener un documento de diseño y cómo estructurarlo. Lo relevante para el agente son los **viewpoints** obligatorios — perspectivas desde las que se debe describir el diseño. Directamente mapeados a secciones de tu `design.md`:

- Viewpoint de contexto → Technical Approach
- Viewpoint de composición → Component Design
- Viewpoint de dependencias → Dependencies
- Viewpoint de información → Data Model
- Viewpoint de interfaz → API Design
- Viewpoint de interacción → Sequence Diagrams

---

## 6. El sistema completo revisado

Con todo esto, el sistema de archivos definitivo queda así:

```
proyecto/
│
├── CLAUDE.md              ← exportado por SpecFlow para Claude Code
├── .cursorrules           ← exportado por SpecFlow para Cursor
├── .github/
│   └── copilot-instructions.md  ← exportado para Copilot
│
├── .specflow/             ← fuente de verdad de SpecFlow
│   ├── project.json
│   │
│   ├── global/
│   │   ├── constitution.md     (+ ISO 12207 process gates)
│   │   ├── product.md
│   │   ├── architecture.md
│   │   ├── agents.md           (+ ISO 29119 test policy)
│   │   ├── quality.md          ← NUEVO (ISO 25010)
│   │   ├── skills.md           ← catálogo y reglas de uso
│   │   ├── mcps.md
│   │   ├── workflows.md
│   │   ├── decisions.md
│   │   └── glossary.md
│   │
│   └── features/
│       └── {feature}/
│           ├── requirements.md  (+ IEEE 29148 quality checklist)
│           ├── design.md        (+ IEEE 1016 viewpoints)
│           ├── tasks.md
│           └── progress.md      ← el agente escribe esto
│
└── .skills/               ← instalado por npx skills add
    └── {owner}/{skill}/
        └── SKILL.md
```

SpecFlow edita lo que está en `.specflow/` y exporta hacia los archivos nativos de cada herramienta. Esa separación es lo que ningún proyecto actual tiene: **una fuente de verdad tool-agnostic que compila hacia cualquier formato nativo.**