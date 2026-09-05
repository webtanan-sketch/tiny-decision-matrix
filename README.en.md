<p align="center">
  <img src="docs/assets/decision-matrix-hero.svg" alt="Tiny Decision Matrix" width="100%" />
</p>

<p align="center">
  <strong>Make multi-criteria decisions simple, transparent and explainable.</strong>
</p>

<p align="center">
  <a href="README.md">🇮🇷 فارسی</a> · <a href="README.en.md">🇬🇧 English</a>
</p>

<p align="center">
  <img alt="TinyManager Module" src="https://img.shields.io/badge/TinyManager-Module-2563EB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" />
  <img alt="RTL LTR" src="https://img.shields.io/badge/FA%20RTL%20%7C%20EN%20LTR-Native-0F766E" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-111827" />
</p>

# Tiny Decision Matrix

**Tiny Decision Matrix** is the first official reference module for TinyManager. It helps managers compare alternatives using weighted criteria and produce a result that can be explained instead of relying on an opaque score.

Typical uses include:

- supplier selection
- software selection
- project prioritization
- location comparison
- comparing alternatives in an operational or strategic decision

## How it works

Each criterion receives a weight and every option receives a score for that criterion.

```text
Weighted score = criterion weight × option score
```

The final ranking is calculated from normalized weighted averages.

## Two execution modes

### Standalone

This repository is a complete micro app by itself.

### TinyManager Module

The same domain logic and reusable workspace can be mounted inside the TinyManager core. The calculation engine is not duplicated between standalone and integrated modes.

## Alpha features

- add/remove criteria
- criterion weights from 0 to 100
- add/remove options
- scores from 0 to 10
- live ranking
- winner / top recommendation
- Persian and English
- RTL and LTR
- local-first persistence in standalone mode
- JSON export
- TinyManager module manifest and module entry

## Stack

```text
TypeScript
React
Vite
Tailwind CSS
Lucide Icons
```

## Repository structure

```text
src/
├── domain/        # framework-independent scoring logic
├── module/        # TinyManager module exports
├── standalone/    # standalone shell
└── components/    # reusable UI
```

## Development

```bash
git clone https://github.com/webtanan-sketch/tiny-decision-matrix.git
cd tiny-decision-matrix
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run test
npm run build
```

## TinyManager integration

Core repository:

https://github.com/webtanan-sketch/tinymanager

The module build exposes the reusable workspace and domain API. Consumers should import the module stylesheet from the package style export.

## Data rules

When date-bearing records are introduced, dates will be stored as ISO timestamps. Inside TinyManager, shared storage and date services are provided by the Core rather than being hard-wired into this module.

## License

MIT © 2026 Webtanan
