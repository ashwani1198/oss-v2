<script setup lang="ts">
import { ref, toRefs } from 'vue'
import Logo from '@/assets/images/nav-logo.png'
import { print } from '@/utils/print.Utils'
import { Square, X, RefreshCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { type Member } from '@/api/oss/models'

const props = defineProps<{
  isOpen: boolean
  member: Member
}>()

const { isOpen } = toRefs(props)
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
}>()

const close = () => {
  emit('update:isOpen', false)
}

const contract = ref()
const isLoading = ref(false)
const questions = ref([
  'Are you eighteen years or over ?',
  'Are you a Resident of Ottawa-Carleton region or neighboring towns?',
  'Are you a Canadian Citizen or Permanent Resident (PR card holder) of Canada? ',
  'Was your membership application ever revoked or rejected? '
])

const handleDownloadAsPdf = () => {
  isLoading.value = true
  setTimeout(() => {
    print(contract.value)
    isLoading.value = false
  }, 500)
}
</script>
<template>
  <Dialog :open="isOpen">
    <DialogContent
      class="sm:max-w-full md:max-w-[1100px] w-full max-h-[calc(100svh_-_90px)] overflow-y-auto custom-scrollbar-thin border-2 border-black"
      @pointer-down-outside=""
      @close-auto-focus="close"
      @escape-key-down="close"
    >
      <DialogTrigger as-child>
        <DialogClose class="absolute right-4 top-4 rounded-sm hover:opacity-100" @click="close">
          <X class="w-6 h-6" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogTrigger>
      <DialogHeader class="p-2 border-b border-black">
        <DialogTitle class="capitalize tracking-wide font-semibold">
          {{ `Contract of ${member.first_name} ${member.middle_name} ${member.last_name}` }}
        </DialogTitle>
        <DialogDescription>{{ '' }}</DialogDescription>
      </DialogHeader>
      <div class="w-full p-3 no-break" ref="contract">
        <div class="flex justify-between items-center">
          <img
            :src="Logo"
            alt="logo"
            class="md:w-[90px] w-[70px] cursor-pointer p-1 border-b border-black"
          />
          <div class="border border-black text-center border-dark p-2 appendixWidth">
            <h6 class="uppercase appendix-heading">Appendix 1 :</h6>
            <h6 class="uppercase appendix-description">
              Application For Membership of ottawa sikh society
            </h6>
          </div>
          <img
            :src="Logo"
            alt="logo"
            class="md:w-[90px] w-[70px] cursor-pointer p-1 border-b border-black"
          />
        </div>
        <div class="border border-black my-4 md:max-w-[1140px] sm:max-w-[720px] max-w-[540px]">
          <div class="grid grid-cols-3 border-b border-black">
            <div class="border-r border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                Last name : {{ member.last_name ?? '' }}
              </h1>
            </div>
            <div class="border-r border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                First name : {{ member.first_name ?? '' }}
              </h1>
            </div>
            <h1 class="capitalize font-size p-2 font-normal mb-0">
              Middle name : {{ member.middle_name ?? '' }}
            </h1>
          </div>
          <div class="w-full border-b border-black">
            <h5 class="capitalize font-size font-normal mb-0 p-2">
              Address : {{ member.address_line_1 }} {{ member.address_line_2 ?? '' }}
            </h5>
          </div>
          <div class="grid grid-cols-3 border-b border-black">
            <div class="border-r border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                City : {{ member.city ?? '' }}
              </h1>
            </div>
            <div class="border-r border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                Postal code : {{ member.postal_code ?? '' }}
              </h1>
            </div>
            <h1 class="capitalize font-size p-2 font-normal mb-0">
              Telephone : {{ member.primary_phone ?? '' }}
            </h1>
          </div>
          <div class="grid grid-cols-3">
            <div class="border-r border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                Membership Type : {{ member.membership_type ?? '' }}
              </h1>
            </div>
            <div class="border-r border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                Email : {{ member.email ?? '' }}
              </h1>
            </div>
            <div class=" border-black">
              <h1 class="capitalize font-size p-2 font-normal mb-0">
                Member Id : {{ member.id ?? '' }}
              </h1>
            </div>
          </div>
        </div>
        <h5 class="font-size mx-4">Please answer the following four questions:</h5>
        <div class="max-w-[660px]">
          <div class="flex justify-end items-center gap-1">
            <h1 class="font-size">Yes</h1>
            <h2 class="font-size">No</h2>
          </div>
        </div>
        <div
          class="flex flex-col max-w-[660px]"
          v-for="(question, index) in questions"
          :key="index"
        >
          <div class="flex justify-between items-center">
            <h1 class="font-size mb-1">{{ index + 1 }}. {{ question }}</h1>
            <div class="flex gap-1">
              <Square />
              <Square />
            </div>
          </div>
        </div>
        <h5 class="font-size mx-4 mt-2 text-center mb-0">
          NOTE: The applicant will be required to show a proof of identity and proof of Canadian
          citizenship or Permanent Resident card at the time of applying for membership or renewal
          of application
        </h5>
        <h5 class="font-size text-center mb-0">OATH</h5>
        <h5 class="font-size text-center mb-0">I hereby declare that:</h5>
        <h5
          style="word-wrap: break-word; word-break: normal"
          class="font-size mx-4 text-center mb-0"
        >
          I am a Sikh — meaning a person who believes in the teachings of the ten Gurus from Guru
          Nanak Dev Ji to Guru Gobind Singh Ji, the Guru Granth Sahib and believes in the concept of
          "Amrit". I do not follow or believe in any other religion, and I agree to abide by and
          uphold the aims and objectives of the Ottawa Sikh Society in accordance with its
          Constitution and By-Laws.
        </h5>
        <h5 class="font-size text-center my-4">
          Signed and Dated in my presence at Gurdwara Sahib (Ottawa Sikh Society)
        </h5>
        <div class="signature text-center font-size">
          <div class="p-2 border-t font-bold border-black mt-4 signatureWidth">Treasurer</div>
          <div class="p-2 border-t font-bold border-black mt-4 signatureWidth">Director</div>
        </div>
        <h5 class="font-size text-center my-4 font-bold">Applications Signature</h5>
        <div
          class="text-center md:max-w-[1140px] sm:max-w-[720px] max-w-[540px] applicationSignature"
        >
          <div class="grid grid-cols-4 gap-2">
            <div class="font-size font-bold">Receipt#</div>
            <div class="font-size font-bold">Day/Month/Year</div>
            <div class="font-size font-bold">Signature</div>
            <div class="font-size font-bold">Director</div>
          </div>
          <div class="grid grid-cols-4 my-6 gap-4" v-for="i in 6" :key="i">
            <div class="border-t border-black"></div>
            <div class="border-t border-black"></div>
            <div class="border-t border-black"></div>
            <div class="border-t border-black"></div>
          </div>
        </div>
        <div class="footer"></div>
        <div class="border-b border-black mt-1"></div>

        <h5 class="font-size mb-0 text-center font-normal">Ottawa Sikh Society</h5>
      </div>
      <DialogFooter>
        <div class="flex gap-2 justify-end">
          <Button
            type="button"
            @click="close"
            class="mt-5 bg-[#e5e7eb] hover:bg-[#e5e7eb] text-black w-32"
          >
            Cancel
          </Button>
          <Button type="button" class="mt-5 w-32" @click="handleDownloadAsPdf">
            <p v-if="!isLoading">Print</p>
            <RefreshCw v-else class="animate-spin" />
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<style scoped>
.appendixWidth {
  width: 270px;
}

