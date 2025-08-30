<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15J7qQsT9m0bubepaKm7p2a8Wc4fuDkc_

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Configuring Your Gemini API Key

This guide will help you correctly set up your Gemini API key to run your AI Studio application on your local machine. We'll be making a few small but important changes to ensure the app can access your key securely.

### Why Do We Need to Make Changes?

Your application is built using a tool called Vite. For security reasons, Vite has a specific way of handling secret keys (like your Gemini API key). We need to follow its rules to make sure the key is available to the application when you run it locally.

### Step-by-Step Guide

#### 1. Rename the Environment File

Your project might have a file named `.env`. We need to rename it to `.env.local`. The `.local` suffix tells Git (the version control system) to ignore this file, so you don't accidentally share your secret API key with others.

- **Find** the file named `.env` in your project folder.
- **Rename** it to `.env.local`.

#### 2. Update the API Key Name

Next, we need to change the name of the API key variable inside the `.env.local` file. Vite requires that all environment variables that you want to use in your app start with `VITE_`.

- **Open** the `.env.local` file.
- You will see something like `GOOGLE_API_KEY=...` or `GEMINI_API_KEY=...`.
- **Change** the name of the variable to `VITE_API_KEY`. The line should now look like this:

```
VITE_API_KEY=AIzaSy...your...key...
```

#### 3. Update the Code to Use the New Key

Finally, we need to tell our application code to use the new variable name. We'll do this in the `geminiService.ts` file.

- **Open** the file located at `src/services/geminiService.ts`.
- **Find** the line of code that looks like this:

```typescript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
```

- **Change** it to use `import.meta.env.VITE_API_KEY` instead:

```typescript
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
```

And that's it! After making these changes, restart your development server by running `npm run dev` in your terminal. Your application should now be able to load your Gemini API key correctly.
