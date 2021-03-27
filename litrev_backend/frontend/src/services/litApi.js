import axios from 'axios';

const API_BASE_URL = 'https://api.semanticscholar.org/v1/';

const api = {

  async getPaper(paperId) {
    const result = await axios.get(API_BASE_URL + 'paper/' + paperId,
                                   {params: {include_unknown_references: true}});
    const rawPaper = result.data;

    function preparePaper(raw) {
      return {
        id: raw.paperId,
        ids: {
          doi: raw.doi,
          arxiv: raw.doi,
        },
        title: raw.title,
        authors: raw.authors.map(author => author.name),
        year: raw.year,
        venue: raw.venue,
        url: (() => {
          if (raw.doi) {
            return 'https://doi.org/' + raw.doi;
          }
          else if (raw.arxivId) {
            return 'https://arxiv.org/abs/' + raw.arxivId;
          }
          else {
            return raw.url;
          }
        })(),
      };
    }

    function prepareLinkedPaper(raw) {
      return {
        ...preparePaper(raw),
        isInfluential: raw.isInfluential,
      };
    }

    return {
      ...preparePaper(rawPaper),
      abstract: rawPaper.abstract,
      topics: rawPaper.topics.map(topic => topic.topic),
      cites: rawPaper.citations.map(prepareLinkedPaper),
      refs: rawPaper.references.map(prepareLinkedPaper),
    };
  },

};

export default api;
