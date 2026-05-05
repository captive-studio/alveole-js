import { jsx as _jsx } from 'react/jsx-runtime';
import { Box } from '../../core/Box/Box';
import { useStyles } from './Section.styles';
export const Section = props => {
  const { style, size, withPaddingY = false, ...boxProps } = props;
  const styles = useStyles();
  let sizeContainer = {};
  sizeContainer = styles.sectionContainerMD;
  if (size === 'full') {
    sizeContainer = styles.sectionContainerFull;
  }
  if (size === 'md') {
    sizeContainer = styles.sectionContainerMD;
  }
  if (size === 'sm') {
    sizeContainer = styles.sectionContainerSM;
  }
  return _jsx(Box, {
    tag: 'section',
    style: [styles.section, style, withPaddingY && styles.sectionWithPaddingY],
    ...boxProps,
    children: _jsx(Box, {
      tag: 'section-container',
      style: [style, styles.sectionContainer, sizeContainer],
      children: props.children,
    }),
  });
};
