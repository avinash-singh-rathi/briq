/*
export function someMutation (state) {
}
*/
export const SetQuotes = (state,data) => {
  state.quotes=[...data];
}

export const SetQuote = (state,data) => {
  state.quotes.push(data);
}

export const SetKeywords =(state,data)=>{
	state.keywords=data;
}

export const SetProcessed =(state,data)=>{
	state.processed=data;
}