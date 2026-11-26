import { focusRingProps } from '@alveole/theme';
import { ScrollView } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Badge } from '../Badge';
import { Button, ButtonIcon } from '../Button';
import { Card } from '../Card';
import { LucideIcon } from '../LucideIcon';
import { useStyles } from './ChatWidget.styles';
import type { ChatSection } from './ChatWidget.types';

export function ChatUnreadBadge({ count }: { count: number }) {
  const styles = useStyles();
  if (count === 0) return null;
  const plural = count > 1 ? 's' : '';
  return (
    <Box style={styles.badgePosition} pointerEvents="none">
      <Badge
        variant="error"
        size="sm"
        style={styles.unreadBadge}
        aria-label={`${count} message${plural} non lu${plural}`}
      >
        {count > 99 ? '99+' : count}
      </Badge>
    </Box>
  );
}

export function ChatHeader({
  title,
  onBack,
  onNew,
  onClose,
}: {
  title: string;
  onBack?: () => void;
  onNew: () => void;
  onClose: () => void;
}) {
  const styles = useStyles();
  return (
    <Box className="alveole-chat-header" style={styles.header}>
      <Box style={styles.row}>
        <Box style={styles.headerAction}>
          {onBack ? (
            <ButtonIcon
              icon="ArrowLeft"
              size="sm"
              variant="tertiary"
              accessibilityLabel="Toutes les conversations"
              onPress={onBack}
            />
          ) : (
            <ButtonIcon
              icon="SquarePen"
              size="sm"
              variant="tertiary"
              accessibilityLabel="Nouvelle conversation"
              onPress={onNew}
            />
          )}
        </Box>
        <Typography style={styles.headerTitle}>{title}</Typography>
        <Box style={styles.headerAction}>
          <ButtonIcon icon="X" size="sm" variant="tertiary" accessibilityLabel="Fermer le chat" onPress={onClose} />
        </Box>
      </Box>
    </Box>
  );
}

export function ChatHome({ onNew, onShowMessages }: { onNew: () => void; onShowMessages: () => void }) {
  const styles = useStyles();
  return (
    <ScrollView style={styles.messages} contentContainerStyle={styles.homeScroll}>
      <Box className="alveole-chat-cascade" style={styles.home}>
        <Typography style={styles.welcome}>Bonjour 👋</Typography>
        <Typography style={styles.title}>Comment pouvons-nous vous aider ?</Typography>
        <Card
          tag="button"
          role="button"
          aria-label="Envoyez-nous un message"
          style={styles.contactCard}
          onPress={onNew}
          {...focusRingProps()}
        >
          <Card.Header
            style={{ alignItems: 'center' }}
            titre="Envoyez-nous un message"
            sousTitre="Nous vous répondons le plus vite possible."
            badge={<LucideIcon name="Send" size="md" color={styles.contactArrow.color} />}
          />
        </Card>
        <Button
          variant="tertiary"
          title="Retrouver mes conversations"
          leading="MessagesSquare"
          fullWidth
          onPress={onShowMessages}
        />
      </Box>
    </ScrollView>
  );
}

const TABS = [
  { value: 'home', label: 'Accueil', icon: 'House' },
  { value: 'messages', label: 'Messages', icon: 'MessagesSquare' },
] as const;

export function ChatNavigation({
  navigationId,
  section,
  onSelect,
  unreadCount,
}: {
  navigationId: string;
  section: ChatSection;
  onSelect: (section: ChatSection) => void;
  unreadCount: number;
}) {
  const styles = useStyles();
  return (
    <Box
      role="tablist"
      aria-label="Navigation du chat"
      style={styles.bottomNav}
      onKeyDown={(event: { key: string; preventDefault: () => void }) => {
        const key = event.key;
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
        event.preventDefault();
        const next = key === 'Home' ? 'home' : key === 'End' ? 'messages' : section === 'home' ? 'messages' : 'home';
        onSelect(next);
        if (typeof document !== 'undefined') document.getElementById(`${navigationId}-tab-${next}`)?.focus();
      }}
    >
      {TABS.map(tab => {
        const selected = section === tab.value;
        return (
          <Box
            key={tab.value}
            tag="button"
            role="tab"
            id={`${navigationId}-tab-${tab.value}`}
            aria-controls={`${navigationId}-${tab.value}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            aria-label={tab.label}
            style={[styles.bottomTab, selected && styles.bottomTabSelected]}
            onPress={() => onSelect(tab.value)}
            {...focusRingProps()}
          >
            <Box style={styles.badgeAnchor}>
              <LucideIcon
                name={tab.icon}
                size="sm"
                color={selected ? styles.tabTextSelected.color : styles.tabText.color}
              />
              {tab.value === 'messages' && unreadCount > 0 && (
                <Box role="img" aria-label="Messages non lus" pointerEvents="none" style={styles.tabUnreadDot} />
              )}
            </Box>
            <Typography style={[styles.tabText, selected && styles.tabTextSelected]}>{tab.label}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}
