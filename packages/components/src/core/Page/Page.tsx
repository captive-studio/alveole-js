import React from 'react';
import type { PageProps } from './Page.types';
import { PageContent } from './PageContent';
import { PageHead } from './PageHead';

export const Page = (props: PageProps) => {
  return (
    <React.Fragment>
      <PageHead {...props} />
      <PageContent {...props} />
    </React.Fragment>
  );
};
