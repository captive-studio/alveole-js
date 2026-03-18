import { Box, Version } from '../../core';
import { Divider } from '../Divider';

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
