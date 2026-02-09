import { z } from 'zod';

/**
 * Zod schema for a Tag entity.
 * Tags are used to categorize videos.
 */
export const TagSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(1, "Label is required"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format").default("#3b82f6"),
});

export type Tag = z.infer<typeof TagSchema>;

/**
 * Zod schema for a Note entity.
 * Notes are associated with a specific video.
 */
export const NoteSchema = z.object({
  id: z.string().uuid(),
  videoId: z.string().uuid(),
  content: z.string(),
  timestamp: z.number(),
});

export type Note = z.infer<typeof NoteSchema>;

/**
 * Zod schema for a Video entity.
 * Represents a saved YouTube video with its metadata and associations.
 */
export const VideoSchema = z.object({
  id: z.string().uuid(),
  youtubeId: z.string().min(1, "YouTube ID is required"),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid YouTube URL"),
  thumbnail: z.string().url("Invalid thumbnail URL"),
  createdAt: z.number(),
  tagIds: z.array(z.string().uuid()).default([]),
});

export type Video = z.infer<typeof VideoSchema>;

/**
 * Schema for the entire application state when stored in LocalStorage.
 */
export const AppStateSchema = z.object({
  videos: z.array(VideoSchema),
  tags: z.array(TagSchema),
  notes: z.array(NoteSchema),
});

export type AppState = z.infer<typeof AppStateSchema>;
