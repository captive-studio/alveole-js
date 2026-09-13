import { Typography } from '../../core/Typography';
import { useStyles } from './Counter.styles';

export type CounterProps = {
  variant: 'default' | 'primary';
  count: number;
};

export const Counter = (props: CounterProps) => {
  const { variant, count } = props;
  const styles = useStyles();

  return (
    <Typography
      tag="counter"
      style={{
        ...styles.counter,
        ...(variant === 'primary' ? styles.counterPrimary : {}),
      }}
    >
      {count}
    </Typography>
  );
};
