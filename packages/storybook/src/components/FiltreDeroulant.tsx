import { ActionMenu, Button } from '@alveole/components';

export type OptionDeFiltre<Cle extends string = string> = { key: Cle; label: string };

export type FiltreDeroulantProps<Cle extends string> = {
  /** Ce que le bouton annonce tant qu'aucune option n'est choisie. */
  libelle: string;
  options: readonly OptionDeFiltre<Cle>[];
  choisi: Cle | null;
  /** Rend la cle choisie, ou `null` quand l'option reprise annule le filtre. */
  onChoisir: (choisi: Cle | null) => void;
  ouvert: boolean;
  onOuvrir: (ouvert: boolean) => void;
};

/**
 * Un filtre a choix unique, presente comme un bouton qui deroule ses options. Le bouton porte
 * l'option choisie plutot que son libelle generique : une fois le menu referme, c'est la seule
 * trace du filtre actif. Reprendre l'option deja choisie l'annule, sans quoi on ne pourrait
 * plus revenir a la liste entiere.
 */
export const FiltreDeroulant = <Cle extends string>({
  libelle,
  options,
  choisi,
  onChoisir,
  ouvert,
  onOuvrir,
}: FiltreDeroulantProps<Cle>) => (
  <ActionMenu
    placement="bottom-start"
    scrollable={false}
    open={ouvert}
    setOpen={onOuvrir}
    renderTrigger={() => (
      <Button
        variant="secondary"
        title={options.find(option => option.key === choisi)?.label ?? libelle}
        endIcon="ChevronDown"
        size="sm"
        selected={choisi !== null}
        active={ouvert}
      />
    )}
  >
    {options.map(option => (
      <ActionMenu.Item
        key={option.key}
        title={option.label}
        selected={choisi === option.key}
        onPress={() => onChoisir(choisi === option.key ? null : option.key)}
      />
    ))}
  </ActionMenu>
);
