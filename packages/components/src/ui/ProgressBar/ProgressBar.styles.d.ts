export declare const useStyles: () => {
  determinate: {
    width: '100%';
    flexDirection: 'row';
    alignItems: 'center';
  };
  progressTrack: {
    width: '100%';
    overflow: 'hidden';
    position: 'relative';
  };
  progressed: {
    height: '100%';
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#D2E8FE';
  };
  progressedAbsolute: {
    position: 'absolute';
    top: number;
    bottom: number;
    left: number;
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#D2E8FE';
  };
  remaining: {
    height: '100%';
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#DEE3EC';
  };
  remainingAbsolute: {
    position: 'absolute';
    top: number;
    bottom: number;
    right: number;
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#DEE3EC';
  };
  progress: {
    backgroundColor: '#D2E8FE';
    width: '100%';
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    overflow: 'hidden';
  };
  bar: {
    position: 'absolute';
    top: number;
    bottom: number;
    width: '100%';
    borderRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#DEE3EC';
  };
  indicator: {
    color: '#033B72';
    marginTop: import('@alveole/theme').Spacing;
    marginLeft: string;
    marginRight: string;
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
  };
};
//# sourceMappingURL=ProgressBar.styles.d.ts.map
