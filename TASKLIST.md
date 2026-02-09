# Task List

This file shows the current progress of all tasks in this project.
It is automatically updated by dev0 as tasks are completed.

---

## Phase 1

- [x] ✅ **Define Data Models and Types**
  Create the TypeScript interfaces and Zod schemas for the application core entities. We need schemas for `Video` (id, youtubeId, title, url, thumbnail, createdAt), `Tag` (id, label, color), and `Note` (id, content, timestamp). Create a `types` directory.

- [x] ✅ **Implement Local Storage Utility**
  Create a robust utility service (`src/lib/storage.ts`) to handle CRUD operations with Local Storage. It should handle serialization/deserialization, error catching (quota exceeded), and provide methods like `getVideos`, `saveVideo`, `deleteVideo`. Include a basic seed function for testing.

- [ ] ⏳ **Setup Global Store (Zustand)**
  Initialize a Zustand store to manage the application state. It should sync with the Local Storage utility created in Task 2. The store needs actions for adding/removing videos, managing tags, and updating notes. Ensure the store hydrates from local storage on mount.

## Phase 2

- [ ] ⏳ **Create 'Add Video' Dialog Component**
  Build a Dialog component using shadcn/ui. It should accept a YouTube URL, validate it using Regex, extract the YouTube Video ID, and automatically generate the thumbnail URL (`https://img.youtube.com/vi/[ID]/hqdefault.jpg`). Include a form field for the user to manually enter a Title (since we lack a backend to fetch it). On submit, add to the store.

- [ ] ⏳ **Implement Video Card and Grid Layout**
  Create a `VideoCard` component to display the thumbnail, title, and a list of tags. Create a `VideoGrid` component to display these cards in a responsive grid. Connect this to the main page to show the list of saved videos from the store.

- [ ] ⏳ **Build Video Player View**
  Create a detailed view (route: `/watch/:id`) or a full-screen overlay. Integrate the YouTube IFrame player (using `react-youtube` or similar). The player should take up the main focus of the screen. Ensure it handles invalid IDs gracefully.

## Phase 3

- [ ] ⏳ **Implement Notes and Tagging Interface**
  In the Video Player View (side panel or below player), build the UI to add/remove tags and write notes. The notes section should be a simple textarea or rich text editor that auto-saves to the store. The tag selector should allow creating new tags or selecting existing ones.

- [ ] ⏳ **Add Search and Filter Logic**
  Implement a search bar and tag filter dropdown in the main header. Update the `VideoGrid` to respect these filters. The filtering logic should happen in the Zustand store or a derived selector.

- [ ] ⏳ **Data Export and Import**
  Add a settings menu with 'Export Data' (downloads a JSON file of the state) and 'Import Data' (reads a JSON file and replaces/merges local storage). This is critical for data safety in a local-only app.

## Phase 4

- [ ] ⏳ **UI Polish and Empty States**
  Add empty states for the library (e.g., 'No videos yet, add one!'). Improve the styling of the player page. Add toast notifications for actions (Video added, Data exported, etc.) using shadcn/ui toast.

---

_Last updated by dev0 automation_
