import { createRealmContext } from "@realm/react";
import UpdateDateSchema from "../database/schemas/UpdateDate";
import { AnimalSchema } from "../database/schemas/Schema";
import AdoptionFormSchema from "../database/schemas/AdoptionRequest";


const UpdateDateContext = createRealmContext({
    schema: [UpdateDateSchema],
    path:"Animal.realm"
})

const AdoptionRequestContext = createRealmContext({
    schema:[AdoptionFormSchema],
    path: "AdoptionForm.realm"
})

const AnimalContext = createRealmContext({
    schema: [AnimalSchema],
    path:"UpdateDate.realm"
})

export const {
    RealmProvider: UpdateDateProvider,
    useRealm: useUpdateDateRealm,
    useQuery: useUpdateDateQuery
} = UpdateDateContext;

export const {
    RealmProvider: AnimalProvider,
    useRealm: useAnimalRealm,
    useQuery: useAnimalQuery,
    useObject: useAnimalObject,
} = AnimalContext
export const {
    RealmProvider: AdoptionRequestProvider,
    useRealm: useAdoptionRequestRealm,
    useQuery: useAdoptionRequestQuery,
    useObject: useAdoptionRequestObject,
} = AdoptionRequestContext