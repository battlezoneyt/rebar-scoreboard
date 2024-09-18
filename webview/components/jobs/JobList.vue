<template>
    <div class="font-Roboto">
        <div class="flex justify-between">
            <div class="font-Roboto custom-scrollbar grid gap-x-4 gap-y-2 sm:grid-cols-3 xl:grid-cols-7">
                <span v-for="(job, index) in props.jobs" :key="index">
                    <Job-Item :name="job.name" :label="job.label" :count="job.count" :icon="job.icon"></Job-Item>
                </span>
            </div>

            <div>
                <h1 class="text-xl uppercase text-[#8E8F91]">Total Players</h1>
                <div>
                    <span class="flex gap-x-1">
                        <img :src="dotbox" alt="dotbox" class="w-4" />
                        <span class="uppercase text-white">
                            {{ props.Activecounts }}/{{ props.serverslots }} Online
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dotbox from '../../icons/dotbox.svg';
import JobItem from './JobListHead.vue';
import { ServerInfo, Job } from '../../../shared/interface';
import { ref } from 'vue';
interface Props {
    serverslots: number;
    Activecounts: number;
    jobs: Job[];
}

const props = defineProps<Props>();

</script>
