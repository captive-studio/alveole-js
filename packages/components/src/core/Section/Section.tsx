import { Box, BoxProps } from '../../core/Box/Box';
import { useStyles } from './Section.styles';

export type SectionProps = BoxProps & {
  size?: 'full' | 'md' | 'sm';
  withPaddingY?: boolean;
};

export const Section = (props: SectionProps) => {
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

  return (
    <Box tag="section" style={[styles.section, style, withPaddingY && styles.sectionWithPaddingY]} {...boxProps}>
      <Box tag="section-container" style={[style, styles.sectionContainer, sizeContainer]}>
        {props.children}
      </Box>
    </Box>
  );
};
