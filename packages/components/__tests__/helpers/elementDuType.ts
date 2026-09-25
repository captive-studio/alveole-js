/**
 * Rend l'element sous le type attendu, ou echoue en le nommant. Remplace les casts
 * `as HTMLElement` des tests : un `null` ou un element d'un autre type y passait sans bruit.
 */
export const elementDuType = <T extends Element>(element: unknown, Type: new () => T): T => {
  if (!(element instanceof Type)) throw new Error(`Element attendu de type ${Type.name}, recu : ${String(element)}`);

  return element;
};
