import { isSpacingKey, Spacings, useTheme } from '@alveole/theme';
import React from 'react';
import { Box, BoxAdvancedStyle, BoxProps } from '../../core/Box';
import { useStyles } from './Grid.styles';

export const GridGapContext = React.createContext<number>(0);

type GridProps = Pick<BoxProps, 'children' | 'gap'> & BoxAdvancedStyle;
type GridColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type GridColumnProps = Pick<BoxProps, 'children' | 'style'> & {
  size: GridColumnSize | { mobile: GridColumnSize; desktop: GridColumnSize; tablet?: GridColumnSize };
} & BoxAdvancedStyle;

const GridContainer = (props: GridProps) => {
  const { children, gap = 0, ...advancedStyles } = props;

  const styles = useStyles();

  const spacing = isSpacingKey(gap) ? Spacings[gap] : gap;

  return (
    <GridGapContext.Provider value={spacing}>
      <Box tag="grid" style={styles.grid} {...advancedStyles}>
        <Box
          tag="grid-container"
          style={[
            styles.container,
            {
              marginLeft: -spacing / 2,
              marginRight: -spacing / 2,
              marginBottom: -spacing,
            },
          ]}
        >
          {children}
        </Box>
      </Box>
    </GridGapContext.Provider>
  );
};

const GridColumn = (props: GridColumnProps) => {
  const { children, style, size, ...advancedStyles } = props;

  const { isVariant } = useTheme();

  const gap = React.useContext(GridGapContext);

  const desktopSize = typeof size === 'number' ? size : size.desktop;
  const mobileSize = typeof size === 'number' ? size : size.mobile;
  const tabletSize = typeof size === 'number' ? size : (size.tablet ?? size.desktop);

  const widthPercent = `${
    (isVariant('mobile') ? mobileSize / 12 : isVariant('tablet') ? tabletSize / 12 : desktopSize / 12) * 100
  }%`;

  return (
    <Box
      tag="grid-column"
      style={[
        {
          width: widthPercent,
          paddingLeft: gap / 2,
          paddingRight: gap / 2,
          paddingBottom: gap,
        },
        style,
      ]}
      {...advancedStyles}
    >
      {children}
    </Box>
  );
};

export const Grid = Object.assign(GridContainer, {
  Column: GridColumn,
});
