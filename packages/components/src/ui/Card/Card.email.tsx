import { Children, type ReactNode } from 'react';

/** Variante mail de Card : une table, une ligne par enfant. */
export const Card = ({ children }: { children: ReactNode }) => (
  <table className="card" role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
    <tbody>
      {Children.toArray(children).map((child, index) => (
        <tr key={index}>
          <td className="card-cell">{child}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
