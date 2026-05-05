export declare const useStyles: () => {
  container: {
    flex: number;
    minHeight: number;
    display: 'flex';
    flexDirection: 'column';
    gap: import('@alveole/theme').Spacing;
  };
  tabs: {
    flex: number;
    minHeight: number;
    flexDirection: 'column';
  };
  tabsList: {
    borderBottomLeftRadius: import('@alveole/theme').Spacing;
    borderBottomRightRadius: import('@alveole/theme').Spacing;
    gap: import('@alveole/theme').Spacing;
    boxSizing: 'border-box';
    borderColor: '#DEE3EC';
    borderBottomWidth: number;
    backgroundColor: 'transparent';
    overflowX: 'scroll';
  };
  tabsTab: {
    appearance: 'none';
    backgroundColor: 'transparent';
    cursor: 'pointer';
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    paddingLeft: number;
    paddingRight: number;
    boxSizing: 'border-box';
    borderWidth: number;
    borderBottomWidth: number;
    borderBottomColor: 'transparent';
    display: 'flex';
    alignItems: 'center';
    gap: import('@alveole/theme').Spacing;
  };
  tabsTabActive: {
    borderBottomColor: '#0264C7';
    borderBottomWidth: number;
  };
  tabsCounter: {
    fontFamily:
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
    fontSize: 12;
    lineHeight: 20;
    letterSpacing: 0;
    paddingRight: import('@alveole/theme').Spacing;
    paddingLeft: import('@alveole/theme').Spacing;
    backgroundColor: '#E6EAF1';
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
  };
  tabsCounterActive: {};
  wrapperHover: {
    display: 'flex';
    flexDirection: 'row';
    alignItems: 'center';
    backgroundColor: 'rgba(0, 0, 0, 0.04)';
  };
  wrapper: {
    display: 'flex';
    flexDirection: 'row';
    alignItems: 'center';
    transitionProperty: 'all';
    transitionDuration: '0.1s';
    transitionTimingFunction: 'ease-in-out';
    gap: import('@alveole/theme').Spacing;
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
    paddingLeft: import('@alveole/theme').Spacing;
    paddingRight: import('@alveole/theme').Spacing;
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
  };
  tabIcon: {
    color: '#5F6571';
  };
  tabIconHover: {
    color: '#373A3F';
  };
  tabsLabel: {
    fontFamily:
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
    fontSize: 14;
    lineHeight: 20;
    letterSpacing: 0;
  };
  tabsLabelActive: {
    fontFamily:
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
    fontSize: 14;
    lineHeight: 20;
    letterSpacing: 0;
  };
  tabsContent: {
    flex: number;
    minHeight: number;
    overflow: 'hidden';
  };
};
//# sourceMappingURL=Tabs.styles.d.ts.map
