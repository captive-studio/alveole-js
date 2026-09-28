import * as LucideIcons from './vendor/lucide';

// Le module Lucide exporte ses icones avec leur moteur de rendu : le retirer laisse les seules
// icones, que le rendu indexe par leur nom et que le catalogue propose.
const {
  Icon: _moteur,
  createLucideIcon: _fabrique,
  useLucideContext: _contexte,
  LucideProvider: _fournisseur,
  ...iconesLucide
} = LucideIcons;

export { iconesLucide };
