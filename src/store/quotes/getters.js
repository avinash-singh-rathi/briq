/*
export function someGetter (state) {
}
*/
export const GetQuotes = (state,data) => {
  return state.quotes;
}

export const GetKeywords = (state,data) => {
  return state.keywords;
}

export const GetProcessed = (state,data) => {
  return state.processed;
}