import { useState } from 'react';

// Des chiffres, puis au plus un séparateur décimal (virgule ou point) et deux décimales.
const MONTANT = /^\d*([.,]\d{0,2})?$/;

// La virgule est le séparateur décimal en français ; Number ne lit que le point.
const lireMontant = (texte: string) => (texte === '' ? null : Number(texte.replace(',', '.')));

// Le texte tapé reste affiché tant qu'il vaut le montant reçu : « 12, » attend sa décimale
// au lieu de redevenir « 12 ». Un montant imposé par le parent reprend la main.
export const useSaisieMontant = (montant: number | null | undefined, onChange?: (montant: number | null) => void) => {
  const texteDuMontant = montant == null ? '' : String(montant);
  const [saisie, setSaisie] = useState(texteDuMontant);
  const affichage = lireMontant(saisie) === (montant ?? null) ? saisie : texteDuMontant;

  const saisir = (texte: string) => {
    if (!MONTANT.test(texte)) return;
    setSaisie(texte);
    onChange?.(lireMontant(texte));
  };

  return { affichage, saisir };
};
