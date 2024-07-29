<script lang="ts" setup>
import NavbarLogo from '@/assets/images/nav-logo.png'
import { Button } from '@/components/ui/button'
import UserDropdown from '@/components/UserDropdown.vue'
import { useRouter, useRoute } from 'vue-router/auto'
const router = useRouter()
const route = useRoute()
</script>
<template>
  <div class="h-screen flex flex-col">
    <div class="h-20 px-6 fixed inset-x-0 top-0 bg-[#F6F8FC] w-full border-b border-gray-">
      <div
        class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto flex items-center justify-between w-full h-full"
      >
        <img
          :src="NavbarLogo"
          alt="logo"
          class="md:h-16 h-12 max-h-16 cursor-pointer"
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
    <div class="pt-20 bg-background w-full flex-grow overflow-y-auto">
      <slot />
    </div>
    <footer
      class="bg-black text-center text-white w-full md:py-[20px] p-[5px] md:text-[16px] text-[12px]"
    >
      <div class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto opacity-[0.7]">
        © 2024 IODATALABS – We do not allow any sort of representation in whole or in part without
        express written permission to info@iodatalabs.io.
      </div>
    </footer>
  </div>
</template>
