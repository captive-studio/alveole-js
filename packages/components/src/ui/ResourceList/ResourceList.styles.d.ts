export declare const useStyles: () => {
  list: {
    display: 'flex';
    flexDirection: 'column';
    gap: import('@alveole/theme').Spacing;
  };
  entete: {
    paddingTop: import('@alveole/theme').Spacing;
    paddingBottom: import('@alveole/theme').Spacing;
  };
  enteteTitle: {
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
    fontSize: 14;
    lineHeight: 20;
    letterSpacing: 0;
  };
  items: {
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
  };
  itemsWithWhiteBackground: {
    backgroundColor: '#FFFFFF';
  };
  withBorder: {
    borderWidth: number;
    borderColor: '#DEE3EC';
    borderLeftWidth: number;
    borderRightWidth: number;
  };
  noBorder: {
    borderWidth: number;
    borderLeftWidth: number;
    borderRightWidth: number;
  };
  loader: {
    flex: number;
    justifyContent: 'center';
    alignItems: 'center';
    padding: import('@alveole/theme').Spacing;
  };
};
//# sourceMappingURL=ResourceList.styles.d.ts.map
