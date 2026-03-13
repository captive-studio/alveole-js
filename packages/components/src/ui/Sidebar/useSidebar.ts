import React from 'react';

export function useSidebar(): SidebarController {
  const [open, setOpen] = React.useState(false);
  return { open, setOpen };
}

export interface SidebarController {
  open: boolean;
  setOpen: (value: boolean) => void;
}
