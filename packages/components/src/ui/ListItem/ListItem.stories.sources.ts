// This file is generated. Do not edit manually.
// Source: src/ui/ListItem/ListItem.stories.tsx

export const Default = () =>
  'export const Default = () => (\n  <ListItem\n    title="Titre"\n    description="Description"\n    onPress={() => {\n      window.alert(\'click !\');\n    }}\n  />\n);';

export const WithTrailing = () =>
  'export const WithTrailing = () => (\n  <ListItem\n    title="Titre"\n    description="Description"\n    trailing={() => <ButtonIcon variant="tertiary" icon="CircleX" onPress={() => console.log(\'remove\')} />}\n    onPress={() => {\n      window.alert(\'click !\');\n    }}\n  />\n);';

export const WithLoading = () =>
  'export const WithLoading = () => (\n  <ListItem\n    title="Titre"\n    description="Description"\n    loading={true}\n    onPress={() => {\n      window.alert(\'click !\');\n    }}\n  />\n);';

export const WithoutSeparator = () =>
  'export const WithoutSeparator = () => (\n  <ListItem\n    title="Titre"\n    description="Description"\n    showSeparateur={false}\n    onPress={() => {\n      window.alert(\'click !\');\n    }}\n  />\n);';

export const WithIcon = () =>
  "export const WithIcon = () => (\n  <ListItem\n    title=\"Titre\"\n    description=\"Description\"\n    IconProps={{ name: 'Settings', color: 'primary' }}\n    onPress={() => {\n      window.alert('click !');\n    }}\n  />\n);";

export const WithAvatar = () =>
  "export const WithAvatar = () => (\n  <ListItem\n    title=\"Titre\"\n    description=\"Description\"\n    AvatarProps={{\n      fallbackText: 'Jean Pierre',\n      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',\n    }}\n    onPress={() => {\n      window.alert('click !');\n    }}\n  />\n);";

export const WithPreviewImage = () =>
  'export const WithPreviewImage = () => (\n  <ListItem\n    title="Titre"\n    description="Description"\n    preview_url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"\n    onPress={() => {\n      window.alert(\'click !\');\n    }}\n  />\n);';

export const withoutHover = () =>
  'export const withoutHover = (\n  <Box>\n    <Typography>Sans props openPress, l’effet de Hover n’apparait pas</Typography>\n    <ListItem title="Titre" description="Description" />\n  </Box>\n);';

export const storySources = {
  Default,
  WithTrailing,
  WithLoading,
  WithoutSeparator,
  WithIcon,
  WithAvatar,
  WithPreviewImage,
  withoutHover,
} as const;

export type StorySourceName = keyof typeof storySources;
