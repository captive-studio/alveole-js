import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sheet as TamaguiSheet, SheetProps as TamaguiSheetProps } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { ButtonIcon } from '../Button';
import { Divider } from '../Divider';
import { useStyles } from './BottomSheet.styles';

type BottomSheetWithPoints = {
  points: TamaguiSheetProps['snapPoints'];
  fitContent?: false;
};

type BottomSheetWithoutPoints = {
  points?: undefined;
  fitContent: true;
};

export type BottomSheetProps = React.PropsWithChildren<
  {
    open: TamaguiSheetProps['open'];
    title: string;
    action?: React.ReactNode | undefined;
    setOpen: (value: boolean) => void;
  } & (BottomSheetWithoutPoints | BottomSheetWithPoints)
>;

export const BottomSheet = (props: BottomSheetProps) => {
  const { children, open, title, points, fitContent, action, setOpen } = props;

  const [position, setPosition] = React.useState(0);

  const styles = useStyles();

  const { bottom } = useSafeAreaInsets();
  const snapPointsMode: TamaguiSheetProps['snapPointsMode'] = fitContent ? 'fit' : 'percent';

  return (
    <Box tag="sheet" style={styles.container}>
      <TamaguiSheet
        modal
        forceRemoveScrollEnabled={open}
        open={open}
        onOpenChange={setOpen}
        snapPoints={fitContent ? undefined : points}
        snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <TamaguiSheet.Overlay style={styles.overlay} />
        {/* Un panneau glissant est un dialogue : sans ce rôle, son ouverture n'est pas
            annoncée et son contenu compte comme hors de tout repère de page. */}
        <TamaguiSheet.Frame role="dialog" aria-modal aria-label={title} style={styles.frame}>
          <TamaguiSheet.Handle style={styles.handle} />

          <Box tag="sheet-header" style={styles.header}>
            <Box>
              <ButtonIcon
                icon="X"
                variant="tertiary"
                size="md"
                accessibilityLabel="Fermer"
                onPress={() => setOpen(false)}
              />
            </Box>

            <Box flex={1}>
              <Typography style={styles.title}>{title}</Typography>
            </Box>

            {action && (
              <Box mt={'auto'} mb={'auto'}>
                {action}
              </Box>
            )}
          </Box>

          <Box pl={'2W'} pr={'2W'}>
            <Divider />
          </Box>

          <Box tag="sheet-content" style={[styles.content, !fitContent && styles.contentFull]} pb={bottom}>
            {children}
          </Box>
        </TamaguiSheet.Frame>
      </TamaguiSheet>
    </Box>
  );
};
