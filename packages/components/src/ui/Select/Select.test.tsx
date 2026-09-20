import { renderNative } from '@/__tests__/helpers/renderNative';
import { OPTIONS, press } from '@/__tests__/helpers/selectHarness';
import { focusBorder } from '@alveole/theme';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

jest.mock('tamagui', () => jest.requireActual('@/__tests__/helpers/selectHarness').mockTamaguiSheet());

describe('Select', () => {
  it('n’ouvre le panneau qu’au press du champ', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} />,
    );

    expect(queryByTestId('select-option-a')).toBeNull();

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeTruthy();
    expect(queryByTestId('select-option-c')).toBeTruthy();
  });

  it('remonte la valeur choisie puis referme le panneau', async () => {
    const onChange = jest.fn();
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-c'));

    expect(onChange).toHaveBeenCalledWith('c');
    expect(queryByTestId('select-option-c')).toBeNull();
  });

  it('signale l’ouverture et la fermeture', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} onFocus={onFocus} onBlur={onBlur} />,
    );

    await press(getByTestId('select-trigger'));
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();

    await press(getByTestId('select-option-a'));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('ignore le press sur une option désactivée', async () => {
    const onChange = jest.fn();
    const options: SelectOption[] = [...OPTIONS, { label: 'Option D', value: 'd', disabled: true }];
    const { getByTestId } = await renderNative(
      <Select label="Sélection" options={options} value={null} onChange={onChange} />,
    );

    await press(getByTestId('select-trigger'));
    await press(getByTestId('select-option-d'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('n’ouvre pas le panneau quand il est désactivé', async () => {
    const { getByTestId, queryByTestId } = await renderNative(
      <Select label="Sélection" options={OPTIONS} value={null} disabled />,
    );

    await press(getByTestId('select-trigger'));

    expect(queryByTestId('select-option-a')).toBeNull();
  });
});

// Hors web, le selecteur n'a ni focus clavier ni anneau : c'est le panneau ouvert qui dit
// « c'est ici que ca se passe », et le cadre le signale par sa bordure comme les champs.
describe('Select, bordure de focus', () => {
  const contour = (view: Awaited<ReturnType<typeof renderNative>>) =>
    view.getByTestId('select-trigger').props.style.borderColor;

  it('colore la bordure du cadre avec le token de focus a l ouverture', async () => {
    const view = await renderNative(<Select label="Sélection" options={OPTIONS} value={null} />);

    await press(view.getByTestId('select-trigger'));

    expect(contour(view)).toBe(focusBorder().borderColor);
  });

  it('n entoure le cadre ouvert d aucun contour ni ombre', async () => {
    const view = await renderNative(<Select label="Sélection" options={OPTIONS} value={null} />);

    await press(view.getByTestId('select-trigger'));

    const { outlineWidth, outlineStyle, outlineColor, boxShadow } = view.getByTestId('select-trigger').props.style;
    expect({ outlineWidth, outlineStyle, outlineColor, boxShadow }).toEqual({
      outlineWidth: undefined,
      outlineStyle: undefined,
      outlineColor: undefined,
      boxShadow: undefined,
    });
  });

  it('couvre la couleur d erreur tant que le panneau est ouvert', async () => {
    const view = await renderNative(<Select label="Sélection" options={OPTIONS} value={null} error="Champ requis" />);
    const erreur = contour(view);

    await press(view.getByTestId('select-trigger'));

    expect(contour(view)).toBe(focusBorder().borderColor);
    expect(contour(view)).not.toBe(erreur);
  });

  it('rend la couleur d erreur au cadre a la fermeture du panneau', async () => {
    const view = await renderNative(<Select label="Sélection" options={OPTIONS} value={null} error="Champ requis" />);
    const erreur = contour(view);
    await press(view.getByTestId('select-trigger'));

    await press(view.getByTestId('select-option-a'));

    expect(contour(view)).toBe(erreur);
  });

  it('rend la couleur de succes au cadre a la fermeture du panneau', async () => {
    const view = await renderNative(<Select label="Sélection" options={OPTIONS} value={null} success="Enregistré" />);
    const succes = contour(view);
    await press(view.getByTestId('select-trigger'));

    await press(view.getByTestId('select-option-a'));

    expect(contour(view)).toBe(succes);
  });

  // Le panneau ne s'ouvre pas quand le selecteur est desactive : son cadre garde donc
  // l'apparence hors d'usage, et surtout ne prend pas celle d'un controle actif.
  it('ne colore pas la bordure d un selecteur desactive', async () => {
    const view = await renderNative(<Select label="Sélection" options={OPTIONS} value={null} disabled />);
    const desactive = contour(view);

    await press(view.getByTestId('select-trigger'));

    expect(contour(view)).toBe(desactive);
  });
});

// Sur natif, le seul prereglage herite d'`Autocomplete` (ADR 0007) qui touche un point
// distinct est le multiple : lui seul ajoute `inputInnerMultiple` au cadre, et cet ajout
// pourrait recouvrir l'etat de bordure selon l'ordre des tables.
describe('Select multiple, bordure de focus', () => {
  const contour = (view: Awaited<ReturnType<typeof renderNative>>) =>
    view.getByTestId('select-trigger').props.style.borderColor;

  it('colore la bordure du cadre multiple a l ouverture', async () => {
    const view = await renderNative(<Select label="Sélection" multiple options={OPTIONS} value={[]} />);

    await press(view.getByTestId('select-trigger'));

    expect(contour(view)).toBe(focusBorder().borderColor);
  });

  it('couvre la couleur d erreur du cadre multiple tant que le panneau est ouvert', async () => {
    const view = await renderNative(
      <Select label="Sélection" multiple options={OPTIONS} value={[]} error="Champ requis" />,
    );
    const erreur = contour(view);

    await press(view.getByTestId('select-trigger'));

    expect({ erreur: contour(view), different: contour(view) !== erreur }).toEqual({
      erreur: focusBorder().borderColor,
      different: true,
    });
  });
});
