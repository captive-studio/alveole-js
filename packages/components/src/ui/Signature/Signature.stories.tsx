import * as React from 'react';
import { Box, Image, Typography } from '../../';
import type { Story } from '../../type/Story';
import { Signature } from './Signature';
import { useStyles } from './Signature.styles';

export default {
  title: 'Signature',
  tags: ['ui'],
  experimental: true,
  description:
    'Composant de signature par le doigt ou la souris. Différent entre web et mobile. La hauteur doit être fixe.',
  component: Signature,
  styleFn: useStyles,
} satisfies Story;

export const Example = () => {
  const containerHeight = 100;
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Box width={'100%'}>
      <Signature height={containerHeight} onChange={setValue} />

      {value && (
        <>
          <Typography fontSize={24}>Signature capturée :</Typography>
          <Image contentFit="contain" height={containerHeight} width="100%" source={value} />
        </>
      )}
    </Box>
  );
};

export const CustomLabels = () => {
  const containerHeight = 100;
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Box width={'100%'}>
      <Signature height={containerHeight} onChange={setValue} dateLabel="Date :" clearButtonLabel="Clear" />

      {value && (
        <>
          <Typography fontSize={24}>Captured signature:</Typography>
          <Image contentFit="contain" height={containerHeight} width="100%" source={value} />
        </>
      )}
    </Box>
  );
};

export * as Sources from './Signature.stories.sources';
