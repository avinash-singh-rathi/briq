<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-brand">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
        />

        <q-toolbar-title>
          Briq Assignment
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
