import { Body, Container, Font, Head, Html, Img, Preview } from '@react-email/components';
import type { ReactNode } from 'react';
import { stylesDesMedias } from './medias';
import { theme } from './theme';

const { color, spacing } = theme;

export type EmailLayoutProps = {
  /** Le texte d'apercu de la boite de reception, sous l'objet. Absent du corps du mail. */
  preview?: string;
  /** Le logo de l'en-tete, servi par l'app : un mail ne peut pas embarquer ses assets. */
  logo?: { src: string; alt: string; size?: number };
  footer?: ReactNode;
  lang?: string;
  children: ReactNode;
};

/** Le gabarit commun des mails : apercu, logo, contenu et pied de page, centres sur 560px. */
export const EmailLayout = ({ preview, logo, footer, lang = 'fr', children }: EmailLayoutProps) => (
  <Html lang={lang}>
    <Head>
      <Font
        fontFamily="Geist"
        fallbackFontFamily="Helvetica"
        webFont={{ url: 'https://fonts.gstatic.com/s/geist/v1/gyByhwUxId8gMEwcGFU.woff2', format: 'woff2' }}
      />
      <style>{stylesDesMedias}</style>
    </Head>
    {preview && <Preview>{preview}</Preview>}
    <Body className="al-corps" style={{ backgroundColor: color.light.background['default-grey'], margin: 0 }}>
      <Container className="al-conteneur" style={{ maxWidth: 560, padding: `${spacing('4W')}px ${spacing('2W')}px` }}>
        {logo && <Img src={logo.src} alt={logo.alt} width={logo.size ?? 32} height={logo.size ?? 32} />}
        {children}
        {footer}
      </Container>
    </Body>
  </Html>
);
