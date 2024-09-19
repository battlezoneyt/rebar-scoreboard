import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    de: {
        'scoreboard.character.nofound': 'Spielerstatistiken für Spieler-ID nicht gefunden: {{data.id}}',
        'scoreboard.servername.nofound': 'Laden...',
        'scoreboard.search.player.label': 'Spieler suchen',
        'scoreboard.player.name.unknown': 'Unbekannt',
        'scoreboard.player.job.label': 'ARBEIT: ',
        'scoreboard.player.job.unemployed': 'Arbeitslos',
        'scoreboard.player.playerlist': 'Spielerlisten',
        'scoreboard.player.Noplayerlist': 'Keine Spieler gefunden...',
        'scoreboard.player.ping': 'KLINGELN',
        'scoreboard.player.playercounts': 'Gesamtzahl der Spieler',
        'scoreboard.player.players.online': 'Online',
        'scoreboard.player.total.online': 'Spieler online',
    },
    en: {
        'scoreboard.character.nofound': 'Player stats not found for player ID: {{data.id}}',
        'scoreboard.servername.nofound': 'Loading...',
        'scoreboard.search.player.label': 'Seach Player',
        'scoreboard.player.name.unknown': 'Unknown',
        'scoreboard.player.job.label': 'JOB: ',
        'scoreboard.player.job.unemployed': 'Unemployed',
        'scoreboard.player.playerlist': 'Player Lists',
        'scoreboard.player.Noplayerlist': 'No players found...',
        'scoreboard.player.ping': 'PING',
        'scoreboard.player.playercounts': 'Total Players',
        'scoreboard.player.players.online': 'Online',
        'scoreboard.player.total.online': 'Players Online',
    },
});
