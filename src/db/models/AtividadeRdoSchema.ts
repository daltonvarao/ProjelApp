import Realm from 'realm';

export interface IAtividadeRdo {
  atividadeId: number;
  horaFim: Date;
  horaInicio: Date;
  quantidade: number;
  descricao: string;
  unidadeMedida?: 'metros' | 'unidades';
  tipo: 'parada' | 'improdutiva' | 'produtiva';
  quantidadeInicial: number;
  quantidadeFinal: number;
  furoNome?: string;
}

const AtividadeRdoSchema: Realm.ObjectSchema = {
  name: 'AtividadeRdo',
  properties: {
    atividadeId: 'int',
    furoNome: 'string?',
    horaFim: 'date',
    horaInicio: 'date',
    quantidadeInicial: 'float?',
    quantidadeFinal: 'float?',
    quantidade: 'float',
    descricao: 'string',
    unidadeMedida: 'string?',
    tipo: 'string',
  },
};

export default AtividadeRdoSchema;
