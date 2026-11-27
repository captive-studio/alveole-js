import type React from 'react';

export type ChatSection = 'home' | 'messages';

/** `'list'` affiche la liste des conversations, `'new'` le compositeur d'une nouvelle conversation. */
export type ChatActiveConversation = 'list' | 'new' | (string & {});

export type ChatConversationSummary = {
  id: string;
  title: string;
  /** Date ISO de la dernière activité. */
  updatedAt: string;
  resolved: boolean;
  unreadCount: number;
};

export type ChatMessageData = {
  id: string;
  /** `client` : la personne qui écrit depuis le widget ; `operator` : le support. */
  role: 'client' | 'operator';
  body: string;
  authorName: string;
  avatarUrl?: string | null;
  /** Date ISO. */
  createdAt: string;
  imageUrls?: string[];
  delivery?: 'sent' | 'queued' | 'failed';
};

export type ChatConversationData = {
  messages: ChatMessageData[];
  resolved: boolean;
  loading?: boolean;
  error?: boolean;
};

export type ChatWidgetProps = {
  /** Titre de l'en-tête et nom accessible du panneau. */
  title?: string;
  conversations?: ChatConversationSummary[];
  conversationsLoading?: boolean;
  conversationsError?: boolean;
  /** Contenu de la conversation active, fourni par l'application. */
  conversation?: ChatConversationData;
  /** Prévient l'application du panneau ouvert et de la conversation active, pour charger ses messages. */
  onOpenChange?: (open: boolean) => void;
  onActiveConversationChange?: (active: ChatActiveConversation) => void;
  /** Envoie un message ; rejette en cas d'échec. Pour une nouvelle conversation, renvoie l'identifiant créé. */
  onSend: (body: string, conversationId?: string) => Promise<string | void>;
  /** Bascule le statut résolu ; rejette en cas d'échec. Sans callback, le bouton « Résoudre » est masqué. */
  onToggleResolved?: (conversationId: string, resolved: boolean) => Promise<void>;
  /** Rendu du texte d'un message (Markdown, Slack…). Par défaut : texte brut. */
  renderMessageBody?: (message: ChatMessageData) => React.ReactNode;
  initialOpen?: boolean;
  initialSection?: ChatSection;
  initialConversationId?: ChatActiveConversation;
  /** Place le widget dans le flux au lieu de le fixer en bas à droite. */
  inline?: boolean;
};
