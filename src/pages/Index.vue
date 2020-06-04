<template>
  <q-page class="">
  		<div class="q-pa-lg doc-container q-my-lg">
	    	<div class="row">
	    		<div v-if="RandomQuote" class="col-md-6 offset-md-3 text-h4">
	    			<i class="fa fa-quote-left q-mr-sm" aria-hidden="true"></i>
					<span class="text-italic text-h5">{{RandomQuote.en}}</span><br>
					<span class="float-right text-h5">-{{RandomQuote.author}}</span>
					<div v-if="RandomQuote.rating !=undefined">
						<q-rating v-model="RandomQuote.rating" max="5" size="1em" @input="getRating" color="brand" icon="star_border" icon-selected="star" icon-half="star_half"/>
					</div>
					<div class="float-right q-mt-lg">
						<q-btn class="text-white bg-brand" @click="nextQuote" label="Next" />
					</div>	
				</div>
	    	</div>
    	</div>
  </q-page>
</template>

<script>
/*

*/
import {union,intersection,difference,complement,equals,} from 'set-manipulator';
export default {
  name: 'PageIndex',
  data(){
  	return {
  		//
  		quotes:[],
  		RandomQuote:{},
  		rating:0,
  	}
  },
  computed:{
  	keywords(){
  		return this.$store.state.quotes.keywords;
  	},
  	processed(){
  		return this.$store.state.quotes.processed;
  	},
  	newquotes(){
  		return this.$store.state.quotes.quotes;	
  	}
  },
  methods:{
  	getQuotesAPI(){
  		this.$store.dispatch("quotes/doQuotes").then(response=>{
          this.quotes=response.data;
          this.getRandomQuote();
      	});
  	},
  	getRandom(min,max){
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min;
  	},
  	getRandomQuote(){
  		let quotes=this.quotes;
  		if(quotes.length > 0){
  			let rand = this.getRandom(0,quotes.length-1);
  			this.RandomQuote= Object.assign({}, quotes[rand]);	
  			this.fixIndexRating(rand)
  		}
  	},
  	getRating(value){
  		this.rating=value;
  	},
  	nextQuote(){
  		if(this.rating >=4){
  			this.getSimilarQuote();
  			this.rating=0;
  			return;
  		}
  		this.getRandomQuote();
  	},
  	getSimilarQuote(){
  		let index=this.RandomQuote.index;
  		let quotekeywords=[...this.newquotes[index].keywords];
  		if(quotekeywords.length >1){
  			let firstkeyword = [...this.keywords[quotekeywords[0]]]
  			let secondkeyword=[...this.keywords[quotekeywords[1]]]
  			//Find the common index between both
  			let results=intersection(firstkeyword,secondkeyword)
  			//to prevent the same quote again
  			results=results.filter(resultindex =>  resultindex != index)
  			if(results.length > 0){
  				this.RandomQuote = Object.assign({}, this.quotes[results[0]]);
  				this.fixIndexRating(results[0]);
  				return;
  			}

  			this.getRandomQuote();	
  		}
  	},
  	fixIndexRating(value){
  		if(this.RandomQuote.rating == undefined){
  				this.RandomQuote.rating=0;
  		}
  		this.RandomQuote.index=value;
  	}

  },
  mounted(){
  	this.getQuotesAPI();

  }
}
</script>
