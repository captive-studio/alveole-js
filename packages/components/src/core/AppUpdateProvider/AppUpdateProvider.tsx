import React from 'react';
import { UpdateRequired } from '../UpdateRequired';
import { useAppUpdateCheck } from './useAppUpdateCheck';

export { shouldRunCheck, THROTTLE_MS } from './useAppUpdateCheck';

type AppUpdateState = { isChecking: boolean };

const AppUpdateContext = React.createContext<AppUpdateState | null>(null);

export const useAppUpdateState = (): AppUpdateState => {
  const ctx = React.useContext(AppUpdateContext);
  if (!ctx) throw new Error('useAppUpdateState must be used inside AppUpdateProvider');
  return ctx;
};

export type AppUpdateProviderProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  buttonLabel?: string;
  /** Numeric App Store Connect ID (e.g. '6759812160'). Required on iOS. */
  iosAppId: string;
  /** Android package name. Defaults to Application.applicationId if omitted. */
  androidPackageId?: string;
}>;

const DEFAULT_TITLE = "Une mise à jour de l'application est nécessaire.";
const DEFAULT_DESCRIPTION =
  "La version actuelle de votre application n'est plus valide. Téléchargez la nouvelle version de l'application pour continuer.";
const DEFAULT_BUTTON_LABEL = 'Mettre à jour';

export const AppUpdateProvider = (props: AppUpdateProviderProps) => {
  const {
    children,
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    buttonLabel = DEFAULT_BUTTON_LABEL,
    iosAppId,
    androidPackageId,
  } = props;

  const { isChecking, isUpdateRequired, openStore } = useAppUpdateCheck({ iosAppId, androidPackageId });

  return (
    <AppUpdateContext.Provider value={{ isChecking }}>
      {!isChecking && isUpdateRequired ? (
        <UpdateRequired title={title} description={description} buttonLabel={buttonLabel} onUpdate={openStore} />
      ) : (
        children
      )}
    </AppUpdateContext.Provider>
  );
};
