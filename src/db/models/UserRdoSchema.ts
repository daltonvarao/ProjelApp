import Realm from 'realm';

export interface IRdoUser {
  userId: number;
}

const RdoUsrtSchema: Realm.ObjectSchema = {
  name: 'RdoUser',
  properties: {
    userId: 'int',
  },
};

export default RdoUsrtSchema;
