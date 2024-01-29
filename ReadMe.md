# MobX RESTful table

A **Pagination Table** & **Scroll List** component suite for [CRUD operation][1], which is based on [MobX RESTful][2] & [React][3].

[![MobX compatibility](https://img.shields.io/badge/Compatible-1?logo=mobx&label=MobX%206%2F7)][4]
[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/MobX-RESTful-table.svg)][5]
[![CI & CD](https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml/badge.svg)][6]

[![NPM](https://nodei.co/npm/mobx-restful-table.png?downloads=true&downloadRank=true&stars=true)][7]

## Versions

| SemVer |    status    | ES decorator |    MobX     |
| :----: | :----------: | :----------: | :---------: |
| `>=2`  | ✅developing |   stage-3    |  `>=6.11`   |
|  `<2`  | ❌deprecated |   stage-2    | `>=4 <6.11` |

## Components

1. [Image Preview](https://idea2app.github.io/MobX-RESTful-table/classes/ImagePreview.html)
2. [File Preview](https://idea2app.github.io/MobX-RESTful-table/functions/FilePreview-1.html)
3. [File Picker](https://idea2app.github.io/MobX-RESTful-table/classes/FilePicker.html)
4. [File Uploader](https://idea2app.github.io/MobX-RESTful-table/classes/FileUploader.html)
5. [Form Field](https://idea2app.github.io/MobX-RESTful-table/functions/FormField-1.html)
6. [Range Input](https://idea2app.github.io/MobX-RESTful-table/classes/RangeInput.html)
7. [Badge Input](https://idea2app.github.io/MobX-RESTful-table/classes/BadgeInput.html)
8. [REST Form](https://idea2app.github.io/MobX-RESTful-table/classes/RestForm.html)
9. [Pager](https://idea2app.github.io/MobX-RESTful-table/functions/Pager-1.html)
10. [REST Table](https://idea2app.github.io/MobX-RESTful-table/classes/RestTable.html)
11. [Scroll Boundary](https://idea2app.github.io/MobX-RESTful-table/functions/ScrollBoundary-1.html)
12. [Scroll List](https://idea2app.github.io/MobX-RESTful-table/classes/ScrollList.html)

## Installation

```shell
npm i react \
  mobx \
  mobx-react \
  mobx-i18n \
  mobx-restful \
  mobx-restful-table
```

## Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ES6",
    "moduleResolution": "Node",
    "useDefineForClassFields": true,
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "lib": ["ES2023", "DOM"]
  }
}
```

### Internationalization

1. [set up Text in UI][8]
2. [import Text files][9]

### Data source

1. [set up HTTP client][10]
2. [implement Model class][11]

## Initialization

### Pagination Table

Inspired by [Ant Design - Pro Table](https://procomponents.ant.design/components/table)

- [Source Code][12]
- [Preview Link][13]

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

[Preview Link][14]

#### `pages/scroll-list.tsx`

[Source Code][15]

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
[4]: https://mobx.js.org/
[5]: https://libraries.io/npm/mobx-restful-table
[6]: https://github.com/idea2app/MobX-RESTful-table/actions/workflows/main.yml
[7]: https://nodei.co/npm/mobx-restful-table/
[8]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Translation.ts
[9]: https://github.com/idea2app/Next-Bootstrap-TS/tree/main/translation
[10]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Base.ts#L12-L24
[11]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/models/Repository.ts
[12]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/pages/pagination.tsx
[13]: https://next-bootstrap-ts.vercel.app/pagination/
[14]: https://next-bootstrap-ts.vercel.app/scroll-list/
[15]: https://github.com/idea2app/Next-Bootstrap-TS/blob/main/pages/scroll-list.tsx
