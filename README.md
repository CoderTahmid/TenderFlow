# TenderFlow

[Live Site](https://tender-flow-flax.vercel.app/)

## Description
A modern web application for managing tender requirements, featuring:
- **Requirement Management** – Add, edit, and delete requirement rows.
- **File Upload** – Upload supporting documents directly from the UI.
- **Dynamic Requirements Table** – Real‑time table rendering using React context.
- **Internationalisation** – English translations ready for localisation.
- **Responsive Design** – Styled with CSS for a clean, mobile‑friendly experience.

## Author
**Tahmid Ibne Mofazzol**

## Identifier
- **Internal ID**: `id`
- **Registration ID**: `251-15-548`

## How to Run the App
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.
3. **Build for production** (optional)
   ```bash
   npm run build
   ```
   The compiled files will be placed in the `dist/` directory.

## Main Features Implemented
- **RequirementRow** component for individual requirement entry.
- **RequirementsTable** component that aggregates rows and provides bulk actions.
- **FileUploader** component with drag‑and‑drop support.
- **TenderContext** React context for global state management.
- **Translations** (`src/translations/en.js`) for easy localisation.
- **Styling** (`App.css`) with a modern, clean look.

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
