export const ScoreboardEvents = {
    toServer: {
        hideScoreboard: 'scoreboard:event:close',
    },
    toClient: {
        enableScoreboard: 'scoreboard:event:open',
        updateAllplayerStats: 'scoreboard:update:allplayer:stats',
    },
    toWebview: {
        sendTotalPlayerCount: 'scorebord:webview:sent:player:count',
        sendAllplayerStats: 'scoreboard:webview:sent:allplayer:stats',
    },

    fromServer: {},
};
