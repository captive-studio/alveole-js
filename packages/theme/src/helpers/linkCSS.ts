import { LINK_ATTRIBUTE } from '../constants/Link';

export const generateLinkCSS = (): string => `[${LINK_ATTRIBUTE}] { text-underline-offset: 0.2em; }`;
