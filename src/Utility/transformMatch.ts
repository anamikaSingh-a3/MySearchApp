export const transformMatch = (inputString: string, matchString: string) =>
  inputString.replace(
    new RegExp(matchString, "gi"),
    (match) => `<span style="color: #2769AA">${match}</span>`
  )
