import { Box, Divider, Version } from '@alveole/components';

import React from 'react';

export type SidebarFooterProps = React.PropsWithChildren;

export const SidebarFooter = (props: SidebarFooterProps) => {
  const { children } = props;

  return (
    <Box>
      <Version />

      <Divider />

      {children}
    </Box>
  );
};
