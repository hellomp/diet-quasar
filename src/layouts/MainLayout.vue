<template>
  <q-layout
    view="hHh LpR fFf"
    class="bg-grey-11"
    style="height: 100vh"
    container
  >
    <q-header class="bg-primary text-white">
      <q-bar>
        <q-space />
        <q-btn
          dense
          flat
          icon="minimize"
        />
        <q-btn
          dense
          flat
          icon="crop_square"
        />
        <q-btn
          dense
          flat
          icon="close"
        />
      </q-bar>
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Diet Quasar
        </q-toolbar-title>
        <q-btn
          dense
          flat
          round
          icon="save"
          @click.prevent="saveDiet"
        >
          <q-tooltip>
            Salvar
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          round
          icon="visibility"
          @click="toggleResults"
        >
          <q-tooltip>
            Resultados
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          round
          icon="description"
          @click="toggleExportDialog"
        >
          <q-tooltip>
            Exportar
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      content-class="bg-grey-11"
      :width="200"
      :breakpoint="500"
    >
      <q-list
        padding
        class="menu-list"
      >
        <q-item
          clickable
          v-ripple
          to="/"
          active
        >
          <q-item-section avatar>
            <q-icon name="local_dining" />
          </q-item-section>

          <q-item-section>Dietas</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          active
        >
          <q-item-section avatar>
            <q-icon name="view_list" />
          </q-item-section>

          <q-item-section>Composição</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      left: false
    }
  },
  methods: {
    ...mapActions('composition', ['setTucunduva']),
    ...mapActions('diets', ['setDiets']),
    ...mapActions('app', ['setSavingDiet', 'toggleResults', 'toggleExportDialog']),
    saveDiet () {
      this.setSavingDiet(true)
    }
  },
  created () {
    this.setTucunduva()
    this.setDiets()
  }
}
</script>

<style scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>
