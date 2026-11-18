import { couleursDeBouton, dimensionsDeBouton, type TailleBouton, type VarianteBouton } from '@alveole/theme';
import { Button as BoutonMail } from '@react-email/components';
import { theme, typo } from './theme';

const BORDURE = 1;

export type ButtonProps = {
  title: string;
  variant: VarianteBouton;
  size?: TailleBouton;
  fullWidth?: boolean;
  href: string;
};

/**
 * Le Button d'Alveole dans un mail : un lien, seul element cliquable fiable partout. Couleurs
 * et dimensions viennent des memes tables que le composant (`variantesDeBouton`,
 * `taillesDeBouton`) ; la hauteur passe par le padding, un client mail ignorant `height`.
 */
export const Button = ({ title, variant, size = 'md', fullWidth = false, href }: ButtonProps) => {
  const { fond, texte, bordure } = couleursDeBouton(theme, variant, 'repos');
  const { height, paddingInline, rayon, typo: cran } = dimensionsDeBouton(theme, size);
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
