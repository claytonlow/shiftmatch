import { faker } from '@faker-js/faker';
import { User } from '../models/user';

/**
 * Builds a mock user data schema... purely for demo purposes
 * @returns 
 */
export const generateUser = (id: number): User => {
    return {
        id: id,
        name: faker.name.fullName(),
        status: 'available',
        reliability_score: faker.helpers.arrayElement([1,2,3,4,5]),
        phone_number: faker.phone.number(),
        placements: parseInt(faker.random.numeric(2)),
        city: faker.address.city(),
        country: faker.address.country(),
        state: faker.address.state(),
        gender: faker.helpers.arrayElement(['male', 'female','n/a'])

    }
}

/**
 * Generates a bunch of mock users based on userCount... purely for demo purposes
 * @returns 
 */
export const generateUsers = (userCount: number = 10): User[] => {
    const users: User[] = [];

    for(let i=1;i<=userCount;i++){
        users.push(generateUser(i));
    }

    return users;
}