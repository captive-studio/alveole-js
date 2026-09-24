import { Box, Page, Section } from '@alveole/components';
import React from 'react';
import { MenuCard } from '../components/MenuCard';

export type UIKitThemePageProps = {
  title?: string;
  description?: string;
  onOpenColors: () => void;
  onOpenTypography: () => void;
  onOpenCSSVariables?: () => void;
  sidebar?: React.ReactNode;
  footerContent?: React.ReactNode;
  beforeContent?: React.ReactNode;
};

export const UIKitThemePage = ({
  title = 'UI Kit - Thème',
  description = 'Tokens du thème',
  onOpenColors,
  onOpenTypography,
  onOpenCSSVariables,
  sidebar,
  footerContent,
  beforeContent,
}: UIKitThemePageProps) => {
  return (
    <Page
      scrollable
      title={title}
      description={description}
      sidebar={sidebar}
      footerContent={footerContent}
      beforeContent={beforeContent}
    >
      <Section withPaddingY>
        <Box display="flex" gap={16}>
          <MenuCard title="Couleurs" description="Palette et couleurs du thème." onPress={onOpenColors} />
          <MenuCard
            title="Typographies"
            description="Styles de texte et hiérarchie typographique."
            onPress={onOpenTypography}
          />
          {onOpenCSSVariables ? (
            <MenuCard
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
