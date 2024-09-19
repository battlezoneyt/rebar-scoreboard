<template>
    <div class="font-Roboto">
        <div class="flex justify-between">
            <div class="font-Roboto custom-scrollbar grid w-full gap-x-1 gap-y-1 sm:grid-cols-3 xl:grid-cols-7">
                <span v-for="(job, index) in props.jobs" :key="index">
                    <Job-Item :name="job.name" :label="job.label" :count="job.count" :icon="job.icon"></Job-Item>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import JobItem from './JobListHead.vue';
import { ServerInfo, Job } from '../../../shared/interface';
import { ref } from 'vue';
import { useTranslate } from '@Shared/translate';
import { defaultConfig } from '../../../shared/config';

interface Props {
    jobs: Job[];
}

const props = defineProps<Props>();
</script>
