# Task Tracker - Trello-inspired Kanban Board

A modern, responsive task management application built with React, Vite, and Tailwind CSS. This project replicates the core functionality of Trello with a clean, intuitive interface.

## Features

- **5-Column Kanban Board**: To Do, Doing, Code Review, Testing, and Done
- **Drag & Drop**: Move tasks between columns by dragging and dropping
- **Task Management**: Add, edit, and delete tasks with descriptions
- **Column Limits**: Set limits on columns (e.g., Code Review has a 3-task limit)
- **Visual Indicators**: Task counts, pin icons, and status-based color coding
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Tasks are automatically saved to browser storage

## Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Drag & Drop API** - Native drag and drop functionality

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Usage

- **Add Tasks**: Click on the "Add a task..." input field and enter your task details
- **Move Tasks**: Drag and drop tasks between columns or use the "Move" button
- **Delete Tasks**: Click the "Delete" button on any task card
- **Column Limits**: The Code Review column has a 3-task limit with visual warnings

## Project Structure

```
src/
├── components/
│   ├── TaskCard.jsx      # Individual task card component
│   ├── TaskForm.jsx      # Task creation form
│   └── WorkProgress.jsx  # Column component
├── App.jsx               # Main application component
└── main.jsx             # Application entry point
```

## Features Matching Trello

- ✅ Kanban board layout with multiple columns
- ✅ Drag and drop functionality
- ✅ Task cards with titles and descriptions
- ✅ Column task counts
- ✅ Visual status indicators
- ✅ Responsive design
- ✅ Clean, modern UI