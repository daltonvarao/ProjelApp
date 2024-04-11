import Realm from 'realm';

import ApiSyncVersionSchema from './models/ApiSyncVersionSchema';
import UserSchema from './models/UserSchema';
import EquipamentoSchema from './models/EquipamentoSchema';
import AtividadeSchema from './models/AtividadeSchema';
import RdoSchema from './models/RdoSchema';
import AtividadeRdoSchema from './models/AtividadeRdoSchema';
import EquipamentoRdoSchema from './models/EquipamentoRdoSchema';
import RdoUserSchema from './models/UserRdoSchema';
import ContratoSchema from './models/ContratoSchema';
import EstruturaSchema from './models/EstruturaSchema';
import FuroSchema from './models/FuroSchema';

const realmConfiguration: Realm.Configuration = {
  schema: [
    ApiSyncVersionSchema,
    AtividadeSchema,
    AtividadeRdoSchema,
    ContratoSchema,
    EquipamentoSchema,
    EquipamentoRdoSchema,
    RdoSchema,
    RdoUserSchema,
    UserSchema,
    EstruturaSchema,
    FuroSchema,
  ],
  schemaVersion: 0,
  deleteRealmIfMigrationNeeded: true,
};

export async function connect() {
  const realm = await Realm.open(realmConfiguration);
  //console.log(`Database path: ${realm.path}`);
  return realm;
}
