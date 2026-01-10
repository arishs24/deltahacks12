# Knee Injury Clinical Decision Support Tool

A production-ready frontend application for knee injury diagnostics and rehabilitation planning, built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Patient selection and clinical summary with simulation status
- **Knee Model Viewer**: Interactive 3D visualization placeholder with gait scenario toggles
- **Biomechanics Data Panel**: Detailed charts for ligament stress, strain, and tissue stiffness
- **Exercise Recommendations**: AI-assisted rehabilitation exercises with safety indicators
- **Settings**: Application information and disclaimers

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, Header, Layout)
│   └── ui/              # Reusable UI components (Card, Badge, ToggleGroup, etc.)
├── pages/               # Page components (Dashboard, Viewer, etc.)
├── data/                # Mock data
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Design Guidelines

- **Color Palette**: Clinical blues and greys for a medical-grade appearance
- **Typography**: Clean, readable fonts with appropriate contrast
- **Accessibility**: WCAG-compliant color contrasts and semantic HTML
- **Responsive**: Mobile-first responsive design

## Disclaimer

This is a research tool and not a medical device. All recommendations should be interpreted within the context of comprehensive clinical evaluation.

## License

Proprietary - Internal use only
