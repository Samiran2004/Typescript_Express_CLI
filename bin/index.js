#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

//Folder Structure...
const folders = [
    "src",
    "src/routes",
    "src/controllers",
    "src/models",
    "src/configs",
    "src/services",
    "src/assets",
    "src/data",
    "src/dto",
    "src/repository"
]

//Files to create...
const files = [
    { name: ".env", content: "//YOUR ENV FILE" },
    {
        name: "package.json",
        content: function (project_name) {
            return JSON.stringify({
                name: project_name,
                version: "1.0.0",
                main: "src/app.ts",
                scripts: {
                    start: "ts-node src/app.ts",
                    build: "tsc",
                    serve: "node dist/app.js",
                    dev: "node --watch dist/app.js",
                },
                dependencies: {
                    express: "^5.1.0",
                    dotenv: "^16.4.7"
                },
                devDependencies: {
                    '@types/dotenv': "^8.2.3",
                    '@types/express': "^5.0.1",
                    '@types/node': "^22.10.2",
                    'ts-node': "^10.9.2",
                    'typescript': "^5.8.3"
                }
            }, null, 2);
        }
    },
    {
        name: "README.md",
        content: ""
    },
    {
        name: ".gitignore",
        content: "node_modules/\n.env\n"
    },
    {
        name: "src/app.ts",
        content: `
                import express from 'express';
                import dotenv from 'dotenv';
                
                dotenv.config();
                const app = express();
                const PORT = process.env.PORT || 3000;
        
                app.use(express.json());
        
                app.get('/', (req, res) => {
                    res.send('Hello, World!');
                });
        
                app.listen(PORT, () => {
                    console.log(\`Server is running on http://localhost:\${PORT}\`);
                });`

    },
    {
        name: "tsconfig.json",
        content: () =>
            JSON.stringify(
                {
                    compilerOptions: {
                        target: "ES2020",
                        module: "commonjs",
                        strict: true,
                        esModuleInterop: true,
                        skipLibCheck: true,
                        forceConsistentCasingInFileNames: true,
                        outDir: "./dist",
                        rootDir: "./src"
                    },
                    include: ["src/**/*"],
                    exclude: ["node_modules"]
                }
            )
    }
]

//Create files and folders structure...
function createBackendStructure(basePath) {
    const project_name = path.basename(basePath);

    //Functions for create folders...
    folders.forEach((folder) => {
        const folder_path = path.join(basePath, folder);
        if (!fs.existsSync(folder_path)) {
            fs.mkdirSync(folder_path, { recursive: true });
            console.log(`Creating project structure for ${project_name}...`);
        }
    });

    //Function for create files...
    files.forEach((file) => {
        const file_path = path.join(basePath, file.name);
        if (!fs.existsSync(file_path)) {
            const file_content = typeof file.content === 'function' ? file.content(project_name) : file.content;
            fs.writeFileSync(file_path, file_content);
            console.log(`${file_path} is created....`);
        }
    })

    //Install Dependencies...
    console.log("Dependencies installing......");
    try {
        execSync("npm install", {
            cwd: basePath,
            stdio: "inherit"
        })
        console.log("Successfully dependencies installed..!");
    } catch (error) {
        console.log("Error: ", error);
    }
}

//Project path from command-line----
const project_path = process.argv[2] || ".";

//Create
createBackendStructure(project_path);
console.log(`Project setup completed at ${path.resolve(project_path)}`);
console.log(`\nNext steps:\n1. cd ${project_path}\n2. npm start`);