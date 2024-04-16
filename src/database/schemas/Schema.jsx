import {Realm, ObjectSchema} from "realm";
import { FertilityStatus, Sex, LifeStatus,  } from "../../utils/CustomTypes";
class Animal extends Realm.Object{
    static schema = {
        name: 'Animal',
        properties: {
            _id: 'objectId',
            fertilityStatus: { type: 'string', default: FertilityStatus.FERTILE }, 
            location: { type: 'list', objectType: 'string' },
            mainName: 'string',
            sex: { type: 'string', default: Sex.UNDETERMINED }, 
            status:{ type: 'list', objectType: 'string', default: [LifeStatus.ALIVE] }, 
            coatColor: { type: 'list', objectType: 'string', default: [] },
            imgUrl: 'string',
            notes: { type: 'list', objectType: 'string', default: [] },
            species: 'string',
            traitsAndPersonality: { type: 'list', objectType: 'string', default: [] },
            disabilities: { type: 'list', objectType: 'string', default: [] },
            age: 'int'
        },
        primaryKey : '_id'
    }
}

export {Animal}