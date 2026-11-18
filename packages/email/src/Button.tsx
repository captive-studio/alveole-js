import { jetonsBouton, type TailleBouton, type VarianteBouton } from '@alveole/theme';
import { Button as BoutonMail } from '@react-email/components';
import { theme, typo } from './theme';

const { variantes, tailles } = jetonsBouton(theme);
const BORDURE = 1;

export type ButtonProps = {
  title: string;
  variant: VarianteBouton;
  size?: TailleBouton;
  fullWidth?: boolean;
  href: string;
};

/**
 * Le Button d'Alveole dans un mail : un lien, seul element cliquable fiable partout. Les
 * jetons de variante et de taille sont ceux du composant (`jetonsBouton`) ; la hauteur du
 * controle passe par le padding, un client mail ignorant `height` sur un lien.
 */
export const Button = ({ title, variant, size = 'md', fullWidth = false, href }: ButtonProps) => {
  const { fond, texte, bordure } = variantes[variant];
  const { height, paddingInline, rayon, typo: cran } = tailles[size];
  const vertical = (height - Number(cran.lineHeight)) / 2 - BORDURE;
  return (
    <BoutonMail
      href={href}
      style={{
        ...typo(cran),
        backgroundColor: fond,
        color: texte,
        border: `${BORDURE}px solid ${bordure}`,
        borderRadius: rayon,
        padding: `${vertical}px ${paddingInline}px`,
        textAlign: 'center',
        textDecoration: 'none',
        display: fullWidth ? 'block' : 'inline-block',
        boxSizing: 'border-box',
      }}
    >
      {title}
    </BoutonMail>
  );
};
