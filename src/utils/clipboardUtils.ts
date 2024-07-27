export const handlePaste = (evt: ClipboardEvent, cb: (...args: any[]) => void) => {
  const { clipboardData } = evt

  if (!clipboardData) {
    return
  }

  const clipboardText = clipboardData.getData('text/plain')

  cb(clipboardText)
}
