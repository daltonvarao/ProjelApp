import Realm from 'realm';

export interface IFuro {
  nome: string;
  id: number;
  estruturaId: number;
}

const FuroSchema: Realm.ObjectSchema = {
  name: 'Furo',
  properties: {
    id: 'int',
    nome: 'string',
    estruturaId: 'int',
  },
};

export default FuroSchema;
