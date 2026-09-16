import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color }) => ({
  tabBarStyle: {
    backgroundColor: color.light.background['default-grey'],
    borderColor: color.light.border['default-grey'],
  },
  tabBarLabelStyle: text['Corps de texte'].XS.Regular,
  tabBarActiveTintColor: {
    color: color.light.text['action-high-primary'],
  },
  tabBarInactiveTintColor: {
    color: color.light.text['default-grey'],
  },
}));
