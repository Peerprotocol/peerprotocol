const range = (start: number, end?: number) => {
  const result = []

  if (typeof end === "undefined") {
    end = start
    start = 0
  }

  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export { range }
