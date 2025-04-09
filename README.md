# Gesturio - ASL Application

Gesturio is a modern web application built with Next.js, React, and TypeScript, designed to help users learn and practice American Sign Language (ASL).

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- npm, yarn, or pnpm (package manager of your choice)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/gesturio-io/frontend
   cd gesturio
   ```

2. **Install dependencies**
   You can use any of the following package managers:

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory if you need to configure any environment variables.

4. **Run the development server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

   The application will be available at [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Available Scripts

- `dev`: Starts the development server
- `build`: Creates a production build
- `start`: Runs the production build
- `lint`: Runs ESLint to check for code issues

## Project Structure

- `/app`: Next.js app directory containing pages and layouts
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and shared logic
- `/public`: Static assets
- `/styles`: Global styles and Tailwind configuration

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Various other UI and utility libraries
