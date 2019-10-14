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
          icon="fas fa-bars"
          @click="left = !left"
        />

        <q-toolbar-title>
          Diet Quasar
        </q-toolbar-title>
        <q-btn
          dense
          flat
          round
          icon="fas fa-save"
          @click.prevent="saveDiet"
          style="font-size: 0.8em"
        >
          <q-tooltip>
            Salvar
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          round
          icon="fas fa-percentage"
          @click="toggleResults"
          style="font-size: 0.8em"
        >
          <q-tooltip>
            Resultados
          </q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          round
          icon="fas fa-file-export"
          @click="toggleExportDialog"
          style="font-size: 0.7em"
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
          to="/diets"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-utensils" />
          </q-item-section>

          <q-item-section>Dietas</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/compositions"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-table" />
          </q-item-section>

          <q-item-section>Composição</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/calculator"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-calculator" />
          </q-item-section>

          <q-item-section>Calculadora</q-item-section>
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
    ...mapActions('composition', ['setTucunduva', 'setDRIs']),
    ...mapActions('diets', ['setDiets']),
    ...mapActions('app', ['setSavingDiet', 'toggleResults', 'toggleExportDialog']),
    saveDiet () {
      this.setSavingDiet(true)
    }
  },
  created () {
    this.setTucunduva()
    this.setDRIs()
    // this.setDiets()
  }
}
</script>

<style scoped>
.menu-list {
  padding: 8px;
}
.menu-list .q-item {
  border-radius: 32px;
}
</style>
