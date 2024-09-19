<template>
    <div style="height: 100vh; width: 100vw">
        <div class="container mx-auto mt-9 p-3">
            <Transition name="slide-fade">
                <Header
                    v-if="isScoreboardVisible"
                    :myId="playerInfo.playerId"
                    :myName="playerInfo.playerName"
                    :myJob="playerInfo.playerFaction"
                    :myRole="playerInfo.playerRole"
                    :myPing="ping"
                    :playersOnline="playersOnline"
                    :jobs="jobs"
                    :playersList="playersList"
                />
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import Header from './components/Header.vue';
import { useEvents } from '../../../../webview/composables/useEvents';
import { ScoreboardEvents } from '../shared/events';
import { defaultConfig, Jobs } from '../shared/config';
import { currentPlayerStats, Job, stats } from '../shared/interface';
import { usePlayerStats } from '@Composables/usePlayerStats';

import '../translate/index';
const Events = useEvents();

const isScoreboardVisible = ref(false);
const playerInfo = ref<currentPlayerStats>({
    playerId: 0,
    playerName: '',
    playerFaction: '',
    playerRole: '',
    playerPing: 0,
});
const playersOnline = ref(0);
const playersList = ref<currentPlayerStats[]>();
const jobs = ref<Job[]>();

const { ping } = usePlayerStats();
function handleClose() {
    isScoreboardVisible.value = !isScoreboardVisible.value;
    setTimeout(() => {
        Events.emitServer(ScoreboardEvents.toServer.hideScoreboard);
    }, 500);
}

function handleKeyUp() {
    Events.onKeyUp('scoreboardCloseesc', 27, handleClose);
    Events.onKeyUp('scoreboardCloseHomeKey', defaultConfig.OpenScoreboard, handleClose);
}

function handleOffKeyUp() {
    Events.offKeyUp('scoreboardCloseesc');
    Events.offKeyUp('scoreboardCloseHomeKey');
}

const init = () => {
    Events.on(ScoreboardEvents.toClient.enableScoreboard, (data: stats) => {
        isScoreboardVisible.value = true;
        playerInfo.value = {
            playerId: data.playerStats.playerId,
            playerName: data.playerStats.playerName,
            playerFaction: data.playerStats.playerFaction,
            playerRole: data.playerStats.playerRole,
            playerPing: data.playerStats.playerPing,
        };
        playersOnline.value = data.allPlayerStats.length;
        updateDetails(data.allPlayerStats);
    });
    Events.on(ScoreboardEvents.toWebview.sendAllplayerStats, (data: currentPlayerStats[]) => {
        if (isScoreboardVisible.value) {
            playersOnline.value = data.length;
            updateDetails(data);
        }
    });
};

function updateDetails(data: currentPlayerStats[]) {
    jobs.value.forEach((job) => {
        job.count = 0;
    });

    data.forEach((player) => {
        const matchingJob = jobs.value.find((job) => job.name.toLowerCase() === player.playerFaction.toLowerCase());
        if (matchingJob) {
            matchingJob.count++;
        }
    });
    playersList.value = data;
}

const enableDebugMode = () => {
    if (defaultConfig.debugMode) {
        isScoreboardVisible.value = true;
        playersList.value = [
            {
                playerId: 1,
                playerName: 'Sunni Khanth',
                playerFaction: 'police',
                playerRole: '',
                playerPing: 55,
            },
            {
                playerId: 12,
                playerName: 'Khanth Sunni',
                playerFaction: 'police',
                playerRole: '',
                playerPing: 555,
            },
            {
                playerId: 13,
                playerName: 'Punda Mavan',
                playerFaction: 'ambulance',
                playerRole: '',
                playerPing: 5,
            },
            {
                playerId: 15,
                playerName: 'Punda Madddn',
                playerFaction: 'taxi',
                playerRole: '',
                playerPing: 5,
            },
        ];

        updateDetails(playersList.value);
        playersOnline.value = playersList.value.length;
    }
};

onMounted(() => {
    jobs.value = Jobs;
    handleKeyUp();
    enableDebugMode();
    init();
});

onUnmounted(() => {
    handleOffKeyUp();
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition:
        transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
        opacity 0.5s ease-out;
}

.slide-fade-enter-from {
    transform: translateY(-100%); /* Slide in from the top */
    opacity: 0;
}

.slide-fade-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-fade-leave-from {
    transform: translateY(0); /* Start from the normal position */
    opacity: 1;
}

.slide-fade-leave-to {
    transform: translateY(-100%); /* Slide out to the top */
    opacity: 0;
}
</style>
