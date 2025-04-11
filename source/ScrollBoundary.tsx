import classNames from 'classnames';
import { FC, HTMLAttributes, ReactNode } from 'react';

export type EdgePosition = 'top' | 'bottom' | 'left' | 'right';

export type TouchHandler = (edge: EdgePosition) => any;

export interface ScrollBoundaryProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<Record<EdgePosition, ReactNode>> {
  onTouch: TouchHandler;
}

const touch =
  (edge: EdgePosition, onTouch: TouchHandler) => (node: HTMLElement | null) => {
    if (!node) return;

    const anchor = node.parentElement?.parentElement;

    const { overflowX, overflowY } = anchor ? getComputedStyle(anchor) : {};

    const root = `${overflowX}${overflowY}`.match(/auto|scroll/)
      ? anchor
      : document;

    new IntersectionObserver(
      ([{ isIntersecting }]) => isIntersecting && onTouch(edge),
      { root },
    ).observe(node);
  };

export const ScrollBoundary: FC<ScrollBoundaryProps> = ({
  className,
  onTouch,
  top,
  left,
  right,
  bottom,
  children,
  ...props
}) => (
  <div className={classNames('position-relative', className)} {...props}>
    <div
      className="position-absolute top-0 left-0 w-100"
      ref={touch('top', onTouch)}
    >
      {top}
    </div>
    <div
      className="position-absolute top-0 left-0 h-100"
      ref={touch('left', onTouch)}
    >
      {left}
    </div>

    {children}

    <div
      className="position-absolute top-0 right-0 h-100"
      ref={touch('right', onTouch)}
    >
      {right}
    </div>
    <div
      className="position-absolute top-100 left-0 w-100"
      ref={touch('bottom', onTouch)}
    >
      {bottom}
    </div>
  </div>
);

ScrollBoundary.displayName = 'ScrollBoundary';
