<template>
  <q-page padding>
    <q-drawer
      show-if-above
      :value="showResults"
      side="right"
      bordered
    >
      <results :diet="diet" />
    </q-drawer>
    <div class="q-gutter-y-md">
      <q-select
        v-model="diet.visibleColumns"
        standout="bg-white"
        multiple
        options-dense
        emit-value
        map-options
        use-chips
        stack-label
        :options="getColumnsNoDescQty"
        option-value="name"
        style="width: 100%"
        label="Nutrientes"
      />
      <q-table
        v-for="(meal, mealIndex) in diet.meals"
        :key="meal.id"
        :data="meal.items"
        :columns="getColumns"
        :visible-columns="diet.visibleColumns"
        row-key="item_id"
        class="my-sticky-header-column-table"
        table-class="syncscroll"
        name="table"
        :myvalue="mealIndex"
        hide-bottom
      >
        <template v-slot:top-left>
          <q-input
            borderless
            debounce="100"
            v-model="meal.name"
            class="text-h6"
          >
          </q-input>
        </template>
        <template v-slot:top-right="props">
          <q-btn
            flat
            label="Adicionar alimento"
            @click="openModal(mealIndex)"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="description"
              :props="props"
            >
              {{props.row.description}}
            </q-td>
            <q-td
              key="qty"
              :props="props"
            >
              <input
                type="number"
                v-model.number="props.row.qty"
                @input="updateQty(mealIndex, props.row.item_id)"
                class="text-right"
              >
            </q-td>
            <q-td
              v-for="column in getColumnsNoDescQty"
              :key="column.name"
              :props="props"
              class="text-right"
            >
              {{props.row[column.name].actual}}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom-row="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              class="text-right"
            >
              {{totalColumn(mealIndex, col.name)}}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-btn
        flat
        color="primary"
        class="full-width"
        label="Nova refeição"
        @click="createMeal"
      />
    </div>
    <q-dialog
      v-model="addFoodDialog"
      full-width
    >
      <q-table
        title="Alimentos"
        :data="getTucunduva"
        :columns="getColumnsNoQty"
        :visible-columns="diet.visibleColumns"
        row-key="id"
        class="my-sticky-header-column-table"
        selection="multiple"
        :selected.sync="selectedNewItems"
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
        <template v-slot:top-right="props">
          <q-btn
            flat
            label="Adicionar"
            @click="addSelectedItems"
          />
        </template>
      </q-table>
    </q-dialog>
    <q-dialog
      :value="showExportDialog"
      @hide="toggleExportDialog()"
    >
      <exportView :diet='diet' />
    </q-dialog>
  </q-page>
</template>

<script>
import _ from 'lodash'
import fs from 'fs'
import uniqid from 'uniqid'
import moment from 'moment'
import { mapActions, mapGetters, mapState } from 'vuex'
import { remote } from 'electron'
import results from '../components/Results.vue'
import exportView from '../components/Export.vue'

