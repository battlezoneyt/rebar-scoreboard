export interface stats {
    playerStats: currentPlayerStats;
    allPlayerStats: currentPlayerStats[];
    // serverInfo: ServerInfo;
    // job: Job;
}

export interface currentPlayerStats {
    playerId: number;
    playerName: string;
    playerFaction: string;
    playerRole: string;
    playerPing: number;
}

export interface ServerInfo {
    serverslots: number;
    Activecounts: number;
}

export interface Job {
    name: string;
    label: string;
    count: number;
    icon: string;
}
