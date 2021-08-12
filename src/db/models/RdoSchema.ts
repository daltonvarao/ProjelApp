import Realm from 'realm';

import {IAtividadeRdo} from './AtividadeRdoSchema';
import {IEquipamentoRdo} from './EquipamentoRdoSchema';
import {IRdoUser} from './UserRdoSchema';

export interface IRdo {
  nome: string;
  condicoesTempo: 'bom' | 'chuvoso';
  data: Date;
  pluviometria: number;
  status: 'andamento' | 'finalizado';
  equipamentoId?: number;
  estruturaId?: number;
  rdoId: number;
  concluido: boolean;
  turno: '1T' | '2T';
  users: IRdoUser[];
  equipamentos: IEquipamentoRdo[];
  atividades: IAtividadeRdo[];
}

const RdoSchema: Realm.ObjectSchema = {
  name: 'Rdo',
  properties: {
    nome: 'string',
    condicoesTempo: 'string',
    data: 'date',
    pluviometria: 'float',
    status: 'string',
    rdoId: 'int',
    equipamentoId: 'int?',
    estruturaId: 'int?',
    turno: 'string',
    users: 'RdoUser[]',
    equipamentos: 'EquipamentoRdo[]',
    atividades: 'AtividadeRdo[]',
    concluido: 'bool',
  },
  primaryKey: 'rdoId',
};

export default RdoSchema;
