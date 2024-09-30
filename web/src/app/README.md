## The `src` Folder

This document provides an overview of the folder structure and the purpose of each file within the `src` directory of your Angular frontend application.

### Folder Structure

![image](https://github.com/user-attachments/assets/d7cdd4a3-4db4-475a-8210-10bfbc5394aa)


### Overview of Files and Directories

#### `app/`
- **app.component.html**: The main HTML template for the root component.
- **app.component.sass**: SASS stylesheet for the root component.
- **app.component.spec.ts**: Unit tests for the root component.
- **app.component.ts**: The root component class that defines the main application logic.
- **app.config.server.ts**: Server-specific configuration settings.
- **app.config.ts**: General configuration settings for the application.
- **app.routes.ts**: The main routing file that defines the routes for the application and loads the feature module, which in turn routes the user to different pages.
- **shared/**: A directory for shared components, services, and utilities used throughout the application.

#### `core/`
- **features/**: A directory containing different feature modules of the application.
  - **auth/**: Contains authentication-related components, services, and models.
  - **dashboard/**: Contains dashboard-related components, services, and models.
  - **interview/**: Contains all files related to the interview feature.
  - **landing/**: Contains landing page-related components, services, and models.
  - **profile/**: Contains profile-related components, services, and models.
  - **features-routing.module.ts**: Defines the routing configuration for the features module.
  - **features.module.ts**: The main module file for the features, defining imports, declarations, and providers.

#### Root-Level Files
- **index.html**: The main HTML file that serves as the entry point for the Angular application, including the base structure and links to scripts and styles.
- **main.server.ts**: The server-side entry point for Angular Universal, enabling server-side rendering (SSR) for better performance and SEO.
- **styles.sass**: The global stylesheet written in SASS, used for styling the entire application. It allows for variables, nesting, and other advanced CSS features.
- **tsconfig.worker.json**: The TypeScript configuration file specifically for web workers, including settings and compiler options required to compile TypeScript files used in web workers.

### Entry Point
- **app.routes.ts**: This file serves as the entry point for the application, defining the primary routes and loading the feature Angular module. The feature module, in turn, routes the user to different pages, such as the interview page.

This structure helps maintain a clean and organized codebase, making it easier to manage and scale the application. Each feature is encapsulated within its own module, promoting modularity and reusability.
