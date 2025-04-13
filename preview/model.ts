import { components, operations } from '@octokit/openapi-types';
import { HTTPClient } from 'koajax';
import { TranslationModel } from 'mobx-i18n';
import { Filter, IDType, ListModel } from 'mobx-restful';
import { githubClient, RepositoryModel } from 'mobx-github';
import { buildURLData } from 'web-utility';

export const i18n = new TranslationModel({
  en_US: {
    load_more: 'Load more',
    no_more: 'No more',
    create: 'Create',
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    total_x_rows: ({ totalCount }: { totalCount: number }) =>
      `Total ${totalCount} rows`,
    sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
      `Are you sure to delete ${keys.join(', ')}?`,
  },
});

type Topic = components['schemas']['topic-search-result-item'];

type TopicSearchResponse =
  operations['search/topics']['responses']['200']['content']['application/json'];

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

githubClient.use(({ request }, next) => {
  if (GITHUB_TOKEN)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };
  return next();
});

export const repositoryStore = new RepositoryModel('idea2app');

export class GitHubTopicModel extends ListModel<Topic> {
  baseURI = 'search/topics';
  client = githubClient;

  async loadPage(pageIndex: number, pageSize: number, { name }: Filter<Topic>) {
    const { body } = await this.client.get<TopicSearchResponse>(
      `${this.baseURI}?${buildURLData({
        q: name,
        page: pageIndex,
        per_page: pageSize,
      })}`,
    );
    return { pageData: body.items, totalCount: body.total_count };
  }
}

export const topicStore = new GitHubTopicModel();
