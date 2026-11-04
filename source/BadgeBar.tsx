import { Badge, CloseButton, ComponentTheme } from 'idea-react';
import { ComponentPropsWithRef, FC } from 'react';
import { sum } from 'web-utility';

export const VariantColors: ComponentTheme[] = [
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

export interface BadgeBarProps extends ComponentPropsWithRef<'ul'> {
  list: BadgeItem[];
  bgResolver?: (text: string) => ComponentTheme | string;
  onCheck?: (item: BadgeItem, index: number) => any;
  onDelete?: (item: BadgeItem, index: number) => any;
}

export const BadgeBar: FC<BadgeBarProps> = ({
  className = '',
  list,
  bgResolver = text2color,
  onCheck,
  onDelete,
  ...props
}) => (
  <ul className={`list-unstyled m-0 d-flex flex-wrap gap-2 ${className}`} {...props}>
    {list.map(({ text, link }, index) => (
      <Badge
        key={text}
        theme={bgResolver(text) as ComponentTheme}
        as="li"
        className="d-flex align-items-center gap-2"
      >
        {link || URL.canParse(text) ? (
          <a className="text-decoration-none fg-white" href={link || text}>
            {text}
          </a>
        ) : onCheck ? (
          <button
            type="button"
            className="bg-transparent border-0 p-0"
            onClick={() => onCheck({ text, link }, index)}
          >
            {text}
          </button>
        ) : (
          text
        )}
        {onDelete && <CloseButton onClick={() => onDelete({ text, link }, index)} />}
      </Badge>
    ))}
  </ul>
);

BadgeBar.displayName = 'BadgeBar';
