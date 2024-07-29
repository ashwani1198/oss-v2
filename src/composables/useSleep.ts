export function sleep(seconds: number): Promise<void> {
  // return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  return new Promise((resolve, reject) => {
    if (seconds < 0) {
      resolve()
    }

    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}
