import { elementDuType } from '@/__tests__/helpers/elementDuType';
import { renderWeb } from '@/__tests__/helpers/renderWeb';
import { fireEvent } from '@testing-library/react';
import { Form } from './Form';

test('a la soumission, clique le bouton selectionne du formulaire', () => {
  const onClick = jest.fn();
  const { container } = renderWeb(
    <Form>
      <button role="button" aria-selected="true" onClick={onClick} />
    </Form>,
  );

  fireEvent.submit(elementDuType(container.querySelector('form'), HTMLFormElement));

  expect(onClick).toHaveBeenCalledTimes(1);
});
