/**
 * PROTOTYPE jetable (branche prototype/nuances-visuel) : trois dessins de la page Nuances,
 * commutes par `?variant=A|B|C` sur la route /theme/nuances. Ne pas merger dans main.
 */
import { Box, Link, Typography } from '@alveole/components';
import { contrastRatio, Spacings, useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';
import { EcranDeCatalogue, filDuTheme } from '../components/EcranDeCatalogue';
import type { Nuance } from '../couleurs/catalogueDesCouleurs';
import { catalogueDuTheme } from '../couleurs/catalogueDesCouleurs.generated';
import { type EchelleDeNuances, famillesDEchellesDuCatalogue } from './echellesDuCatalogue';

const familles = famillesDEchellesDuCatalogue(catalogueDuTheme);
const ratio = (a: string, b: string) => `${contrastRatio(a, b).toFixed(1).replace('.', ',')}:1`;
const encre = (fond: string) => (contrastRatio('#000000', fond) >= contrastRatio('#FFFFFF', fond) ? '#161616' : '#FFFFFF');
const usages = (n: Nuance) => n.tokens.length + n.tokensDeprecies.length;
const tokensDe = (n: Nuance) => [...n.tokens, ...n.tokensDeprecies];

const useStyles = () => {
  const { text, color } = useTheme();
  const c = color.light;
  return {
    h2: text.Titres['H4 - SM'],
    h3: { ...text['Corps de texte'].SM.Bold },
    corps: text['Corps de texte'].SM.Regular,
    petit: text['Corps de texte'].XS.Regular,
    petitGras: text['Corps de texte'].XS.Bold,
    caps: { ...text['Corps de texte'].XS.CapsBold, color: c.text['mention-grey'], letterSpacing: 0.6 },
    discret: { color: c.text['mention-grey'] },
    bord: c.border['default-grey'],
    fondAlt: c.background['alt-grey'] ?? '#F6F6F6',
    mono: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' as const },
  };
};

const Avertissement = () => {
  const s = useStyles();
  return (
    <Box style={{ flexDirection: 'row', gap: Spacings['1V'], marginBottom: Spacings['4W'], flexWrap: 'wrap' }}>
      <Typography style={[s.corps, s.discret]}>{'Un composant lit un token sémantique, jamais une nuance.'}</Typography>
      <Link href="/theme/tokens-semantiques">{'Voir les tokens sémantiques'}</Link>
    </Box>
  );
};

const TitreDeFamille = ({ titre, nb }: { titre: string; nb: number }) => {
  const s = useStyles();
  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: Spacings['1W'],
        borderBottomWidth: 1,
        borderColor: s.bord,
        paddingBottom: Spacings['1W'],
        marginBottom: Spacings['3W'],
      }}
    >
      <Typography style={s.h2}>{titre}</Typography>
      <Typography style={[s.petit, s.discret]}>{`${nb} échelle${nb > 1 ? 's' : ''}`}</Typography>
    </Box>
  );
};

/* ---------------- A : colonnes, facon Atlassian ---------------- */

