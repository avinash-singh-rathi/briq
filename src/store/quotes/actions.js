/*
export function someAction (context) {
}
*/
import Vue from 'vue'
import { Notify, Loading, LoadingBar } from 'quasar'
import keyword_extractor from 'keyword-extractor';
const NLP = require('google-nlp')

const extractsetting={
  			language:"english",
  			remove_digits:true,
  			return_changed_case:true,
  			remove_duplicates:true
		};

const quotekeywords = {};
const quotesdata=[];

export const doQuotes = ({ state,commit, dispatch }) => {
  Loading.show();
  LoadingBar.start();
  return Vue.prototype.$axios
    .get(process.env.API+'quotes/lang/en')
    .then(response => {
    	if(response.data){
    		ProcessArray(response.data,ProcessQuotes,ProcessQuotesDone,state,commit)
    	}
      Loading.hide()
      LoadingBar.stop();
      return response;
    })
    .catch(e => {
      Loading.hide();
      LoadingBar.stop();
      return e;
    })
}

/*
* Function to extract the keywords
*/
const extractMe = function(sentence){
  	return keyword_extractor.extract(sentence,extractsetting);
}

/*
Function to process the array in queue
*/
const ProcessArray = (data,handler, callback,state,commit) =>{
	let maxtime = 100;		// chunk processing time
  	let delay = 20;		// delay between processes
  	let queue = data.concat();

  	let process = function() {
	    var endtime = +new Date() + maxtime;
	    
	    do {
	      handler(Object.assign({}, queue.shift()),commit);
	    } while (queue.length > 0 && endtime > +new Date());
	    
	    if (queue.length > 0) {
	      setTimeout(process, delay);
	    }
	    else {
	      if (callback) callback(state,commit);
	    }

  	}

  	setTimeout(process, delay);
}

//Function to process the individual quote, extract keyword and add keyword to it
const ProcessQuotes = (quote,commit) => {
	 			let keywords=extractMe(quote.en);
    			quote.keywords=[...keywords];
    			quotesdata.push(quote);
    			keywords.forEach(keyword => {
    				let index = quotesdata.length -1;
    				if(!quotekeywords[keyword]){
    					quotekeywords[keyword]=[];	
    				}
    				quotekeywords[keyword].push(index);    				
    			});
    			//commit('SetQuote',quote);
}

//function to process Quote with Google NLP
const ProcessNLPQuotes = (quote,commit) => {
	let nlp = new NLP( process.env.GoogleNLP)
	nlp.analyzeEntities( quote )
    .then(function( entities ) {
        		quote.keywords=[...entities];
    			quotesdata.push(quote);
    			entities.forEach(keyword => {
    				let index = quotesdata.length -1;
    				if(!quotekeywords[keyword]){
    					quotekeywords[keyword]=[];	
    				}
    				quotekeywords[keyword].push(index);    				
    			});

    });
}

//Function to commit the quote and keywords to the state
const ProcessQuotesDone = (state,commit) =>{
		commit('SetQuotes',quotesdata);
		let keywords =Object.assign({}, quotekeywords);
		commit('SetKeywords',keywords);
		commit('SetProcessed',true);
		console.log('array processed')
}