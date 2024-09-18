import { Job } from './interface.js';

export const defaultConfig = {
    debugMode: true,
    DefaultLocale: 'en',
    RegisterCommandName: 'scoreboard',
    MetaItem: false,
    Enable: true,
    OpenScoreboard: 36,
    disablePlayerList: false,
    showUserRole: false,
    showUserFaction: false,
    onlinePlayersInterval: 6000,
    maxPlayers: 120,
    serverName: 'SERVER NAME',
};

export const Jobs: Job[] = [
    {
        name: 'ambulance',
        label: 'Ambulance',
        icon: 'hospital',
        count: 0,
    },
    {
        name: 'police',
        label: 'Police',
        icon: 'police',
        count: 0,
    },
    {
        name: 'mechanic',
        label: 'Mechanic',
        icon: 'mechanic',
        count: 0,
    },
    {
        name: 'firefighter',
        label: 'Firefighter',
        icon: 'firejob',
        count: 0,
    },
    {
        name: 'lawyer',
        label: 'Lawyer',
        icon: 'gavel',
        count: 0,
    },
    {
        name: 'taxi',
        label: 'Taxi',
        icon: 'taxi',
        count: 0,
    },
    {
        name: 'banker',
        label: 'Banker',
        icon: 'piggy-bank',
        count: 0,
    },
    {
        name: 'chef',
        label: 'Chef',
        icon: 'utensils',
        count: 0,
    },
    {
        name: 'pilot',
        label: 'Pilot',
        icon: 'plane',
        count: 0,
    },
];
