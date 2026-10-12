import React from 'react';
import { FileInputProps } from '../FormControl';

export type FileDropZoneProps = Pick<FileInputProps, 'value' | 'onChange' | 'type' | 'multiple' | 'disabled'> & {
  children: React.ReactNode;
  /** Le texte de la surcouche pendant le survol. */
  message?: string;
};

/** Le glisser-deposer de fichiers n'existe que sur le web : hors web, la zone rend ses enfants. */
export const FileDropZone = ({ children }: FileDropZoneProps) => <>{children}</>;
