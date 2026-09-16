import { renderNative } from '@/__tests__/helpers/renderNative';
import { AutocompleteChip } from './AutocompleteChip';

// Une selection multiple aligne plusieurs puces, donc plusieurs croix identiques. Un nom
// generique comme « Retirer » les rendrait indiscernables les unes des autres a la voix : le
// nom doit porter la valeur que la croix retire.
it('nomme la croix par la valeur qu elle retire', async () => {
  const { getByRole } = await renderNative(<AutocompleteChip label="Paris" onToggle={() => undefined} />);

  expect(getByRole('button', { name: 'Retirer Paris' })).toBeTruthy();
});
