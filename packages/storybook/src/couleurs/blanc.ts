import { Colors, contrastRatio } from '@alveole/theme';

/** Le blanc du theme, `Neutre 1000` : le fond de reference des rapports sans contexte. */
export const blanc = Colors.Neutre['1000'];

/** Plus une nuance est foncee, plus elle contraste avec le blanc : c'est aussi son rang. */
export const contrasteAvecLeBlanc = (hex: string) => contrastRatio(hex, blanc);
