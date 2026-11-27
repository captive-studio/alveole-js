import { fireEvent, renderWeb, screen, waitFor } from '@/__tests__/helpers/renderWeb';
import React from 'react';
import { ChatWidget } from './ChatWidget';

// FlashList (ResourceList) est publié en ESM non transformé par Jest.
jest.mock('@shopify/flash-list', () => ({
  FlashList: ({
    data,
    renderItem,
    ListHeaderComponent,
  }: {
    data: unknown[];
    renderItem: (info: { item: unknown; index: number }) => React.ReactNode;
    ListHeaderComponent?: React.ReactNode;
  }) => (
    <>
      {ListHeaderComponent}
      {data.map((item, index) => (
        <div key={index}>{renderItem({ item, index })}</div>
      ))}
    </>
  ),
}));

const conversations = [
  { id: 'c1', title: 'Déploiement bloqué', updatedAt: '2026-11-05T10:30:00+01:00', resolved: false, unreadCount: 2 },
];

test('affiche le nombre de messages non lus sur le lanceur fermé', () => {
  renderWeb(<ChatWidget conversations={conversations} onSend={jest.fn()} />);

  expect(screen.getByLabelText('2 messages non lus')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Discuter avec Support' })).toBeTruthy();
});

test("injecte une seule fois la feuille d'animation", () => {
  renderWeb(
    <>
      <ChatWidget onSend={jest.fn()} />
      <ChatWidget onSend={jest.fn()} />
    </>,
  );

  expect(document.querySelectorAll('#alveole-chat-widget-motion')).toHaveLength(1);
});

test('signale la conversation choisie à l’application', () => {
  const onActive = jest.fn();
  renderWeb(
    <ChatWidget
      initialOpen
      initialSection="messages"
      conversations={conversations}
      onSend={jest.fn()}
      onActiveConversationChange={onActive}
    />,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Ouvrir : Déploiement bloqué' }));

  expect(onActive).toHaveBeenCalledWith('c1');
});

test("conserve le texte et affiche l'erreur quand l'envoi échoue", async () => {
  const onSend = jest.fn().mockRejectedValue(new Error('réseau'));
  renderWeb(<ChatWidget initialOpen initialSection="messages" initialConversationId="new" onSend={onSend} />);

  fireEvent.change(screen.getByLabelText('Message au support'), { target: { value: 'Bonjour' } });
  fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));

  await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Envoi impossible'));
  expect(onSend).toHaveBeenCalledWith('Bonjour', undefined);
  expect(screen.getByDisplayValue('Bonjour')).toBeTruthy();
});
