<template>
  <q-page class="">
  		<div class="q-pa-lg doc-container q-my-lg">
	    	<div class="row">
	    		<div v-if="RandomQuote" class="col-md-6 offset-md-3 text-h4">
	    			<i class="fa fa-quote-left q-mr-sm" aria-hidden="true"></i>
					<span class="text-italic text-h5">{{RandomQuote.en}}</span><br>
					<span class="float-right text-h5">-{{RandomQuote.author}}</span>
					<q-rating v-model="RandomQuote.rating" max="5" size="1em" color="brand" icon="star_border" icon-selected="star" icon-half="star_half"/>
				</div>
	    	</div>
    	</div>
  </q-page>
</template>

<script>
/*

*/
//import keyword_extractor from 'keyword-extractor';
export default {
  name: 'PageIndex',
  data(){
  	return {
  		extractsetting:{
  			language:"english",
  			remove_digits:true,
  			return_changed_case:true,
  			remove_duplicates:false
  		},
  		quotes:[]
  	}
  },
  computed:{
  	RandomQuote(){
  		return this.quotes[this.getRandom(0,this.quotes.length-1)];
  	}
  },
  methods:{
  	// extractme(){
  	// 	let sentence="Readability of code is now my first priority. It’s more important than being fast, almost as important as being correct, but I think being readable is actually the most likely way of making it correct.";
  	// 	//let result=keyword_extractor.extract(sentence,this.extractsetting)
  	// 	//console.log(result);
  	// }
  	getQuotes(){
  		this.$store.dispatch("quotes/doQuotes").then(response=>{
          console.log(response);
          this.quotes=response.data;
      	});
  	},
  	getRandom(min,max){
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min;
  	}

  },
  mounted(){
  	//this.extractme();
  	this.getQuotes();
  }
}
</script>
