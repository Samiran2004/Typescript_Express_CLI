# create-express-ts

A CLI tool to quickly set up an Express.js + TypeScript project structure.

## Features
- Automatically creates a complete folder structure.
- Pre-configures `package.json` and `tsconfig.json`.
- Installs all necessary dependencies for an Express + TypeScript project.

## Installation
1. Install it globally
```bash
npm i -g typescript_express_cli
```
2.For create structure
```bash
create-express-ts <your_project_name>
```

## The CLI generates the following folder structure:

```kotlin
<your_project_name>/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── configs/
│   ├── services/
│   ├── assets/
│   ├── data/
|   |__ dto/
|   |__ repository
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
├── README.md
```