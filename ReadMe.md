# MobX RESTful table

A super **Table component** for [CRUD operation][1], which is based on [MobX RESTful][2] & [React][3].

[![CI & CD](https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml/badge.svg)][4]

[![NPM](https://nodei.co/npm/mobx-restful-table.png?downloads=true&downloadRank=true&stars=true)][5]

## Installation

```shell
npm i react@17 \
  mobx@5 mobx-react@6 \
  mobx-i18n \
  mobx-restful \
  mobx-restful-table
```

## Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "ES6",
    "moduleResolution": "Node",
    "experimentalDecorators": true,
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "lib": ["ES2022", "DOM"]
  }
}
```

### Internationalization

1. [set up Text in UI][6]
2. [import Text files][7]

### Data source

1. [set up HTTP client][8]
2. [implement Model class][9]

## Initialization

- [Source Code][10]
- [Preview Link][11]

```tsx
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { PureComponent } from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import { Column, RestTable } from 'mobx-restful-table';

import repositoryStore, { Repository } from '../models/Repository';
import { i18n } from '../models/Translation';

@observer
export default class PaginationPage extends PureComponent {
  @computed
  get columns(): Column<Repository>[] {
    const { t } = i18n;

    return [
      {
        key: 'full_name',
        type: 'url',
        renderHead: t('repository_name'),
        renderBody: ({ html_url, full_name }) => (
          <a target="_blank" href={html_url}>
            {full_name}
          </a>
        ),
      },
      {
        key: 'homepage',
        type: 'url',
        renderHead: t('home_page'),
        renderBody: ({ homepage }) =>
          homepage && (
            <a target="_blank" href={homepage}>
              {homepage}
            </a>
          ),
      },
      { key: 'language', renderHead: t('programming_language') },
      {
        key: 'topics',
        renderHead: t('topic'),
        renderBody: ({ topics }) => (
          <>
            {topics?.map(topic => (
              <Badge
                key={topic}
                className="me-2"
                as="a"
                target="_blank"
                href={`https://github.com/topics/${topic}`}
              >
                {topic}
              </Badge>
            ))}
          </>
        ),
      },
      { key: 'stargazers_count', type: 'number', renderHead: t('star_count') },
      {
        renderBody: data => (
          <Button
            className="text-nowrap"
            variant="warning"
            size="sm"
            onClick={() => (repositoryStore.currentOne = data)}
          >
            {t('edit')}
          </Button>
        ),
      },
    ];
  }

  render() {
    return (
      <Container style={{ height: '91vh' }}>
        <RestTable
          className="text-center"
          striped
          hover
          editable
          columns={this.columns}
          store={repositoryStore}
          translater={i18n}
        />
      </Container>
    );
  }
}
```

[1]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[2]: https://github.com/idea2app/MobX-RESTful
[3]: https://reactjs.org/
[4]: https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml
[5]: https://nodei.co/npm/mobx-restful-table/
[6]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Translation.ts
[7]: https://github.com/idea2app/Next-Bootstrap-TS/tree/main/translation
[8]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Base.ts#L12-L24
[9]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Repository.ts
[10]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/pages/pagination.tsx
[11]: https://next-bootstrap-ts.vercel.app/pagination/
