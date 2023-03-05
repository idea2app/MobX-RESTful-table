# MobX RESTful table

A **Pagination Table** & **Scroll List** component suite for [CRUD operation][1], which is based on [MobX RESTful][2] & [React][3].

[![CI & CD](https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml/badge.svg)][4]

[![NPM](https://nodei.co/npm/mobx-restful-table.png?downloads=true&downloadRank=true&stars=true)][5]

## Components

1. [File Preview](https://idea2app.github.io/MobX-RESTful-table/functions/FilePreview-1.html)
2. [File Picker](https://idea2app.github.io/MobX-RESTful-table/classes/FilePicker.html)
3. [Form Field](https://idea2app.github.io/MobX-RESTful-table/functions/FormField-1.html)
4. [REST Form](https://idea2app.github.io/MobX-RESTful-table/classes/RestForm.html)
5. [Pager](https://idea2app.github.io/MobX-RESTful-table/functions/Pager-1.html)
6. [REST Table](https://idea2app.github.io/MobX-RESTful-table/classes/RestTable.html)
7. [Scroll Boundary](https://idea2app.github.io/MobX-RESTful-table/functions/ScrollBoundary-1.html)
8. [Scroll List](https://idea2app.github.io/MobX-RESTful-table/classes/ScrollList.html)

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

### Pagination Table

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
        renderHead: t('repository_name'),
        renderBody: ({ html_url, full_name }) => (
          <a target="_blank" href={html_url}>
            {full_name}
          </a>
        ),
      },
      { key: 'homepage', type: 'url', renderHead: t('home_page') },
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
          deletable
          columns={this.columns}
          store={repositoryStore}
          translator={i18n}
          onCheck={console.log}
        />
      </Container>
    );
  }
}
```

### Scroll List

[Preview Link][12]

#### `components/Git/index.tsx`

[Source Code][13]

```tsx
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { ScrollList, ScrollListProps } from 'mobx-restful-table';

import { GitCard } from './Card';
import { GitRepository, RepositoryModel } from '../../models/Repository';
import { i18n } from '../../models/Translation';

export interface GitListProps extends ScrollListProps<GitRepository> {
  store: RepositoryModel;
}

@observer
export class GitList extends ScrollList<GitListProps> {
  store = this.props.store;
  translator = i18n;

  constructor(props: GitListProps) {
    super(props);

    this.boot();
  }

  renderList() {
    const { allItems } = this.store;

    return (
      <Row as="ul" className="list-unstyled g-4" xs={1} sm={2}>
        {allItems.map(item => (
          <Col as="li" key={item.id}>
            <GitCard className="h-100 shadow-sm" {...item} />
          </Col>
        ))}
      </Row>
    );
  }
}
```

#### `pages/scroll-list.tsx`

[Source Code][14]

```tsx
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Loading } from 'idea-react';

import { GitList } from '../components/Git';
import repositoryStore from '../models/Repository';
import { i18n } from '../models/Translation';

const ScrollListPage: FC = observer(() => (
  <Container>
    <h1 className="my-4">{i18n.t('scroll_list')}</h1>

    {repositoryStore.downloading > 0 && <Loading />}

    <GitList store={repositoryStore} />
  </Container>
));

export default ScrollListPage;
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
[12]: https://next-bootstrap-ts.vercel.app/scroll-list/
[13]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/components/Git
[14]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/pages/scroll-list.tsx
