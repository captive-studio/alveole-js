import type { ReactNode } from 'react';

const GEIST = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap';

export type EmailLayoutProps = {
  children: ReactNode;
  /** Le logo de l'en-tete, servi par l'app : un mail ne peut pas embarquer les assets d'Expo. */
  logo?: { src: string; alt: string; size?: number };
  footer?: ReactNode;
  lang?: string;
};

/**
 * Le gabarit commun des mails : apercu, en-tete avec logo, contenu, pied de page, centres sur
 * 600px. `{{stylesheet}}` et `{{yield:preview}}` sont des marqueurs convertis par renderEmail.
 */
export const EmailLayout = ({ children, logo, footer, lang = 'fr' }: EmailLayoutProps) => (
  <html lang={lang}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      {/* Chargee par les clients qui le permettent, sinon repli systeme ; premailer ne l'inline pas. */}
      <link rel="stylesheet" href={GEIST} data-premailer="ignore" />
      {'{{stylesheet}}'}
    </head>
    <body className="email">
      <div className="preview">{'{{yield:preview}}'}</div>
      <table className="wrapper" role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td align="center">
              <table className="container" role="presentation" width={600} cellPadding={0} cellSpacing={0}>
                <tbody>
                  {logo && (
                    <tr>
                      <td className="header">
                        <img
                          className="logo"
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.size ?? 32}
                          height={logo.size ?? 32}
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>{children}</td>
                  </tr>
                  {footer && (
                    <tr>
                      <td className="footer">{footer}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
);
