import { findCurrentRubriqueKey } from './navigation';

describe('findCurrentRubriqueKey', () => {
  it('rend la rubrique dont le chemin est exactement celui de la page', () => {
    const rubriques = [
      { key: 'components', label: 'Composants', href: '/' },
      { key: 'constants', label: 'Constantes', href: '/constants' },
    ];

    expect(findCurrentRubriqueKey(rubriques, '/constants')).toBe('constants');
  });

  it('rend la rubrique dont une page fille est affichée', () => {
    const rubriques = [
      { key: 'components', label: 'Composants', href: '/' },
      { key: 'constants', label: 'Constantes', href: '/constants' },
    ];

    expect(findCurrentRubriqueKey(rubriques, '/components/Button')).toBe('components');
  });

  it('retient la rubrique la plus précise quand plusieurs chemins correspondent', () => {
    const rubriques = [
      { key: 'components', label: 'Composants', href: '/' },
      { key: 'constants', label: 'Constantes', href: '/constants' },
    ];

    expect(findCurrentRubriqueKey(rubriques, '/constants/Spacings')).toBe('constants');
  });
});
