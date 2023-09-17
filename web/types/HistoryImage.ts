import {AssetType} from 'types/Asset';

export type HistoryImageType = {
  _createdAt: string;
  _type: string;
  _id: string;
  _updatedAt: string;
  _rev: string;
  image: AssetType;
  year?: number;
  type: {
    name: string;
  };
  caption: string;
  source?: string;
}