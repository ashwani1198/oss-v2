export const print = (element: HTMLElement | null) => {
  if (!element) return
  const printWindow = window.open('', '_blank') as Window
  const printDocument = printWindow.document

  printDocument.open()
  printDocument.write('<html><head><title>Print</title>')

  // Clone the current stylesheets into the print window
  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      if (styleSheet.href) {
        printDocument.write(`<link rel="stylesheet" type="text/css" href="${styleSheet.href}">`)
      } else if (styleSheet.cssRules) {
        const css = Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n')
        printDocument.write(`<style>${css}</style>`)
      }
    } catch (e) {
      console.error('Error accessing stylesheet', e)
    }
  })

  printDocument.write('</head><body>')
  printDocument.write(element.outerHTML)
  printDocument.write('</body></html>')
  printDocument.close()

  // Print and close the window after a short delay
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 500)
}