export default {
  name: 'Diet',
  components: {
    results,
    exportView
  },
  data () {
    return {
      diet: {},
      selectedItems: [],
      selectedNewItems: [],
      selectedMealIndex: 0,
      addFoodDialog: false,
      searchString: null,
      sexOptions: [
        {
          value: 'male',
          label: 'Masculino'
        },
        {
          value: 'female',
          label: 'Feminino'
        }
      ]
    }
  },
  methods: {
    ...mapActions('diets', ['addDiet', 'updateDiet']),
    ...mapActions('app', ['setSavingDiet', 'toggleExportDialog']),
    createMeal () {
      let newMeal = {}
      newMeal.id = uniqid()
      newMeal.name = 'Refeição'
      newMeal.items = []
      this.getColumnsNoDescQty.forEach(column => {
        newMeal[column.name] = { total: 0 }
      })
      this.diet.meals.push(newMeal)
      let scrolls = document.querySelectorAll('.syncscroll')
      scrolls.forEach(scroll => {
        scroll.setAttribute('name', 'tablescroll')
      })
    },
    openModal (mealIndex) {
      this.addFoodDialog = true
      this.selectedMealIndex = mealIndex
    },
    cancelModal () {
      this.addFoodDialog = false
      this.selectedNewItems = []
    },
    addSelectedItems () {
      this.selectedNewItems.forEach(selectedNewItem => {
        let newItem = {}
        newItem.id = selectedNewItem.id
        newItem.item_id = uniqid()
        newItem.qty = 100
        newItem.description = selectedNewItem.description
        this.getColumnsNoDescQty.forEach(column => {
          newItem[column.name] = { actual: 0, base: 0 }
          newItem[column.name].actual = selectedNewItem[column.name]
          newItem[column.name].base = selectedNewItem[column.name]
        })
        this.diet.meals[this.selectedMealIndex].items.push(newItem)
      })
      this.cancelModal()
      this.updateMealTotals(this.selectedMealIndex)
    },
    totalColumn (mealId, totalColumn) {
      let totalValue = ''
      this.getColumns.forEach(column => {
        if (totalColumn === 'description') {
          totalValue = 'Total'
        } else if (totalColumn === column.name && totalColumn !== 'qty') {
          totalValue = this.diet.meals[mealId][totalColumn].total
        }
      })
      return totalValue
    },
    updateQty (mealId, itemId) {
      let actualItemId = _.findIndex(this.diet.meals[mealId].items, { 'item_id': itemId })
      let baseQty = _.divide(this.diet.meals[mealId].items[actualItemId].qty, 100)
      this.getColumnsNoDescQty.forEach(column => {
        this.diet.meals[mealId].items[actualItemId][column.name].actual = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId][column.name].base, baseQty), 2)
      })
      this.updateMealTotals(mealId)
    },
    updateMealTotals (mealId) {
      this.getColumnsNoDescQty.forEach(column => {
        let values = _.sum(_.values(_.mapValues(this.diet.meals[mealId].items, [column.name] + '.actual')))
        this.diet.meals[mealId][column.name].total = _.round(values, 2)
      })
      this.updateDietTotals()
    },
    updateDietTotals () {
      this.getColumnsNoDescQty.forEach(column => {
        if (column.name === 'energy') {
          this.diet[column.name].total.kcal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'energy.total'))), 2)
        } else {
          this.diet[column.name].total.grams = _.round(_.sum(_.values(_.mapValues(this.diet.meals, [column.name] + '.total'))), 2)
        }
      })
      this.updateDietEnergy()
    },
    updateDietEnergy () {
      this.diet.carbohydrate.total.kcal = _.round(_.multiply(this.diet.carbohydrate.total.grams, 4), 2)
      this.diet.protein.total.kcal = _.round(_.multiply(this.diet.protein.total.grams, 4), 2)
      this.diet.lipid.total.kcal = _.round(_.multiply(this.diet.lipid.total.grams, 9), 2)
      this.updateDietPercentage()
      this.updateAdequation()
    },
    updateDietPercentage () {
      let totalMacroEnergy = this.diet.carbohydrate.total.kcal + this.diet.protein.total.kcal + this.diet.lipid.total.kcal
      this.diet.carbohydrate.total.perc = _.round(_.multiply(_.divide(this.diet.carbohydrate.total.kcal, totalMacroEnergy), 100), 2)
      this.diet.protein.total.perc = _.round(_.multiply(_.divide(this.diet.protein.total.kcal, totalMacroEnergy), 100), 2)
      this.diet.lipid.total.perc = _.round(_.multiply(_.divide(this.diet.lipid.total.kcal, totalMacroEnergy), 100), 2)
    },
    updateAdequation () {
      this.getColumnsNoDescQty.forEach(column => {
        if (column.name === 'energy' || column.name === 'carbohydrate' || column.name === 'protein' || column.name === 'lipid') {
          this.diet[column.name].adequation = _.round(_.multiply(_.divide(this.diet[column.name].total.kcal, this.diet[column.name].target.kcal), 100), 2)
        } else {
          this.diet[column.name].adequation = _.round(_.multiply(_.divide(this.diet[column.name].total.grams, this.diet[column.name].target.grams), 100), 2)
        }
      })
      /*  this.diet.carbohydrate.adequation = _.round(_.multiply(_.divide(this.diet.carbohydrate.total.kcal, this.diet.carbohydrate.target.kcal), 100), 2)
       this.diet.protein.adequation = _.round(_.multiply(_.divide(this.diet.protein.total.kcal, this.diet.protein.target.kcal), 100), 2)
       this.diet.lipid.adequation = _.round(_.multiply(_.divide(this.diet.lipid.total.kcal, this.diet.lipid.target.kcal), 100), 2) */
    },
    updateDRI () {
      let age = this.diet.patient.age
      let sex = this.diet.patient.sex
      this.getColumnsNoDescQty.forEach(column => {
        if (column.name === 'energy' || column.name === 'carbohydrate' || column.name === 'protein' || column.name === 'lipid') {
          return
        }
        if (age === 0) {
          this.diet[column.name].target.grams = this.getDRIs[sex]._zero[column.name]
        } else if (age >= 1 && age <= 3) {
          this.diet[column.name].target.grams = this.getDRIs[sex].one_three[column.name]
        } else if (age >= 4 && age <= 8) {
          this.diet[column.name].target.grams = this.getDRIs[sex].four_eight[column.name]
        } else if (age >= 9 && age <= 13) {
          this.diet[column.name].target.grams = this.getDRIs[sex].nine_thirteen[column.name]
        } else if (age >= 14 && age <= 18) {
          this.diet[column.name].target.grams = this.getDRIs[sex].fourteen_eighteen[column.name]
        } else if (age >= 19 && age <= 30) {
          this.diet[column.name].target.grams = this.getDRIs[sex].nineteen_thirty[column.name]
        } else if (age >= 31 && age <= 50) {
          this.diet[column.name].target.grams = this.getDRIs[sex].thirtyOne_fifty[column.name]
        } else if (age >= 51 && age <= 70) {
          this.diet[column.name].target.grams = this.getDRIs[sex].fiftyOne_seventy[column.name]
        } else if (age >= 71) {
          this.diet[column.name].target.grams = this.getDRIs[sex].seventy_[column.name]
        }
      })
    },
    saveDiet () {
      // Primeira vez que a dieta é salva localmente
      if (this.diet.path === '') {
        remote.dialog.showSaveDialog({
          filters: [{
            name: 'Diet files',
            extensions: ['json']
          },
          {
            name: 'All files',
            extensions: ['*']
          }
          ]
        }, (fileName) => {
          if (fileName === undefined) {
            return
          }
          this.diet.path = fileName
          this.diet.updated = moment().format('ll')
          // Escrever dieta na pasta escolhida
          fs.writeFile(fileName, JSON.stringify(this.diet), 'utf-8', (err) => {
            if (err) throw err
            this.addDiet(this.diet)
          })
        })
        // Sobreescrever arquivo da dieta caso ele já exista
      } else {
        this.diet.updated = moment().format('ll')
        console.log(this.diet.updated)
        fs.writeFile(this.diet.path, JSON.stringify(this.diet), 'utf-8', (err) => {
          if (err) throw err
          this.updateDiet(this.diet)
        })
      }
    }
  },
  created () {
    // Pegar caminho do arquivo temporário da dieta criada
    fs.readFile(this.$route.params.dietPath, 'utf-8', (err, data) => {
      if (err) throw err
      this.diet = JSON.parse(data)
      this.updateDRI()
      console.log('Read new diet')
    })
  },
  computed: {
    ...mapGetters('composition', ['getTucunduva', 'getDRIs', 'getColumns', 'getColumnsNoQty', 'getColumnsNoDescQty']),
    ...mapState('app', ['savingDiet', 'showResults', 'showExportDialog'])
  },
  watch: {
    diet: {
      handler () {
        console.log('Update Diet')
      },
      deep: true
    },
    savingDiet (val, oldVal) {
      if (val === true) {
        this.saveDiet()
        this.setSavingDiet(false)
      }
    }
  }
}
</script>

<style lang="scss">
.my-sticky-header-column-table {
  .q-table__top,
  .q-table__bottom,
  th:first-child, /* bg color is important for th; just specify one */
  td:first-child {
    /* bg color is important for td; just specify one */
    background-color: #ffffff;
    text-align: left !important;
  }

  tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 2;
  }
  tr:first-child th:first-child {
    z-index: 3;
  }
  td:first-child {
    z-index: 1;
  }

  td:first-child,
  th:first-child {
    position: sticky;
    left: 0;
  }
}
td > input {
  width: 70px;
  border: none;
}
</style>
