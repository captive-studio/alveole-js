type ServerErrorDetails = {
  status?: number;
  url?: string;
  method?: string;
  message?: string;
  exception?: string;
};
type Listener = (details?: ServerErrorDetails) => void;

const listeners = new Set<Listener>();

export function onFinalNetworkError(cb: Listener) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function emitFinalNetworkError(details?: ServerErrorDetails) {
  for (const cb of [...listeners]) {
    try {
      cb(details);
    } catch {}
  }
}
