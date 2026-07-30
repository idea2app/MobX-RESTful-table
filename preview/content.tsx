import { GitRepository, RepositoryFilter } from 'mobx-github';
import { FC } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

import {
  ArrayField,
  BadgeBar,
  BadgeInput,
  Column,
  Field,
  FileModel,
  FilePicker,
  FilePreview,
  FileUploader,
  FormField,
  ImagePreview,
  RangeInput,
  RestForm,
  RestTable,
  SearchableInput,
} from '../source';
import { i18n, repositoryStore, topicStore } from './model';
import { CodeExample, Section } from './utility';

interface Price {
  currency: 'USD' | 'CNY';
  amount: number;
}

class MyFileModel extends FileModel {}

const fileStore = new MyFileModel();

const demoImageSource = `
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#0d6efd" />
      <stop offset="1" stop-color="#20c997" />
    </linearGradient>
  </defs>
  <rect width="320" height="200" fill="url(#g)" />
  <circle cx="70" cy="80" r="36" fill="rgba(255,255,255,.35)" />
  <rect x="116" y="56" width="140" height="88" rx="12" fill="rgba(255,255,255,.25)" />
  <text x="160" y="182" text-anchor="middle" font-family="Arial" font-size="20" fill="white">
    MobX RESTful table
  </text>
</svg>
`;
const demoImage = `data:image/svg+xml,${encodeURIComponent(demoImageSource)}`;

const filterFields: Field<RepositoryFilter>[] = [
  { key: 'full_name', renderLabel: 'Repository Name' },
  { key: 'homepage', renderLabel: 'Home Page' },
  { key: 'language', renderLabel: 'Programming Language' },
  { key: 'topics', renderLabel: 'Topic' },
  { key: 'description', renderLabel: 'Description' },
];

const columns: Column<GitRepository>[] = [
  {
    key: 'full_name',
    renderHead: 'Repository Name',
    renderBody: ({ html_url, full_name }) => (
      <a target="_blank" href={html_url} rel="noreferrer">
        {full_name}
      </a>
    ),
    required: true,
    minLength: 3,
    invalidMessage: 'Input 3 characters at least',
  },
  { key: 'homepage', type: 'url', renderHead: 'Home Page' },
  { key: 'language', renderHead: 'Programming Language' },
  {
    key: 'topics',
    renderHead: 'Topic',
    renderBody: ({ topics }) => (
      <BadgeBar
        list={(topics || []).map(text => ({ text, link: `https://github.com/topics/${text}` }))}
      />
    ),
    renderInput: ({ topics }) => (
      <SearchableInput
        translator={i18n}
        store={topicStore}
        labelKey="name"
        valueKey="name"
        placeholder="search GitHub topics"
        multiple
        defaultValue={topics?.map(value => ({ value, label: value }))}
      />
    ),
  },
  { key: 'stargazers_count', type: 'number', renderHead: 'Star Count' },
  { key: 'description', renderHead: 'Description', rows: 3 },
];

export const Content: FC = () => (
  <>
    <h1>MobX RESTful table examples</h1>

    <Section title="Form Field">
      <CodeExample>
        <FormField label="Input" />
      </CodeExample>

      <CodeExample>
        <FormField label="Text Area" as="textarea" rows={3} />
      </CodeExample>

      <CodeExample>
        <FormField
          label="Select"
          options={[{ value: 'idea2app' }, { value: 'WebCell' }]}
          defaultValue="WebCell"
        />
      </CodeExample>
    </Section>

    <Section title="Badge Input">
      <CodeExample>
        <BadgeInput
          placeholder="type some words, then press Enter key to add it"
          onChange={console.log}
        />
      </CodeExample>

      <CodeExample>
        <BadgeInput
          placeholder="type some words, then press Enter key to add it"
          defaultValue={['JavaScript', 'TypeScript']}
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
    </Section>

    <Section title="Range Input">
      <CodeExample>
        <RangeInput min={0} max={5} icon={value => (value ? '★' : '☆')} onChange={console.log} />
      </CodeExample>
    </Section>

    <Section title="Array Field">
      <CodeExample>
        <ArrayField
          name="prices"
          renderItem={({ currency, amount }: Price) => (
            <InputGroup>
              <Form.Select name="currency" defaultValue={currency}>
                <option value="USD">USD $</option>
                <option value="CNY">CNY ¥</option>
              </Form.Select>
              <Form.Control
                placeholder="Amount"
                type="number"
                name="amount"
                required
                min={0}
                defaultValue={amount}
              />
            </InputGroup>
          )}
          onChange={console.log}
        />
      </CodeExample>
    </Section>

    <Section title="Image Preview">
      <CodeExample>
        <ImagePreview src={demoImage} />
      </CodeExample>
    </Section>

    <Section title="File Preview">
      <CodeExample>
        <FilePreview path="https://idea2app.github.io/MobX-RESTful-table/index.html" />
      </CodeExample>
    </Section>

    <Section title="File Picker">
      <CodeExample>
        <FilePicker accept="image/*" onChange={console.log} />
      </CodeExample>
      <CodeExample>
        <FilePicker accept="image/*" defaultValue={demoImage} onChange={console.log} />
      </CodeExample>
    </Section>

    <Section title="File Uploader">
      <CodeExample>
        <FileUploader
          accept="image/*"
          store={fileStore}
          multiple
          defaultValue={[demoImage]}
          onChange={console.log}
        />
      </CodeExample>
    </Section>

    <Section title="REST form">
      <CodeExample>
        <RestForm
          translator={i18n}
          store={repositoryStore}
          fields={columns.map(({ renderHead, renderBody, ...meta }) => ({
            ...meta,
            renderLabel: renderHead,
          }))}
        />
      </CodeExample>
    </Section>

    <Section title="REST table">
      <CodeExample>
        <RestTable
          striped
          hover
          editable
          deletable
          filterFields={filterFields}
          columns={columns}
          store={repositoryStore}
          translator={i18n}
          onCheck={console.log}
        />
      </CodeExample>
    </Section>
  </>
);
