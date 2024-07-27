<script lang="ts" setup>
import NavbarLogo from '@/assets/images/nav-logo.png'
import Button from '@/components/ui/button/Button.vue';
import UserDropdown from '@/components/UserDropdown.vue';
</script>
<template>
  <div class="h-[calc(100svh_-_0px)] max-h-[calc(100svh_-_0px)] w-full">
    <div class="h-20 px-6 fixed inset-y-0 bg-[#F6F8FC] w-full border-b border-primary/50">
      <div class="md:max-w-[1140px] sm:max-w-[720px] max-w-[540px] mx-auto flex items-center justify-between w-full h-full">
        <img :src="NavbarLogo" alt="logo" class="h-16 max-h-16" />
        <div class="flex items-center space-x-4">
          <UserDropdown/>
        </div>
      </div>
    </div>
    <div class="pt-25 bg-background w-full max-h-[calc(100svh_-_0px)] min-h-[calc(100svh_-_0px)]">
      <slot />
    </div>
  </div>
</template>
