import { useEffect } from 'react';

const STYLE_ID = 'alveole-chat-widget-motion';

/* Ouverture : le panneau se révèle en cercle depuis le lanceur, puis son contenu arrive en cascade.
   La fermeture reste instantanée : on ne fait pas attendre quelqu'un qui part. */
export const CHAT_MOTION_CSS = `
.alveole-chat-unread typography:first-child { font-weight: var(--typography-corps-de-texte-sm-bold-font-weight) !important; }
.alveole-chat-item typography:first-child {
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; overflow-wrap: anywhere;
}
.alveole-chat-bubble::before {
  content: ''; position: absolute; bottom: 0; width: 14px; height: 18px; background: inherit;
  clip-path: path('M 8 0 C 8 8 6 14 0 18 C 8 18 14 15 14 10 L 14 0 Z'); pointer-events: none;
}
.alveole-chat-bubble-operator::before { left: -6px; }
.alveole-chat-bubble-client::before { right: -6px; transform: scaleX(-1); }
.alveole-chat-composer form-control-text-input-inner { border: 0 !important; box-shadow: none !important; background: transparent !important; }
.alveole-chat-composer textarea { height: 56px !important; min-height: 56px !important; padding: 6px 8px !important; }
.alveole-chat-new-action::before {
  content: ''; position: absolute; inset: -24px 16px 0 0; z-index: -1; pointer-events: none;
  background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--background-default-grey) 65%, transparent) 80%);
  -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 40%); mask-image: linear-gradient(to bottom, transparent, black 40%);
}
.alveole-chat-text { min-width: 0; max-width: 100%; white-space: pre-wrap; overflow-wrap: anywhere; }

.alveole-chat-panel {
  --alveole-chat-ease: cubic-bezier(.16, 1, .3, 1);
  --alveole-chat-origin: calc(100% - 26px) calc(100% + 40px);
  animation: alveole-chat-reveal .75s var(--alveole-chat-ease) both;
}
@keyframes alveole-chat-reveal {
  from { clip-path: circle(0 at var(--alveole-chat-origin)); }
  to { clip-path: circle(150% at var(--alveole-chat-origin)); }
}
.alveole-chat-aurora {
  position: absolute; inset: -40% -20% auto; height: 260px; z-index: 0;
  background:
    radial-gradient(closest-side at 30% 60%, rgba(147, 134, 197, .45), transparent 70%),
    radial-gradient(closest-side at 75% 40%, rgba(159, 216, 180, .3), transparent 70%);
  filter: blur(20px);
  animation: alveole-chat-aurora-in 1.2s var(--alveole-chat-ease) .15s both, alveole-chat-aurora-drift 9s ease-in-out 1.35s infinite alternate;
}
.alveole-chat-panel > :not(.alveole-chat-aurora) { z-index: 1; }
@keyframes alveole-chat-aurora-in { from { opacity: 0; transform: translateY(-30px) scale(.9); } to { opacity: .7; transform: none; } }
@keyframes alveole-chat-aurora-drift { from { opacity: .7; transform: none; } to { opacity: .7; transform: translate(-24px, 8px) scale(1.05); } }

.alveole-chat-header, .alveole-chat-cascade > * { animation: alveole-chat-rise .7s var(--alveole-chat-ease) both; }
.alveole-chat-header { animation-delay: .2s; }
.alveole-chat-cascade > :nth-child(1) { animation-delay: .3s; }
.alveole-chat-cascade > :nth-child(2) { animation-delay: .4s; }
.alveole-chat-cascade > :nth-child(3) { animation-delay: .5s; }
.alveole-chat-cascade > :nth-child(4) { animation-delay: .58s; }
@keyframes alveole-chat-rise { from { opacity: 0; transform: translateY(14px); filter: blur(6px); } to { opacity: 1; transform: none; filter: none; } }

/* Lanceur : il respire au repos, l'icône pivote en changeant, une onde part à l'ouverture. */
.alveole-chat-launcher svg { animation: alveole-chat-icon .45s cubic-bezier(.34, 1.56, .64, 1); }
@keyframes alveole-chat-icon { from { opacity: 0; transform: rotate(-90deg) scale(.4); } to { opacity: 1; transform: none; } }
.alveole-chat-launcher::after {
  content: ''; position: absolute; top: 0; left: 0; width: 52px; height: 52px; border-radius: 50%; pointer-events: none;
  animation: alveole-chat-breathe 3.2s ease-out infinite;
}
.alveole-chat-launcher-open::after { border: 2px solid rgba(147, 134, 197, .8); animation: alveole-chat-ripple .7s cubic-bezier(.16, 1, .3, 1) both; }
@keyframes alveole-chat-breathe { 0% { box-shadow: 0 0 0 0 rgba(147, 134, 197, .55); } 70%, 100% { box-shadow: 0 0 0 14px rgba(147, 134, 197, 0); } }
@keyframes alveole-chat-ripple { from { opacity: .9; transform: scale(1); } to { opacity: 0; transform: scale(6); } }

@media (prefers-reduced-motion: reduce) {
  .alveole-chat-panel, .alveole-chat-aurora, .alveole-chat-header, .alveole-chat-cascade > *,
  .alveole-chat-launcher svg, .alveole-chat-launcher::after { animation: none !important; }
  .alveole-chat-aurora { opacity: .7; }
}
`;

/** Injecte une seule fois la feuille du widget côté web ; sans effet en natif. */
export function useChatMotion() {
  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CHAT_MOTION_CSS;
    document.head.appendChild(style);
  }, []);
}
