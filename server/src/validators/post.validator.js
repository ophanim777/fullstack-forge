import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Konten tidak boleh kosong.")
    .max(1000, "Konten maksimal 1000 karakter."),
});

export const updatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Content wajib diisi.")
    .max(1000, "Content maksimal 1000 karakter."),
});