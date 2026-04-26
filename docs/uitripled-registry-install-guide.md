# Guia reusable para instalar componentes de @uitripled con shadcn

Esta guia resume un flujo estable para proyectos tipo Electron + React + Vite + Tailwind + shadcn, pero tambien aplica a cualquier proyecto con components.json y registries namespaced.

## 1) Configuracion previa del registry

En components.json agrega (o valida) esta entrada en registries:

```json
{
  "registries": {
    "@uitripled": "https://ui.tripled.work/r/{name}.json"
  }
}
```

Puntos importantes:
- El namespace debe iniciar con @.
- La URL debe incluir {name}.
- El comando de instalacion siempre usa el formato @namespace/item.

Ejemplo:

```bash
npx shadcn@latest add @uitripled/browse-folder-shadcnui
```

## 2) Verificar la configuracion activa

Antes de instalar, valida paths y aliases reales del proyecto:

```bash
npx shadcn@latest info
```

Revisa especialmente:
- Resolved Paths -> components
- Resolved Paths -> ui
- Aliases -> components, ui, utils

## 3) Regla critica para evitar 404

En este registry, muchos nombres validos usan sufijos como:
- -shadcnui
- -carbon

Si intentas el slug sin sufijo, suele devolver 404 (item no publicado).

Ejemplo:
- Falla: @uitripled/animated-list
- Funciona: @uitripled/animated-list-shadcnui

## 4) Instalar componentes que suelen fallar (nombres correctos)

```bash
npx shadcn@latest add \
  @uitripled/animated-list-shadcnui \
  @uitripled/animated-profile-menu-shadcnui \
  @uitripled/draggable-list-shadcnui \
  @uitripled/context-menu-shadcnui \
  @uitripled/interactive-timeline-shadcnui \
  @uitripled/context-menu-bubble-shadcnui \
  @uitripled/expanding-search-dock-shadcnui
```

Tip: primero puedes usar --dry-run para previsualizar cambios.

```bash
npx shadcn@latest add @uitripled/animated-list-shadcnui --dry-run
```

## 5) Ubicacion correcta de componentes

En algunos items community, el registry define un target explicito y puede escribir archivos en src/components/uitripled en lugar de tu ruta objetivo de renderer.

Si eso pasa, mueve todo a tu carpeta canonica.

Ejemplo para este proyecto:
- Canonica: src/renderer/src/components/uitripled

PowerShell:

```powershell
$src = "src/components/uitripled"
$dst = "src/renderer/src/components/uitripled"
if (Test-Path $src) {
  Get-ChildItem $src -File | ForEach-Object {
    Move-Item -Path $_.FullName -Destination (Join-Path $dst $_.Name) -Force
  }
  if (-not (Get-ChildItem $src -Force)) {
    Remove-Item $src -Force
  }
}
```

## 6) Componentes base faltantes (dependencias de UI)

Varios componentes de @uitripled importan primitives base de shadcn que pueden no estar instalados en tu proyecto.

Instala los faltantes mas comunes:

```bash
npx shadcn@latest add avatar tabs dialog textarea button
```

Ajusta la lista segun imports reales de los archivos agregados.

## 7) Validacion de TypeScript

Despues de instalar y mover archivos:

```bash
pnpm run typecheck
```

Si usas npm o yarn, ejecuta tu equivalente de typecheck.

## 8) Ajustes TS comunes en componentes de registry

En proyectos estrictos (noUnusedLocals, noImplicitReturns, etc.) pueden aparecer errores. Estos son fixes comunes:

### A) ButtonProps no exportado por tu button local

Algunos registries asumen:

```ts
import { Button, ButtonProps } from "@/components/ui/button"
```

Si ButtonProps no existe, usa:

```ts
import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"

type NativeButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean
}
```

### B) Variables no usadas

Quita estados/maps no usados o usalos realmente. En config estricta fallan compilacion.

### C) displayName en aliases simples

Si haces alias directo (ejemplo: const X = DialogHeader), TypeScript puede rechazar X.displayName.

Solucion: elimina esas asignaciones en aliases no tipados con displayName.

## 9) Cuando search/list del registry falla

Puede pasar que add funcione pero search/list falle por formato incompleto del index del registry.

En ese caso:
- No dependas de search/list para descubrir nombres.
- Usa nombres exactos ya verificados.
- Si tienes acceso al index del registry, valida slugs publicados antes de instalar.

## 10) Checklist rapido

1. Configurar @uitripled en components.json.
2. Verificar paths con npx shadcn@latest info.
3. Instalar con slug exacto (normalmente -shadcnui o -carbon).
4. Mover archivos a carpeta canonica si cayeron en src/components.
5. Instalar primitives base faltantes (avatar/tabs/dialog/etc.).
6. Correr typecheck.
7. Aplicar fixes TS puntuales en componentes agregados.

---

Si repites esta secuencia, puedes reutilizar @uitripled en otros proyectos sin volver al ciclo de 404 + errores de tipos.
