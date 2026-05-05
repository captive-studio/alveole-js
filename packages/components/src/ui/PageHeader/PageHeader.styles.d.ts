export declare const useStyles: () => {
  container: {
    display: 'flex';
    flexDirection: 'column';
    gap: import('@alveole/theme').Spacing;
  };
  row: {
    display: 'flex';
    flexDirection: 'row';
    justifyContent: 'space-between';
    alignItems: 'center';
    gap: import('@alveole/theme').Spacing;
  };
  title: {
    color: '#151617';
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
    fontSize: 28 | 32;
    lineHeight: 36 | 32;
    letterSpacing: 0;
  };
  actions: {
    display: 'flex';
    flexDirection: 'row';
    alignItems: 'center';
    gap: import('@alveole/theme').Spacing;
    flexShrink: number;
  };
};
//# sourceMappingURL=PageHeader.styles.d.ts.map
