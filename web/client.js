import {createClient} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: 'bjnjq7k1',
  dataset: 'production',
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: '2023-09-01', // use current date (YYYY-MM-DD) to target the latest API version
};

export const client = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);