import { FC } from 'react';

import { BadgeInput, SearchableInput } from '../source';
import { i18n, topicStore } from './model';
import { CodeExample, Section } from './utility';

export const Content: FC = () => (
  <>
    <h1>MobX RESTful table examples</h1>

    <Section title="Badge Input">
      <CodeExample>
        <BadgeInput
          placeholder="type some words, then press Enter key to add it"
          onChange={console.log}
        />
      </CodeExample>
    </Section>

    <Section title="Searchable Input">
      <CodeExample>
        <SearchableInput
          translator={i18n}
          store={topicStore}
          labelKey="name"
          valueKey="name"
          placeholder="search GitHub topics"
          onChange={console.log}
        />
      </CodeExample>
    </Section>
  </>
);
