import type { ButtonProps } from './Button.types';

export type ButtonEmailProps = Pick<ButtonProps, 'title' | 'variant' | 'size' | 'fullWidth'> & { href: string };

/**
 * Variante mail de Button : un lien, seul element cliquable fiable dans tous les clients mail.
 * Le fond et la bordure sont portes par la cellule : Outlook ignore le padding et le fond d'un
 * <a>. Les couleurs et dimensions de chaque classe viennent des styles du Button (emailCss).
 */
export const Button = ({ title, variant, size = 'md', fullWidth = false, href }: ButtonEmailProps) => (
  <table role="presentation" cellPadding={0} cellSpacing={0} width={fullWidth ? '100%' : undefined}>
    <tbody>
      <tr>
        <td className={`btn-cell btn-cell-${variant} btn-cell-${size}`} align="center">
          <a className={`btn btn-${variant} btn-${size}${fullWidth ? ' btn-full' : ''}`} href={href}>
            {title}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
);
