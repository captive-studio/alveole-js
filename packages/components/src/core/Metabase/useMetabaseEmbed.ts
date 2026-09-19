import { useEffect, useRef } from 'react';

// Le web component `metabase-dashboard` est fourni par le script `embed.js` de l'instance et se
// configure via `window.metabaseConfig`. Charger le script et poser la config sont deux effets
// distincts, montés une fois par instance : les isoler du composant garde ce dernier à son seul
// rôle de rendu.
export const useMetabaseEmbed = (instanceUrl?: string) => {
  const scriptLoadedRef = useRef(false);
  const configLoadedRef = useRef(false);

  useEffect(() => {
    if (!scriptLoadedRef.current && typeof window !== 'undefined' && instanceUrl) {
      const existingScript = document.querySelector(`script[src="${instanceUrl}/app/embed.js"]`);
      if (existingScript) {
        scriptLoadedRef.current = true;
        return;
      }

      const script = document.createElement('script');
      script.src = `${instanceUrl}/app/embed.js`;
      script.defer = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);
    }
  }, [instanceUrl]);

  useEffect(() => {
    if (!configLoadedRef.current && typeof window !== 'undefined' && instanceUrl) {
      (window as any).defineMetabaseConfig = (config: any) => {
        (window as any).metabaseConfig = config;
      };

      (window as any).defineMetabaseConfig({
        theme: {
          preset: 'light',
        },
        isGuest: true,
        instanceUrl: instanceUrl,
      });

      configLoadedRef.current = true;
    }
  }, [instanceUrl]);
};
