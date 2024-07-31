import { h } from 'vue'
import { useToast, ToastAction } from '@/components/ui/toast'

export function useErrorToast(msg: string, title?: string) {
  const { toast } = useToast()

  toast({
    title: title,
    description: msg,
    variant: 'destructive',
    class:
      'fixed bottom-0 md:bottom-5 right-[0px] md:right-5 rounded-none md:rounded-md w-full md:max-w-md',
    duration: 1500
  })
}

export function useDefaultToast({
  title,
  msg,
  duration
}: {
  title?: string
  msg: string
  duration?: number
}) {
  const { toast } = useToast()

  toast({
    title: title ?? 'Success',
    description: msg,
    variant: 'default',
    duration: duration ? duration : 5000,
    class: 'top-16 fixed left-0 rounded-none border-none bg-primary h-16 text-foreground',
    type: 'foreground'
  })
}

export function useActionToast({
  title,
  msg,
  autoDismiss,
  onClick
}: {
  title?: string
  msg: string
  autoDismiss?: boolean
  onClick: () => void
}) {
  const { toast } = useToast()

  toast({
    title: title ?? 'Success',
    description: msg,
    variant: 'default',
    duration: autoDismiss ? 1500 : 10000,
    class: 'bg-primary border-none text-background',
    action: h(
      ToastAction,
      {
        altText: 'Close',
        class: 'bg-primary hover:bg-primary border-secondary hover:border-accent',
        onClick: onClick
      },
      {
        default: () => "Let's Go!"
      }
    )
  })
}

export function useSuccessToast(msg: string) {
  const { toast } = useToast()

  toast({
    title: 'Success',
    description: msg,
    type: 'foreground',
    variant: 'default',
    duration: 1000,
    class: 'bg-green-500 text-white'
  })
}
