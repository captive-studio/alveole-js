import { Colors } from './Color';

export const CustomPalette = {
  light: {
    artwork: {
      'major-primary': Colors['BleuCaptive']['200'],
      'decorative-primary': Colors['BleuCaptive']['950'],
      'minor-secondary': Colors['Cerise']['600'],
    },
    background: {
      'alt-primary': Colors['BleuCaptive']['975'],
      'alt-grey': Colors['Neutre']['975'],
      'action-low-primary': Colors['BleuCaptive']['925'],
      'contrast-grey': Colors['Neutre']['950'],
      'contrast-success': Colors['VertSuccess']['950'],
      'contrast-error': Colors['RougeErreur']['950'],
      'contrast-info': Colors['BleuCaptive']['950'],
      'contrast-warning': Colors['OrangeWarning']['950'],
      'default-grey': Colors['Neutre']['1000'],
      'default-grey-hover': Colors['Neutre']['975'],
      'default-grey-active': Colors['Neutre']['925'],
      'active-primary': Colors['BleuCaptive']['sun-172'],
      'disabled-grey': Colors['Neutre']['925'],
      'active-inverted': Colors['Neutre']['1000'],
      'transparent-hover': 'rgba(0, 0, 0, 0.04)',
      'action-high-primary': Colors['BleuCaptive']['sun-172'],
      'action-high-primary-hover': Colors['BleuCaptive']['sun-172-hover'],
      'action-high-error': Colors['RougeErreur']['425'],
      'flat-error': Colors['RougeErreur']['425'],
      'flat-info': Colors['BleuCaptive']['425'],
      'flat-success': Colors['VertSuccess']['425'],
      'flat-warning': Colors['OrangeWarning']['425'],
      'open-primary': Colors['BleuCaptive']['925'],
    },
    border: {
      'default-grey': Colors['Neutre']['900'],
      'contrast-grey': Colors['Neutre']['625'],
      'default-primary': Colors['BleuCaptive']['425'],
      'action-high-primary': Colors['BleuCaptive']['sun-172'],
      'action-high-grey': Colors['Neutre']['50'],
      'active-primary': Colors['BleuCaptive']['sun-172'],
      'open-primary': Colors['BleuCaptive']['925'],
      'disabled-grey': Colors['Neutre']['925'],
      'plain-primary': Colors['BleuCaptive']['sun-172'],
      'plain-grey': Colors['Neutre']['200'],
      'plain-success': Colors['VertSuccess']['425'],
      'plain-error': Colors['RougeErreur']['425'],
      'plain-warning': Colors['OrangeWarning']['425'],
      'plain-info': Colors['BleuCaptive']['425'],
      'action-low-primary': Colors['BleuCaptive']['850'],
    },
    text: {
      'title-grey': Colors['Neutre']['50'],
      'title-primary': Colors['BleuCaptive']['sun-172'],
      'default-grey': Colors['Neutre']['200'],
      'mention-grey': Colors['Neutre']['425'],
      'label-grey': Colors['Neutre']['50'],
      'action-high-primary': Colors['BleuCaptive']['125'],
      'action-high-grey': Colors['Neutre']['50'],
      'action-high-info': Colors['BleuCaptive']['425'],
      'action-high-warning': Colors['OrangeWarning']['425'],
      'action-high-error': Colors['RougeErreur']['425'],
      'inverted-grey': Colors['Neutre']['1000'],
      'inverted-primary': Colors['BleuCaptive']['975'],
      'active-primary': Colors['BleuCaptive']['sun-172'],
      'active-grey': Colors['Neutre']['50'],
      'disabled-grey': Colors['Neutre']['625'],
      'default-success': Colors['VertSuccess']['425'],
      'default-error': Colors['RougeErreur']['425'],
      'default-warning': Colors['OrangeWarning']['425'],
      'default-info': Colors['BleuCaptive']['425'],
    },
    system: {
      focus: Colors['Focus']['525'],
    },
    illustration: {
      'color-sun': {
        default: {
          yellow: Colors['Ocre']['sun-403'],
        },
      },
      'color-950': {
        default: {
          yellow: Colors['Ocre']['950'],
        },
      },
    },
  },

  dark: {
    text: {
      'default-grey': Colors['Neutre']['850'],
    },
    background: {
      'alt-primary': Colors.BleuCaptive['75'],
      'contrast-grey': Colors.Neutre['100'],
    },
  },

  /** @deprecated Utiliser light.background['action-high-primary'] ou les tokens du thème light selon le contexte */
  primary: Colors['PinkVivid']['500'],
  /** @deprecated Utiliser 'transparent' en valeur directe ou light.background selon le contexte */
  transparent: 'transparent',
  /** @deprecated Utiliser light.background['action-high-error'] ou light.text['default-error'] */
  danger: Colors['RougeErreur']['425'],
  /** @deprecated Utiliser light.background['flat-info'] ou light.text['default-info'] */
  info: Colors['Mariner']['600'],
  /** @deprecated Utiliser light.background['flat-success'] ou light.text['default-success'] */
  success: Colors['MountainMeadow']['600'],
  /** @deprecated Utiliser light.background['flat-warning'] ou light.text['default-warning'] */
  warning: Colors['Watusi']['700'],
  /** @deprecated Utiliser light.text['default-info'] */
  link: Colors['BleuCiel']['425'],

  /** @deprecated Utiliser light.text pour les couleurs de texte */
  text: {
    /** @deprecated Utiliser light.text['default-grey'] */
    'default-grey': Colors['Neutre']['200'],
    /** @deprecated Utiliser light.text['title-grey'] */
    'title-grey': Colors['Neutre']['50'],
    /** @deprecated Utiliser light.text['mention-grey'] */
    mention: Colors['Neutre']['425'],
    /** @deprecated Utiliser light.text['disabled-grey'] */
    'disabled-grey': Colors['Neutre']['625'],
    /** @deprecated Utiliser light.text['action-high-primary'] */
    'action-high-blue-captive': Colors['BleuCaptive']['100'],
    /** @deprecated Utiliser light.text['action-high-primary'] */
    'action-high-primary': Colors['BleuCaptive']['100'],
    /** @deprecated Utiliser light.text['action-high-info'] */
    'action-high-info': Colors['BleuCaptive']['425'],
    /** @deprecated Utiliser light.text['title-grey'] */
    'title-blue-captive': Colors['BleuCaptive']['100'],
    /** @deprecated Utiliser light.text['label-grey'] */
    'label-grey': Colors['Neutre']['50'],
    /** @deprecated Utiliser light.text['inverted-primary'] */
    'inverted-blue-captive': Colors['Neutre']['1000'],
    /** @deprecated Utiliser light.text['inverted-primary'] */
    'inverted-primary': Colors['Neutre']['1000'],
    /** @deprecated Utiliser light.text['default-success'] */
    'default-success': Colors['VertSuccess']['425'],
    /** @deprecated Utiliser light.text['default-error'] */
    'default-error': Colors['RougeErreur']['425'],
    /** @deprecated Utiliser light.text['default-info'] */
    'default-info': Colors['BleuCiel']['main-686'],
    /** @deprecated Utiliser light.text['action-high-grey'] */
    'action-high-grey': Colors['Neutre']['50'],

    /** @deprecated Utiliser light.text (ex: inverted-grey, inverted-primary pour inverse) */
    inverse: {
      /** @deprecated Utiliser light.text['inverted-grey'] */
      base: Colors['Neutre']['1000'],
      /** @deprecated Utiliser light.text['inverted-grey'] */
      title: Colors['Neutre']['1000'],
      /** @deprecated Utiliser light.text['disabled-grey'] */
      muted: Colors['Neutre']['625'],
      /** @deprecated Pas d'équivalent direct dans light ; utiliser light.text selon le contexte */
      accent: Colors['GoldenFizz']['400'],
    },

    /** @deprecated Utiliser light.text avec les couleurs sémantiques (default-info, default-success, etc.) */
    badge: {
      /** @deprecated Utiliser light.text['default-info'] */
      info: Colors['LightBlueVivid']['700'],
      /** @deprecated Utiliser light.text['default-success'] */
      success: Colors['MountainMeadow']['700'],
      /** @deprecated Utiliser light.text['label-grey'] */
      default: Colors['Neutre']['175'],
      /** @deprecated Utiliser light.text['default-warning'] */
      warning: Colors['Watusi']['700'],
      /** @deprecated Utiliser light.text['default-error'] */
      error: Colors['RougeErreur']['425'],
      /** @deprecated Pas d'équivalent direct dans light */
      new: Colors['Sunshade']['800'],
    },

    /** @deprecated Utiliser light.background (action-high-primary, etc.) pour les boutons */
    button: {
      /** @deprecated Utiliser light.background['action-high-primary'] et light.text['inverted-grey'] */
      primary: {
        default: Colors['Neutre']['1000'],
        hover: Colors['Neutre']['1000'],
        disabled: Colors['Neutre']['625'],
      },
      /** @deprecated Utiliser light.background et light.border pour les boutons secondaires */
      secondary: {
        default: Colors['Neutre']['50'],
        hover: Colors['Neutre']['50'],
        disabled: Colors['Neutre']['625'],
      },
      /** @deprecated Utiliser light.background pour les boutons tertiaires */
      tertiary: {
        default: Colors['Neutre']['200'],
        hover: Colors['Neutre']['200'],
        disabled: Colors['Neutre']['625'],
      },
      /** @deprecated Utiliser light.background['action-high-error'] pour les boutons danger */
      danger: {
        default: Colors['Monza']['800'],
        hover: Colors['Neutre']['1000'],
        disabled: Colors['Neutre']['625'],
      },
    },

    /** @deprecated Utiliser light.text['default-grey'] ou light.border selon le contexte */
    tag: {
      /** @deprecated Utiliser light.text['default-grey'] */
      default: Colors['SlateGrey']['950'],
    },

    /** @deprecated Utiliser light.text['default-info'] */
    link: {
      /** @deprecated Utiliser light.text['default-info'] */
      default: Colors['BleuCiel']['425'],
      /** @deprecated Utiliser light.text['default-info'] */
      hover: Colors['BleuCiel']['425'],
    },

    /** @deprecated Utiliser light.text pour les liens de navigation */
    nav: {
      link: {
        /** @deprecated Utiliser light.text['mention-grey'] */
        default: Colors['Neutre']['425'],
        /** @deprecated Utiliser light.text['title-grey'] ou light.text['active-primary'] */
        current: Colors['Neutre']['50'],
      },
    },
  },

  /** @deprecated Utiliser light.border pour les couleurs de bordure */
  border: {
    /** @deprecated Utiliser light.border['default-grey'] */
    base: Colors['Neutre']['625'],
    /** @deprecated Utiliser light.border['default-grey'] */
    'default-grey': Colors['Neutre']['900'],
    /** @deprecated Utiliser light.border['action-high-primary'] */
    action: Colors['BleuCaptive']['100'],
    /** @deprecated Utiliser light.border['disabled-grey'] */
    'disabled-grey': Colors['Neutre']['925'],
    /** @deprecated Utiliser light.border['plain-grey'] */
    'plain-grey': Colors['Neutre']['200'],
    /** @deprecated Utiliser light.border['plain-success'] */
    'plain-success': Colors['VertSuccess']['425'],
    /** @deprecated Utiliser light.border['plain-error'] */
    'plain-error': Colors['RougeErreur']['425'],
    /** @deprecated Utiliser light.border['default-primary'] */
    'default-bleu-captive': Colors['BleuCaptive']['main-525'],
    /** @deprecated Utiliser light.border['default-primary'] */
    'default-primary': Colors['BleuCaptive']['main-525'],
    /** @deprecated Utiliser light.border['contrast-grey'] */
    'contrast-grey': Colors['Neutre']['900'],

    /** @deprecated Utiliser light.border pour les bordures de boutons */
    button: {
      /** @deprecated Utiliser light.border['action-high-grey'] */
      secondary: {
        default: Colors['Neutre']['200'],
        hover: Colors['Neutre']['200'],
        disabled: Colors['Neutre']['900'],
      },
      /** @deprecated Utiliser light.border['plain-error'] */
      danger: {
        default: Colors['SlateGrey']['600'],
        hover: Colors['Monza']['800'],
        disabled: Colors['SlateGrey']['300'],
      },
    },

    /** @deprecated Utiliser light.background (flat-info, flat-error, etc.) pour les alertes */
    alert: {
      /** @deprecated Utiliser light.background['flat-info'] */
      info: Colors['Mariner']['600'],
      /** @deprecated Utiliser light.background['flat-success'] */
      success: Colors['MountainMeadow']['600'],
      /** @deprecated Utiliser light.background['flat-warning'] */
      warning: Colors['Watusi']['700'],
      /** @deprecated Utiliser light.background['flat-error'] */
      error: Colors['RougeErreur']['425'],
      /** @deprecated Utiliser light.text['default-info'] */
      link: Colors['BleuCiel']['425'],
    },

    /** @deprecated Utiliser light.text['default-info'] */
    link: {
      /** @deprecated Utiliser light.text['default-info'] */
      default: Colors['BleuCiel']['425'],
    },

    /** @deprecated Utiliser light.border['default-grey'] */
    quote: {
      default: Colors['Neutre']['900'],
    },

    /** @deprecated Utiliser light.border['open-primary'] */
    nav: {
      link: {
        /** @deprecated Utiliser light.border['open-primary'] */
        active: Colors['BleuCaptive']['925'],
      },
    },
  },

  /** @deprecated Utiliser light.background pour les couleurs de fond */
  background: {
    /** @deprecated Utiliser light.background['default-grey'] */
    default: Colors['Neutre']['1000'],
    /** @deprecated Utiliser light.background['default-grey-active'] */
    'default-active': Colors['Neutre']['950'],
    /** @deprecated Utiliser light.background['alt-grey'] */
    'alt-grey': Colors['Neutre']['975'],
    /** @deprecated Utiliser light.background['active-inverted'] */
    inverse: Colors['BleuCaptive']['100'],
    /** @deprecated Utiliser light.background['action-high-primary'] */
    action: Colors['BleuCaptive']['100'],
    /** @deprecated Utiliser light.background['disabled-grey'] */
    'disabled-grey': Colors['Neutre']['925'],
    /** @deprecated Utiliser light.background['default-grey-hover'] */
    'default-hover': Colors['Neutre']['975'],
    /** @deprecated Utiliser light.background['open-primary'] */
    'open-bleu-captive': Colors['BleuCaptive']['925'],
    /** @deprecated Utiliser light.background['open-primary'] */
    'open-primary': Colors['BleuCaptive']['925'],
    /** @deprecated Utiliser light.background['contrast-grey'] */
    'contrast-grey': Colors['Neutre']['925'],
    /** @deprecated Utiliser light.background['alt-primary'] */
    'alt-bleu-captive': Colors['BleuCaptive']['975'],
    /** @deprecated Utiliser light.background['alt-primary'] */
    'alt-primary': Colors['BleuCaptive']['975'],
    /** @deprecated Utiliser light.background['action-low-primary'] */
    'action-low-primary': Colors['BleuCaptive']['925'],
    /** @deprecated Utiliser light.background['contrast-success'] ou flat-success selon le contexte */
    'default-success': Colors['VertSuccess']['925'],

    /** @deprecated Utiliser light.background (flat-error, flat-info, etc.) pour les alertes */
    alert: {
      /** @deprecated Utiliser light.background['flat-info'] */
      info: Colors['Mariner']['600'],
      /** @deprecated Utiliser light.background['flat-success'] */
      success: Colors['MountainMeadow']['600'],
      /** @deprecated Utiliser light.background['flat-warning'] */
      warning: Colors['Watusi']['700'],
      /** @deprecated Utiliser light.background['flat-error'] */
      error: Colors['RougeErreur']['425'],
    },

    /** @deprecated Utiliser light.background (action-high-primary, action-high-primary-hover, etc.) pour les boutons */
    button: {
      /** @deprecated Utiliser light.background['action-high-primary'] et light.background['action-high-primary-hover'] */
      primary: {
        default: Colors['PinkVivid']['500'],
        hover: Colors['PinkVivid']['600'],
        disabled: Colors['GrisPolaire']['100'],
      },
      /** @deprecated Utiliser light.background (transparent-hover) */
      secondary: {
        default: 'transparent',
        hover: Colors['Neutre']['975'],
        disabled: 'transparent',
      },
      /** @deprecated Utiliser light.background (transparent-hover) */
      tertiary: {
        default: 'transparent',
        hover: Colors['Neutre']['975'],
        disabled: 'transparent',
      },
      /** @deprecated Utiliser light.background['action-high-error'] et light.background['flat-error'] */
      danger: {
        default: 'transparent',
        hover: Colors['RougeErreur']['425'],
        disabled: 'transparent',
      },
    },

    /** @deprecated Utiliser light.background pour les tags */
    tag: {
      /** @deprecated Utiliser light.background['alt-grey'] ou light.background['default-grey'] */
      default: Colors['SlateGrey']['100'],
    },

    /** @deprecated Utiliser light.background (flat-info, flat-success, etc.) pour les badges */
    badge: {
      /** @deprecated Utiliser light.background['flat-info'] */
      info: Colors['LightBlueVivid']['100'],
      /** @deprecated Utiliser light.background['flat-success'] */
      success: Colors['MountainMeadow']['100'],
      /** @deprecated Utiliser light.background['flat-warning'] */
      warning: Colors['Watusi']['100'],
      /** @deprecated Utiliser light.background['flat-error'] */
      error: Colors['Monza']['100'],
      /** @deprecated Pas d'équivalent direct dans light */
      new: Colors['Sunshade']['100'],
      /** @deprecated Utiliser light.background['contrast-grey'] */
      default: Colors['Neutre']['950'],
    },

    /** @deprecated Utiliser light.background['transparent-hover'] ou default-grey-hover */
    nav: {
      link: {
        /** @deprecated Utiliser light.background['default-grey-hover'] */
        hover: Colors['Neutre']['975'],
      },
    },

    /** @deprecated Utiliser light.background et light.border pour le stepper */
    stepper: {
      /** @deprecated Utiliser light.border['plain-grey'] */
      default: Colors['Neutre']['200'],
      /** @deprecated Utiliser light.background['action-low-primary'] ou light.border['default-primary'] */
      current: Colors['LightBlueVivid']['200'],
      /** @deprecated Utiliser light.background['contrast-success'] */
      success: Colors['PinkVivid']['400'],
    },
  },

  /** @deprecated Utiliser light.system */
  system: {
    /** @deprecated Utiliser light.system.focus */
    focus: Colors['Focus']['525'],
  },
} as const;

export type LeafStrings<T> = T extends string ? string : { [K in keyof T]: LeafStrings<T[K]> };

export type Palette = LeafStrings<typeof CustomPalette>;
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
