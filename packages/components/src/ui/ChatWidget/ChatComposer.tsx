import { View } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { LucideIcon } from '../LucideIcon';
import { TextareaInput } from '../TextareaInput';
import { useStyles } from './ChatWidget.styles';

type ComposerProps = {
  body: string;
  onBodyChange: (body: string) => void;
  sending: boolean;
  resolved: boolean;
  canResolve: boolean;
  canSend: boolean;
  error: string | null;
  onSend: () => void;
  onChangeStatus: () => void;
  onHeightChange: (height: number) => void;
};

function ResolvedActions({ sending, onChangeStatus }: Pick<ComposerProps, 'sending' | 'onChangeStatus'>) {
  const styles = useStyles();
  return (
    <Box gap="1V">
      <Button
        variant="tertiary"
        title="Rouvrir la conversation"
        leading="RotateCcw"
        onPress={onChangeStatus}
        disabled={sending}
      />
      <Box style={styles.resolvedStatus}>
        <LucideIcon name="Check" size="sm" color={styles.resolvedText.color} />
        <Typography style={styles.resolvedText}>Conversation résolue</Typography>
      </Box>
    </Box>
  );
}

function OpenActions({ body, onBodyChange, sending, canResolve, canSend, onSend, onChangeStatus }: ComposerProps) {
  const styles = useStyles();
  return (
    <>
      <TextareaInput
        accessibilityLabel="Message au support"
        placeholder="Envoyer un message..."
        numberOfLines={2}
        maxLength={3000}
        value={body}
        onChangeText={onBodyChange}
        disabled={sending}
        openModal={false}
        resize="none"
      />
      <Box style={styles.composerActions}>
        {canResolve && (
          <Box style={styles.sendAction}>
            <Button
              variant="tertiary"
              title="Résoudre"
              leading="Check"
              fullWidth
              onPress={onChangeStatus}
              disabled={sending}
            />
          </Box>
        )}
        <Box style={styles.sendAction}>
          <Button
            variant="primary"
            title="Envoyer"
            leading="Send"
            fullWidth
            isLoading={sending}
            onPress={onSend}
            disabled={!canSend}
          />
        </Box>
      </Box>
    </>
  );
}

export function ChatComposer(props: ComposerProps) {
  const styles = useStyles();
  return (
    <View
      style={styles.composerAnchor}
      onLayout={event => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) props.onHeightChange(height);
      }}
    >
      <Box className="alveole-chat-composer" style={styles.composer}>
        {props.error && (
          <Typography role="alert" style={styles.error}>
            {props.error}
          </Typography>
        )}
        {props.resolved ? <ResolvedActions {...props} /> : <OpenActions {...props} />}
      </Box>
    </View>
  );
}
