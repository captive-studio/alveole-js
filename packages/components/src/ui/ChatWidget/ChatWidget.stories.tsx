import { useState } from 'react';
import { Story } from '../../type';
import { ChatWidget } from './ChatWidget';
import { useStyles } from './ChatWidget.styles';
import type {
  ChatActiveConversation,
  ChatConversationSummary,
  ChatMessageData,
  ChatWidgetProps,
} from './ChatWidget.types';

export default {
  title: 'Chat Widget',
  tags: ['ui'],
  experimental: true,
  description:
    'Chat de support flottant : le lanceur respire, le panneau se révèle en cercle avec un halo lilas et sauge, ' +
    "puis l'en-tête et l'accueil arrivent en cascade. Animations coupées si prefers-reduced-motion. " +
    "Les conversations, les messages et l'envoi sont fournis par l'application.",
  shortDescription: 'Chat de support flottant et animé.',
  component: ChatWidget,
  styleFn: useStyles,
} satisfies Story;

const YESTERDAY = '2026-11-04T14:00:00+01:00';
const TODAY = '2026-11-05T10:30:00+01:00';

const message =
  (createdAt: string) =>
  (id: string, role: ChatMessageData['role'], body: string): ChatMessageData => ({
    id,
    role,
    body,
    createdAt,
    authorName: role === 'client' ? 'Camille' : 'Clément',
  });

const CONVERSATIONS: ChatConversationSummary[] = [
  {
    id: 'deployment',
    title: 'Mon déploiement reste bloqué pendant la construction',
    updatedAt: TODAY,
    resolved: false,
    unreadCount: 1,
  },
  { id: 'access', title: 'Inviter un membre dans mon organisation', updatedAt: TODAY, resolved: false, unreadCount: 0 },
  { id: 'domain', title: 'Configurer mon nom de domaine', updatedAt: YESTERDAY, resolved: true, unreadCount: 0 },
];

const MESSAGES: Record<string, ChatMessageData[]> = {
  deployment: [
    message(YESTERDAY)(
      'd1',
      'client',
      'Bonjour ! Mon déploiement reste bloqué pendant la construction. Pouvez-vous regarder ?',
    ),
    message(YESTERDAY)('d2', 'operator', 'Bonjour Camille, nous regardons les logs.'),
    message(TODAY)('d3', 'operator', 'Nous avons trouvé la cause. Vous pouvez relancer le déploiement.'),
  ],
  access: [message(TODAY)('a1', 'client', 'Comment inviter un membre ?')],
  domain: [
    message(YESTERDAY)('n1', 'client', 'Mon domaine ne répond pas.'),
    message(YESTERDAY)('n2', 'operator', 'Le DNS est corrigé, tout est en ordre.'),
  ],
};

// Démonstration en mémoire : aucun appel réseau.
function Demo({ empty = false, ...props }: Partial<ChatWidgetProps> & { empty?: boolean }) {
  const [conversations, setConversations] = useState(empty ? [] : CONVERSATIONS);
  const [messages, setMessages] = useState(empty ? {} : MESSAGES);
  const [active, setActive] = useState<ChatActiveConversation>(props.initialConversationId ?? 'list');
  const current = conversations.find(item => item.id === active);

  return (
    <ChatWidget
      inline
      initialOpen
      conversations={conversations}
      conversation={current && { messages: messages[current.id] ?? [], resolved: current.resolved }}
      onActiveConversationChange={next => {
        setActive(next);
        setConversations(list => list.map(item => (item.id === next ? { ...item, unreadCount: 0 } : item)));
      }}
      onSend={async (body, conversationId) => {
        const id = conversationId ?? `c${Date.now()}`;
        const sent = message(new Date().toISOString())(`${id}-${Date.now()}`, 'client', body);
        setMessages(all => ({ ...all, [id]: [...(all[id] ?? []), sent] }));
        if (!conversationId) {
          setConversations(list => [
            { id, title: body, updatedAt: sent.createdAt, resolved: false, unreadCount: 0 },
            ...list,
          ]);
          return id;
        }
      }}
      onToggleResolved={async (id, resolved) => {
        setConversations(list => list.map(item => (item.id === id ? { ...item, resolved } : item)));
      }}
      {...props}
    />
  );
}

export const Default = () => <Demo />;
export const Messages = () => <Demo initialSection="messages" />;
export const Conversation = () => <Demo initialSection="messages" initialConversationId="deployment" />;
export const ConversationResolue = () => <Demo initialSection="messages" initialConversationId="domain" />;
export const NouvelleConversation = () => <Demo initialSection="messages" initialConversationId="new" />;
export const SansConversations = () => <Demo initialSection="messages" empty />;
export const Ferme = () => <Demo initialOpen={false} />;

export * as Sources from './ChatWidget.stories.sources';
