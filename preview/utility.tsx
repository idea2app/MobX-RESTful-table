import { CodeBlock } from 'idea-react';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { Card } from 'react-bootstrap';

export const CodeExample: FC<PropsWithChildren> = ({ children }) => (
  <>
    {children}

    <Card className="my-3" body>
      <CodeBlock language="tsx">{children}</CodeBlock>
    </Card>
  </>
);

export const Section: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  title,
  children,
}) => (
  <section className={`border bg-white mt-3 p-3 ${className}`}>
    <h2 className="h3" id={title}>
      {title}
    </h2>

    {children}
  </section>
);
