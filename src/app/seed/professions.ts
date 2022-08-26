import { faker } from '@faker-js/faker';
import { Profession } from '../models/profession';

export const getMockProfessions = (): Profession[] => {
    return [{
        id: faker.datatype.uuid(),
        name: 'Physician',
    }, {
        id: faker.datatype.uuid(),
        name: 'Pharmacist',
    }, {
        id: faker.datatype.uuid(),
        name: 'Registered Nurse',
    }, {
        id: faker.datatype.uuid(),
        name: 'Therapist',
    }, {
        id: faker.datatype.uuid(),
        name: 'Physiotherapist',
    }, {
        id: faker.datatype.uuid(),
        name: 'Dietitian',
    }, {
        id: faker.datatype.uuid(),
        name: 'Radiographer',
    }, {
        id: faker.datatype.uuid(),
        name: 'Dentist',
    }, {
        id: faker.datatype.uuid(),
        name: 'Sonographer',
    }, {
        id: faker.datatype.uuid(),
        name: 'Midwife',
    }]
}

