import { Colors } from './Color';

export const CustomPalette = {
  primary: Colors['PinkVivid']['500'],
  transparent: 'transparent',
  danger: Colors['RougeErreur']['425'],
  info: Colors['Mariner']['600'],
  success: Colors['MountainMeadow']['600'],
  warning: Colors['Watusi']['700'],
  link: Colors['BleuCiel']['425'],

  text: {
    'default-grey': Colors['Neutre']['200'],
    'title-grey': Colors['Neutre']['50'],
    mention: Colors['Neutre']['425'],
    'disabled-grey': Colors['Neutre']['625'],
    /** @deprecated Utiliser action-high-primary */
    'action-high-blue-captive': Colors['BleuCaptive']['100'],
    'action-high-primary': Colors['BleuCaptive']['100'],
    'action-high-info': Colors['BleuCaptive']['425'],
    /** @deprecated Utiliser 'title-grey' */
    'title-blue-captive': Colors['BleuCaptive']['100'],
    'label-grey': Colors['Neutre']['50'],
    /** @deprecated Utiliser 'inverted-primary' */
    'inverted-blue-captive': Colors['Neutre']['1000'],
    'inverted-primary': Colors['Neutre']['1000'],
    'default-success': Colors['VertSuccess']['425'],
    'default-error': Colors['RougeErreur']['425'],
    'default-info': Colors['BleuCiel']['main-686'],
    'action-high-grey': Colors['Neutre']['50'],

    inverse: {
      base: Colors['Neutre']['1000'],
      title: Colors['Neutre']['1000'],
      muted: Colors['Neutre']['625'],
      accent: Colors['GoldenFizz']['400'],
    },

    badge: {
      info: Colors['LightBlueVivid']['700'],
      success: Colors['MountainMeadow']['700'],
      default: Colors['Neutre']['175'],
      warning: Colors['Watusi']['700'],
      error: Colors['RougeErreur']['425'],
      new: Colors['Sunshade']['800'],
    },

    button: {
      primary: {
        default: Colors['Neutre']['1000'],
        hover: Colors['Neutre']['1000'],
        disabled: Colors['Neutre']['625'],
      },
      secondary: {
        default: Colors['Neutre']['50'],
        hover: Colors['Neutre']['50'],
        disabled: Colors['Neutre']['625'],
      },
      tertiary: {
        default: Colors['Neutre']['200'],
        hover: Colors['Neutre']['200'],
        disabled: Colors['Neutre']['625'],
      },
      danger: {
        default: Colors['Monza']['800'],
        hover: Colors['Neutre']['1000'],
        disabled: Colors['Neutre']['625'],
      },
    },

    tag: {
      default: Colors['SlateGrey']['950'],
    },

    link: {
      default: Colors['BleuCiel']['425'],
      hover: Colors['BleuCiel']['425'],
    },

    nav: {
      link: {
        default: Colors['Neutre']['425'],
        current: Colors['Neutre']['50'],
      },
    },
  },

  border: {
    base: Colors['Neutre']['625'],
    'default-grey': Colors['Neutre']['900'],
    action: Colors['BleuCaptive']['100'],
    'disabled-grey': Colors['Neutre']['925'],
    'plain-grey': Colors['Neutre']['200'],
    'plain-success': Colors['VertSuccess']['425'],
    'plain-error': Colors['RougeErreur']['425'],
    /** @deprecated Utiliser 'default-primary' */
    'default-bleu-captive': Colors['BleuCaptive']['main-525'],
    'default-primary': Colors['BleuCaptive']['main-525'],
    'contrast-grey': Colors['Neutre']['900'],

    button: {
      secondary: {
        default: Colors['Neutre']['200'],
        hover: Colors['Neutre']['200'],
        disabled: Colors['Neutre']['900'],
      },
      danger: {
        default: Colors['SlateGrey']['600'],
        hover: Colors['Monza']['800'],
        disabled: Colors['SlateGrey']['300'],
      },
    },

    alert: {
      info: Colors['Mariner']['600'],
      success: Colors['MountainMeadow']['600'],
      warning: Colors['Watusi']['700'],
      error: Colors['RougeErreur']['425'],
      link: Colors['BleuCiel']['425'],
    },

    link: {
      default: Colors['BleuCiel']['425'],
    },

    quote: {
      default: Colors['Neutre']['900'],
    },

    nav: {
      link: {
        active: Colors['BleuCaptive']['925'],
      },
    },
  },

  background: {
    default: Colors['Neutre']['1000'],
    'default-active': Colors['Neutre']['950'],
    'alt-grey': Colors['Neutre']['975'],
    inverse: Colors['BleuCaptive']['100'],
    action: Colors['BleuCaptive']['100'],
    'disabled-grey': Colors['Neutre']['925'],
    'default-hover': Colors['Neutre']['975'],
    /** @deprecated Utiliser 'open-primary' */
    'open-bleu-captive': Colors['BleuCaptive']['925'],
    'open-primary': Colors['BleuCaptive']['925'],
    'contrast-grey': Colors['Neutre']['925'],
    /** @deprecated Utiliser 'alt-primary' */
    'alt-bleu-captive': Colors['BleuCaptive']['975'],
    'alt-primary': Colors['BleuCaptive']['975'],
    'action-low-primary': Colors['BleuCaptive']['925'],
    'default-success': Colors['VertSuccess']['925'],

    alert: {
      info: Colors['Mariner']['600'],
      success: Colors['MountainMeadow']['600'],
      warning: Colors['Watusi']['700'],
      error: Colors['RougeErreur']['425'],
    },

    button: {
      primary: {
        default: Colors['PinkVivid']['500'],
        hover: Colors['PinkVivid']['600'],
        disabled: Colors['GrisPolaire']['100'],
      },
      secondary: {
        default: 'transparent',
        hover: Colors['Neutre']['975'],
        disabled: 'transparent',
      },
      tertiary: {
        default: 'transparent',
        hover: Colors['Neutre']['975'],
        disabled: 'transparent',
      },
      danger: {
        default: 'transparent',
        hover: Colors['RougeErreur']['425'],
        disabled: 'transparent',
      },
    },

    tag: {
      default: Colors['SlateGrey']['100'],
    },

    badge: {
      info: Colors['LightBlueVivid']['100'],
      success: Colors['MountainMeadow']['100'],
      warning: Colors['Watusi']['100'],
      error: Colors['Monza']['100'],
      new: Colors['Sunshade']['100'],
      default: Colors['Neutre']['950'],
    },

    nav: {
      link: {
        hover: Colors['Neutre']['975'],
      },
    },

    stepper: {
      default: Colors['Neutre']['200'],
      current: Colors['LightBlueVivid']['200'],
      success: Colors['PinkVivid']['400'],
    },
  },

  system: {
    focus: '#0A76F6',
  },
} as const;

export type LeafStrings<T> = T extends string ? string : { [K in keyof T]: LeafStrings<T[K]> };

export type Palette = LeafStrings<typeof CustomPalette>;
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
