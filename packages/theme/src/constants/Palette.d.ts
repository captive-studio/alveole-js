export declare const CustomPalette: {
  readonly light: {
    readonly artwork: {
      readonly 'major-primary': '#033B72';
      readonly 'decorative-primary': '#E5F1FE';
      readonly 'minor-secondary': '#DA2275';
    };
    readonly background: {
      readonly 'alt-primary': '#F2F9FF';
      readonly 'alt-grey': '#F6F7F8';
      readonly 'action-low-primary': '#D2E8FE';
      readonly 'contrast-grey': '#EFF1F6';
      readonly 'contrast-success': '#B9FDD5';
      readonly 'contrast-error': '#FDEAE8';
      readonly 'contrast-info': '#E5F1FE';
      readonly 'contrast-warning': '#FFEEE5';
      readonly 'default-grey': '#FFFFFF';
      readonly 'default-grey-hover': '#F6F7F8';
      readonly 'default-grey-active': '#E6EAF1';
      readonly 'active-primary': '#002764';
      readonly 'disabled-grey': '#E6EAF1';
      readonly 'active-inverted': '#FFFFFF';
      readonly 'transparent-hover': 'rgba(0, 0, 0, 0.04)';
      readonly 'action-high-primary': '#002764';
      readonly 'action-high-primary-hover': '#0048AC';
      readonly 'action-high-error': '#C62416';
      readonly 'flat-error': '#C62416';
      readonly 'flat-info': '#0264C7';
      readonly 'flat-success': '#1B7440';
      readonly 'flat-warning': '#BC4401';
      readonly 'open-primary': '#D2E8FE';
    };
    readonly border: {
      readonly 'default-grey': '#DEE3EC';
      readonly 'contrast-grey': '#8D97AC';
      readonly 'default-primary': '#0264C7';
      readonly 'action-high-primary': '#002764';
      readonly 'action-high-grey': '#151617';
      readonly 'active-primary': '#002764';
      readonly 'open-primary': '#D2E8FE';
      readonly 'disabled-grey': '#E6EAF1';
      readonly 'plain-primary': '#002764';
      readonly 'plain-grey': '#373A3F';
      readonly 'plain-success': '#1B7440';
      readonly 'plain-error': '#C62416';
      readonly 'plain-warning': '#BC4401';
      readonly 'plain-info': '#0264C7';
      readonly 'action-low-primary': '#B4D9FE';
    };
    readonly text: {
      readonly 'title-grey': '#151617';
      readonly 'title-primary': '#002764';
      readonly 'default-grey': '#373A3F';
      readonly 'mention-grey': '#5F6571';
      readonly 'label-grey': '#151617';
      readonly 'action-high-primary': '#012B53';
      readonly 'action-high-grey': '#151617';
      readonly 'action-high-info': '#0264C7';
      readonly 'action-high-warning': '#BC4401';
      readonly 'action-high-error': '#C62416';
      readonly 'inverted-grey': '#FFFFFF';
      readonly 'inverted-primary': '#F2F9FF';
      readonly 'active-primary': '#002764';
      readonly 'active-grey': '#151617';
      readonly 'disabled-grey': '#8D97AC';
      readonly 'default-success': '#1B7440';
      readonly 'default-error': '#C62416';
      readonly 'default-warning': '#BC4401';
      readonly 'default-info': '#0264C7';
    };
    readonly system: {
      readonly focus: '#0A76F6';
    };
    readonly illustration: {
      readonly 'color-sun': {
        readonly default: {
          readonly yellow: '#6F5E18';
        };
      };
      readonly 'color-950': {
        readonly default: {
          readonly yellow: '#F9F0CC';
        };
      };
    };
  };
  readonly dark: {
    readonly text: {
      readonly 'default-grey': '#CED5E1';
    };
    readonly background: {
      readonly 'alt-primary': '#011E3A';
      readonly 'contrast-grey': '#232427';
    };
  };
  /** @deprecated Utiliser light.background['action-high-primary'] ou les tokens du thème light selon le contexte */
  readonly primary: '#D9127C';
  /** @deprecated Utiliser 'transparent' en valeur directe ou light.background selon le contexte */
  readonly transparent: 'transparent';
  /** @deprecated Utiliser light.background['action-high-error'] ou light.text['default-error'] */
  readonly danger: '#C62416';
  /** @deprecated Utiliser light.background['flat-info'] ou light.text['default-info'] */
  readonly info: '#1070CA';
  /** @deprecated Utiliser light.background['flat-success'] ou light.text['default-success'] */
  readonly success: '#1C7F54';
  /** @deprecated Utiliser light.background['flat-warning'] ou light.text['default-warning'] */
  readonly warning: '#BA461C';
  /** @deprecated Utiliser light.text['default-info'] */
  readonly link: '#076D8A';
  /** @deprecated Utiliser light.text pour les couleurs de texte */
  readonly text: {
    /** @deprecated Utiliser light.text['default-grey'] */
    readonly 'default-grey': '#373A3F';
    /** @deprecated Utiliser light.text['title-grey'] */
    readonly 'title-grey': '#151617';
    /** @deprecated Utiliser light.text['mention-grey'] */
    readonly mention: '#5F6571';
    /** @deprecated Utiliser light.text['disabled-grey'] */
    readonly 'disabled-grey': '#8D97AC';
    /** @deprecated Utiliser light.text['action-high-primary'] */
    readonly 'action-high-blue-captive': '#012448';
    /** @deprecated Utiliser light.text['action-high-primary'] */
    readonly 'action-high-primary': '#012448';
    /** @deprecated Utiliser light.text['action-high-info'] */
    readonly 'action-high-info': '#0264C7';
    /** @deprecated Utiliser light.text['title-grey'] */
    readonly 'title-blue-captive': '#012448';
    /** @deprecated Utiliser light.text['label-grey'] */
    readonly 'label-grey': '#151617';
    /** @deprecated Utiliser light.text['inverted-primary'] */
    readonly 'inverted-blue-captive': '#FFFFFF';
    /** @deprecated Utiliser light.text['inverted-primary'] */
    readonly 'inverted-primary': '#FFFFFF';
    /** @deprecated Utiliser light.text['default-success'] */
    readonly 'default-success': '#1B7440';
    /** @deprecated Utiliser light.text['default-error'] */
    readonly 'default-error': '#C62416';
    /** @deprecated Utiliser light.text['default-info'] */
    readonly 'default-info': '#31B5DA';
    /** @deprecated Utiliser light.text['action-high-grey'] */
    readonly 'action-high-grey': '#151617';
    /** @deprecated Utiliser light.text (ex: inverted-grey, inverted-primary pour inverse) */
    readonly inverse: {
      /** @deprecated Utiliser light.text['inverted-grey'] */
      readonly base: '#FFFFFF';
      /** @deprecated Utiliser light.text['inverted-grey'] */
      readonly title: '#FFFFFF';
      /** @deprecated Utiliser light.text['disabled-grey'] */
      readonly muted: '#8D97AC';
      /** @deprecated Pas d'équivalent direct dans light ; utiliser light.text selon le contexte */
      readonly accent: '#E4F40E';
    };
    /** @deprecated Utiliser light.text avec les couleurs sémantiques (default-info, default-success, etc.) */
    readonly badge: {
      /** @deprecated Utiliser light.text['default-info'] */
      readonly info: '#0E6398';
      /** @deprecated Utiliser light.text['default-success'] */
      readonly success: '#166645';
      /** @deprecated Utiliser light.text['label-grey'] */
      readonly default: '#323439';
      /** @deprecated Utiliser light.text['default-warning'] */
      readonly warning: '#BA461C';
      /** @deprecated Utiliser light.text['default-error'] */
      readonly error: '#C62416';
      /** @deprecated Pas d'équivalent direct dans light */
      readonly new: '#7F4214';
    };
    /** @deprecated Utiliser light.background (action-high-primary, etc.) pour les boutons */
    readonly button: {
      /** @deprecated Utiliser light.background['action-high-primary'] et light.text['inverted-grey'] */
      readonly primary: {
        readonly default: '#FFFFFF';
        readonly hover: '#FFFFFF';
        readonly disabled: '#8D97AC';
      };
      /** @deprecated Utiliser light.background et light.border pour les boutons secondaires */
      readonly secondary: {
        readonly default: '#151617';
        readonly hover: '#151617';
        readonly disabled: '#8D97AC';
      };
      /** @deprecated Utiliser light.background pour les boutons tertiaires */
      readonly tertiary: {
        readonly default: '#373A3F';
        readonly hover: '#373A3F';
        readonly disabled: '#8D97AC';
      };
      /** @deprecated Utiliser light.background['action-high-error'] pour les boutons danger */
      readonly danger: {
        readonly default: '#AF051A';
        readonly hover: '#FFFFFF';
        readonly disabled: '#8D97AC';
      };
    };
    /** @deprecated Utiliser light.text['default-grey'] ou light.border selon le contexte */
    readonly tag: {
      /** @deprecated Utiliser light.text['default-grey'] */
      readonly default: '#EBF2F4';
    };
    /** @deprecated Utiliser light.text['default-info'] */
    readonly link: {
      /** @deprecated Utiliser light.text['default-info'] */
      readonly default: '#076D8A';
      /** @deprecated Utiliser light.text['default-info'] */
      readonly hover: '#076D8A';
    };
    /** @deprecated Utiliser light.text pour les liens de navigation */
    readonly nav: {
      readonly link: {
        /** @deprecated Utiliser light.text['mention-grey'] */
        readonly default: '#5F6571';
        /** @deprecated Utiliser light.text['title-grey'] ou light.text['active-primary'] */
        readonly current: '#151617';
      };
    };
  };
  /** @deprecated Utiliser light.border pour les couleurs de bordure */
  readonly border: {
    /** @deprecated Utiliser light.border['default-grey'] */
    readonly base: '#8D97AC';
    /** @deprecated Utiliser light.border['default-grey'] */
    readonly 'default-grey': '#DEE3EC';
    /** @deprecated Utiliser light.border['action-high-primary'] */
    readonly action: '#012448';
    /** @deprecated Utiliser light.border['disabled-grey'] */
    readonly 'disabled-grey': '#E6EAF1';
    /** @deprecated Utiliser light.border['plain-grey'] */
    readonly 'plain-grey': '#373A3F';
    /** @deprecated Utiliser light.border['plain-success'] */
    readonly 'plain-success': '#1B7440';
    /** @deprecated Utiliser light.border['plain-error'] */
    readonly 'plain-error': '#C62416';
    /** @deprecated Utiliser light.border['default-primary'] */
    readonly 'default-bleu-captive': '#0379EF';
    /** @deprecated Utiliser light.border['default-primary'] */
    readonly 'default-primary': '#0379EF';
    /** @deprecated Utiliser light.border['contrast-grey'] */
    readonly 'contrast-grey': '#DEE3EC';
    /** @deprecated Utiliser light.border pour les bordures de boutons */
    readonly button: {
      /** @deprecated Utiliser light.border['action-high-grey'] */
      readonly secondary: {
        readonly default: '#373A3F';
        readonly hover: '#373A3F';
        readonly disabled: '#DEE3EC';
      };
      /** @deprecated Utiliser light.border['plain-error'] */
      readonly danger: {
        readonly default: '#8197AA';
        readonly hover: '#AF051A';
        readonly disabled: '#C5D6DC';
      };
    };
    /** @deprecated Utiliser light.background (flat-info, flat-error, etc.) pour les alertes */
    readonly alert: {
      /** @deprecated Utiliser light.background['flat-info'] */
      readonly info: '#1070CA';
      /** @deprecated Utiliser light.background['flat-success'] */
      readonly success: '#1C7F54';
      /** @deprecated Utiliser light.background['flat-warning'] */
      readonly warning: '#BA461C';
      /** @deprecated Utiliser light.background['flat-error'] */
      readonly error: '#C62416';
      /** @deprecated Utiliser light.text['default-info'] */
      readonly link: '#076D8A';
    };
    /** @deprecated Utiliser light.text['default-info'] */
    readonly link: {
      /** @deprecated Utiliser light.text['default-info'] */
      readonly default: '#076D8A';
    };
    /** @deprecated Utiliser light.border['default-grey'] */
    readonly quote: {
      readonly default: '#DEE3EC';
    };
    /** @deprecated Utiliser light.border['open-primary'] */
    readonly nav: {
      readonly link: {
        /** @deprecated Utiliser light.border['open-primary'] */
        readonly active: '#D2E8FE';
      };
    };
  };
  /** @deprecated Utiliser light.background pour les couleurs de fond */
  readonly background: {
    /** @deprecated Utiliser light.background['default-grey'] */
    readonly default: '#FFFFFF';
    /** @deprecated Utiliser light.background['default-grey-active'] */
    readonly 'default-active': '#EFF1F6';
    /** @deprecated Utiliser light.background['alt-grey'] */
    readonly 'alt-grey': '#F6F7F8';
    /** @deprecated Utiliser light.background['active-inverted'] */
    readonly inverse: '#012448';
    /** @deprecated Utiliser light.background['action-high-primary'] */
    readonly action: '#012448';
    /** @deprecated Utiliser light.background['disabled-grey'] */
    readonly 'disabled-grey': '#E6EAF1';
    /** @deprecated Utiliser light.background['default-grey-hover'] */
    readonly 'default-hover': '#F6F7F8';
    /** @deprecated Utiliser light.background['open-primary'] */
    readonly 'open-bleu-captive': '#D2E8FE';
    /** @deprecated Utiliser light.background['open-primary'] */
    readonly 'open-primary': '#D2E8FE';
    /** @deprecated Utiliser light.background['contrast-grey'] */
    readonly 'contrast-grey': '#E6EAF1';
    /** @deprecated Utiliser light.background['alt-primary'] */
    readonly 'alt-bleu-captive': '#F2F9FF';
    /** @deprecated Utiliser light.background['alt-primary'] */
    readonly 'alt-primary': '#F2F9FF';
    /** @deprecated Utiliser light.background['action-low-primary'] */
    readonly 'action-low-primary': '#D2E8FE';
    /** @deprecated Utiliser light.background['contrast-success'] ou flat-success selon le contexte */
    readonly 'default-success': '#87FCB8';
    /** @deprecated Utiliser light.background (flat-error, flat-info, etc.) pour les alertes */
    readonly alert: {
      /** @deprecated Utiliser light.background['flat-info'] */
      readonly info: '#1070CA';
      /** @deprecated Utiliser light.background['flat-success'] */
      readonly success: '#1C7F54';
      /** @deprecated Utiliser light.background['flat-warning'] */
      readonly warning: '#BA461C';
      /** @deprecated Utiliser light.background['flat-error'] */
      readonly error: '#C62416';
    };
    /** @deprecated Utiliser light.background (action-high-primary, action-high-primary-hover, etc.) pour les boutons */
    readonly button: {
      /** @deprecated Utiliser light.background['action-high-primary'] et light.background['action-high-primary-hover'] */
      readonly primary: {
        readonly default: '#D9127C';
        readonly hover: '#BC0A6F';
        readonly disabled: '#E6EBF3';
      };
      /** @deprecated Utiliser light.background (transparent-hover) */
      readonly secondary: {
        readonly default: 'transparent';
        readonly hover: '#F6F7F8';
        readonly disabled: 'transparent';
      };
      /** @deprecated Utiliser light.background (transparent-hover) */
      readonly tertiary: {
        readonly default: 'transparent';
        readonly hover: '#F6F7F8';
        readonly disabled: 'transparent';
      };
      /** @deprecated Utiliser light.background['action-high-error'] et light.background['flat-error'] */
      readonly danger: {
        readonly default: 'transparent';
        readonly hover: '#C62416';
        readonly disabled: 'transparent';
      };
    };
    /** @deprecated Utiliser light.background pour les tags */
    readonly tag: {
      /** @deprecated Utiliser light.background['alt-grey'] ou light.background['default-grey'] */
      readonly default: '#1F242D';
    };
    /** @deprecated Utiliser light.background (flat-info, flat-success, etc.) pour les badges */
    readonly badge: {
      /** @deprecated Utiliser light.background['flat-info'] */
      readonly info: '#D6F3FD';
      /** @deprecated Utiliser light.background['flat-success'] */
      readonly success: '#D7F4E1';
      /** @deprecated Utiliser light.background['flat-warning'] */
      readonly warning: '#FFE9E1';
      /** @deprecated Utiliser light.background['flat-error'] */
      readonly error: '#FFE5E9';
      /** @deprecated Pas d'équivalent direct dans light */
      readonly new: '#FBF2C6';
      /** @deprecated Utiliser light.background['contrast-grey'] */
      readonly default: '#EFF1F6';
    };
    /** @deprecated Utiliser light.background['transparent-hover'] ou default-grey-hover */
    readonly nav: {
      readonly link: {
        /** @deprecated Utiliser light.background['default-grey-hover'] */
        readonly hover: '#F6F7F8';
      };
    };
    /** @deprecated Utiliser light.background et light.border pour le stepper */
    readonly stepper: {
      /** @deprecated Utiliser light.border['plain-grey'] */
      readonly default: '#373A3F';
      /** @deprecated Utiliser light.background['action-low-primary'] ou light.border['default-primary'] */
      readonly current: '#A8E4FA';
      /** @deprecated Utiliser light.background['contrast-success'] */
      readonly success: '#E8368F';
    };
  };
  /** @deprecated Utiliser light.system */
  readonly system: {
    /** @deprecated Utiliser light.system.focus */
    readonly focus: '#0A76F6';
  };
};
export type LeafStrings<T> = T extends string
  ? string
  : {
      [K in keyof T]: LeafStrings<T[K]>;
    };
export type Palette = LeafStrings<typeof CustomPalette>;
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
//# sourceMappingURL=Palette.d.ts.map
