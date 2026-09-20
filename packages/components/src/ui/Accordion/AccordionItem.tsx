import { focusRingProps } from '@alveole/theme';
import React from 'react';
import { Square, Accordion as TamaguiAccordion } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { useStyles } from './Accordion.styles';

export type AccordionItemProps = {
  value: string;
  label: string;
  labelChildren?: React.ReactNode;
  afterLabel?: React.ReactNode;
  variant?: 'default' | 'alt' | 'outline';
  startIcon?: LucideIconProps['name'];
  children?: React.ReactNode;
  noPadding?: boolean;
};

export const AccordionItem = (props: AccordionItemProps) => {
  const { children, label, labelChildren, startIcon, variant, noPadding, afterLabel, ...itemProps } = props;

  const styles = useStyles();

  const headerStyle = (open: boolean) => ({
    ...(variant === 'alt'
      ? styles.accordionItemHeaderAlt
      : variant === 'outline'
        ? styles.accordionItemHeaderOutline
        : styles.accordionItemHeader),
    ...(open ? styles.accordionItemHeaderOpen : {}),
    ...(afterLabel ? { paddingBottom: 4 } : {}),
  });

  return (
    <TamaguiAccordion.Item {...itemProps}>
      <TamaguiAccordion.Trigger unstyled style={styles.accordionItemTrigger} {...focusRingProps()}>
        {({ open }: { open: boolean }) => (
          <Box backgroundColor={headerStyle(open).backgroundColor}>
            <Box style={headerStyle(open)} hoverStyle={headerStyle(open)} focusStyle={headerStyle(open)}>
              {startIcon && <LucideIcon name={startIcon} size="md" />}
              <Typography style={styles.accordionItemLabel} mr={labelChildren ? undefined : 'auto'}>
                {label}
              </Typography>
              {labelChildren && (
                <Box mr={'auto'} mt={'auto'} mb={'auto'}>
                  {labelChildren}
                </Box>
              )}
              <Square
                animation="75ms"
                rotate={open ? '180deg' : '0deg'}
                style={{ marginTop: 'auto', marginBottom: 'auto' }}
              >
                <LucideIcon name="ChevronDown" size="sm" />
              </Square>
            </Box>

            {afterLabel && (
              <Box style={styles.accordionAfterLabel}>
                <Box mr={'auto'} mt={'auto'} mb={'auto'}>
                  {afterLabel}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </TamaguiAccordion.Trigger>
      <TamaguiAccordion.HeightAnimator animation="quicker" style={{ overflow: 'hidden', position: 'relative' }}>
        <TamaguiAccordion.Content
          animation="quickest"
          style={{ ...styles.accordionItemContent, padding: noPadding ? 0 : undefined }}
        >
          {children}
        </TamaguiAccordion.Content>
      </TamaguiAccordion.HeightAnimator>
    </TamaguiAccordion.Item>
  );
};
