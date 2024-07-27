<script setup lang="ts">
import { onMounted } from 'vue';
import { AppApi } from '@/api/AppApi';

const fetchMembers = async () => {
    const [err,result ] = await AppApi.members.members.getMembers()
    console.log(result)
}

onMounted(async () => {
    await fetchMembers()
})
</script>
<template>
    <div class="">
        members
    </div>
</template>