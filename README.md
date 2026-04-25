![Template screenshot](assets/screenshot.png)

<p align="center">
 <a href="#getting-started"><img alt="Get started" src="https://img.shields.io/badge/get%20started-fast-0f766e?style=for-the-badge"></a>
 <a href="#stack"><img alt="Stack" src="https://img.shields.io/badge/stack-electron%20%7C%20react%20%7C%20vite%20%7C%20tailwind%20%7C%20shadcn-1f2937?style=for-the-badge"></a>
</p>

# Electron React Vite Tailwind shadcn Template

A minimal, production-ready starter for desktop apps built with Electron, React, Vite, Tailwind CSS v4, and shadcn/ui.

> [!NOTE]
> This template is intentionally small. It gives you the full foundation, but leaves the structure open so each project can grow in its own direction.

## Why This Template

| Goal | Why it helps |
| --- | --- |
| Start fast | You get Electron, React, Vite, Tailwind, and shadcn/ui wired together from day one |
| Stay flexible | The app is intentionally minimal so every project can define its own structure |
| Ship with confidence | The repository includes clear setup notes, troubleshooting, and a clean development flow |

## Project at a Glance

| Area | Details |
| --- | --- |
| Runtime | Electron desktop app |
| UI | React + TypeScript |
| Build | Vite via electron-vite |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui with Radix primitives |

## Stack

- Electron
- React + TypeScript
- Vite via electron-vite
- Tailwind CSS v4
- shadcn/ui with Radix-based components

## What This Template Gives You

| Included | Purpose |
| --- | --- |
| Electron main, preload, and renderer setup | Working desktop app foundation |
| Renderer alias configured as @ | Clean imports from src/renderer/src |
| Tailwind v4 + tweakcn theme | Ready-to-use visual system |
| shadcn/ui configuration | Add UI pieces with the shadcn CLI |
| Minimal welcome screen | A starting screen to replace quickly |
| Troubleshooting guidance | Common setup issues documented |

## Screenshot

The screenshot is stored at assets/screenshot.png.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| pnpm dev | Start the Electron app in development mode |
| pnpm lint | Run ESLint |
| pnpm typecheck | Run TypeScript checks for main and renderer |
| pnpm build | Create a production build |
| pnpm build:win | Build the Windows package |
| pnpm build:mac | Build the macOS package |
| pnpm build:linux | Build the Linux package |

## Add shadcn Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card dialog input
```

If shadcn init cannot detect the framework from the Electron root, skip init and use add directly. The project is already bootstrapped for that path.

<details>

<summary>Why the CLI add workflow is the recommended path here</summary>

The repository uses an Electron-first layout with the renderer app inside src/renderer, which is different from a plain Vite app at the repository root. Because of that, shadcn init may not detect the framework reliably. The template is already configured for the component-add workflow, so you can generate components without extra manual setup.

</details>

## Project Structure

| Path | Role |
| --- | --- |
| src/main | Electron main process |
| src/preload | Secure bridge between Electron and the renderer |
| src/renderer/src | React app source |
| src/renderer/src/assets/main.css | Global theme tokens and app styling |
| src/renderer/src/components/ui | shadcn/ui components |

## Notes for Developers

- The renderer is not a standalone Vite app at the repository root; it lives inside src/renderer.
- The @ alias resolves to src/renderer/src in Vite and TypeScript.
- The active theme is defined in src/renderer/src/assets/main.css and uses class-based dark mode.
- The template is intentionally minimal so each project can adapt the UI and layout without fighting prebuilt abstractions.

## Troubleshooting

<details>

<summary>shadcn init cannot detect the framework</summary>

This is expected in Electron-first project layouts.

Use the already configured components.json and run pnpm dlx shadcn@latest add <component> instead.

</details>

<details>

<summary>TypeScript reports Vite plugin overload errors in the editor</summary>

This usually comes from stale or duplicated Vite type instances in node_modules.

Fix it by reinstalling dependencies and restarting the TypeScript server in VS Code.

</details>

<details>

<summary>pnpm shows warnings about ignored build scripts</summary>

The template works without approving optional build scripts.

If you need to manage them, run pnpm approve-builds.

</details>

## Recommended VS Code Extensions

| Extension | Why |
| --- | --- |
| ESLint | Keep code quality consistent |
| Prettier | Maintain formatting automatically |
| Tailwind CSS IntelliSense | Improve class authoring and autocomplete |

## Customizing the Template

| Step | What to Change |
| --- | --- |
| 1 | Replace the welcome screen in src/renderer/src/App.tsx |
| 2 | Add only the shadcn components you need |
| 3 | Tune the global theme tokens in src/renderer/src/assets/main.css |
| 4 | Add feature folders, routes, and navigation as the project grows |

## License

Use this template freely as the starting point for your own Electron applications.
