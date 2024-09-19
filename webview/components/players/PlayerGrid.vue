<template>
    <div>
        <div class="rounded-br-lg rounded-tl-lg bg-gradient-to-r from-[#1D2E38] via-[#243139] to-[#172831]">
            <div class="flex items-center justify-between p-3">
                <div class="flex items-center">
                    <div
                        class="mr-2 inline-block rounded bg-gradient-to-r from-[#1DBC93] via-[#3CCC92] to-[#1FE293] px-3 py-0.5 text-center"
                    >
                        <span class="inline-block text-sm text-gray-50">{{ id }}</span>
                    </div>
                    <div class="flex gap-x-8">
                        <div class="flex flex-col">
                            <span class="font-bold uppercase tracking-wider text-white">
                                {{ name }}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    :class="[
                        'px-2 py-0.5 text-center shadow',
                        ping >= 60 ? 'border-[#FFA500] shadow-[#FFA500]' : 'border-[#00B1FF] shadow-[#00B1FF]',
                    ]"
                >
                    <div>
                        <span :class="['text-xs uppercase', ping >= 60 ? 'text-[#FFA500]' : 'text-[#00B1FF]']">
                            {{ t('scoreboard.player.ping') }}
                        </span>
                    </div>
                    <span :class="['text-sm', ping >= 60 ? 'text-[#FFA500]' : 'text-[#00B1FF]']"> {{ ping }} ms </span>
                </div>
            </div>
            <div class="flex justify-start">
                <img :src="design" alt="" class="w-72" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const design = './images/icons/Rectangle_35.svg';
import { useTranslate } from '@Shared/translate';
import { defaultConfig } from '../../../shared/config';
const { t } = useTranslate(defaultConfig.language);
interface Props {
    id: number;
    name: string;
    job: string;
    ping: number;
}
const props = defineProps<Props>();
</script>
