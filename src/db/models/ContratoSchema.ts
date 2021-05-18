import Realm from 'realm';

export interface IContrato {
  id: number;
  descricao: string;
  numero: string;
}

const ContratoSchema: Realm.ObjectSchema = {
  name: 'Contrato',
  properties: {
    id: 'int',
    descricao: 'string',
    numero: 'string',
  },
};

export default ContratoSchema;
