import { Redirect } from 'expo-router';

/** La rubrique Guides n'a pas d'écran à elle : son entrée ouvre le premier guide. */
export default function GuidesRoute() {
  return <Redirect href="/guides/installation" />;
}
