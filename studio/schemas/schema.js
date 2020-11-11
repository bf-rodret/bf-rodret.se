import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import start from './start';
import informationArticle from './information-article';
import historyArticle from './history-article';
import historyImage from './history-image';
import historyImageType from './history-image-type';
import timelineEvent from './timeline-event';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    start,
    informationArticle,
    historyArticle,
    historyImage,
    historyImageType,
    timelineEvent
  ])
})
