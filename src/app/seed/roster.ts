import { faker } from '@faker-js/faker';
import * as moment from 'moment';
import { RosterDay } from '../models/roster';

/**
 * Builds a mock roster data schema... purely for demo purposes
 * @returns 
 */
export const getMockRoster = (): RosterDay[] => {
    const rosteredDays = []
    const usedWorkplaceIds = ['0', '8', '9']

    for (let i=1;i<8;i++) {
        let workplace_id = faker.random.numeric(1, { bannedDigits: usedWorkplaceIds});
        let startDate = faker.date.soon(10)
        
        usedWorkplaceIds.push(workplace_id)
        rosteredDays.push({
            id: parseInt(faker.random.numeric(4)),
            date: startDate,
            workplace_id: parseInt(workplace_id),
            shifts: getMockShifts(parseInt(faker.random.numeric(1, {bannedDigits:['0']})), startDate)
        })
    }

    return rosteredDays
}

/**
 * Builds a mock shifts data schema... purely for demo purposes
 * @returns 
 */
export const getMockShifts = (shiftCount: number, startDate: Date) => {
    const shifts = []
    
    for (let i=1;i<shiftCount;i++) {
        let hasUserId = parseInt(faker.random.numeric(6)) % 2;
        let startTime = moment(startDate).add(parseInt(faker.random.numeric(4)), 'seconds').toDate()
        shifts.push(
            {
                id: parseInt(faker.random.numeric(3)),
                end_datetime: moment(startTime).add(parseInt(faker.random.numeric()), 'hours').toDate(),
                start_datetime: startTime,
                user_id: hasUserId ? parseInt(faker.random.numeric()) : null
            }
        )
    }

    return shifts
}