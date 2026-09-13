---
status: accepted
---

# Primitives de contrôle partagées et alignement de l'échelle sur Primer

Les dimensions étaient décidées composant par composant, ce qui produisait des
désaccords mesurables : bouton `md` à 40 px contre champ de saisie à 42 px,
rayon 6 pour le bouton contre 8 en dur pour le champ, échelle non monotone
(`xs` à 36 px, plus grand que `sm` à 32 px), et trois tailles d'icône seule
rendant la même hauteur de 30 px. `@alveole/theme` expose désormais une couche
`control.*` (hauteur, padding-inline, gap, rayon, taille d'icône) que tous les
contrôles consomment.

L'échelle est alignée sur les primitives de Primer : `sm` = 28, `md` = 32
(défaut), `lg` = 40, et le cran `xs` disparaît du `Button`. Le défaut actuel de
40 px correspondait au `large` de Primer : Alveole construisait donc ses écrans
un cran au-dessus de la convention, ce qui explique le manque de densité
ressenti.

L'anneau de focus relève de la même couche, et non des composants : le kit n'en
définit aucun aujourd'hui, et `FormControl` va jusqu'à poser `outline: none`.
Deux entrées sont prévues, comme chez Primer, l'une pour les fonds clairs,
l'autre pour les fonds pleins où un anneau sombre devient invisible.

## Conséquences

- Rupture visuelle assumée : chaque bouton des apps clientes perd 8 px de
  hauteur. Elle est volontaire et constitue l'objectif de l'opération, à livrer
  dans un changement majeur annoncé.
- À 32 px on passe sous les 44 px de la HIG iOS et les 48 dp de Material. La
  zone tactile doit donc être découplée de la taille visuelle, comme le fait
  Base (tap target 48, click target web 28) : `hitSlop` sur natif, zone étendue
  sur web.
- La migration se fait composant par composant, `Button` en premier.
