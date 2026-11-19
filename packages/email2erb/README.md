# @alveole/email2erb

Le rendu ERB des mails écrits avec [`@alveole/email`](../email), pour un mailer Rails. Un mail en `.tsx` devient une vue `.html.erb` et une vue `.text.erb`.

```tsx
import { Button, EmailLayout, Heading } from '@alveole/email';
import { renderErb, renderErbText, v, when } from '@alveole/email2erb';

const Invitation = () => (
  <EmailLayout preview={`Rejoignez ${v('organisation')}`}>
    <Heading as="h1">{when('invite_par', <>{v('invite_par')} vous invite</>, 'Bienvenue')}</Heading>
    <Button variant="primary" title="Rejoindre" href={v('url')} />
  </EmailLayout>
);

writeFileSync('app/views/invitation_mailer/invitation.html.erb', renderErb(<Invitation />));
writeFileSync('app/views/invitation_mailer/invitation.text.erb', renderErbText(<Invitation />));
```

- `v('nom')` devient `<%= @nom %>` ;
- `when('nom', a, b)` devient `<% if @nom %>a<% else %>b<% end %>`, la seule logique permise dans un mail ;
- `versErb(sortie)` convertit les marqueurs d'une sortie déjà rendue.

Peer deps : `@alveole/email`, `react`, `react-dom`.
