import classNames from 'classnames';
import { FC, ReactNode } from 'react';

export type EdgePosition = 'top' | 'bottom' | 'left' | 'right';

export type TouchHandler = (edge: EdgePosition) => any;

export interface ScrollBoundaryProps
  extends Partial<Record<EdgePosition, ReactNode>> {
  className?: string;
  onTouch: TouchHandler;
}

function touch(edge: EdgePosition, onTouch: TouchHandler) {
  return (node: HTMLElement | null) =>
    node &&
    new IntersectionObserver(
      ([{ isIntersecting }]) => isIntersecting && onTouch(edge),
    ).observe(node);
}

export const ScrollBoundary: FC<ScrollBoundaryProps> = ({
  className,
  onTouch,
  top,
  left,
  right,
  bottom,
  children,
}) => (
  <div className={classNames('position-relative', className)}>
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
