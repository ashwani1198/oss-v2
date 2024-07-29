<script setup lang="ts">
import { FIEmail } from '@/components/formInputs/FIEmail'
import { FIPassword } from '@/components/formInputs/FIPassword'
import Button from '@/components/ui/button/Button.vue'

import { RefreshCw } from 'lucide-vue-next'
import { useRouter } from 'vue-router/auto'
import { useEmailLogin } from '@/composables/forms/auth/useEmailLogin'

const router = useRouter()
const { form, canSubmit } = useEmailLogin()

const onSubmit = () => {
  if (canSubmit.value) {
    router.push({ name: '/members/' })
  }
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="">
    <div class="flex flex-col">
      <div class="space-y-3 p-3">
        <FIEmail :form="form" form-key="email_address" label="Email Address" />
        <FIPassword :form="form" form-key="password" label="Password" />
      </div>
    </div>
    <Button type="submit" class="mt-5 w-full" :disabled="!canSubmit">
      <p v-if="!form.isSubmitting.value">Log In</p>
      <RefreshCw v-else class="animate-spin" />
    </Button>
  </form>
</template>
