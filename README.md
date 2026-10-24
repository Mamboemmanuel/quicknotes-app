# QuickNotes App

QuickNotes is a lightweight, responsive note-taking web application designed to help users quickly jot down, organize, and search through their daily notes, ideas, and tasks across Personal, Work, and Study categories.

## Features
- **Add Notes**: Create notes with custom text and assign them to specific categories (Personal, Work, Study).
- **Validation**: Instant validation checks ensuring notes are not empty and stay within the 200-character limit.
- **Categorized Styling**: Visual distinction for each note card via unique left-border colour coding.
- **Search Functionality**: Filter through your notes instantly with real-time case-insensitive search.
- **Data Persistence**: Notes are securely saved in browser `localStorage` so they persist across page refreshes.
- **Responsive Design**: Clean Flexbox layout that automatically adapts and stacks controls on mobile screens (max-width 600px).

## How to Run the Project Locally
1. Clone the repository or download the source code files.
2. Ensure all four files (`index.html`, `style.css`, `script.js`, and `README.md`) are placed together in the root directory.
3. Open `index.html` directly in any modern web browser, or serve it using a local development server (like Live Server in VS Code).

## What I Learned
1. **DOM Manipulation & Security**: Building a secure `render()` function using `document.createElement` and `textContent` rather than `innerHTML` to prevent XSS vulnerabilities when displaying user input.
2. **State Persistence**: Leveraging browser `localStorage` combined with `JSON.stringify` and `JSON.parse` to maintain application state across page reloads.
3. **Responsive Flexbox Layouts**: Designing flexible form controls and card components that gracefully stack on smaller mobile viewports using media queries.
