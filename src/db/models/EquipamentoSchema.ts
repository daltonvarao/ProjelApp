import Realm from 'realm';

export interface IEquipamento {
  id: number;
  tag: string;
  descricao: string;
  sonda: boolean;
  tag_description: string;
}

const EquipamentoSchema: Realm.ObjectSchema = {
  name: 'Equipamento',
  properties: {
    id: 'int',
    tag: 'string',
    sonda: 'bool',
    descricao: 'string',
    tag_description: 'string',
  },
};

export default EquipamentoSchema;
