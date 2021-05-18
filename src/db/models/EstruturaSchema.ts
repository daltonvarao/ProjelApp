import Realm from 'realm';

export interface IEstrutura {
  nome: string;
  id: number;
}

const EstruturaSchema: Realm.ObjectSchema = {
  name: 'Estrutura',
  properties: {
    id: 'int',
    nome: 'string',
  },
};

export default EstruturaSchema;
