// Banc de l'ALV-122 : Tamagui 3.0.3 seul, sans le kit (qui ne compile pas encore en v3),
// pour savoir si la bague de focus que la v2 imposait en `!important` existe toujours, et si
// une clause `focus-visible:` la remplace. Jetable : il tranche l'ADR 0017, rien d'autre.
import { defaultConfig } from '@tamagui/config/v5';
import { createRoot } from 'react-dom/client';
import { Checkbox, createTamagui, RadioGroup, Switch, TamaguiProvider, YStack } from 'tamagui';

const config = createTamagui(defaultConfig);

// Le bleu de `Colors.Focus[525]`, celui que `focusRing()` pose aujourd'hui.
const CLAUSE = 'transparent focus-visible:#0A76F6';

// La règle de l'ADR 0017, ses mesures, mais SANS `!important` : la v2 l'exigeait pour battre
// la bague de Tamagui. On veut savoir si la v3 s'en passe.
const REGLE_MARQUEE = `
[data-alveole-focus]:focus-visible { outline: 2px solid #0A76F6; outline-offset: 2px; }
[data-alveole-focus]:focus:not(:focus-visible) { outline: none; }
`;

const Banc = () => (
  <TamaguiProvider config={config} defaultTheme="light">
    <style>{REGLE_MARQUEE}</style>
    <YStack gap={16} padding={16}>
      <Switch id="switch-nu" />
      <Switch id="switch-clause" outlineStyle="solid" outlineWidth={2} outlineColor={CLAUSE} />
      <Checkbox id="checkbox-nu" />
      <Checkbox id="checkbox-clause" outlineStyle="solid" outlineWidth={2} outlineColor={CLAUSE} />
      <Switch id="switch-marque" data-alveole-focus="" />
      <Checkbox id="checkbox-marque" data-alveole-focus="" />
      <RadioGroup>
        <RadioGroup.Item id="radio-marque" value="c" data-alveole-focus="" />
        <RadioGroup.Item id="radio-marque-2" value="d" data-alveole-focus="" />
      </RadioGroup>
      <RadioGroup>
        <RadioGroup.Item id="radio-nu" value="a" />
      </RadioGroup>
      <RadioGroup>
        <RadioGroup.Item id="radio-clause" value="b" outlineStyle="solid" outlineWidth={2} outlineColor={CLAUSE} />
      </RadioGroup>
    </YStack>
  </TamaguiProvider>
);

createRoot(document.getElementById('root')!).render(<Banc />);
