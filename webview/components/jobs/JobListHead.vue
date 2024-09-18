<template>
    <div class="flex items-center">
        <div class="rounded-md bg-gradient-to-r from-[#0B8DC9] via-[#0A8AC4] to-[#1176A2] p-2">
            <img :src="`./images/icons/` + props.icon + `.svg`" alt="jobicons" class="h-9 w-9 text-gray-50" />
        </div>
        <div class="p-2">
            <div>
                <h3 class="text-[#989898]">{{ props.label }}</h3>
            </div>
            <div class="flex items-center">
                <img v-if="props.count > 0" :src="dotbox" class="mr-1 w-4" alt="reddotbox" />
                <img v-else :src="reddotbox" class="mr-2 w-2 text-red-600" alt="dotbox" />

                <div class="flex items-center gap-x-1">
                    <h3 class="text-sm uppercase text-white">{{ props.count }}</h3>
                    <span class="text-sm uppercase text-white">ONLINE</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dotbox from '../../icons/dotbox.svg';
import reddotbox from '../../icons/reddot.svg';

interface Props {
    name: string;
    label: string;
    count: number;
    icon: string;
}
const props = defineProps<Props>();
</script>
