import { Workplace } from '../models/workplace';

/**
 * Just some mock data for workplaces...probably workplaces was the wrong
 * choice of data, but here for demo purposes only
 * @returns 
 */
export const getMockWorkplaces = (): Workplace[] => {
    return [
        {
            id: 1,
            name: "The Royal Melbourne Hospital",
            location: "300 Grattan St, Parkville VIC 3050, Australia"
        },
        {
            id: 2,
            name: "The Royal Women's Hospital",
            location: "20 Flemington Rd, Parkville VIC 3052, Australia"
        },
        {
            id: 3,
            name: "The Alfred",
            location: "55 Commercial Rd, Melbourne VIC 3004, Australia"
        },
        {
            id: 4,
            name: "St Vincent's Private Hospital",
            location: "159 Grey St, East Melbourne VIC 3002, Australia"
        },
        {
            id: 5,
            name: "Epworth Freemasons",
            location: "320 Victoria Parade, East Melbourne VIC 3002, Australia"
        },
        {
            id: 6,
            name: "Austin Hospital",
            location: "145 Studley Rd, Heidelberg VIC 3084, Australia"
        },
        {
            id: 7,
            name: "Footscray Hospital",
            location: "160 Gordon St, Footscray VIC 3011, Australia"
        }
    ]
}