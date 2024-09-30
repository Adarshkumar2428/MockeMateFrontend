## Project Folder Structure

This document provides an overview of the folder structure for the Angular frontend application. Each file and directory is briefly described to help you understand the project's organization.

### Folder Structure

```
src/
├── app/
├── index.html
├── main.server.ts
├── styles.sass
└── tsconfig.worker.json
```

### Overview

1. **app/**:
   - Contains the core application code, including components, services, modules, and other Angular-specific files.
   
2. **index.html**:
   - The main HTML file that serves as the entry point for the Angular application. It includes the base structure and links to the necessary scripts and styles.
   
3. **main.server.ts**:
   - The server-side entry point for Angular Universal, enabling server-side rendering (SSR) for better performance and SEO.
   
4. **styles.sass**:
   - The global stylesheet written in SASS, used for styling the entire application. It allows for variables, nesting, and other advanced CSS features.
   
5. **tsconfig.worker.json**:
   - The TypeScript configuration file specifically for web workers. It includes the settings and compiler options required to compile TypeScript files used in web workers.
