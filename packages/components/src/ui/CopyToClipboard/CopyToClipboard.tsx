import React from 'react';
import { Clipboard, GestureResponderEvent, Pressable, PressableProps, PressableStateCallbackType } from 'react-native';
import { Typography } from '../../core/Typography';
import { useStyles as useButtonStyles } from '../Button/Button.styles';
import { LucideIcon } from '../LucideIcon';
import { Popover } from '../Popover';
import { useStyles } from './CopyToClipboard.styles';

type CustomPressableState = PressableStateCallbackType & { hovered?: boolean };

export type CopyToClipboardProps = {
  /** Valeur copiée dans le presse-papiers. */
  value: string;
  /** Message affiché dans le popover après la copie. */
  message?: string;
  /** Libellé d'accessibilité du bouton. */
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onCopy?: (value: string) => void;
};

// Délai avant que l'icône et le popover ne reviennent à leur état initial.
const FEEDBACK_DURATION = 2000;

export const CopyToClipboard = (props: CopyToClipboardProps) => {
  const { value, message = 'Copié !', ariaLabel = 'Copier', size = 'md', disabled, onCopy } = props;

  const buttonStyles = useButtonStyles();
  const styles = useStyles();

  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handlePress = (event: GestureResponderEvent) => {
    // Empêche le Popover de gérer lui-même l'ouverture/fermeture au clic : c'est notre timer qui décide.
    event.preventDefault();

    Clipboard.setString(value);
    onCopy?.(value);

    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), FEEDBACK_DURATION);
  };

  const containerSize =
    size === 'sm'
      ? buttonStyles.smContainerIconOnly
      : size === 'lg'
        ? buttonStyles.lgContainerIconOnly
        : buttonStyles.mdContainerIconOnly;

  const containerStyle: PressableProps['style'] = (state: CustomPressableState) => {
    let applicableStyles: any = { ...buttonStyles.container, ...buttonStyles.tertiaryContainer };
    if (disabled) applicableStyles = { ...applicableStyles, ...buttonStyles.tertiaryContainerDisabled };
    else if (state.hovered) applicableStyles = { ...applicableStyles, ...buttonStyles.tertiaryContainerHover };
    return { ...applicableStyles, ...containerSize };
  };

  const iconColor = (state: { hovered?: boolean }) => {
    if (copied) return styles.copiedIcon.color;
    if (disabled) return buttonStyles.tertiaryIconDisabled.color;
    if (state.hovered) return buttonStyles.tertiaryIconHover.color;
    return buttonStyles.tertiaryIcon.color;
  };

  return (
    <Popover
      placement="left"
      open={copied}
      setOpen={setCopied}
      scrollable={false}
      renderTrigger={() => (
        <Pressable
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={ariaLabel}
          onPress={handlePress}
          style={containerStyle}
        >
          {(state: CustomPressableState) => (
            <LucideIcon
              name={copied ? 'Check' : 'Copy'}
              size={size === 'lg' ? 'md' : 'sm'}
              color={iconColor({ hovered: !!state.hovered })}
            />
          )}
        </Pressable>
      )}
    >
      <Typography style={styles.message}>{message}</Typography>
    </Popover>
  );
};
