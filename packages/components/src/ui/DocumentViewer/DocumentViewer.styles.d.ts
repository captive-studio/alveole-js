export declare const useStyles: () => {
  toolbar: {
    padding: import('@alveole/theme').Spacing;
    borderColor: '#DEE3EC';
    borderWidth: number;
    borderStyle: 'solid';
    borderTopLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderTopRightRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#F6F7F8';
    display: 'flex';
    flexDirection: 'row';
    gap: import('@alveole/theme').Spacing;
    justifyContent: 'space-between';
  };
  toolbarAction: {
    display: 'flex';
    flexDirection: 'row';
    gap: import('@alveole/theme').Spacing;
    justifyContent: 'flex-end';
  };
  toolbarTitle: {
    color: '#373A3F';
    paddingLeft: import('@alveole/theme').Spacing;
    marginTop: string;
    marginBottom: string;
    userSelect: 'none';
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
    fontSize: 16;
    lineHeight: 24;
    letterSpacing: 0;
  };
  toolbarState: {
    color: '#5F6571';
    userSelect: 'none';
    fontVariant: 'tabular-nums'[];
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
  toolbarDivider: {
    width: number;
    height: '50%';
    backgroundColor: '#DEE3EC';
    marginTop: string;
    marginBottom: string;
  };
  viewerWrapper: {
    display: 'flex';
    flexDirection: 'row';
    height: '100%';
  };
  viewerContainer: {
    display: 'flex';
    flexDirection: 'column';
    flex: number;
    padding: import('@alveole/theme').Spacing;
    borderColor: '#DEE3EC';
    borderWidth: number;
    borderStyle: 'solid';
    borderTopWidth: number;
    borderBottomLeftRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomRightRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#FFFFFF';
    overflow: 'hidden';
  };
  children: {
    display: 'flex';
    flexDirection: 'column';
    height: '100%';
    width: '60%' | '40%';
    maxWidth: string;
    minWidth: number;
    flexShrink: number;
    borderColor: '#DEE3EC';
    borderWidth: number;
    borderStyle: 'solid';
    borderLeft: number;
    borderTopRightRadius: import('packages/theme/src/constants/Radius').Radius;
    borderBottomRightRadius: import('packages/theme/src/constants/Radius').Radius;
    backgroundColor: '#FFFFFF';
    overflow: 'auto';
  };
  viewerImageContent: {
    display: 'flex';
    flexDirection: 'row';
    justifyContent: 'center';
    alignItems: 'center';
    overflow: 'hidden';
    cursor: 'crosshair';
    userSelect: 'none';
  };
  viewerImageZoomLayer: {
    width: '100%';
    height: '100%';
    transitionProperty: 'transform';
    transitionDuration: '120ms';
    transitionTimingFunction: 'ease-out';
    transitionDelay: '0ms';
  };
  viewerPdfContent: {
    display: 'flex';
    flexDirection: 'row';
    justifyContent: 'center';
    alignItems: 'center';
    overflow: 'hidden';
    cursor: 'crosshair';
    userSelect: 'none';
  };
  viewerPdfStage: {
    position: 'relative';
    display: 'flex';
    flexDirection: 'row';
    justifyContent: 'center';
    alignItems: 'center';
    overflow: 'hidden';
    width: '100%';
    height: '100%';
  };
  viewerPdfCanvasWrapper: {
    display: 'flex';
    justifyContent: 'center';
    alignItems: 'center';
    transitionProperty: 'transform';
    transitionDuration: '120ms';
    transitionTimingFunction: 'ease-out';
    transitionDelay: '0ms';
  };
  viewerPdfCanvas: {
    display: 'block';
    maxWidth: string;
  };
  viewerPdfOverlay: {
    position: 'absolute';
    inset: number;
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
    backgroundColor: '#FFFFFF';
  };
};
//# sourceMappingURL=DocumentViewer.styles.d.ts.map
