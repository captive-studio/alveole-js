export declare const useStyles: () => {
  container: {
    borderTopLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderTopRightRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomRightRadius: import('packages/theme/src/constants/Radius').Radius;
    display: 'flex';
    flexDirection: 'row';
    justifyContent: 'center';
    alignItems: 'center';
    gap: import('@alveole/theme').Spacing;
    marginTop: string;
    marginBottom: string;
    transitionProperty: 'all';
    transitionDuration: '150ms';
    transitionTimingFunction: 'ease';
  };
  buttonLoader: {
    position: 'absolute';
    right: import('@alveole/theme').Spacing;
  };
  title: {
    cursor: 'pointer';
    minWidth: import('@alveole/theme').Spacing;
    textAlign: 'center';
  };
  primaryTitle: {
    color: '#F2F9FF';
  };
  primaryContainer: {
    backgroundColor: '#002764';
  };
  primaryTitleHover: {
    color: '#F2F9FF';
  };
  primaryContainerHover: {
    backgroundColor: '#0048AC';
  };
  primaryContainerPressed: {
    backgroundColor: '#0048AC';
  };
  secondaryTitle: {
    color: '#151617';
  };
  secondaryContainer: {
    borderStyle: 'solid';
    borderWidth: number;
    borderColor: '#DEE3EC';
    backgroundColor: '#FFFFFF';
  };
  secondaryTitleHover: {
    color: '#151617';
  };
  secondaryContainerHover: {
    borderColor: '#DEE3EC';
    backgroundColor: 'rgba(0, 0, 0, 0.04)';
  };
  secondaryContainerPressed: {
    borderColor: '#DEE3EC';
    backgroundColor: 'rgba(0, 0, 0, 0.04)';
  };
  tertiaryTitle: {
    color: '#151617';
  };
  tertiaryContainer: {};
  tertiaryTitleHover: {
    color: '#151617';
  };
  tertiaryContainerHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)';
  };
  tertiaryContainerPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)';
  };
  dangerTitle: {
    color: '#FFFFFF';
  };
  dangerContainer: {
    borderStyle: 'solid';
    borderWidth: number;
    borderColor: '#C62416';
    backgroundColor: '#C62416';
  };
  dangerTitleHover: {
    color: '#C62416';
  };
  dangerContainerHover: {
    borderColor: '#DEE3EC';
    backgroundColor: '#FFFFFF';
  };
  dangerContainerPressed: {
    backgroundColor: `rgba${string}`;
  };
  dangerTitlePressed: {
    color: '#FFFFFF';
  };
  linkTitle: {
    color: '#076D8A';
  };
  linkContainer: {
    backgroundColor: 'transparent';
  };
  linkTitleHover: {
    color: '#076D8A';
  };
  linkContainerHover: {
    backgroundColor: 'transparent';
  };
  linkContainerPressed: {
    backgroundColor: 'transparent';
  };
  selectedContainer: {
    backgroundColor: '#F2F9FF';
    borderColor: '#0264C7';
    borderWidth: number;
  };
  selectedContainerHover: {};
  selectedTitle: {
    color: '#012B53';
  };
  selectedIcon: {
    color: '#012B53';
  };
  xsContainer: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    borderTopLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderTopRightRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomRightRadius: import('packages/theme/src/constants/Radius').Radius;
  };
  smContainer: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    borderTopLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderTopRightRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomRightRadius: import('packages/theme/src/constants/Radius').Radius;
  };
  mdContainer: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: number;
    paddingBottom: number;
  };
  lgContainer: {
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
  };
  smContainerIconOnly: {
    padding: import('@alveole/theme').Spacing;
  };
  mdContainerIconOnly: {
    padding: import('@alveole/theme').Spacing;
  };
  lgContainerIconOnly: {
    padding: import('@alveole/theme').Spacing;
  };
  xsTitle: {
    readonly fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    readonly fontSize: 12;
    readonly lineHeight: 20;
    readonly letterSpacing: 0;
  };
  smTitle: {
    readonly fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    readonly fontSize: 14;
    readonly lineHeight: 20;
    readonly letterSpacing: 0;
  };
  mdTitle: {
    readonly fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    readonly fontSize: 14;
    readonly lineHeight: 20;
    readonly letterSpacing: 0;
  };
  lgTitle: {
    readonly fontFamily:
      | 'Barlow-Light'
      | 'Barlow-Regular'
      | 'Barlow-Medium'
      | 'Barlow-SemiBold'
      | 'Barlow-Bold'
      | 'Inter-Light'
      | 'Inter-Regular'
      | 'Inter-Medium'
      | 'Inter-SemiBold'
      | 'Inter-Bold';
    readonly fontSize: 16;
    readonly lineHeight: 24;
    readonly letterSpacing: 0;
  };
  smContainerStartIcon: {
    paddingLeft: import('@alveole/theme').Spacing;
  };
  mdContainerStartIcon: {
    paddingLeft: import('@alveole/theme').Spacing;
  };
  lgContainerStartIcon: {
    paddingLeft: import('@alveole/theme').Spacing;
  };
  smContainerEndIcon: {
    paddingRight: import('@alveole/theme').Spacing;
  };
  mdContainerEndIcon: {
    paddingRight: import('@alveole/theme').Spacing;
  };
  lgContainerEndIcon: {
    paddingRight: import('@alveole/theme').Spacing;
  };
  primaryTitleDisabled: {
    cursor: 'not-allowed';
    color: '#8D97AC';
  };
  primaryContainerDisabled: {
    cursor: 'not-allowed';
    backgroundColor: '#E6EAF1';
  };
  secondaryTitleDisabled: {
    cursor: 'not-allowed';
    color: '#8D97AC';
  };
  secondaryContainerDisabled: {
    cursor: 'not-allowed';
    borderColor: '#E6EAF1';
  };
  tertiaryTitleDisabled: {
    cursor: 'not-allowed';
    color: '#8D97AC';
  };
  tertiaryContainerDisabled: {
    cursor: 'not-allowed';
  };
  dangerTitleDisabled: {
    cursor: 'not-allowed';
    color: '#8D97AC';
  };
  dangerContainerDisabled: {
    cursor: 'not-allowed';
    backgroundColor: '#FFFFFF';
    borderColor: '#E6EAF1';
  };
  primaryIcon: {
    color: '#F2F9FF';
  };
  primaryIconHover: {
    color: '#F2F9FF';
  };
  primaryIconDisabled: {
    color: '#8D97AC';
  };
  secondaryIcon: {
    color: '#151617';
  };
  secondaryIconHover: {
    color: '#151617';
  };
  secondaryIconDisabled: {
    color: '#8D97AC';
  };
  tertiaryIcon: {
    color: '#151617';
  };
  tertiaryIconHover: {
    color: '#151617';
  };
  tertiaryIconDisabled: {
    color: '#8D97AC';
  };
  dangerIcon: {
    color: '#F2F9FF';
  };
  dangerIconHover: {
    color: '#C62416';
  };
  dangerIconDisabled: {
    color: '#8D97AC';
  };
  linkIcon: {
    color: '#076D8A';
  };
};
//# sourceMappingURL=Button.styles.d.ts.map
