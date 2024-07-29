<script setup lang="ts">
import Logo from '@/assets/images/nav-logo.png'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import EmailLogin from './components/EmailLogin.vue'
</script>
<template>
  <div
    class="flex place-items-center place-content-center h-[calc(100svh_-_0px)] p-4 sm:p-0 bg-muted"
  >
    <div class="flex flex-col items-center justify-center h-full space-y-3 w-full">
      <div
        class="h-full max-h-32 md:max-h-40 w-full relative flex flex-col items-center justify-center"
      >
        <img :src="Logo" alt="login logo" class="h-full w-full object-contain" />
      </div>
      <Card class="max-w-[320px] md:max-w-[400px] w-full shadow-md shadow-gray-300">
        <CardContent>
          <div>
            <EmailLogin />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
