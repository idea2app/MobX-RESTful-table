import { components, operations } from '@octokit/openapi-types';
import { HTTPClient } from 'koajax';
import { TranslationModel } from 'mobx-i18n';
import { Filter, ListModel } from 'mobx-restful';
import { buildURLData } from 'web-utility';

export const i18n = new TranslationModel({
  en_US: {
    load_more: 'Load more',
    no_more: 'No more',
  },
});

type Topic = components['schemas']['topic-search-result-item'];

type TopicSearchResponse =
  operations['search/topics']['responses']['200']['content']['application/json'];

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export class GitHubTopicModel extends ListModel<Topic> {
  baseURI = 'search/topics';

  client = new HTTPClient({
    baseURI: 'https://api.github.com/',
    responseType: 'json',
  }).use(({ request }, next) => {
    if (GITHUB_TOKEN)
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      };
    return next();
  });

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