const ColonneA = ({ echelle }: { echelle: EchelleDeNuances }) => {
  const s = useStyles();
  return (
    <Box style={{ width: 216 }}>
      <Typography style={[s.h3, { marginBottom: Spacings['1W'] }]}>{echelle.titre}</Typography>
      <Box style={{ borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: s.bord }}>
        {echelle.nuances.map(n => (
          <Box
            key={n.numero}
            style={{
              backgroundColor: n.hex,
              height: 40,
              paddingHorizontal: Spacings['3V'],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography style={[s.petitGras, { color: encre(n.hex) }]}>{n.numero}</Typography>
            <Typography style={[s.petit, s.mono, { color: encre(n.hex), opacity: 0.85 }]}>
              {`${n.hex}${usages(n) ? `  ·  ${usages(n)}` : ''}`}
            </Typography>
          </Box>
        ))}
      </Box>
      {echelle.horsBande.length > 0 && (
        <Box style={{ marginTop: Spacings['1W'], gap: 4 }}>
          {echelle.horsBande.map(({ nuance, raisons }) => (
            <Box key={nuance.numero} style={{ flexDirection: 'row', alignItems: 'center', gap: Spacings['1W'] }}>
              <Box style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: nuance.hex, borderWidth: 1, borderColor: s.bord }} />
              <Typography style={[s.petit, s.discret, raisons.includes('deprecie') && { textDecorationLine: 'line-through' }]}>
                {nuance.numero}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const VariantA = () => (
  <>
    {familles.map(f => (
      <Box key={f.titre} style={{ marginBottom: Spacings['6W'] }}>
        <TitreDeFamille titre={f.titre} nb={f.echelles.length} />
        <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacings['3W'] }}>
          {f.echelles.map(e => (
            <ColonneA key={e.titre} echelle={e} />
          ))}
        </Box>
      </Box>
    ))}
  </>
);

/* ---------------- B : grille alignee par rang + panneau ---------------- */

const largeurMax = Math.max(...familles.flatMap(f => f.echelles.map(e => e.nuances.length)));

const PanneauB = ({ nuance, echelle }: { nuance: Nuance | null; echelle?: EchelleDeNuances }) => {
  const s = useStyles();
  if (!nuance) {
    return (
      <Typography style={[s.petit, s.discret]}>{'Sélectionnez une nuance pour voir son hex, ses contrastes et les tokens qui la citent.'}</Typography>
    );
  }
  const fonce = echelle?.plusFoncee;
  return (
    <Box style={{ gap: Spacings['2W'] }}>
      <Box style={{ height: 96, borderRadius: 8, backgroundColor: nuance.hex, borderWidth: 1, borderColor: s.bord }} />
      <Box>
        <Typography style={s.h3}>{`${nuance.echelle} ${nuance.numero}`}</Typography>
        <Typography style={[s.petit, s.mono, s.discret]}>{nuance.hex}</Typography>
      </Box>
      <Box style={{ flexDirection: 'row', gap: Spacings['2W'] }}>
        <Box style={{ flex: 1, padding: Spacings['1W'], borderRadius: 6, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: s.bord }}>
          <Typography style={[s.petitGras, { color: nuance.hex }]}>{'Aa'}</Typography>
          <Typography style={[s.petit, s.discret]}>{`${ratio(nuance.hex, '#FFFFFF')} blanc`}</Typography>
        </Box>
        {fonce && fonce !== nuance && (
          <Box style={{ flex: 1, padding: Spacings['1W'], borderRadius: 6, backgroundColor: nuance.hex }}>
            <Typography style={[s.petitGras, { color: fonce.hex }]}>{'Aa'}</Typography>
            <Typography style={[s.petit, { color: fonce.hex }]}>{`${ratio(nuance.hex, fonce.hex)} ${fonce.numero}`}</Typography>
          </Box>
        )}
      </Box>
      <Box style={{ gap: 4 }}>
        <Typography style={s.caps}>{`Tokens (${usages(nuance)})`}</Typography>
        {usages(nuance) === 0 && <Typography style={[s.petit, s.discret]}>{'sans usage'}</Typography>}
        {tokensDe(nuance).map(t => (
          <Link key={t} href={`/theme/tokens-semantiques#${t}`}>
            {t}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const VariantB = () => {
  const s = useStyles();
  const [sel, setSel] = React.useState<{ n: Nuance; e: EchelleDeNuances } | null>(null);
  return (
    <Box style={{ flexDirection: 'row', gap: Spacings['4W'], alignItems: 'flex-start' }}>
      <Box style={{ flex: 1, minWidth: 0 }}>
        {familles.map(f => (
          <Box key={f.titre} style={{ marginBottom: Spacings['5W'] }}>
            <TitreDeFamille titre={f.titre} nb={f.echelles.length} />
            {f.echelles.map(e => (
              <Box key={e.titre} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Typography style={[s.petitGras, { width: 128 }]}>{e.titre}</Typography>
                <Box style={{ flex: 1, flexDirection: 'row', gap: 2 }}>
                  {Array.from({ length: largeurMax }, (_, i) => {
                    const n = e.nuances[i];
                    if (!n) return <Box key={i} style={{ flex: 1 }} />;
                    const choisie = sel?.n === n;
                    return (
                      <Pressable
                        key={n.numero}
                        accessibilityRole="button"
                        accessibilityLabel={`${n.echelle} ${n.numero}`}
                        onPress={() => setSel({ n, e })}
                        style={{ flex: 1 }}
                      >
                        <Box
                          style={{
                            height: 40,
                            borderRadius: 4,
                            backgroundColor: n.hex,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: choisie ? encre(n.hex) : 'rgba(0,0,0,0.06)',
                            outlineStyle: 'solid',
                            outlineWidth: choisie ? 2 : 0,
                            outlineColor: encre(n.hex),
                            outlineOffset: -4,
                          }}
                        >
                          <Typography style={[s.petit, { color: encre(n.hex), fontSize: 11 }]}>{n.numero}</Typography>
                          {usages(n) === 0 && (
                            <Box style={{ position: 'absolute', top: 4, right: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: encre(n.hex), opacity: 0.5 }} />
                          )}
                        </Box>
                      </Pressable>
                    );
                  })}
                </Box>
                <Typography style={[s.petit, s.discret, { width: 72, textAlign: 'right' }]}>
                  {e.horsBande.length ? `+${e.horsBande.length} hors` : ''}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
        <Typography style={[s.petit, s.discret]}>{'Point dans la case : nuance sans usage. Colonnes alignées par rang, du plus clair au plus foncé.'}</Typography>
      </Box>
      <Box
        style={{
          width: 300,
          position: 'sticky' as never,
          top: Spacings['3W'],
          padding: Spacings['3W'],
          borderRadius: 12,
          borderWidth: 1,
          borderColor: s.bord,
        }}
      >
        <PanneauB nuance={sel?.n ?? null} echelle={sel?.e} />
      </Box>
    </Box>
  );
};

/* ---------------- C : fiche par echelle, tableau detaille ---------------- */

const LigneC = ({ n, e, hors }: { n: Nuance; e: EchelleDeNuances; hors?: string }) => {
  const s = useStyles();
  const fonce = e.plusFoncee;
  return (
    <Box
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacings['2W'],
        paddingVertical: 6,
        borderTopWidth: 1,
        borderColor: s.bord,
        opacity: hors ? 0.55 : 1,
      }}
    >
      <Box style={{ width: 40, height: 28, borderRadius: 4, backgroundColor: n.hex, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' }} />
      <Typography style={[s.petitGras, { width: 64 }]}>{n.numero}</Typography>
      <Typography style={[s.petit, s.mono, { width: 80 }]}>{n.hex}</Typography>
      <Typography style={[s.petit, { width: 64 }]}>{ratio(n.hex, '#FFFFFF')}</Typography>
      <Typography style={[s.petit, { width: 64 }]}>{fonce && fonce !== n ? ratio(n.hex, fonce.hex) : '-'}</Typography>
      <Box style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', columnGap: Spacings['1W'] }}>
        {hors && <Typography style={[s.petit, s.discret]}>{hors}</Typography>}
        {!hors && usages(n) === 0 && <Typography style={[s.petit, s.discret]}>{'sans usage'}</Typography>}
        {tokensDe(n).map(t => (
          <Link key={t} href={`/theme/tokens-semantiques#${t}`}>
            {t}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const FicheC = ({ echelle }: { echelle: EchelleDeNuances }) => {
  const s = useStyles();
  const [ouverte, setOuverte] = React.useState(false);
  return (
    <Box style={{ marginBottom: Spacings['3W'], borderWidth: 1, borderColor: s.bord, borderRadius: 12, overflow: 'hidden' }}>
      <Pressable accessibilityRole="button" onPress={() => setOuverte(o => !o)}>
        <Box style={{ flexDirection: 'row', height: 56 }}>
          {echelle.nuances.map(n => (
            <Box key={n.numero} style={{ flex: 1, backgroundColor: n.hex }} />
          ))}
        </Box>
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', padding: Spacings['2W'] }}>
          <Typography style={s.h3}>{echelle.titre}</Typography>
          <Typography style={[s.petit, s.discret]}>
            {`${echelle.nuances.length} crans · ${echelle.nuances.reduce((t, n) => t + usages(n), 0)} citations  ${ouverte ? '▲' : '▼'}`}
          </Typography>
        </Box>
      </Pressable>
      {ouverte && (
        <Box style={{ paddingHorizontal: Spacings['2W'], paddingBottom: Spacings['2W'] }}>
          <Box style={{ flexDirection: 'row', gap: Spacings['2W'], paddingBottom: 4 }}>
            {[['', 40], ['Cran', 64], ['Hex', 80], ['/ blanc', 64], ['/ foncé', 64], ['Tokens', 0]].map(([l, w]) => (
              <Typography key={String(l)} style={[s.caps, w ? { width: Number(w) } : { flex: 1 }]}>{String(l)}</Typography>
            ))}
          </Box>
          {echelle.nuances.map(n => (
            <LigneC key={n.numero} n={n} e={echelle} />
          ))}
          {echelle.horsBande.map(({ nuance, raisons }) => (
            <LigneC key={nuance.numero} n={nuance} e={echelle} hors={raisons.map(r => (r === 'deprecie' ? 'déprécié' : 'hors échelle')).join(', ')} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const VariantC = () => (
  <>
    {familles.map(f => (
      <Box key={f.titre} style={{ marginBottom: Spacings['5W'] }}>
        <TitreDeFamille titre={f.titre} nb={f.echelles.length} />
        <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacings['3W'] }}>
          {f.echelles.map(e => (
            <Box key={e.titre} style={{ flexBasis: 520, flexGrow: 1 }}>
              <FicheC echelle={e} />
            </Box>
          ))}
        </Box>
      </Box>
    ))}
  </>
);


/* ---------------- D : grille de B + tableau de C dans le panneau ---------------- */

const PanneauD = ({ sel }: { sel: { n: Nuance; e: EchelleDeNuances } | null }) => {
  const s = useStyles();
  if (!sel) {
    return <Typography style={[s.petit, s.discret]}>{'Sélectionnez une nuance pour voir son échelle en détail.'}</Typography>;
  }
  const { n, e } = sel;
  const fonce = e.plusFoncee;
  const lignes = [...e.nuances.map(x => ({ x, hors: '' })), ...e.horsBande.map(({ nuance, raisons }) => ({ x: nuance, hors: raisons.map(r => (r === 'deprecie' ? 'déprécié' : 'hors échelle')).join(', ') }))];
  return (
    <Box style={{ gap: Spacings['2W'] }}>
      <Box style={{ flexDirection: 'row', gap: Spacings['2W'], alignItems: 'center' }}>
        <Box style={{ width: 64, height: 64, borderRadius: 8, backgroundColor: n.hex, borderWidth: 1, borderColor: s.bord }} />
        <Box style={{ flex: 1 }}>
          <Typography style={s.h3}>{`${n.echelle} ${n.numero}`}</Typography>
          <Typography style={[s.petit, s.mono, s.discret]}>{n.hex}</Typography>
          <Box style={{ flexDirection: 'row', gap: Spacings['1W'], marginTop: 4 }}>
            <Typography style={s.petit}>{`${ratio(n.hex, '#FFFFFF')} sur blanc`}</Typography>
            {fonce && fonce !== n && <Typography style={s.petit}>{`· ${ratio(n.hex, fonce.hex)} sur ${fonce.numero}`}</Typography>}
          </Box>
        </Box>
      </Box>
      <Box style={{ gap: 2 }}>
        <Typography style={s.caps}>{`Tokens (${usages(n)})`}</Typography>
        {usages(n) === 0 && <Typography style={[s.petit, s.discret]}>{'sans usage'}</Typography>}
        {tokensDe(n).map(t => (
          <Link key={t} href={`/theme/tokens-semantiques#${t}`}>{t}</Link>
        ))}
      </Box>
      <Box>
        <Typography style={[s.caps, { marginBottom: 4 }]}>{`Échelle ${e.titre}`}</Typography>
        {lignes.map(({ x, hors }) => (
          <Box key={x.numero} style={{ flexDirection: 'row', alignItems: 'center', gap: Spacings['1W'], paddingVertical: 3, borderTopWidth: 1, borderColor: s.bord, opacity: hors ? 0.55 : 1, backgroundColor: x === n ? s.fondAlt : 'transparent' }}>
            <Box style={{ width: 20, height: 20, borderRadius: 3, backgroundColor: x.hex, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' }} />
            <Typography style={[s.petitGras, { width: 72 }]}>{x.numero}</Typography>
            <Typography style={[s.petit, s.mono, { width: 64 }]}>{x.hex}</Typography>
            <Typography style={[s.petit, s.discret, { flex: 1, textAlign: 'right' }]}>{hors || (usages(x) ? `${usages(x)} token${usages(x) > 1 ? 's' : ''}` : 'sans usage')}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const VariantD = () => {
  const s = useStyles();
  const [sel, setSel] = React.useState<{ n: Nuance; e: EchelleDeNuances } | null>(null);
  return (
    <Box style={{ flexDirection: 'row', gap: Spacings['4W'], alignItems: 'flex-start' }}>
      <Box style={{ flex: 1, minWidth: 0 }}>
        {familles.map(f => (
          <Box key={f.titre} style={{ marginBottom: Spacings['5W'] }}>
            <TitreDeFamille titre={f.titre} nb={f.echelles.length} />
            {f.echelles.map(e => (
              <Box key={e.titre} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Typography style={[s.petitGras, { width: 128 }]}>{e.titre}</Typography>
                <Box style={{ flex: 1, flexDirection: 'row', gap: 2 }}>
                  {Array.from({ length: largeurMax }, (_, i) => {
                    const n = e.nuances[i];
                    if (!n) return <Box key={i} style={{ flexGrow: 1, flexBasis: 0 }} />;
                    const choisie = sel?.n === n;
                    return (
                      <Pressable key={n.numero} accessibilityRole="button" accessibilityLabel={`${n.echelle} ${n.numero}`} aria-pressed={choisie} onPress={() => setSel({ n, e })} style={{ flexGrow: 1, flexBasis: 0 }}>
                        <Box style={{ height: 44, borderRadius: 4, backgroundColor: n.hex, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', outlineStyle: 'solid', outlineWidth: choisie ? 2 : 0, outlineColor: encre(n.hex), outlineOffset: -4 }}>
                          <Typography style={[s.petit, { color: encre(n.hex), fontSize: 11 }]}>{n.numero}</Typography>
                          {usages(n) === 0 && <Box style={{ position: 'absolute', top: 4, right: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: encre(n.hex), opacity: 0.5 }} />}
                        </Box>
                      </Pressable>
                    );
                  })}
                </Box>
                <Typography style={[s.petit, s.discret, { width: 72, textAlign: 'right' }]}>{e.horsBande.length ? `+${e.horsBande.length} hors` : ''}</Typography>
              </Box>
            ))}
          </Box>
        ))}
        <Typography style={[s.petit, s.discret]}>{'Point dans la case : nuance sans usage. Colonnes alignées par rang, du plus clair au plus foncé.'}</Typography>
      </Box>
      <Box style={{ width: 340, position: 'sticky' as never, top: Spacings['3W'], padding: Spacings['3W'], borderRadius: 12, borderWidth: 1, borderColor: s.bord, maxHeight: '90vh' as never, overflowY: 'auto' as never }}>
        <PanneauD sel={sel} />
      </Box>
    </Box>
  );
};

/* ---------------- commutateur ---------------- */

const variantes = {
  A: { nom: 'Colonnes (Atlassian)', Rendu: VariantA },
  B: { nom: 'Grille par rang + panneau (Primer)', Rendu: VariantB },
  C: { nom: 'Fiche par échelle + tableau', Rendu: VariantC },
  D: { nom: 'Grille B + tableau C (retenue)', Rendu: VariantD },
} as const;
type Cle = keyof typeof variantes;
const cles = Object.keys(variantes) as Cle[];

const Commutateur = ({ cle, aller }: { cle: Cle; aller: (c: Cle) => void }) => {
  const decaler = React.useCallback((d: number) => aller(cles[(cles.indexOf(cle) + d + cles.length) % cles.length]), [cle, aller]);
  React.useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const t = ev.target as HTMLElement;
      if (t?.closest?.('input, textarea, [contenteditable]')) return;
      if (ev.key === 'ArrowLeft') decaler(-1);
      if (ev.key === 'ArrowRight') decaler(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [decaler]);
  const bouton = (txt: string, d: number) => (
    <Pressable accessibilityRole="button" accessibilityLabel={d < 0 ? 'Variante précédente' : 'Variante suivante'} onPress={() => decaler(d)}>
      <Typography style={{ color: '#FFF', fontSize: 18, paddingHorizontal: 12 }}>{txt}</Typography>
    </Pressable>
  );
  return (
    <Box
      style={{
        position: 'fixed' as never,
        bottom: 24,
        left: '50%' as never,
        transform: [{ translateX: '-50%' as never }],
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 8,
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)' as never,
        zIndex: 1000,
      }}
    >
      {bouton('←', -1)}
      <Typography style={{ color: '#FFF', fontSize: 14 }}>{`${cle} · ${variantes[cle].nom}`}</Typography>
      {bouton('→', 1)}
    </Box>
  );
};

export const ThemeNuancesPrototype = ({ variant, aller, footerContent }: { variant?: string; aller: (c: string) => void; footerContent?: React.ReactNode }) => {
  const cle: Cle = variant && variant in variantes ? (variant as Cle) : 'A';
  const { Rendu } = variantes[cle];
  return (
    <EcranDeCatalogue title="Nuances" description="Les échelles de couleurs du thème" footerContent={footerContent} breadcrumbsProps={filDuTheme}>
      <Avertissement />
      <Rendu />
      <Commutateur cle={cle} aller={aller} />
    </EcranDeCatalogue>
  );
};
