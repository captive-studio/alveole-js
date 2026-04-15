import Swal from 'sweetalert2';
import type { AlertProps } from './Alert';
import './Alert.css';

export const Alert = {
  alert: (props: AlertProps) => {
    const message = props.message ? props.message.replace(/\n/g, '<br>') : undefined;
    const buttons = props.buttons ?? [];
    const cancelButton = buttons.find(button => button.style === 'cancel');
    const confirmButton = buttons.find(button => button.style !== 'cancel') ?? cancelButton;
    const showCancelButton = Boolean(cancelButton && confirmButton && cancelButton !== confirmButton);

    return Swal.fire({
      title: props.title,
      html: message,
      showCancelButton,
      confirmButtonText: confirmButton?.text ?? 'OK',
      cancelButtonText: cancelButton?.text ?? 'Annuler',
      scrollbarPadding: false,
      heightAuto: false,
      focusConfirm: false,
      allowOutsideClick: props.options?.cancelable ?? true,
      allowEscapeKey: props.options?.cancelable ?? true,
      customClass: {
        title: 'web-alert__title',
        htmlContainer: 'web-alert__content',
        confirmButton: 'web-alert__button web-alert__button--confirm',
        cancelButton: 'web-alert__button web-alert__button--cancel',
        actions: 'web-alert__actions',
      },
    }).then(result => {
      if (result.isConfirmed && confirmButton?.onPress) confirmButton.onPress();
      if (result.dismiss === Swal.DismissReason.cancel && cancelButton?.onPress) cancelButton.onPress();
    });
  },
};
