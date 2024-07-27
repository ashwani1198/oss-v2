<script lang="ts" setup>
import NavbarLogo from '@/assets/images/nav-logo.png'
import UserDropdown from '@/components/UserDropdown.vue'
</script>
<template>
  <div class="h-[calc(100svh_-_0px)] max-h-[calc(100svh_-_0px)] w-full">
    <div class="h-20 px-6 fixed inset-y-0 bg-[#F6F8FC] w-full border-b border-gray-">
      <div
        class="md:max-w-[1140px] sm:max-w-[720px] max-w-[540px] mx-auto flex items-center justify-between w-full h-full"
      >
        <img :src="NavbarLogo" alt="logo" class="md:h-16 h-12 max-h-16" />
        <div class="flex items-center space-x-4">
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
