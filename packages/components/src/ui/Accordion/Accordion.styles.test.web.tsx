import { renderHookOnDesktop } from '@/__tests__/helpers/renderWeb';
import { useStyles } from './Accordion.styles';

test('utilise le rayon de bordure de l echelle du theme sur l accordeon arrondi', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.accordionRounded.borderRadius).toBe('var(--radius-lg)');
});

test('donne le meme socle de mise en page aux trois variantes d en-tete', () => {
  const { result } = renderHookOnDesktop(() => useStyles());
  const socle = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 'var(--spacing-3v)',
    paddingBottom: 'var(--spacing-3v)',
    paddingLeft: 'var(--spacing-2w)',
    paddingRight: 'var(--spacing-2w)',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3v)',
    alignSelf: 'stretch',
    borderWidth: 0,
  };

  expect(result.current.accordionItemHeader).toMatchObject(socle);
  expect(result.current.accordionItemHeaderAlt).toMatchObject(socle);
  expect(result.current.accordionItemHeaderOutline).toMatchObject(socle);
});

test('distingue les variantes d en-tete par leur fond et le contour de la variante outline', () => {
  const { result } = renderHookOnDesktop(() => useStyles());

  expect(result.current.accordionItemHeader.backgroundColor).toBe('#FFFFFF');
  expect(result.current.accordionItemHeaderAlt.backgroundColor).toBe('#F6F7F8');
  expect(result.current.accordionItemHeaderOutline).toMatchObject({
    backgroundColor: '#FFFFFF',
    outlineWidth: 1,
    outlineColor: '#DEE3EC',
    outlineStyle: 'solid',
  });
});
