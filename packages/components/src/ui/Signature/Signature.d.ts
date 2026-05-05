import { BoxProps } from '../../core/Box';
export type SignatureProps = Omit<BoxProps, 'children'> & {
  height: number;
  date?: string | Date;
  dateLabel?: string;
  clearButtonLabel?: string;
  onChange: (value: string | null) => void;
  onBegin?: () => void;
  onEnd?: () => void;
};
export declare const Signature: (props: SignatureProps) => import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=Signature.d.ts.map
