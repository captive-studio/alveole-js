import { ScrollView } from 'react-native';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { ListItem } from '../ListItem';
import { ResourceList } from '../ResourceList';
import { Spinner } from '../Spinner';
import { useStyles } from './ChatWidget.styles';
import type { ChatConversationSummary } from './ChatWidget.types';

function ConversationGroups({
  conversations,
  onSelect,
}: {
  conversations: ChatConversationSummary[];
  onSelect: (id: string) => void;
}) {
  const styles = useStyles();
  return (
    <Box gap="2W">
      {[false, true].map(resolved => (
        <ResourceList
          key={String(resolved)}
          titre={resolved ? 'Résolues' : 'En cours'}
          data={conversations.filter(c => c.resolved === resolved)}
          keyExtractor={c => c.id}
          scrollEnabled={false}
          renderNoContent={() => null}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.title}
              description={new Date(item.updatedAt).toLocaleDateString('fr-FR')}
              IconProps={{
                name: item.unreadCount > 0 ? 'MessageSquareDot' : 'MessageSquare',
                ...(item.unreadCount > 0 ? { color: styles.unreadIcon.color } : {}),
              }}
              role="button"
              aria-label={`Ouvrir : ${item.title}`}
              aria-description={item.unreadCount > 0 ? 'Conversation non lue' : undefined}
              className={`alveole-chat-item${item.unreadCount > 0 ? ' alveole-chat-unread' : ''}`}
              tabIndex={0}
              onKeyDown={(event: { key: string; preventDefault: () => void }) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(item.id);
                }
              }}
              onPress={() => onSelect(item.id)}
              showSeparateur={index !== 0}
            />
          )}
        />
      ))}
    </Box>
  );
}

export function ChatConversationList({
  conversations,
  loading,
  error,
  onSelect,
  onNew,
}: {
  conversations?: ChatConversationSummary[];
  loading: boolean;
  error: boolean;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  const styles = useStyles();
  const hasConversations = Boolean(conversations?.length);
  const newConversationButton = (
    <Button variant="primary" title="Envoyez-nous un message" trailing="Send" onPress={onNew} />
  );
  return (
    <Box style={styles.conversation}>
      <ScrollView
        style={styles.messages}
        contentContainerStyle={[styles.list, hasConversations && styles.listWithAction]}
      >
        {loading && (
          <Box role="progressbar" aria-label="Chargement des conversations" style={styles.loader}>
            <Spinner size="md" delay={false} />
          </Box>
        )}
        {error && (
          <Typography role="alert" style={styles.error}>
            Impossible de charger les conversations. Nouvelle tentative automatique…
          </Typography>
        )}
        {conversations?.length === 0 && (
          <EmptyState
            iconName="MessagesSquare"
            title="Aucune conversation"
            description="Vous n’avez pas encore de conversation avec le support."
            actions={newConversationButton}
          />
        )}
        <ConversationGroups conversations={conversations ?? []} onSelect={onSelect} />
      </ScrollView>
      {hasConversations && (
        <Box className="alveole-chat-new-action" pointerEvents="box-none" style={styles.newConversationAction}>
          {newConversationButton}
        </Box>
      )}
    </Box>
  );
}
