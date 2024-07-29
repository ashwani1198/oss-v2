<script lang="ts" setup>
import NavbarLogo from '@/assets/images/nav-logo.png'
import { Button } from '@/components/ui/button'
import UserDropdown from '@/components/UserDropdown.vue'
import { useRouter, useRoute } from 'vue-router/auto'
const router = useRouter()
const route = useRoute()
</script>
<template>
  <div class="h-[calc(100svh_-_0px)] max-h-[calc(100svh_-_0px)] w-full">
    <div class="h-20 px-6 fixed inset-y-0 bg-[#F6F8FC] w-full border-b border-gray-">
      <div
        class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto flex items-center justify-between w-full h-full"
      >
        <img
          :src="NavbarLogo"
          alt="logo"
          class="md:h-16 h-12 max-h-16"
          @click="() => router.push({ name: '/members/' })"
        />
        <div class="flex items-center space-x-4 gap-2">
          <Button
            variant="ghost"
            @click="() => router.push({ name: '/members/' })"
            class="h-20 flex md:text-xl items-center cursor-pointer rounded-none font-semibold tracking-wider capitalize"
            :class="
              route.name === '/members/'
                ? 'border-b-[4px] border-primary text-primary font-bold'
                : ''
            "
          >
            {{ 'Members' }}
          </Button>
          <div class="hidden md:block">
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-20 bg-background w-full max-h-[calc(100svh_-_0px)] min-h-[calc(100svh_-_0px)]">
      <slot />
    </div>
  </div>
</template>
