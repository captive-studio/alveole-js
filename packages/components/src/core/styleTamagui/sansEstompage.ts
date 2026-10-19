// La peau de Tamagui v3 estompe a 0.45 la case, l'interrupteur et l'onglet desactives, meme
// `unstyled` : par-dessus les couleurs desactivees qu'Alveole pose deja, ils tombaient a moitie
// de leur teinte. Le style inline l'emporte sur la classe de la peau.
export const sansEstompage = { opacity: 1 } as const;
