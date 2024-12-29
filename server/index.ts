import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { useTranslate } from '@Shared/translate.js';
import { useWebview } from '@Server/player/webview.js';
import '../translate/index.js';
import { ScoreboardEvents } from '../shared/events.js';
import { defaultConfig } from '../shared/config.js';
import { currentPlayerStats, stats } from '../shared/interface.js';

const { t } = useTranslate(defaultConfig.language);

const Rebar = useRebar();
const api = Rebar.useApi();
const Keybinder = Rebar.useKeybinder();
let interval;
const allPlayerStats: { [key: number]: currentPlayerStats } = {};

class InternalFunctions {
    static update(playerStats: currentPlayerStats) {
        if (allPlayerStats[playerStats.playerId]) {
            allPlayerStats[playerStats.playerId].playerPing = playerStats.playerPing;
        } else {
            allPlayerStats[playerStats.playerId] = playerStats;
        }
        if (defaultConfig.Enable && !defaultConfig.disablePlayerList && !interval) {
            interval = alt.setInterval(handlePingUpdate, 6000);
        }
        updatePlayers();
    }
}

function updatePlayers() {
    for (let player of alt.Player.all) {
        player.emit(ScoreboardEvents.toClient.updateAllplayerStats, Object.values(allPlayerStats));
    }
}

if (defaultConfig.Enable) {
    Keybinder.on(defaultConfig.OpenScoreboard, (player) => {
        handleScoreboardCreated(player);
    });
}

async function handleScoreboardCreated(player: alt.Player) {
    const character = Rebar.document.character.useCharacter(player);
    const data = character.get();

    const view = useWebview(player);

    Rebar.player.useWorld(player).disableControls();
    view.show('Scoreboard', 'page');

    const currentPlayerStats = allPlayerStats[data.id];
    if (!currentPlayerStats) {
        console.error(t('scoreboard.character.nofound'));
        return;
    }

    const stats: stats = {
        playerStats: {
            playerId: currentPlayerStats.playerId,
            playerName: currentPlayerStats.playerName,
            playerFaction: currentPlayerStats.playerFaction,
            playerDuty: currentPlayerStats.playerDuty,
            playerRole: currentPlayerStats.playerRole,
            playerPing: currentPlayerStats.playerPing,
        },
        allPlayerStats: Object.values(allPlayerStats),
    };

    view.emit(ScoreboardEvents.toClient.enableScoreboard, stats);
}

async function handleCharacterCreated(player: alt.Player) {
    const rebarPlayer = Rebar.usePlayer(player);
    if (!rebarPlayer.status.hasCharacter()) return;
    try {
        const character = Rebar.document.character.useCharacter(player);
        const data = character.get();
        if (!data) {
            throw new Error('Character data is undefined');
        }
        const permission = Rebar.permissions.usePermissions(player);
        const isAdmin = permission.account.permissions.has('admin');
        let playerFactionName;
        let playerDuty;
        if (data.faction) {
            const factionAPI = await api.getAsync('rebar-faction-api');
            playerFactionName = factionAPI.factionHandlers.findFactionById(data.faction);
            playerDuty = await factionAPI.dutyHandlers.getDuty(data.faction, data.id);
        }
        const currentPlayerStats: currentPlayerStats = {
            playerId: data.id,
            playerName: data.name,
            playerFaction: data.faction ? playerFactionName.factionName : 'Unemployed',
            playerDuty: playerDuty ? playerDuty : false,
            playerRole: isAdmin ? 'ADMIN' : 'PLAYER',
            playerPing: player.ping,
        };
        allPlayerStats[data.id] = currentPlayerStats;

        InternalFunctions.update(allPlayerStats[data.id]);
    } catch (error) {
        console.error('Error in handleCharacterCreated:', error);
    }
}

async function handleDisconnect(player: alt.Player) {
    const character = Rebar.document.character.useCharacter(player);
    const data = await character.get();
    if (!character || !data) return;
    delete allPlayerStats[data.id];
}

alt.onClient(ScoreboardEvents.toServer.hideScoreboard, (player: alt.Player) => {
    const view = useWebview(player);
    view.hide('Scoreboard');
    Rebar.player.useWorld(player).enableControls();
});

alt.on('rebar:playerCharacterBound', (player, document) => {
    handleCharacterCreated(player);
});

alt.on('playerDisconnect', handleDisconnect);

function handlePingUpdate() {
    const currentPlayers = [...alt.Player.all];

    for (let i = 0; i < currentPlayers.length; i++) {
        const player = currentPlayers[i];
        if (player || player.valid) {
            handleCharacterCreated(player);
        }
    }
}
