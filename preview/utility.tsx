import { Card, CardBody, CodeBlock } from 'idea-react';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const CodeExample: FC<PropsWithChildren> = ({ children }) => (
  <>
    {children}

    <Card className="my-3">
      <CardBody>
        <CodeBlock language="tsx">{children}</CodeBlock>
      </CardBody>
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
