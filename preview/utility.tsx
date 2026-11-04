import { Card, CodeBlock } from 'idea-react';
import { ComponentPropsWithRef, FC, PropsWithChildren } from 'react';

export const CodeExample: FC<PropsWithChildren> = ({ children }) => (
  <>
    {children}

    <Card className="my-3" body>
      <CodeBlock language="tsx">{children}</CodeBlock>
    </Card>
  </>
);

export const Section: FC<ComponentPropsWithRef<'section'>> = ({
  className = '',
  title,
  children,
  ...props
}) => (
  <section className={`border bg-white mt-3 p-3 ${className}`} {...props}>
    <h2 className="h3" id={title}>
      {title}
    </h2>

    {children}
  </section>
);
