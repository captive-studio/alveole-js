import { Box, Card, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';

type MenuCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

/** Une entree de menu du kit : un titre, ce qu'on trouve derriere, et le moyen d'y aller. */
export const MenuCard = ({ title, description, onPress }: MenuCardProps) => {
  const { text } = useTheme();

  return (
    <Card onPress={onPress}>
      <Box display="flex" gap={8} p={'150'}>
        <Typography style={text.Titres['H4 - SM']}>{title}</Typography>
        <Typography style={text['Corps de texte'].SM.Regular}>{description}</Typography>
      </Box>
    </Card>
  );
};
