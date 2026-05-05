export declare const useStyles: () => {
  container:
    | {
        backgroundColor: '#FFFFFF';
        width: number;
        padding: import('@alveole/theme').Spacing;
        borderRadius: import('packages/theme/src/constants/Radius').Radius;
        display: 'flex';
        flexDirection: 'row';
        gap: import('@alveole/theme').Spacing;
        alignItems: 'flex-start';
      }
    | {
        shadowColor: import('@alveole/theme').Color;
        shadowOffset: {
          width: number;
          height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
        backgroundColor: '#FFFFFF';
        width: number;
        padding: import('@alveole/theme').Spacing;
        borderRadius: import('packages/theme/src/constants/Radius').Radius;
        display: 'flex';
        flexDirection: 'row';
        gap: import('@alveole/theme').Spacing;
        alignItems: 'flex-start';
      }
    | {
        boxShadow: string;
        backgroundColor: '#FFFFFF';
        width: number;
        padding: import('@alveole/theme').Spacing;
        borderRadius: import('packages/theme/src/constants/Radius').Radius;
        display: 'flex';
        flexDirection: 'row';
        gap: import('@alveole/theme').Spacing;
        alignItems: 'flex-start';
      };
  contenu: {
    display: 'flex';
    flex: number;
    flexDirection: 'column';
    gap: import('@alveole/theme').Spacing;
  };
  titleContainer: {
    display: 'flex';
    flexDirection: 'row';
    alignItems: 'center';
    justifyContent: 'space-between';
    minHeight: import('@alveole/theme').Spacing;
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
    fontSize: 14;
    lineHeight: 20;
    letterSpacing: 0;
  };
  icon: {
    paddingTop: import('@alveole/theme').Spacing;
  };
  iconDefault: {
    color: '#373A3F';
  };
  iconInfo: {
    color: '#373A3F';
  };
  iconSuccess: {
    color: '#1B7440';
  };
  iconError: {
    color: '#C62416';
  };
  message: {
    color: '#373A3F';
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
};
//# sourceMappingURL=Toast.styles.d.ts.map
