import { FlashListProps } from '@shopify/flash-list';
import React from 'react';
export type ResourceListProps<Item> = FlashListProps<Item> & {
  data: Item[];
  isLoading?: boolean;
  withPagination?: boolean;
  noBorder?: boolean;
  withWhiteBackground?: boolean;
  titre?: string;
  renderNoContent: () => React.ReactNode;
};
export declare const ResourceList: <Item>(
  props: ResourceListProps<Item>,
) =>
  | string
  | number
  | bigint
  | boolean
  | import('react/jsx-runtime').JSX.Element
  | Iterable<React.ReactNode>
  | Promise<
      | string
      | number
      | bigint
      | boolean
      | React.ReactPortal
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined
    >
  | null
  | undefined;
//# sourceMappingURL=ResourceList.d.ts.map
