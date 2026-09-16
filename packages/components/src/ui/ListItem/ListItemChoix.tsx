import { Box } from '../../core/Box';
import { CheckboxContainer, CheckboxIndicator } from '../Checkbox';
import { RadioGroup } from '../RadioGroup';
import { ChoixDeLaLigne } from './ListItem.types';

type ListItemChoixProps = { title: string; choix: ChoixDeLaLigne };

/**
 * Le controle de selection de la ligne, radio ou case selon `multiple`. Les deux partagent la
 * meme coque : elle arrete le clic, sans quoi cocher la case declencherait en plus l'action de
 * la ligne et `onChange` serait appele deux fois. Le bouton radio, lui, n'emet deja pas de clic
 * remontant - la coque commune lui est inoffensive, et evite d'ecrire la regle deux fois.
 */
export const ListItemChoix = ({ title, choix }: ListItemChoixProps) => (
  <Box mt={'auto'} mb={'auto'} onPress={event => event.stopPropagation()}>
    {choix.multiple === true ? (
      <CheckboxContainer
        id={`${title}--checkbox`}
        aria-label={title}
        checked={choix.checked}
        onCheckedChange={() => choix.onChange?.(choix.value)}
      >
        <CheckboxIndicator />
      </CheckboxContainer>
    ) : (
      <RadioGroup.Input id={`${title}--radio`} label={title} size="md" {...choix} />
    )}
  </Box>
);
