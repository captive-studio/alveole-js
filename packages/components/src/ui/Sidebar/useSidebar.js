import React from 'react';
export function useSidebar() {
  const [open, setOpen] = React.useState(false);
  return { open, setOpen };
}
