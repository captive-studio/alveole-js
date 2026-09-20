import React from 'react';
import { ScrollView } from 'react-native';

export type TabsContentProps = {
  content: React.ReactNode;
  scrollable?: boolean;
};

// Un onglet declare lui-meme si son contenu defile : la coque des onglets a une hauteur fixe,
// et sans cette enveloppe un contenu long deborderait au lieu de defiler.
export const TabsContent = ({ content, scrollable }: TabsContentProps) => {
  if (!scrollable) return <>{content}</>;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 16 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator
    >
      {content}
    </ScrollView>
  );
};
