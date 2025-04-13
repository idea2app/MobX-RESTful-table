import { text2color } from 'idea-react';
import { GitRepository } from 'mobx-github';
import { FC } from 'react';
import { Badge } from 'react-bootstrap';

import { BadgeInput, Column, RestTable, SearchableInput } from '../source';
import { i18n, repositoryStore, topicStore } from './model';
import { CodeExample, Section } from './utility';

const columns: Column<GitRepository>[] = [
  {
    key: 'full_name',
    renderHead: 'Repository Name',
    renderBody: ({ html_url, full_name }) => (
      <a target="_blank" href={html_url} rel="noreferrer">
        {full_name}
      </a>
    ),
  },
  { key: 'homepage', type: 'url', renderHead: 'Home Page' },
  { key: 'language', renderHead: 'Programming Language' },
  {
    key: 'topics',
    renderHead: 'Topic',
    renderBody: ({ topics }) => (
      <>
        {topics?.map(topic => (
          <Badge
            key={topic}
            bg={text2color(topic, ['light'])}
            as="a"
            className="text-decoration-none me-2"
            target="_blank"
            href={`https://github.com/topics/${topic}`}
          >
            {topic}
          </Badge>
        ))}
      </>
    ),
  },
  { key: 'stargazers_count', type: 'number', renderHead: 'Star Count' },
];

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
          fields={[{ key: 'name' }]}
          store={topicStore}
          labelKey="name"
          valueKey="name"
          placeholder="search GitHub topics"
          multiple
          onChange={console.log}
        />
      </CodeExample>

      <Section title="REST table">
        <CodeExample>
          <RestTable
            striped
            hover
            editable
            deletable
            columns={columns}
            store={repositoryStore}
            translator={i18n}
            onCheck={console.log}
          />
        </CodeExample>
      </Section>
    </Section>
  </>
);
