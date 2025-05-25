# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Social Support Application Portal

This project is a secure, accessible, internationalized, and modular multi-step application form wizard for a government social support portal. It uses React, Material UI, React Hook Form, Redux Toolkit (with redux-saga), and i18n. It also integrates OpenAI GPT for "Help Me Write" suggestions via a secure backend.

## Features

- Multi-step, accessible, and responsive form wizard
- Internationalization (English/Arabic, RTL/LTR)
- Dynamic country/state dropdowns
- AI-powered suggestion integration (OpenAI GPT)
- Robust error handling and validation
- Modern, reusable component architecture

## How to Run the Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up the OpenAI API Key

1. Create a `.env` file in the project root (if it doesn't exist):

```bash
OPENAI_API_KEY=sk-...
```

Replace `sk-...` with your actual OpenAI API key. **Never commit your API key to version control.**

### 3. Start the Backend and Frontend

To run both the frontend and backend (AI suggestion server) together:

```bash
npm run dev:all
```

- The frontend will be available at [http://localhost:5173](http://localhost:5173)
- The backend (Express server for OpenAI) will run on [http://localhost:3001](http://localhost:3001)

> The frontend is configured to proxy `/api/ai-suggest` requests to the backend.

### 4. Start the Backend Server from the New Location

To start the backend server separately, use the following command:

```bash
node server/ai-suggest-server.js
```

- The `.env` file for the server should be placed in the `server/` folder. See `server/.env.example` for the required format.

### 5. Linting and Formatting

To check and fix code style:

```bash
npm run lint
npm run lint:fix
```

## Why a Backend Server for OpenAI API?

To keep your OpenAI API key secure, all AI-powered suggestion requests are routed through a backend server (`ai-suggest-server.js`). This server acts as a proxy between the frontend and OpenAI, ensuring that:

- **Your API key is never exposed to the browser or end users.**
- **Sensitive credentials remain on the server side,** protected from client-side attacks or leaks.
- **You can add rate limiting, logging, or additional security** in one place if needed.

> Never put your OpenAI API key directly in frontend code or expose it in public repositories. Always use a backend proxy for production applications.

## Test Cases

### Overview
This project includes comprehensive test cases for the `SocialFormWizard` and its subcomponents to ensure functionality, accessibility, and internationalization (i18n). The test cases cover the following components:

- **FamilyFinancialInfoForm**: Validates required fields, renders all fields, and handles i18n-aware error messages.
- **SituationDescriptionsForm**: Tests rendering of all fields, error handling, and the "Help Me Write" functionality.
- **SocialFormWizard**: Ensures proper navigation between steps and form submission.

### Running the Tests

To execute the test cases, use the following command:

```bash
npm test
```

This will run all test cases and display the results in the terminal. For debugging specific tests, you can use:

```bash
npm test -- <test-file-name>
```

For example, to run tests for the `FamilyFinancialInfoForm`:

```bash
npm test -- FamilyFinancialInfoForm.test.tsx
```

### Debugging Tests

- Use `screen.debug()` to inspect the DOM during test execution.
- Ensure that all required labels and error messages are present in the localization files (`en.json` and `ar.json`).

### Accessibility and i18n

- All test cases validate accessibility using ARIA roles and attributes.
- Internationalization is tested by mocking the i18n context and verifying error messages in multiple languages.

### Generating a Coverage Report

To generate a test coverage report, use the following command:

```bash
npm run test:coverage
```

This will create a detailed coverage report in the `coverage/` directory. Open `coverage/lcov-report/index.html` in your browser to view the report in a user-friendly format.

## Additional Notes

- All environment variables are loaded using `dotenv` in the backend.
- The OpenAI API key is **never exposed to the frontend**.
- For further configuration, see `ai-suggest-server.js` and `vite.config.js`.

---

For more details, see the code comments and in-app documentation.
