<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <q-page class="flex flex-center bg-brand">
        <div class="q-pa-md column items-center q-gutter-md">
          <div class="bg-grey-1 text-white ">
           <form v-on:submit.prevent="onSubmit()">
              <q-card class="flex-center text-center q-px-md q-py-lg" style="box-shadow:none;">
                <div class="row">
                  <div class="col self-center">
                    <img alt="Briq Logo" src="~assets/briq-logo.png" style="width:50%;">
                  </div>
                </div>
                <div class="text-dark text-h3">Assignment</div>
                <q-separator />
                <q-card-actions>
                  <q-btn size="xl" class="q-mx-lg q-my-lg full-width" color="primary" icon="ion-logo-googleplus" label="Login using Google" @click="onLogin('Google')" />
                  <q-btn size="xl" class="q-mx-lg q-my-lg full-width" color="primary" icon="ion-logo-github" label="Login using Github" @click="onLogin('Github')" />
                </q-card-actions>
                <q-btn class="text-primary" to="/quotes" label="Skip" />
              </q-card>
            </form>
          </div>
        </div>
      </q-page>  
    </q-page-container>

  </q-layout>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      drawerState: true,
    }
  },
  methods: {
    onLogin (provider) {
      this.$q.loadingBar.start();
      this.$q.loading.show();
      window.location=process.env.API+'auth/'+provider;
      this.$q.loadingBar.stop();
      this.$q.loading.hide();
    },
  }
}
</script>