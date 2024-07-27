<script lang="ts" setup>
import UserProfile from '@/assets/images/user-profile.png'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-vue-next'

const logoutUser = () => {
  console.log('/logout')
}
</script>

<template>
  <HoverCard :open-delay="0">
    <HoverCardTrigger>
      <Avatar>
        <AvatarImage :src="UserProfile" alt="user-profile" />
        <AvatarFallback>OSS</AvatarFallback>
      </Avatar>
    </HoverCardTrigger>
    <HoverCardContent :side="'bottom'" :align="'center'" class="p-1">
      <div class="flex justify-center">
        <Button @click="logoutUser" variant="ghost">
          <LogOut class="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
