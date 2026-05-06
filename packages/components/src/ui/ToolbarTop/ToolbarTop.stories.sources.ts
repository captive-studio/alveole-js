// This file is generated. Do not edit manually.
// Source: src/ui/ToolbarTop/ToolbarTop.stories.tsx

export const Default = () => "export const Default = () => <ToolbarTop title=\"Titre\" sousTitre=\"Sous-titre\" />;";

export const AvecRetourArriere = () => "export const AvecRetourArriere = () => (\n  <ToolbarTop title=\"Titre\" sousTitre=\"Sous-titre\" onNavigate={() => router.back()} />\n);";

export const SansAvatarEtAvecActions = () => "export const SansAvatarEtAvecActions = () => (\n  <ToolbarTop\n    title=\"Titre\"\n    sousTitre=\"Sous-titre\"\n    onNavigate={console.log}\n    actions={<ButtonIcon variant=\"tertiary\" size=\"lg\" iconSize=\"md\" icon={'Plus'} onPress={console.log} />}\n  />\n);";

export const AvecAvatarSansActions = () => "export const AvecAvatarSansActions = () => (\n  <ToolbarTop title=\"Titre\" sousTitre=\"Sous-titre\" AvatarProps={{ src: 'https://picsum.photos/100/200' }} />\n);";

export const AvecAvatarEtActions = () => "export const AvecAvatarEtActions = () => (\n  <ToolbarTop\n    title=\"Titre\"\n    sousTitre=\"Sous-titre\"\n    onNavigate={console.log}\n    AvatarProps={{ src: 'https://picsum.photos/100/200' }}\n    actions={<ButtonIcon variant=\"tertiary\" size=\"lg\" iconSize=\"md\" icon={'Plus'} onPress={console.log} />}\n  />\n);";

export const AvecPlusieursActions = () => "export const AvecPlusieursActions = () => (\n  <ToolbarTop\n    title=\"Titre\"\n    sousTitre=\"Sous-titre\"\n    onNavigate={console.log}\n    AvatarProps={{ src: 'https://picsum.photos/100/200' }}\n    actions={\n      <>\n        <ButtonIcon variant=\"tertiary\" size=\"lg\" iconSize=\"md\" icon={'Plus'} onPress={console.log} />\n        <ButtonIcon variant=\"tertiary\" size=\"lg\" iconSize=\"md\" icon={'Download'} onPress={console.log} />\n      </>\n    }\n  />\n);";

export const AvecTitreEtSansSousTitre = () => "export const AvecTitreEtSansSousTitre = () => (\n  <ToolbarTop\n    title=\"Titre\"\n    onNavigate={console.log}\n    AvatarProps={{ src: 'https://picsum.photos/100/200' }}\n    actions={\n      <>\n        <ButtonIcon variant=\"tertiary\" size=\"lg\" iconSize=\"md\" icon={'Plus'} onPress={console.log} />\n        <ButtonIcon variant=\"tertiary\" size=\"lg\" iconSize=\"md\" icon={'Download'} onPress={console.log} />\n      </>\n    }\n  />\n);";

export const AvecBorder = () => "export const AvecBorder = () => (\n  <>\n    <Typography>\n      En règle général, on applique la propriété `withBorder` sur la ToolbarTop pour ajouter une bordure seulement quand\n      on a scroll dans la page. Si on retourne en haut de la page, la bordure disparaît.\n    </Typography>\n    <ToolbarTop title=\"Titre\" sousTitre=\"Sous-titre\" withBorder />\n  </>\n);";

export const CompactLarge = () => "export const CompactLarge = () => <ToolbarTop title=\"Titre compact large\" variant=\"compactLarge\" />;";

export const Large = () => "export const Large = () => (\n  <ToolbarTop title=\"Titre large\" variant=\"large\" onNavigate={console.log} sousTitre=\"Sous-titre\" />\n);";

export const storySources = {
  Default,
  AvecRetourArriere,
  SansAvatarEtAvecActions,
  AvecAvatarSansActions,
  AvecAvatarEtActions,
  AvecPlusieursActions,
  AvecTitreEtSansSousTitre,
  AvecBorder,
  CompactLarge,
  Large,
} as const;

export type StorySourceName = keyof typeof storySources;
