import alt from 'alt-client';

import { useWebview } from '@Client/webview/index.js';
import { ScoreboardEvents } from '../shared/events.js';
import { defaultConfig } from '../shared/config.js';

const updateAllplayerStats = (data) => {
    if (useWebview().isSpecificPageOpen('Scoreboard')) {
        useWebview().emit(ScoreboardEvents.toWebview.sendAllplayerStats, data);
    }
};
alt.onServer(ScoreboardEvents.toClient.updateAllplayerStats, updateAllplayerStats);
