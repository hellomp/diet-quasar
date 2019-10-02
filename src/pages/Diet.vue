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
        :options="getColumns"
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
              v-for="column in getColumnsFilter"
              :key="column.name"
              :props="props"
            >
              {{props.row[column.name].actual}}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom-row="props">
          <q-tr
            class="disabled"
            :props="props"
          >
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
        :columns="getColumns"
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

export default {
  name: 'Diet',
  components: {
    results
  },
  data () {
    return {
      diet: {},
      selectedItems: [],
      selectedNewItems: [],
      selectedMealIndex: 0,
      addFoodDialog: false,
      searchString: null
    }
  },
  methods: {
    ...mapActions('diets', ['updateDiets', 'updateDiet']),
    ...mapActions('app', ['setSavingDiet']),
    createMeal () {
      this.diet.meals.push({
        id: uniqid(),
        name: 'Refeição',
        items: [],
        energy: {
          total: 0
        },
        carbohydrate: {
          total: 0
        },
        protein: {
          total: 0
        },
        lipid: {
          total: 0
        }
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
        this.diet.meals[this.selectedMealIndex].items.push(
          {
            id: selectedNewItem.id,
            item_id: uniqid(),
            qty: 100,
            description: selectedNewItem.description,
            energy: {
              actual: selectedNewItem.energy,
              base: selectedNewItem.energy
            },
            carbohydrate: {
              actual: selectedNewItem.carbohydrate,
              base: selectedNewItem.carbohydrate
            },
            protein: {
              actual: selectedNewItem.protein,
              base: selectedNewItem.protein
            },
            lipid: {
              actual: selectedNewItem.lipid,
              base: selectedNewItem.lipid
            },
            fiber: {
              actual: selectedNewItem.fiber,
              base: selectedNewItem.fiber
            },
            sodium: {
              actual: selectedNewItem.sodium,
              base: selectedNewItem.sodium
            },
            iron: {
              actual: selectedNewItem.iron,
              base: selectedNewItem.iron
            },
            fatty_acids_poly: {
              actual: selectedNewItem.fatty_acids_poly,
              base: selectedNewItem.fatty_acids_poly
            },
            fatty_acids_mono: {
              actual: selectedNewItem.fatty_acids_mono,
              base: selectedNewItem.fatty_acids_mono
            },
            fatty_acids_sat: {
              actual: selectedNewItem.fatty_acids_sat,
              base: selectedNewItem.fatty_acids_sat
            },
            cholesterol: {
              actual: selectedNewItem.cholesterol,
              base: selectedNewItem.cholesterol
            },
            re: {
              actual: selectedNewItem.re,
              base: selectedNewItem.re
            },
            vitamin_C: {
              actual: selectedNewItem.vitamin_C,
              base: selectedNewItem.vitamin_C
            },
            thiamine: {
              actual: selectedNewItem.thiamine,
              base: selectedNewItem.thiamine
            },
            riboflavin: {
              actual: selectedNewItem.riboflavin,
              base: selectedNewItem.riboflavin
            },
            pyridoxine: {
              actual: selectedNewItem.pyridoxine,
              base: selectedNewItem.pyridoxine
            },
            niacin: {
              actual: selectedNewItem.niacin,
              base: selectedNewItem.niacin
            },
            calcium: {
              actual: selectedNewItem.calcium,
              base: selectedNewItem.calcium
            },
            manganese: {
              actual: selectedNewItem.manganese,
              base: selectedNewItem.manganese
            },
            zinc: {
              actual: selectedNewItem.zinc,
              base: selectedNewItem.zinc
            },
            magnesium: {
              actual: selectedNewItem.magnesium,
              base: selectedNewItem.magnesium
            },
            potassium: {
              actual: selectedNewItem.potassium,
              base: selectedNewItem.potassium
            },
            phosphorus: {
              actual: selectedNewItem.phosphorus,
              base: selectedNewItem.phosphorus
            },
            copper: {
              actual: selectedNewItem.copper,
              base: selectedNewItem.copper
            }
          }
        )
      })
      this.cancelModal()
      this.updateMealTotals(this.selectedMealIndex)
    },
    totalColumn (mealId, totalColumn) {
      let totalValue = ''
      this.getColumns.forEach(column => {
        if (totalColumn === column.name && totalColumn !== 'description' && totalColumn !== 'qty') {
          totalValue = this.diet.meals[mealId][totalColumn].total
        }
      })
      return totalValue
    },
    updateQty (mealId, itemId) {
      let actualItemId = _.findIndex(this.diet.meals[mealId].items, { 'item_id': itemId })
      let baseQty = _.divide(this.diet.meals[mealId].items[actualItemId].qty, 100)
      this.getColumnsFilter.forEach(column => {
        this.diet.meals[mealId].items[actualItemId][column.name].actual = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId][column.name].base, baseQty), 2)
      })
      this.updateMealTotals(mealId)
    },
    updateMealTotals (mealId) {
      this.getColumnsFilter.forEach(column => {
        let values = _.sum(_.values(_.mapValues(this.diet.meals[mealId].items, 'energy.actual')))
        this.diet.meals[mealId][column.name].total = _.round(values, 2)
      })
      this.updateDietTotals()
    },
    updateDietTotals () {
      this.getColumnsFilter.forEach(column => {
        if (column.name === 'energy') {
          this.diet[column.name].total.kcal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'energy.total'))), 2)
        } else {
          this.diet[column.name].total.grams = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'energy.total'))), 2)
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
      this.diet.lipid.total.perc = _.round(_.multiply(_.divide(this.diet.lipidTotalEnergy, this.diet.carbohydrateTotalEnergy + this.diet.proteinTotalEnergy + this.diet.lipidTotalEnergy), 100), 2)
    },
    updateAdequation () {
      this.diet.energy.adequation = _.round(_.multiply(_.divide(this.diet.energy.total.kcal, this.diet.energy.target.kcal), 100), 2)
      this.diet.carbohydrate.adequation = _.round(_.multiply(_.divide(this.diet.carbohydrate.total.kcal, this.diet.carbohydrate.target.kcal), 100), 2)
      this.diet.protein.adequation = _.round(_.multiply(_.divide(this.diet.protein.total.kcal, this.diet.protein.target.kcal), 100), 2)
      this.diet.lipid.adequation = _.round(_.multiply(_.divide(this.diet.lipid.total.kcal, this.diet.lipid.target.kcal), 100), 2)
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
            this.updateDiets(this.diet)
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
    fs.readFile(this.$route.params.dietPath, 'utf-8', (err, data) => {
      if (err) throw err
      this.diet = JSON.parse(data)
      console.log('Read new diet')
    })
  },
  computed: {
    ...mapGetters('composition', ['getTucunduva', 'getColumns', 'getColumnsFilter']),
    ...mapState('app', ['savingDiet', 'showResults'])
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
  .q-table__middle {
    //max-height: 200px;
  }

  .q-table__top,
  .q-table__bottom,
  tr:first-child th, /* bg color is important for th; just specify one */
  td:first-child {
    /* bg color is important for td; just specify one */
    background-color: #ffffff;
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
