import { Box, Card, Page, Section, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';

type ThemeCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

const ThemeCard = ({ title, description, onPress }: ThemeCardProps) => {
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

export type UIKitThemePageProps = {
  title?: string;
  description?: string;
  onOpenColors: () => void;
  onOpenTypography: () => void;
  onOpenCSSVariables?: () => void;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
};

export const UIKitThemePage = ({
  title = 'UI Kit - Thème',
  description = 'Tokens du thème',
  onOpenColors,
  onOpenTypography,
  onOpenCSSVariables,
  sidebar,
  footerContent,
}: UIKitThemePageProps) => {
  return (
    <Page scrollable title={title} description={description} sidebar={sidebar} footerContent={footerContent}>
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <ThemeCard title="Couleurs" description="Palette et couleurs du thème." onPress={onOpenColors} />
          <ThemeCard
            title="Typographies"
            description="Styles de texte et hiérarchie typographique."
            onPress={onOpenTypography}
          />
          {onOpenCSSVariables ? (
            <ThemeCard
              title="Variables CSS"
              description="Les jetons du thème exposés en variables CSS."
              onPress={onOpenCSSVariables}
            />
          ) : null}
        </Box>
      </Section>
    </Page>
  );
};
