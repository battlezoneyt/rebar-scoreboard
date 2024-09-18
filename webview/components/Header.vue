<template>
    <div>
        <div class="font-Roboto rounded-t-lg bg-[#112836] p-7 text-gray-50">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold uppercase tracking-wider">
                        {{ defaultConfig.serverName ? defaultConfig.serverName : 'Loading...' }}
                    </h1>
                </div>
                <div>
                    <div class="mx-auto max-w-xs">
                        <div v-if="!defaultConfig.disablePlayerList">
                            <input
                                type="text"
                                v-model="searchQuery"
                                class="header-search-bg block rounded-lg border-none p-2 text-white outline-none"
                                placeholder="Search Player"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div>
                        <div class="flex items-center gap-x-2">
                            <div>
                                <span class="header-ctm-num-bg rounded px-2 font-bold">
                                    {{ props.myId ? props.myId : 0 }}
                                </span>
                            </div>

                            <div>
                                <span class="text-xl font-bold uppercase">
                                    {{ props.myName ? props.myName : 'Unknown' }}
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center gap-x-1">
                            <div>
                                <span class="text-gray-500">JOB: </span>
                            </div>
                            <div>
                                <span class="text-ctm_text1 mr-2 font-bold uppercase">
                                    {{ props.myJob ? props.myJob : 'Unemployed' }}
                                </span>
                            </div>
                            <div class="flex items-center gap-x-1">
                                <span>
                                    <GiAerialSignal class="text-lg text-[#13FF00]" />
                                </span>
                                <span class="text-xs text-gray-400"> {{ props.myPing ? props.myPing : 0 }} ms </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="header-ctm-profile-bg rounded-md">
                            <h1>
                                <FaUserAstronaut />
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-0.5 bg-gradient-to-r from-[#112d39] to-[#2b2c30] px-7 py-4">
            <JobList :serverslots="defaultConfig.maxPlayers" :Activecounts="props.playersOnline" :jobs="props.jobs" />
        </div>
        <div
            v-if="!defaultConfig.disablePlayerList"
            class="mt-0.5 bg-gradient-to-r from-[#16242F] to-[#1E2223] px-7 py-4"
        >
            <div>
                <span class="uppercase tracking-wider text-gray-50">Player Lists</span>
            </div>
            <main class="mt-3">
                <div>
                    <div class="font-Roboto grid max-h-[700px] grid-cols-3 items-center gap-3 overflow-y-scroll">
                        <div v-if="filteredPlayers.length === 0" class="text-gray-400">No players found....</div>
                        <div v-else>
                            <PlayerItem
                                v-for="(player, index) in filteredPlayers"
                                :key="index"
                                :id="player.playerId"
                                :name="player.playerName"
                                :job="player.playerFaction"
                                :ping="player.playerPing"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import PlayerItem from '../components/players/PlayerGrid.vue';
import GiAerialSignal from '../icons/GiAerialSingnal.vue';
import FaUserAstronaut from '../icons/FaUserAstronaut.vue';
import JobList from './jobs/JobList.vue';
import { currentPlayerStats, Job } from '../../shared/interface';
import { defaultConfig } from '../../shared/config';

const searchQuery = ref('');

interface Props {
    myId: number;
    myName: string;
    myJob: string;
    myRole: string;
    myPing: number;
    playersOnline: number;
    jobs: Job[];
    playersList: currentPlayerStats[];
}

const props = defineProps<Props>();

const allPlayers = ref<currentPlayerStats[]>([]);

watch(
    () => props.playersList,
    (newPlayersList) => {
        allPlayers.value = newPlayersList || [];
    },
    { immediate: true },
);

const filteredPlayers = computed(() => {
    return allPlayers.value.filter((player) =>
        player.playerName.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
});

onMounted(() => {
    if (props.playersList) {
        allPlayers.value = props.playersList;
    }
});
</script>

<style scoped>
.header-search-bg {
    background: linear-gradient(90deg, rgba(36, 89, 114, 1) 0%, rgba(36, 89, 114, 1) 0%, rgba(13, 74, 102, 1) 100%);
}

.header-ctm-num-bg {
    background: rgb(36, 89, 114);
    background: radial-gradient(
        circle,
        rgba(36, 89, 114, 1) 0%,
        rgba(25, 137, 108, 1) 0%,
        rgba(40, 186, 127, 1) 57%,
        rgba(40, 186, 127, 1) 100%
    );
}

.header-ctm-profile-bg {
    background: rgb(36, 89, 114);
    background: radial-gradient(
        circle,
        rgba(36, 89, 114, 1) 0%,
        rgba(11, 167, 58, 1) 0%,
        rgba(21, 197, 73, 1) 57%,
        rgba(9, 172, 57, 1) 100%
    );
}
</style>
