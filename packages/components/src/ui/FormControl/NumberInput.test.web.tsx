import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { FormControl } from './FormControl';
import { NumberInput } from './NumberInput';

const champQuantite = () => {
  renderWeb(
    <FormControl label="Quantité">
      <NumberInput />
    </FormControl>,
  );

  return screen.getByLabelText('Quantité') as HTMLInputElement;
};

test('se laisse designer par le libelle de son FormControl', () => {
  expect(champQuantite()).toBeTruthy();
});

test('augmente la valeur d un pas au bouton plus', () => {
  const onChange = jest.fn();
  renderWeb(<NumberInput value={3} step={2} controlButton onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Augmenter de 2'));

  expect(onChange).toHaveBeenCalledWith(5);
});

test('diminue la valeur d un pas au bouton moins', () => {
  const onChange = jest.fn();
  renderWeb(<NumberInput value={3} step={2} controlButton onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('Diminuer de 2'));

  expect(onChange).toHaveBeenCalledWith(1);
});

// Descendre sous le minimum ne donnerait qu'une valeur refusee : le bouton ne le propose pas.
test('desactive le bouton moins au minimum', () => {
  renderWeb(<NumberInput value={2} min={2} controlButton onChange={() => undefined} />);

  expect((screen.getByLabelText('Diminuer de 1') as HTMLButtonElement).disabled).toBe(true);
});

// L'input est un element DOM brut : React y lit une hauteur de ligne sans unite comme un
// multiple de la taille de police (20 x 14 = 280px), la ou react-native-web ajoute `px`.
test('pose la hauteur de ligne du champ en pixels', () => {
  expect(champQuantite().style.lineHeight).toBe('20px');
});

// Le navigateur pose 1px de retrait vertical sur un input nombre, qui s'ajoute a la ligne.
test('retire le retrait vertical que le navigateur pose sur le champ saisi', () => {
  const { paddingTop, paddingBottom } = champQuantite().style;

  expect({ paddingTop, paddingBottom }).toEqual({ paddingTop: '0px', paddingBottom: '0px' });
});
