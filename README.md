# AI Headshot Generator

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

This project is an AI-powered headshot generator built with React, TypeScript, and the Google Gemini API. It allows users to upload a photo, select a style, and generate a professional headshot.

View your app in AI Studio: https://ai.studio/apps/drive/15J7qQsT9m0bubepaKm7p2a8Wc4fuDkc_

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **AI:** Google Gemini API

## Features

- **Image Upload:** Upload your own photo to be transformed.
- **Style Selection:** Choose from a variety of predefined background styles.
- **Customization:** Customize the generated headshot with advanced options like skin retouching, hairstyle, facial expression, and wardrobe.
- **Download:** Download the generated headshot as a PNG file.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation & Setup

1.  **Get the code:**

    First, get the code on your local machine (e.g., by cloning this repository).

2.  **Install dependencies:**

    Navigate to the project directory and install the dependencies:
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**

    Create a new file named `.env` in the root of your project directory and add your Gemini API key as follows:

    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```

    Replace `YOUR_API_KEY` with your actual Gemini API key.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application should now be running at `http://localhost:5173` (or the next available port).

## Project Structure

```
.
├── public/
├── src/
│   ├── components/      # React components
│   ├── services/        # Gemini API service
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── .env                 # Environment variables (you need to create this)
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
└── vite.config.ts       # Vite configuration
```