.appendix-heading {
  font-size: 14px;
  font-weight: 500;
  font-family: serif;
}

.appendix-description {
  font-size: 16px;
  font-weight: 500;
  font-family: serif;
}

img {
  width: 90px;
}

.font-size {
  font-size: 16px;
  font-family: serif;
}

.questions {
  max-width: 660px;
}

.yes-no {
  max-width: 660px;
}

.signature {
  display: flex;
  justify-content: space-around;
}

.signatureWidth {
  width: 20%;
}

.applicationSignature {
  padding-left: 10%;
  padding-right: 10%;
}

.footer {
  width: 100%;
  border: 3px solid black;
}

@media screen and (max-width: 768px) {
  .appendixWidth {
    width: 150px; /* Adjust width as needed */
  }

  img {
    width: 70px;
  }

  .appendix-heading {
    font-size: 12px;
    font-weight: 500;
    font-family: serif;
  }

  .appendix-description {
    font-size: 13px;
    font-weight: 500;
    font-family: serif;
  }

  .font-size {
    font-size: 14px; /* Adjust font size as needed */
  }

  .yes-no {
    max-width: 300px;
  }

  .questions {
    max-width: 300px;
  }
  .applicationSignature {
    padding: 0%;
  }
}

@media print {
  @page {
    size: A4; /* or another size */
    margin:0mm
  }
}
</style>
