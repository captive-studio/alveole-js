import { ALVEOLE_COMPONENTS_VERSION, Box, Typography } from '@alveole/components';
import { Spacings, useTheme } from '@alveole/theme';

export const DocFooter = () => {
  const { color, text } = useTheme();
  return (
    // Repère de pied de page : sans lui, ce bloc reste hors de tout repère, seule zone de
    // la coquille que le repère principal ne couvre pas.
    <Box
      tag="footer"
      style={{
        borderTopWidth: 1,
        borderTopColor: color.light.border['default-grey'],
        paddingTop: Spacings['3V'],
        paddingBottom: Spacings['3V'],
        paddingLeft: Spacings['3W'],
        paddingRight: Spacings['3W'],
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.Regular, color: color.light.text['mention-grey'] }}>
        Alveole UI Kit — v{ALVEOLE_COMPONENTS_VERSION}
      </Typography>
    </Box>
  );
};
