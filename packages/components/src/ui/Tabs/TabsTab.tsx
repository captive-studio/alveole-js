import { focusRingProps } from '@alveole/theme';
import { Tabs as TamaguiTabs, TabsTabProps as TamaguiTabsTabProps } from 'tamagui';
import { Box } from '../../core/Box';
import { Typography } from '../../core/Typography';
import { Counter } from '../Counter';
import { LucideIcon, LucideIconProps } from '../LucideIcon';
import { apparenceDeLOnglet, EtatDeLOnglet } from './Tabs.apparence';
import { useStyles } from './Tabs.styles';

export type TabsTabProps = {
  value: string;
  label: string;
  icon?: LucideIconProps['name'];
  counter?: number;
  etat: EtatDeLOnglet;
  disabled: boolean;
  onHover: (value: string | null) => void;
  onInteraction: TamaguiTabsTabProps['onInteraction'];
};

export const TabsTab = (props: TabsTabProps) => {
  const { value, label, icon, counter, etat, disabled, onHover, onInteraction } = props;
  const styles = useStyles();
  const { onglet, enveloppe, icone, libelle } = apparenceDeLOnglet(styles, etat);

  return (
    <TamaguiTabs.Tab
      unstyled
      onHoverIn={() => onHover(value)}
      onHoverOut={() => onHover(null)}
      onInteraction={onInteraction}
      value={value}
      disabled={disabled}
      style={onglet}
      // La bague de focus vient du CSS du theme, pose sur `:focus-visible`. Le state React qui
      // vivait ici la montrait aussi au clic a la souris.
      {...focusRingProps()}
    >
      <Box style={enveloppe}>
        {icon && <LucideIcon name={icon} size="sm" color="currentColor" style={icone} />}
        <Typography style={libelle}>{label}</Typography>
        {counter !== undefined && counter > 0 && (
          <Counter variant={etat.actif ? 'primary' : 'default'} count={counter} />
        )}
      </Box>
    </TamaguiTabs.Tab>
  );
};
