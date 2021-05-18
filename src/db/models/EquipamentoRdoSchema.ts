import Realm from 'realm';

export interface IEquipamentoRdo {
  equipamentoId: number;
  quantidade: number;
}

const EquipamentoRdoSchema: Realm.ObjectSchema = {
  name: 'EquipamentoRdo',
  properties: {
    equipamentoId: 'int',
    quantidade: 'int',
  },
};

export default EquipamentoRdoSchema;
