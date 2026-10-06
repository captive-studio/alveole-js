# Migration : props d'icône → `leading` / `trailing`

Version majeure de `@alveole/components`. Décision : [ADR 0028](../adr/0028-emplacements-leading-et-trailing.md).

Les props qui ne recevaient qu'un nom d'icône Lucide sont remplacées par `leading` (avant le
libellé) et, sur le Button, `trailing` (après). Elles acceptent toujours un nom d'icône, et
désormais aussi un élément React (avatar, logo). Les anciennes props sont **supprimées, sans
alias** : le typecheck signale chaque appel à corriger.

## Correspondance

| Composant                             | Avant                   | Après                  |
| ------------------------------------- | ----------------------- | ---------------------- |
| `Button`                              | `startIcon` / `endIcon` | `leading` / `trailing` |
| `AccordionItem`                       | `startIcon`             | `leading`              |
| `Tag`                                 | `icon`                  | `leading`              |
| `Tabs` (élément de `tabs`), `TabsTab` | `icon`                  | `leading`              |
| `SidebarItem`                         | `icon`                  | `leading`              |
| `ActionMenu.Item`                     | `icon`                  | `leading`              |
| `RadioGroupCard`                      | `icon`                  | `leading`              |
| `DragAndDropFile`                     | `icon`                  | `leading`              |
| `Select` (`SelectOption`)             | `{ icon }`              | `{ leading }`          |
| `ToastView`, `toast.present(…, opts)` | `icon`                  | `leading`              |

Ne changent pas et gardent `icon` : `ButtonIcon`, `InputButtonAdornment`,
`DocumentViewerToolbarButton`. Leur icône est tout leur contenu, elle ne précède rien.

## Exemples

```tsx
// Avant
<Button variant="secondary" title="Filtres" startIcon="Plus" endIcon="ChevronDown" />

// Après : un nom d'icône, comme avant
<Button variant="secondary" title="Filtres" leading="Plus" trailing="ChevronDown" />

// Nouveau : un élément
<Button variant="tertiary" title="Marie Curie" leading={<Avatar size="xs" fallbackText="Marie Curie" />} />
```

Un élément est placé dans un emplacement de la taille de l'icône, sans recevoir de couleur.
S'il est plus grand, il déborde sans changer la hauteur du composant : choisir sa taille.

## Retirer une icône par défaut

`Toast` et `DragAndDropFile` affichent une icône par défaut (selon le `variant`, ou `Upload`).
`leading` la remplace ; `leading={null}` la retire.

```tsx
toast.present('Enregistré', undefined, { variant: 'success', leading: null });
```

## Rechercher les appels à migrer

```bash
git grep -nE "startIcon|endIcon|\bicon[=:]"
```
