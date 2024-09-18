import alt from 'alt-client';

import { useWebview } from '@Client/webview/index.js';
import { ScoreboardEvents } from '../shared/events.js';
import { defaultConfig } from '../shared/config.js';

// useWebview().show('Scoreboard', 'page');

// useWebview().emit(ScoreboardEvents.toWebview.sendTotalPlayerCount, alt.Player.all.length);

// alt.on('connectionComplete', () => {
//     useWebview().emit(ScoreboardEvents.toWebview.sendTotalPlayerCount, alt.Player.all.length);
// });

const updateAllplayerStats = (data) => {
    if (useWebview().isSpecificPageOpen('Scoreboard')) {
        useWebview().emit(ScoreboardEvents.toWebview.sendAllplayerStats, data);
    }
};
alt.onServer(ScoreboardEvents.toClient.updateAllplayerStats, updateAllplayerStats);
