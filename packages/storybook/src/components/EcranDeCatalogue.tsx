import { Page } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { PageTitle, PageTitleProps } from './PageTitle';
import { ScreenZone } from './ScreenZone';

export type EcranDeCatalogueProps = {
  title: string;
  description: string;
  sidebar?: React.ReactNode;
  beforeContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  breadcrumbsProps?: PageTitleProps['breadcrumbsProps'];
  children: React.ReactNode;
};

/** La section `theme` n'a pas d'ecran a elle : son segment du fil d'Ariane ne mene nulle part. */
export const filDuTheme: PageTitleProps['breadcrumbsProps'] = {
  getHref: (segment, _index, path) => (segment === 'theme' ? null : path),
};

/** L'echafaudage d'un ecran du catalogue : la page, sa zone sur toute la grille, puis son titre. */
export const EcranDeCatalogue = ({
  title,
  description,
  sidebar,
  beforeContent,
  footerContent,
  breadcrumbsProps,
  children,
}: EcranDeCatalogueProps) => {
  const { grilles } = useTheme();

  return (
    <Page
      scrollable
      title={title}
      description={description}
      sidebar={sidebar}
      beforeContent={beforeContent}
      footerContent={footerContent}
    >
      <ScreenZone largeur={grilles['12 colonnes']}>
        <PageTitle title={title} breadcrumbsProps={breadcrumbsProps} />
        {children}
      </ScreenZone>
    </Page>
  );
};
