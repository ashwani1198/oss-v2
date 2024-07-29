<script setup lang="ts">
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-vue-next'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useRouter } from 'vue-router/auto'

import { type Member } from '@/api/oss/models'

const props = defineProps<{
  member: Member
}>()

const test = (member: Member) => {
  console.log('test', member)
}

const viewProfile = (memberId: number) => {
  router.push(`/members/${memberId}`)
}

const router = useRouter()
</script>
<template>
  <TableRow class="group odd:bg-white even:bg-gray-100">
    <TableCell class="font-medium p-2">
      {{ member.ref_id }}
    </TableCell>
    <TableCell class="max-w-md p-2">{{ member.first_name }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.middle_name }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.last_name }} </TableCell>
    <TableCell class="max-w-md p-2"
      >{{ member.address_line_1 }} {{ member.address_line_2 ?? '' }}
    </TableCell>
    <TableCell class="max-w-md p-2">{{ member.city }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.last_document_sigining_date }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.renewal_date }} </TableCell>
    <TableCell class="max-w-md p-2 capitalize">{{ member.membership_type }} </TableCell>
    <TableCell>
      <div class="md:block hidden">
        <HoverCard :open-delay="0" :close-delay="0">
          <HoverCardTrigger>
            <Button size="icon" variant="ghost">
              <Ellipsis class="h-6 w-6 text-black" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent :side="'bottom'" :align="'center'" class="p-1 text-left">
            <Button class="w-full flex justify-start" variant="ghost" @click="test(member)">
              Edit
            </Button>
            <Button class="w-full flex justify-start" variant="ghost"> Delete </Button>
            <Button class="w-full flex justify-start" variant="ghost"> Add Notes </Button>
            <Button class="w-full flex justify-start" variant="ghost"> Add Receipt </Button>
            <Button class="w-full flex justify-start" variant="ghost">
              Add Document Signing Date
            </Button>
            <Button class="w-full flex justify-start" variant="ghost">View Contract </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="viewProfile(member.id)"
              >View Profile
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div class="md:hidden">
        <Popover>
          <PopoverTrigger>
            <Button size="icon" variant="ghost">
              <Ellipsis class="h-6 w-6 text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent :align="'center'" :side="'bottom'" class="p-1">
            <Button class="w-full flex justify-start" variant="ghost" @click="test(member)">
              Edit
            </Button>
            <Button class="w-full flex justify-start" variant="ghost"> Delete </Button>
            <Button class="w-full flex justify-start" variant="ghost"> Add Notes </Button>
            <Button class="w-full flex justify-start" variant="ghost"> Add Receipt </Button>
            <Button class="w-full flex justify-start" variant="ghost">
              Add Document Signing Date
            </Button>
            <Button class="w-full flex justify-start" variant="ghost">View Contract </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="viewProfile(member.id)"
              >View Profile
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </TableCell>
  </TableRow>
</template>
