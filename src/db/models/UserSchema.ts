import Realm from 'realm';

export interface IUser {
  id: number;
  cpf: string;
  nome: string;
  cargoId: number;
}

const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  properties: {
    id: 'int',
    cpf: 'string',
    nome: 'string',
    cargoId: 'int',
  },
  primaryKey: 'id',
};

export default UserSchema;
