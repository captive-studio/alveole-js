import { fireEvent, renderWeb, screen } from '@/__tests__/helpers/renderWeb';
import { useState } from 'react';
import { FormControl } from '../FormControl';
import { PriceInput } from './PriceInput';

// Le libellé désigne un <input> : le vérifier plutôt que l'affirmer par un cast.
const champPrix = () => {
  const champ = screen.getByLabelText('Prix');
  if (!(champ instanceof HTMLInputElement)) throw new Error('Prix ne désigne pas un <input>');
  return champ;
};

// Un parent qui pilote le montant comme une app : il renvoie au champ ce que onChange lui donne.
const Pilote = () => {
  const [montant, setMontant] = useState<number | null>(null);
  return (
    <FormControl label="Prix">
      <PriceInput value={montant} onChange={setMontant} />
    </FormControl>
  );
};

test('associe le libellé du FormControl au champ', () => {
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={null} />
    </FormControl>,
  );

  expect(screen.getByLabelText('Prix')).toBeTruthy();
});

test('désactive le champ', () => {
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={null} disabled />
    </FormControl>,
  );

  expect(screen.getByLabelText('Prix')).toHaveProperty('disabled', true);
});

test('lit la virgule comme séparateur décimal', () => {
  const onChange = jest.fn();
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={null} onChange={onChange} />
    </FormControl>,
  );

  fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '12,5' } });

  expect(onChange).toHaveBeenCalledWith(12.5);
});

test('ignore une frappe qui ne forme pas un montant', () => {
  const onChange = jest.fn();
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={12} onChange={onChange} />
    </FormControl>,
  );

  fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '12e' } });

  expect(onChange).not.toHaveBeenCalled();
});

test('refuse une troisième décimale', () => {
  const onChange = jest.fn();
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={12.34} onChange={onChange} />
    </FormControl>,
  );

  fireEvent.change(screen.getByLabelText('Prix'), { target: { value: '12.345' } });

  expect(onChange).not.toHaveBeenCalled();
});

test('garde la virgule tapée en attendant la décimale', () => {
  renderWeb(<Pilote />);
  const champ = champPrix();

  fireEvent.change(champ, { target: { value: '12' } });
  fireEvent.change(champ, { target: { value: '12,' } });

  expect(champ.value).toBe('12,');
});

test('passe le champ en lecture seule', () => {
  renderWeb(
    <FormControl label="Prix">
      <PriceInput value={12} readOnly />
    </FormControl>,
  );

  expect(screen.getByLabelText('Prix')).toHaveProperty('readOnly', true);
});
