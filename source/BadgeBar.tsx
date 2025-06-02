import { FC } from 'react';
import { Badge, BadgeProps, CloseButton } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { sum } from 'web-utility';

export const VariantColors: Variant[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
];

export const text2color = (raw: string) =>
  VariantColors[sum(...Array.from(raw, char => char.charCodeAt(0))) % VariantColors.length];

export interface BadgeItem {
  text: string;
  link?: string;
}

export interface BadgeBarProps extends BadgeProps {
  list: BadgeItem[];
  bgResolver?: (text: string) => Variant | string;
  onDelete?: (item: BadgeItem, index: number) => any;
}

export const BadgeBar: FC<BadgeBarProps> = ({
  className = '',
  list,
  bgResolver = text2color,
  onDelete,
  ...props
}) => (
  <ul className={`list-unstyled m-0 d-flex flex-wrap gap-2 ${className}`} {...props}>
    {list.map(({ text, link }, index) => (
      <Badge
        key={text}
        bg={bgResolver(text)}
        text="white"
        as="li"
        className="d-flex align-items-center gap-2"
      >
        {link || URL.canParse(text) ? (
          <a className="text-decoration-none text-white" href={link || text}>
            {text}
          </a>
        ) : (
          text
        )}
        {onDelete && <CloseButton onClick={() => onDelete({ text, link }, index)} />}
      </Badge>
    ))}
  </ul>
);

BadgeBar.displayName = 'BadgeBar';
