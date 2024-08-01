<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useMembers } from '@/stores/members/useMembers';
import { storeToRefs } from 'pinia';

const { selectedMember } = storeToRefs(useMembers())

</script>
<template>
  <Card
    class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto w-full h-full p-3 custom-scrollbar-thin shadow-lg shadow-gray-300"
  >
  {{ selectedMember?.first_name ?? 'jjj' }}
    <CardHeader class="pt-0 w-full md:w-auto p-3">
        Personal Info 
    </CardHeader>
  </Card>
</template>
