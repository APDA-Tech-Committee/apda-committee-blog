# APDA Committee Blog

A full-stack blog application for the APDA Tech Committee.

## Setup

### Prerequisites
- Node.js 22+
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd apdacommitteeblog
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Development

Start both frontend and backend:

```bash
# Frontend (http://localhost:5173)
cd frontend
npm run dev

# Backend (http://localhost:3000)
cd backend
npm run dev
```

### Production Build

```bash
cd frontend
npm run build
```

## Tech Stack

- Frontend: Vue 3 + TypeScript + Vite + TailwindCSS
- Backend: Node.js + Express + TypeScript + Prisma
