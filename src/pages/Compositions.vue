<template>
  <q-page padding>
    <q-table
      title="Alimentos"
      :data="getIBGE"
      :columns="getColumnsNoQty"
      row-key="id"
      class="my-sticky-header-column-table"
      :filter="searchString"
    >
      <template v-slot:top-left>
        <q-input
          borderless
          dense
          debounce="100"
          v-model="searchString"
          placeholder="Procurar alimento"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Compositions',
  data () {
    return {
      searchString: ''
    }
  },
  computed: {
    ...mapGetters('composition', ['getTucunduva', 'getIBGE', 'getColumnsNoQty'])
  }
}
</script>

<style>
</style>
