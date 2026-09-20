import { FOCUS_ATTRIBUTE, useTheme } from '@alveole/theme';
import { useState } from 'react';
import { LucideIcon } from '../../ui/LucideIcon';
import { Typography } from '../Typography';
import type { AnchorHeadingProps } from './AnchorHeading';
import { toSlug } from './slug';

export const AnchorHeading = ({ children, style, scrollMarginTop }: AnchorHeadingProps) => {
  const { color } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  // L'ancre est masquee hors survol : sans ca, la tabulation s'arrete sur un lien invisible.
  // Un state convient ici, contrairement a la bague : montrer le lien quelle que soit la
  // provenance du focus est inoffensif, l'afficher est precisement ce qu'on veut.
  const [focused, setFocused] = useState(false);
  const slug = toSlug(children);

  return (
    <div
      id={slug}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        ...(scrollMarginTop != null ? { scrollMarginTop } : null),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Typography style={style}>{children}</Typography>

      <a
        href={`#${slug}`}
        aria-label={`Lien vers la section ${children}`}
        {...{ [FOCUS_ATTRIBUTE]: 'ring' }}
        style={{
          opacity: hovered || focused ? 1 : 0,
          transition: 'opacity 0.15s',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <LucideIcon
          name="Link"
          size="sm"
          color={iconHovered ? color.light.system.focus : color.light.text['default-grey']}
        />
      </a>
    </div>
  );
};
