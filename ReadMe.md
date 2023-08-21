# MobX RESTful table

A **Pagination Table** & **Scroll List** component suite for [CRUD operation][1], which is based on [MobX RESTful][2] & [React][3].

[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/MobX-RESTful-table.svg)][4]
[![CI & CD](https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml/badge.svg)][5]

[![NPM](https://nodei.co/npm/mobx-restful-table.png?downloads=true&downloadRank=true&stars=true)][6]

## Components

1. [Image Preview](https://idea2app.github.io/MobX-RESTful-table/classes/ImagePreview.html)
2. [File Preview](https://idea2app.github.io/MobX-RESTful-table/functions/FilePreview-1.html)
3. [File Picker](https://idea2app.github.io/MobX-RESTful-table/classes/FilePicker.html)
4. [File Uploader](https://idea2app.github.io/MobX-RESTful-table/classes/FileUploader.html)
5. [Form Field](https://idea2app.github.io/MobX-RESTful-table/functions/FormField-1.html)
6. [Badge Input](https://idea2app.github.io/MobX-RESTful-table/classes/BadgeInput.html)
7. [REST Form](https://idea2app.github.io/MobX-RESTful-table/classes/RestForm.html)
8. [Pager](https://idea2app.github.io/MobX-RESTful-table/functions/Pager-1.html)
9. [REST Table](https://idea2app.github.io/MobX-RESTful-table/classes/RestTable.html)
10. [Scroll Boundary](https://idea2app.github.io/MobX-RESTful-table/functions/ScrollBoundary-1.html)
11. [Scroll List](https://idea2app.github.io/MobX-RESTful-table/classes/ScrollList.html)

## Installation

```shell
npm i react \
  mobx@5 \
  mobx-react@6 \
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

1. [set up Text in UI][7]
2. [import Text files][8]

### Data source

1. [set up HTTP client][9]
2. [implement Model class][10]

## Initialization

### Pagination Table

Inspired by [Ant Design - Pro Table](https://procomponents.ant.design/components/table)

- [Source Code][11]
- [Preview Link][12]

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

[Preview Link][13]

#### `pages/scroll-list.tsx`

[Source Code][14]

```tsx
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Loading } from 'idea-react';
import { ScrollList } from 'mobx-restful-table';

import { GitCard } from '../components/Git';
import repositoryStore from '../models/Repository';
import { i18n } from '../models/Translation';

const ScrollListPage: FC = observer(() => (
  <Container>
    <h1 className="my-4">{i18n.t('scroll_list')}</h1>

    {repositoryStore.downloading > 0 && <Loading />}

    <ScrollList
      translator={i18n}
      store={repositoryStore}
      renderList={allItems => (
        <Row as="ul" className="list-unstyled g-4" xs={1} sm={2}>
          {allItems.map(item => (
            <Col as="li" key={item.id}>
              <GitCard className="h-100 shadow-sm" {...item} />
            </Col>
          ))}
        </Row>
      )}
    />
  </Container>
));

export default ScrollListPage;
```

### File Uploader

#### `model/File.ts`

```ts
import { toggle } from 'mobx-restful';
import { FileModel } from 'mobx-restful-table';

import { uploadFile } from '../utility';

export class AssetFileModel extends FileModel {
  @toggle('uploading')
  async upload(file: File) {
    const URI = await uploadFile(file);

    return super.upload(URI);
  }
}

export default new AssetFileModel();
```

#### `page/editor.tsx`

```tsx
import { FileUploader } from 'mobx-restful-table';

import fileStore from '../model/File';

export const EditorPage = () => (
  <FileUploader
    store={fileStore}
    accept="image/*"
    name="images"
    multiple
    required
    onChange={console.log}
  />
);
```

[1]: https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[2]: https://github.com/idea2app/MobX-RESTful
[3]: https://reactjs.org/
[4]: https://libraries.io/npm/mobx-restful-table
[5]: https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml
[6]: https://nodei.co/npm/mobx-restful-table/
[7]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Translation.ts
[8]: https://github.com/idea2app/Next-Bootstrap-TS/tree/main/translation
[9]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Base.ts#L12-L24
[10]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Repository.ts
[11]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/pages/pagination.tsx
[12]: https://next-bootstrap-ts.vercel.app/pagination/
[13]: https://next-bootstrap-ts.vercel.app/scroll-list/
[14]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/pages/scroll-list.tsx
