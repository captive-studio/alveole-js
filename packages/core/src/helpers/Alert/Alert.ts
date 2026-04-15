import { AlertButton, AlertOptions, Alert as ReactNativeAlert } from 'react-native';

export type AlertProps = {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
};

export const Alert = {
  alert: (props: AlertProps) => ReactNativeAlert.alert(props.title, props.message, props.buttons, props.options),
};
