import { useTheme } from '@alveole/theme';
import { useState } from 'react';
import { LucideIcon } from '../../ui/LucideIcon';
import { Typography } from '../Typography';
import type { AnchorHeadingProps } from './AnchorHeading';

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

export const AnchorHeading = ({ children, style, scrollMarginTop }: AnchorHeadingProps) => {
  const { color } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
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
        style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={() => setIconHovered(true)}
        onMouseLeave={() => setIconHovered(false)}
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
