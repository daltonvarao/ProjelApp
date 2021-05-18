import Realm from 'realm';

export interface IApiSyncVersion {
  id: number;
}

const ApiSyncVersionSchema: Realm.ObjectSchema = {
  name: 'ApiSyncVersion',
  properties: {
    id: 'int',
  },
};

export default ApiSyncVersionSchema;
