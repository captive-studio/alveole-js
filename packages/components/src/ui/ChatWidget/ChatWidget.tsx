import { useId, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Box } from '../../core/Box';
import { ButtonIcon } from '../Button';
import { ChatConversation } from './ChatConversation';
import { ChatConversationList } from './ChatConversationList';
import { ChatHeader, ChatHome, ChatNavigation, ChatUnreadBadge } from './ChatParts';
import { useStyles } from './ChatWidget.styles';
import type { ChatActiveConversation, ChatSection, ChatWidgetProps } from './ChatWidget.types';
import { useChatMotion } from './chatMotion';

export * from './ChatWidget.types';

type ChatState = ReturnType<typeof useChatState>;

// L'ouverture, l'onglet et la conversation active, avec les rappels vers l'application.
function useChatState(props: ChatWidgetProps) {
  const { initialOpen = false, initialSection = 'home', initialConversationId = 'list' } = props;
  const [open, setOpenState] = useState(initialOpen);
  const [section, setSection] = useState<ChatSection>(initialSection);
  const [active, setActiveState] = useState<ChatActiveConversation>(initialConversationId);
  const setOpen = (next: boolean) => {
    setOpenState(next);
    props.onOpenChange?.(next);
  };
  const setActive = (next: ChatActiveConversation) => {
    setActiveState(next);
    props.onActiveConversationChange?.(next);
  };
  const showMessages = (next: ChatActiveConversation) => {
    setActive(next);
    setSection('messages');
  };
  return { open, setOpen, section, setSection, active, setActive, showMessages };
}

function ChatMessagesPanel({ props, state }: { props: ChatWidgetProps; state: ChatState }) {
  const { active, setActive, showMessages } = state;
  if (active === 'list') {
    return (
      <ChatConversationList
        conversations={props.conversations}
        loading={props.conversationsLoading ?? false}
        error={props.conversationsError ?? false}
        onSelect={setActive}
        onNew={() => showMessages('new')}
      />
    );
  }
  const isNew = active === 'new';
  return (
    <ChatConversation
      key={active}
      id={isNew ? undefined : active}
      conversation={isNew ? undefined : props.conversation}
      onSend={props.onSend}
      onToggleResolved={props.onToggleResolved}
      onCreated={setActive}
      renderMessageBody={props.renderMessageBody}
    />
  );
}

function ChatPanel({
  props,
  state,
  title,
  unreadCount,
}: {
  props: ChatWidgetProps;
  state: ChatState;
  title: string;
  unreadCount: number;
}) {
  const styles = useStyles();
  const dimensions = useWindowDimensions();
  const navigationId = useId();
  const { section, setSection, active, setActive, setOpen, showMessages } = state;
  const inMessages = section === 'messages';
  return (
    <Box
      className="alveole-chat-panel"
      aria-label={`Discussion avec ${title}`}
      style={[styles.panel, { height: Math.min(640, dimensions.height - 120) }]}
    >
      <Box className="alveole-chat-aurora" pointerEvents="none" />
      <ChatHeader
        title={inMessages && active === 'new' ? 'Nouvelle conversation' : title}
        onBack={inMessages && active !== 'list' ? () => setActive('list') : undefined}
        onNew={() => showMessages('new')}
        onClose={() => setOpen(false)}
      />
      <Box
        role="tabpanel"
        aria-labelledby={`${navigationId}-tab-home`}
        id={`${navigationId}-home`}
        style={styles.tabPanel}
        display={inMessages ? 'none' : 'flex'}
      >
        <ChatHome onNew={() => showMessages('new')} onShowMessages={() => showMessages('list')} />
      </Box>
      <Box
        role="tabpanel"
        aria-labelledby={`${navigationId}-tab-messages`}
        id={`${navigationId}-messages`}
        style={styles.tabPanel}
        display={inMessages ? 'flex' : 'none'}
      >
        <ChatMessagesPanel props={props} state={state} />
      </Box>
      <ChatNavigation navigationId={navigationId} section={section} onSelect={setSection} unreadCount={unreadCount} />
    </Box>
  );
}

/**
 * Chat de support flottant : un lanceur qui respire et un panneau révélé en cercle,
 * avec accueil, liste des conversations et fil de messages. Les données et l'envoi
 * restent à l'application, qui les fournit en props.
 */
export function ChatWidget(props: ChatWidgetProps) {
  useChatMotion();
  const styles = useStyles();
  const dimensions = useWindowDimensions();
  const state = useChatState(props);
  const title = props.title ?? 'Support';
  const unreadCount = (props.conversations ?? []).reduce((sum, item) => sum + item.unreadCount, 0);
  const { open, setOpen } = state;

  return (
    <Box style={[styles.anchor, props.inline && styles.inline, { maxWidth: dimensions.width - 32 }]}>
      {open && <ChatPanel props={props} state={state} title={title} unreadCount={unreadCount} />}
      <Box className={`alveole-chat-launcher${open ? ' alveole-chat-launcher-open' : ''}`} style={styles.badgeAnchor}>
        <ButtonIcon
          variant="primary"
          size="lg"
          iconSize="md"
          style={styles.launcher}
          icon={open ? 'X' : 'MessageCircle'}
          accessibilityLabel={open ? 'Réduire le chat' : `Discuter avec ${title}`}
          onPress={() => setOpen(!open)}
        />
        <ChatUnreadBadge count={unreadCount} />
      </Box>
    </Box>
  );
}
