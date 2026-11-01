import assert from 'node:assert/strict';
import { it } from 'node:test';

import { renderToStaticMarkup } from 'react-dom/server';

import { BadgeBar } from '../source/BadgeBar';
import { FormField } from '../source/FormField';
import { Pager } from '../source/Pager';

it('renders badges with Idea React themes', () => {
  const markup = renderToStaticMarkup(
    <BadgeBar list={[{ text: 'React' }]} bgResolver={() => 'success'} />,
  );

  assert.match(markup, /<ul[^>]*><li><span class="badge theme-success/);
  assert.match(markup, />React<\/span><\/li><\/ul>/);
});

it('renders floating form fields with accessible labels and native controls', () => {
  const markup = renderToStaticMarkup(
    <FormField name="language" label="Language" defaultValue="TypeScript" />,
  );

  assert.match(markup, /<input[^>]*id="language"[^>]*name="language"/);
  assert.match(markup, /<label for="language">Language<\/label>/);
});

it('renders pagination controls with Bootstrap 6 markup', () => {
  const markup = renderToStaticMarkup(<Pager pageSize={10} pageIndex={2} pageCount={5} />);

  assert.match(markup, /<input[^>]*class="form-control"/);
  assert.match(markup, /<ul class="pagination m-0">/);
  assert.match(markup, /class="page-item active" aria-current="page"/);
});
