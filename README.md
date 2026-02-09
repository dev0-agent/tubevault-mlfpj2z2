# TubeVault

> Your private, organized YouTube library.

TubeVault is a browser-based application that allows you to curate, tag, and annotate YouTube videos in a distraction-free environment. It runs entirely in your browser using Local Storage, ensuring your data remains private and portable.

## Tech Stack

*   **Framework:** React + Vite
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **State Management:** Zustand
*   **Persistence:** Local Storage
*   **Icons:** Lucide React

## Features

*   **Video Management:** Add videos via URL; auto-extracts thumbnails.
*   **Embedded Player:** Watch videos directly within the app using the YouTube IFrame API.
*   **Smart Organization:** Create custom tags to categorize your library.
*   **Notes:** Add personal notes and comments to any video.
*   **Search:** Quickly find videos by title or tag.
*   **Privacy Focused:** No database, no tracking. All data lives in your browser.
*   **Data Portability:** Export and Import your library as JSON.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd tubevault
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Documentation

*   [TASKLIST.md](./TASKLIST.md) - Project roadmap and task status.
*   [LEARNINGS.md](./LEARNINGS.md) - Technical learnings and architectural decisions.
*   [.dev0/RULES.md](./.dev0/RULES.md) - AI coding agent rules.
