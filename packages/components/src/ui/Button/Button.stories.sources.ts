// This file is generated. Do not edit manually.
// Source: src/ui/Button/Button.stories.tsx

export const Sizes = () => "export const Sizes = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"secondary\" size=\"sm\" title=\"Bouton sm\" />\n    <Button variant=\"secondary\" size=\"md\" title=\"Bouton md\" />\n    <Button variant=\"secondary\" size=\"lg\" title=\"Bouton lg\" />\n  </Box>\n);";

export const Primary = () => "export const Primary = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"primary\" title=\"Bouton primary\" />\n    <Button variant=\"primary\" title=\"Disabled\" disabled />\n  </Box>\n);";

export const Secondary = () => "export const Secondary = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"secondary\" title=\"Bouton secondary\" />\n    <Button variant=\"secondary\" title=\"Disabled\" disabled />\n  </Box>\n);";

export const Tertiary = () => "export const Tertiary = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"tertiary\" title=\"Bouton tertiary\" />\n    <Button variant=\"tertiary\" title=\"Disabled\" disabled />\n  </Box>\n);";

export const Danger = () => "export const Danger = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"danger\" title=\"Bouton danger\" />\n    <Button variant=\"danger\" title=\"Disabled\" disabled />\n  </Box>\n);";

export const Link = () => "export const Link = () => (\n  <Box display=\"flex\" flexDirection=\"column\" gap={8}>\n    <Typography>Deprecated</Typography>\n    <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n      <Button variant=\"link\" title=\"Bouton link\" />\n      <Button variant=\"link\" title=\"Disabled\" disabled />\n      <Button variant=\"link\" title=\"Disabled\" disabled startIcon=\"Pen\" />\n    </Box>\n  </Box>\n);";

export const Icons = () => "export const Icons = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"primary\" title=\"Start Icon\" startIcon=\"Plus\" />\n    <Button variant=\"primary\" title=\"End Icon\" endIcon=\"Plus\" />\n    <Button variant=\"primary\" title=\"End Icon\" endIcon=\"Plus\" />\n    <ButtonIcon variant=\"primary\" icon=\"CircleUser\" />\n    <ButtonIcon variant=\"primary\" icon=\"CircleUser\" />\n  </Box>\n);";

export const FullWidth = () => "export const FullWidth = () => <Button variant=\"primary\" title=\"Full Width\" fullWidth />;";

export const Selected = () => "export const Selected = () => (\n  <Box display=\"flex\" flexDirection=\"row\" gap={4}>\n    <Button variant=\"secondary\" title=\"Selected\" selected />\n  </Box>\n);";

export const Active = () => "export const Active = () => (\n  <Box display=\"flex\" flexDirection=\"column\" gap={4}>\n    <Typography>Utilisé quand le bouton est actif (ex: quand un menu est ouvert)</Typography>\n    <Box>\n      <Button variant=\"secondary\" title=\"Active\" active />\n    </Box>\n  </Box>\n);";

export const storySources = {
  Sizes,
  Primary,
  Secondary,
  Tertiary,
  Danger,
  Link,
  Icons,
  FullWidth,
  Selected,
  Active,
} as const;

export type StorySourceName = keyof typeof storySources;
