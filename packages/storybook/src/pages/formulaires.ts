/**
 * Le texte de la page Formulaires. Chaque section peut nommer une démo de
 * formulaires.stories.tsx : la page la rend en direct, avec son code dessous.
 */
import type { StorySourceName } from './formulaires.stories.sources';

export type SectionDeFormulaires = {
  titre: string;
  markdown: string;
  demo?: StorySourceName;
};

export const SECTIONS_DE_FORMULAIRES: readonly SectionDeFormulaires[] = [
  {
    titre: 'Anatomie d’un champ',
    markdown: `Un **champ** est un \`FormControl\` qui enveloppe un **contrôle de saisie** (\`TextInput\`, \`Select\`,
\`DateInput\`, \`FileInput\`…). Le libellé (\`label\`), l'aide (\`hint\`), l'astérisque (\`required\`) et le
message (\`error\` / \`success\`) vont sur \`FormControl\` ; le contrôle reste nu.

\`error\` est passé **aux deux** : \`FormControl\` affiche le message sous le champ, le contrôle colore sa
bordure. \`FormControl\` relie aussi le libellé au contrôle pour les lecteurs d'écran : ne pas
reconstruire un champ à la main avec \`FormControlLabel\` et \`FormControlCaption\`.

Les contrôles sont **contrôlés** : \`value\` + \`onChangeText\` pour les textes, \`value\` + \`onChange\`
pour les autres, \`checked\` + \`onCheckedChange\` pour \`Checkbox\`.`,
    demo: 'Anatomie',
  },
  {
    titre: 'Formulaire de base',
    markdown: `Tout formulaire est enveloppé dans \`Form\`. Sur mobile, il ferme le clavier au toucher en dehors
d'un champ ; sur le web, il rend un vrai \`<form>\` : **Entrée** déclenche le bouton \`type="submit"\`.

Pendant l'envoi, passer \`isLoading\` au bouton plutôt que de le masquer : il garde sa place et
empêche le double envoi. Les champs sont espacés par un \`Box\` en colonne.`,
    demo: 'FormulaireDeBase',
  },
  {
    titre: 'Validation et erreurs',
    markdown: `Afficher l'erreur **après la première soumission**, pas à la première frappe : on ne reproche pas
un champ que l'utilisateur n'a pas encore fini de remplir. \`success\` confirme une saisie vérifiée.

Une erreur renvoyée par le serveur pour un champ précis va sur **ce champ** (\`error\`), pas dans une
alerte globale. Une erreur sans champ (réseau, droits) va dans une \`Alert\` au-dessus du bouton.`,
    demo: 'Validation',
  },
  {
    titre: 'Fichiers',
    markdown: `\`FileInput\` ouvre le sélecteur (galerie, appareil photo, documents) ; \`type\` restreint les
fichiers acceptés (\`image/*\`, \`application/pdf\`). Sur le web, \`FileDropZone\` autour du formulaire
permet de déposer les fichiers n'importe où : elle partage la même \`value\` que le \`FileInput\`.
Une seule \`FileDropZone\` par formulaire, liée à un seul champ de fichier.`,
    demo: 'Fichiers',
  },
  {
    titre: 'Clavier sur mobile',
    markdown: `Placer le formulaire dans une \`Page scrollable\` : elle remonte le champ actif au-dessus du
clavier. Enchaîner les champs avec \`returnKeyType="next"\` et \`onSubmitEditing\` qui donne le focus
au suivant ; le dernier champ prend \`returnKeyType="done"\`. Choisir le bon \`type\` (\`email\`, \`tel\`,
\`password\`) donne le bon clavier et l'autoremplissage.`,
    demo: 'Clavier',
  },
  {
    titre: 'Avec react-hook-form',
    markdown: `Alveole ne dépend d'aucune bibliothèque de formulaire. Avec react-hook-form, un \`Controller\` relie
chaque champ ; le message vient de \`fieldState.error\` et va, comme toujours, sur \`FormControl\` et
sur le contrôle.

\`\`\`tsx
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, FormControl, TextInput } from '@alveole/components';

type Contact = { email: string };

export const ContactForm = ({ onSave }: { onSave: (c: Contact) => Promise<void> }) => {
  const { control, handleSubmit, setError, formState } = useForm<Contact>({ defaultValues: { email: '' } });

  const soumettre = handleSubmit(async contact => {
    try {
      await onSave(contact);
    } catch {
      // Une erreur serveur rattachée à un champ s'affiche sur ce champ.
      setError('email', { message: 'Adresse déjà utilisée' });
    }
  });

  return (
    <Form>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Adresse requise' }}
        render={({ field, fieldState }) => (
          <FormControl label="Adresse email" error={fieldState.error?.message} required>
            <TextInput
              type="email"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          </FormControl>
        )}
      />
      <Button type="submit" variant="primary" title="Enregistrer" isLoading={formState.isSubmitting} onPress={soumettre} />
    </Form>
  );
};
\`\`\``,
  },
];
