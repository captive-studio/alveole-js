import type { ComponentRef } from 'react';
import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { A } from '../../core/A';
import { Box } from '../../core/Box';
import { Image } from '../../core/Image';
import { Typography } from '../../core/Typography';
import { Avatar } from '../Avatar';
import { EmptyState } from '../EmptyState';
import { Spinner } from '../Spinner';
import { ChatComposer } from './ChatComposer';
import { useStyles } from './ChatWidget.styles';
import type { ChatConversationData, ChatMessageData } from './ChatWidget.types';

type RenderBody = (message: ChatMessageData) => React.ReactNode;

function DefaultBody({ message }: { message: ChatMessageData }) {
  const styles = useStyles();
  return (
    <Typography userSelect="text" className="alveole-chat-text" style={styles.body}>
      {message.body}
    </Typography>
  );
}

function MessageImages({ message }: { message: ChatMessageData }) {
  const styles = useStyles();
  const images = message.imageUrls ?? [];
  if (images.length === 0) return null;
  return (
    <Box style={styles.messageImages}>
      {images.map(url => (
        <A key={url} href={url} target="_blank">
          <Image
            source={{ uri: url }}
            width={120}
            height={90}
            style={styles.messageImage}
            contentFit="cover"
            accessibilityLabel={`Image envoyée par ${message.authorName}, ouvrir en grand`}
          />
        </A>
      ))}
    </Box>
  );
}

function MessageMetadata({ message }: { message: ChatMessageData }) {
  const styles = useStyles();
  return (
    <Box style={message.role === 'client' ? styles.clientMetadata : styles.operatorMetadata}>
      <Typography lineHeight="14px" style={styles.messageTime}>
        {new Date(message.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      </Typography>
      {message.delivery === 'queued' && <Typography style={styles.hint}>Envoi en cours…</Typography>}
      {message.delivery === 'failed' && (
        <Typography style={styles.error}>Message conservé ici, transmission au support échouée.</Typography>
      )}
    </Box>
  );
}

function OperatorIdentity({ message }: { message: ChatMessageData }) {
  const styles = useStyles();
  return (
    <Box style={styles.messageAvatar}>
      <Avatar size="sm" src={message.avatarUrl ?? undefined} fallbackText={message.authorName} />
    </Box>
  );
}

function ChatMessage({ message, renderBody }: { message: ChatMessageData; renderBody?: RenderBody }) {
  const styles = useStyles();
  const client = message.role === 'client';
  const body = renderBody ? renderBody(message) : <DefaultBody message={message} />;
  return (
    <Box gap="0,5V">
      <Box style={[styles.messageRow, client && styles.clientRow]}>
        {!client && <OperatorIdentity message={message} />}
        <Box style={[styles.messageContent, client && styles.clientContent]}>
          {!client && <Typography style={styles.messageAuthor}>{message.authorName}</Typography>}
          <MessageImages message={message} />
          {message.body !== '' && (
            <Box
              className={`alveole-chat-bubble alveole-chat-bubble-${message.role}`}
              style={[styles.message, client ? styles.clientMessage : styles.operatorMessage]}
            >
              {body}
            </Box>
          )}
        </Box>
      </Box>
      <MessageMetadata message={message} />
    </Box>
  );
}

const day = (createdAt: string) => new Date(createdAt).toLocaleDateString('fr-FR');

// Les messages, avec la date en tête de chaque journée.
function MessageList({ messages, renderBody }: { messages: ChatMessageData[]; renderBody?: RenderBody }) {
  const styles = useStyles();
  return messages.map((message, index) => {
    const firstOfDay = index === 0 || day(message.createdAt) !== day(messages[index - 1].createdAt);
    return (
      <React.Fragment key={message.id}>
        {firstOfDay && (
          <Typography style={styles.messageDate}>
            {new Date(message.createdAt).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
        )}
        <ChatMessage message={message} renderBody={renderBody} />
      </React.Fragment>
    );
  });
}

type ConversationProps = {
  id?: string;
  conversation?: ChatConversationData;
  onSend: (body: string, conversationId?: string) => Promise<string | void>;
  onToggleResolved?: (conversationId: string, resolved: boolean) => Promise<void>;
  onCreated: (id: string) => void;
  renderMessageBody?: RenderBody;
};

// La saisie et les deux actions (envoyer, changer le statut), qui partagent le même état d'envoi.
function useConversationActions({ id, conversation, onSend, onToggleResolved, onCreated }: ConversationProps) {
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resolved = Boolean(id && conversation?.resolved);

  const run = async (action: () => Promise<void>, failure: string) => {
    setSending(true);
    setError(null);
    try {
      await action();
    } catch {
      setError(failure);
    } finally {
      setSending(false);
    }
  };

  const send = () => {
    const text = body.trim();
    if (!text || sending || resolved) return;
    void run(async () => {
      const created = await onSend(text, id);
      setBody('');
      if (!id && created) onCreated(created);
    }, 'Envoi impossible. Votre texte est conservé ; vous pouvez réessayer.');
  };

  const changeStatus = () => {
    if (!id || sending || !onToggleResolved) return;
    void run(() => onToggleResolved(id, !resolved), 'Impossible de modifier le statut. Vous pouvez réessayer.');
  };

  return { body, setBody, sending, error, resolved, send, changeStatus };
}

function ConversationMessages({
  id,
  conversation,
  renderMessageBody,
  bottomPadding,
}: ConversationProps & { bottomPadding: number }) {
  const styles = useStyles();
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  return (
    <ScrollView
      ref={scroll}
      style={styles.messages}
      contentContainerStyle={[styles.list, { paddingBottom: bottomPadding }]}
      onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })}
    >
      {id && conversation?.loading && (
        <Box role="progressbar" aria-label="Chargement de la conversation" style={styles.loader}>
          <Spinner size="md" delay={false} />
        </Box>
      )}
      {!id && (
        <EmptyState
          iconName="MessageCircle"
          title="Comment pouvons-nous vous aider ?"
          description="Décrivez votre problème pour démarrer une nouvelle conversation."
        />
      )}
      <MessageList messages={conversation?.messages ?? []} renderBody={renderMessageBody} />
    </ScrollView>
  );
}

const LOAD_ERROR = 'Impossible de charger la conversation. Nouvelle tentative automatique…';

export function ChatConversation(props: ConversationProps) {
  const { id, conversation, onToggleResolved } = props;
  const styles = useStyles();
  const [composerHeight, setComposerHeight] = useState(140);
  const actions = useConversationActions(props);
  const loaded = !id || Boolean(conversation && !conversation.loading);
  const loadError = conversation?.error ? LOAD_ERROR : null;

  return (
    <Box style={styles.conversation}>
      <ConversationMessages {...props} bottomPadding={composerHeight + 24} />
      <Box pointerEvents="none" style={styles.composerBottomMask} />
      <ChatComposer
        body={actions.body}
        onBodyChange={actions.setBody}
        sending={actions.sending}
        resolved={actions.resolved}
        canResolve={Boolean(id && onToggleResolved && loaded)}
        canSend={!actions.sending && Boolean(actions.body.trim()) && loaded}
        error={actions.error ?? loadError}
        onSend={actions.send}
        onChangeStatus={actions.changeStatus}
        onHeightChange={setComposerHeight}
      />
    </Box>
  );
}
