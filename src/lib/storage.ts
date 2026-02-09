import { AppState, Video, Tag, Note, AppStateSchema } from '../types';

const STORAGE_KEY = 'tubevault_data';

const DEFAULT_STATE: AppState = {
  videos: [],
  tags: [],
  notes: [],
};

/**
 * Utility service for interacting with LocalStorage.
 * Handles serialization, deserialization, and quota errors.
 */
export const storage = {
  /**
   * Retrieves the entire application state from LocalStorage.
   */
  getState(): AppState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_STATE;
      
      const parsed = JSON.parse(data);
      const validated = AppStateSchema.safeParse(parsed);
      
      if (!validated.success) {
        console.error('Invalid storage schema detected, resetting to default', validated.error);
        return DEFAULT_STATE;
      }
      
      return validated.data;
    } catch (error) {
      console.error('Failed to load state from localStorage', error);
      return DEFAULT_STATE;
    }
  },

  /**
   * Persists the entire application state to LocalStorage.
   */
  saveState(state: AppState): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.error('LocalStorage quota exceeded');
      } else {
        console.error('Failed to save state to localStorage', error);
      }
      return false;
    }
  },

  /**
   * CRUD for Videos
   */
  getVideos(): Video[] {
    return this.getState().videos;
  },

  saveVideo(video: Video): boolean {
    const state = this.getState();
    const index = state.videos.findIndex((v) => v.id === video.id);
    if (index >= 0) {
      state.videos[index] = video;
    } else {
      state.videos.push(video);
    }
    return this.saveState(state);
  },

  deleteVideo(id: string): boolean {
    const state = this.getState();
    state.videos = state.videos.filter((v) => v.id !== id);
    // Cleanup associated notes
    state.notes = state.notes.filter((n) => n.videoId !== id);
    return this.saveState(state);
  },

  /**
   * CRUD for Tags
   */
  getTags(): Tag[] {
    return this.getState().tags;
  },

  saveTag(tag: Tag): boolean {
    const state = this.getState();
    const index = state.tags.findIndex((t) => t.id === tag.id);
    if (index >= 0) {
      state.tags[index] = tag;
    } else {
      state.tags.push(tag);
    }
    return this.saveState(state);
  },

  deleteTag(id: string): boolean {
    const state = this.getState();
    state.tags = state.tags.filter((t) => t.id !== id);
    // Remove tag reference from videos
    state.videos = state.videos.map(v => ({
      ...v,
      tagIds: v.tagIds.filter(tid => tid !== id)
    }));
    return this.saveState(state);
  },

  /**
   * CRUD for Notes
   */
  getNotes(): Note[] {
    return this.getState().notes;
  },

  saveNote(note: Note): boolean {
    const state = this.getState();
    const index = state.notes.findIndex((n) => n.id === note.id);
    if (index >= 0) {
      state.notes[index] = note;
    } else {
      state.notes.push(note);
    }
    return this.saveState(state);
  },

  deleteNote(id: string): boolean {
    const state = this.getState();
    state.notes = state.notes.filter((n) => n.id !== id);
    return this.saveState(state);
  },

  /**
   * Clears all data from LocalStorage.
   */
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Seeds LocalStorage with sample data for testing purposes.
   */
  seed(): void {
    const videoId1 = '00000000-0000-4000-a000-000000000001';
    const tagId1 = '00000000-0000-4000-a000-000000000002';
    const noteId1 = '00000000-0000-4000-a000-000000000003';

    const dummyState: AppState = {
      videos: [
        {
          id: videoId1,
          youtubeId: 'dQw4w9WgXcQ',
          title: 'Rick Astley - Never Gonna Give You Up',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
          createdAt: Date.now(),
          tagIds: [tagId1],
        }
      ],
      tags: [
        { id: tagId1, label: 'Music', color: '#3b82f6' }
      ],
      notes: [
        { id: noteId1, videoId: videoId1, content: 'Classic rickroll.', timestamp: 0 }
      ]
    };
    this.saveState(dummyState);
  }
};
