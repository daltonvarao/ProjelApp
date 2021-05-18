import Realm from 'realm';

export interface IAtividade {
  id: number;
  descricao: string;
  unidadeMedida?: 'unidades' | 'metros';
  tipo: 'parada' | 'produtiva' | 'improdutiva';
}

const AtividadeSchema: Realm.ObjectSchema = {
  name: 'Atividade',
  properties: {
    id: 'int',
    descricao: 'string',
    unidadeMedida: 'string?',
    tipo: 'string',
  },
};

export default AtividadeSchema;
