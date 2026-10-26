import type { Metadata } from 'expo-router/server';

/**
 * Depuis le SDK 58, `expo-router/head` (donc `PageHead`) n'écrit plus dans le HTML pré-rendu :
 * chaque route déclare ici ce que les robots et les aperçus de liens lisent sans JavaScript.
 */
export const metadonnees = (title: string, description: string): Metadata => ({
  title,
  description,
  openGraph: { title, description },
});
