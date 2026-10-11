# VectorShift Technical Assessment

A full-stack visual pipeline workflow builder built with **React**, **React Flow**, and **FastAPI**.

---

## 🌟 Overview

This repository contains the complete implementation of the VectorShift Frontend & Full-Stack Technical Assessment, structured across four core milestones:

1. **Part 1 — Node Abstraction**: Reusable `BaseNode` architectural pattern, declarative handle configuration, and 5 brand-new nodes (**Note**, **Condition**, **Database**, **API**, and **Filter**).
2. **Part 2 — Styling & Design System**: Neo-Editorial Dark Mode visual design language with custom CSS design tokens, typography, badges, and React Flow controls overrides.
3. **Part 3 — Text Node Logic**: Dynamic auto-resizing text node with real-time extraction of JavaScript/Python-style variables (`{{ variable }}`) into reactive input handles.
4. **Part 4 — Backend Integration & DAG Verification**: FastAPI backend with an $O(V+E)$ Kahn's algorithm topological sort to verify if the configured workflow graph is a valid Directed Acyclic Graph (DAG), reporting node count, edge count, and DAG status to the user.

---

## 📁 Project Structure

```
VectorShift/
├── backend/
│   ├── main.py                  # FastAPI server with DAG verification algorithm
│   └── requirements.txt         # Backend Python dependencies
├── frontend/
│   ├── package.json             # React dependencies & scripts
│   ├── public/                  # Public assets & HTML template
│   └── src/
│       ├── App.js               # Main application container
│       ├── index.css            # Neo-Editorial design tokens & styles
│       ├── toolbar.js           # Top node palette / draggable toolbar
│       ├── ui.js                # React Flow canvas & drop logic
│       ├── submit.js            # Pipeline submission & modal alert
│       ├── store.js             # Zustand state management
│       ├── draggableNode.js     # Draggable pill wrapper
│       └── nodes/
│           ├── BaseNode.js      # Unified reusable node abstraction & hooks
│           ├── inputNode.js     # Input node
│           ├── outputNode.js    # Output node
│           ├── llmNode.js       # LLM node
│           ├── textNode.js      # Dynamic text node with variable extraction
│           ├── noteNode.js      # Custom Note node
│           ├── conditionNode.js # Custom Condition node
│           ├── databaseNode.js  # Custom Database node
│           ├── apiNode.js       # Custom API node
│           └── filterNode.js    # Custom Filter node
├── Audit Report.md              # In-depth architectural audit & scorecard
├── Task-1 Walkthrough.rtf       # Part 1 implementation details & notes
├── Task-2 Walkthrough.rtf       # Part 2 implementation details & notes
├── Task-3 Walkthrough.rtf       # Part 3 implementation details & notes
├── Task-4 Walkthrough.rtf       # Part 4 implementation details & notes
└── VectorShift - Frontend Technical Assessment Instructions.pdf
```

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)

Ensure Python 3.9+ is installed:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The backend will start at `http://localhost:8000`. You can test health at `http://localhost:8000/`.

### 2. Frontend Setup (React)

In a new terminal window:

```bash
cd frontend
npm install
npm start
```

The application will launch at `http://localhost:3000`.

---

## 🧩 Key Features & Implementation Highlights

### 1. Base Node Abstraction (`BaseNode.js`)
- **Declarative Handle Configuration**: Supports both string shortcuts and structured handle objects (`{ id, label, style }`).
- **`useNodeField` Custom Hook**: Centralizes state synchronization between local node inputs and the global Zustand store.
- **`React.memo` Optimized**: Prevents unnecessary canvas re-renders when panning or interacting with other nodes.

### 2. Dynamic Text Node (`textNode.js`)
- Automatically expands textarea height and width based on input length.
- Regex-based variable parser (`/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`) dynamically generates input handles on the left edge as variables are typed.

### 3. DAG Validation (`backend/main.py`)
- Employs **Kahn's Algorithm** with an in-degree map and `collections.deque` for $O(V + E)$ cycle detection.
- Handles disconnected components, isolated nodes, and cyclic loops accurately.
- Returns `num_nodes`, `num_edges`, and `is_dag` boolean to the frontend modal.

---

## 📄 License

MIT
