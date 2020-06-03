/*
export function someAction (context) {
}
*/
import Vue from 'vue'
import { Notify, Loading, LoadingBar } from 'quasar'

export const doQuotes = ({ state,commit, dispatch }) => {
  Loading.show();
  LoadingBar.start();
  return Vue.prototype.$axios
    .get(process.env.API+'quotes/lang/en')
    .then(response => {
      commit('SetQuotes',response.data);
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

export const doNLP = ({ state,commit, dispatch }) => {
  Loading.show();
  LoadingBar.start();
  return Vue.prototype.$axios
    .get(process.env.API+'quotes/lang/en')
    .then(response => {
      commit('SetQuotes',response.data);
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