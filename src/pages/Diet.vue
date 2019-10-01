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
        :options="columns"
        option-value="name"
        style="width: 100%"
        label="Nutrientes"
      />
      <q-table
        v-for="(meal, mealIndex) in diet.meals"
        :key="meal.id"
        :data="meal.items"
        :columns="columns"
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
              key="energy"
              :props="props"
            >
              {{props.row.energy}}
            </q-td>
            <q-td
              key="carbohydrate"
              :props="props"
            >
              {{props.row.carbohydrate}}
            </q-td>
            <q-td
              key="protein"
              :props="props"
            >
              {{props.row.protein}}
            </q-td>
            <q-td
              key="lipid"
              :props="props"
            >
              {{props.row.lipid}}
            </q-td>
            <q-td
              key="fiber"
              :props="props"
            >
              {{props.row.fiber}}
            </q-td>
            <q-td
              key="sodium"
              :props="props"
            >
              {{props.row.sodium}}
            </q-td>
            <q-td
              key="iron"
              :props="props"
            >
              {{props.row.iron}}
            </q-td>
            <q-td
              key="fatty_acids_poly"
              :props="props"
            >
              {{props.row.fatty_acids_poly}}
            </q-td>
            <q-td
              key="fatty_acids_mono"
              :props="props"
            >
              {{props.row.fatty_acids_mono}}
            </q-td>
            <q-td
              key="fatty_acids_sat"
              :props="props"
            >
              {{props.row.fatty_acids_sat}}
            </q-td>
            <q-td
              key="cholesterol"
              :props="props"
            >
              {{props.row.cholesterol}}
            </q-td>
            <q-td
              key="re"
              :props="props"
            >
              {{props.row.re}}
            </q-td>
            <q-td
              key="vitamin_C"
              :props="props"
            >
              {{props.row.vitamin_C}}
            </q-td>
            <q-td
              key="thiamine"
              :props="props"
            >
              {{props.row.thiamine}}
            </q-td>
            <q-td
              key="riboflavin"
              :props="props"
            >
              {{props.row.riboflavin}}
            </q-td>
            <q-td
              key="pyridoxine"
              :props="props"
            >
              {{props.row.pyridoxine}}
            </q-td>
            <q-td
              key="niacin"
              :props="props"
            >
              {{props.row.niacin}}
            </q-td>
            <q-td
              key="calcium"
              :props="props"
            >
              {{props.row.calcium}}
            </q-td>
            <q-td
              key="manganese"
              :props="props"
            >
              {{props.row.manganese}}
            </q-td>
            <q-td
              key="zinc"
              :props="props"
            >
              {{props.row.zinc}}
            </q-td>
            <q-td
              key="magnesium"
              :props="props"
            >
              {{props.row.magnesium}}
            </q-td>
            <q-td
              key="potassium"
              :props="props"
            >
              {{props.row.potassium}}
            </q-td>
            <q-td
              key="phosphorus"
              :props="props"
            >
              {{props.row.phosphorus}}
            </q-td>
            <q-td
              key="copper"
              :props="props"
            >
              {{props.row.copper}}
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
        :columns="columns"
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
      diet: {
      },
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          required: true,
          align: 'left',
          field: row => row.description,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'qty', label: 'Quant', field: row => row.qty },
        { name: 'energy', label: 'Energia', field: row => row.energy },
        { name: 'carbohydrate', label: 'Carb', field: row => row.carbohydrate, sortable: true },
        { name: 'protein', label: 'Prot', field: row => row.protein, sortable: true },
        { name: 'lipid', label: 'Lip', field: row => row.lipid },
        { name: 'fiber', label: 'Fibra', field: row => row.fiber },
        { name: 'sodium', label: 'Sódio', field: row => row.sodium },
        { name: 'fatty_acids_poly', label: 'Á.G. Poli', field: row => row.fatty_acids_poly },
        { name: 'fatty_acids_mono', label: 'Á.G. Mono', field: row => row.fatty_acids_mono },
        { name: 'fatty_acids_sat', label: 'Á.G. Satu', field: row => row.fatty_acids_sat },
        { name: 'cholesterol', label: 'Colesterol', field: row => row.cholesterol },
        { name: 're', label: 'Retinol', field: row => row.re },
        { name: 'vitamin_C', label: 'Á. Ascorbico (C)', field: row => row.vitamin_C },
        { name: 'thiamine', label: 'Tiamina (B1)', field: row => row.thiamine },
        { name: 'riboflavin', label: 'Riboflavina (B2)', field: row => row.riboflavin },
        { name: 'pyridoxine', label: 'Piriroxina (B6)', field: row => row.pyridoxine },
        { name: 'niacin', label: 'Niacina (B3)', field: row => row.niacin },
        { name: 'calcium', label: 'Cálcio', field: row => row.calcium },
        { name: 'manganese', label: 'Manganês', field: row => row.manganese },
        { name: 'zinc', label: 'Zinco', field: row => row.zinc },
        { name: 'magnesium', label: 'Magnésio', field: row => row.magnesium },
        { name: 'potassium', label: 'Potássio', field: row => row.potassium },
        { name: 'phosphorus', label: 'Fósforo', field: row => row.phosphorus },
        { name: 'copper', label: 'Cobre', field: row => row.copper }
      ],
      compositionColumns: [
        {
          name: 'description',
          label: 'Descrição',
          required: true,
          align: 'left',
          field: row => row.description,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'energy', label: 'Energia', field: row => row.energy },
        { name: 'carbohydrate', label: 'Carb', field: row => row.carbohydrate, sortable: true },
        { name: 'protein', label: 'Prot', field: row => row.protein, sortable: true },
        { name: 'lipid', label: 'Lip', field: row => row.lipid },
        { name: 'fiber', label: 'Fibra', field: row => row.fiber },
        { name: 'sodium', label: 'Sódio', field: row => row.sodium },
        { name: 'iron', label: 'Ferro', field: row => row.iron },
        { name: 'fatty_acids_poly', label: 'Á.G. Poli', field: row => row.fatty_acids_poly },
        { name: 'fatty_acids_mono', label: 'Á.G. Mono', field: row => row.fatty_acids_mono },
        { name: 'fatty_acids_sat', label: 'Á.G. Satu', field: row => row.fatty_acids_sat },
        { name: 'cholesterol', label: 'Colesterol', field: row => row.cholesterol },
        { name: 're', label: 'Retinol', field: row => row.re },
        { name: 'vitamin_C', label: 'Á. Ascorbico (C)', field: row => row.vitamin_C },
        { name: 'thiamine', label: 'Tiamina (B1)', field: row => row.thiamine },
        { name: 'riboflavin', label: 'Riboflavina (B2)', field: row => row.riboflavin },
        { name: 'pyridoxine', label: 'Piriroxina (B6)', field: row => row.pyridoxine },
        { name: 'niacin', label: 'Niacina (B3)', field: row => row.niacin },
        { name: 'calcium', label: 'Cálcio', field: row => row.calcium },
        { name: 'manganese', label: 'Manganês', field: row => row.manganese },
        { name: 'zinc', label: 'Zinco', field: row => row.zinc },
        { name: 'magnesium', label: 'Magnésio', field: row => row.magnesium },
        { name: 'potassium', label: 'Potássio', field: row => row.potassium },
        { name: 'phosphorus', label: 'Fósforo', field: row => row.phosphorus },
        { name: 'copper', label: 'Cobre', field: row => row.copper }
      ],
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
        items: []
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
    totalColumn (mealId, column) {
      switch (column) {
        case 'description':
          break
        case 'qty':
          return 'Quant'
        case 'energy':
          return this.diet.meals[mealId].energyTotal
        case 'carbohydrate':
          return this.diet.meals[mealId].carbohydrateTotal
        case 'protein':
          return this.diet.meals[mealId].proteinTotal
        case 'lipid':
          return this.diet.meals[mealId].lipidTotal
        case 'fiber':
          return this.diet.meals[mealId].fiberTotal
        case 'iron':
          return this.diet.meals[mealId].ironTotal
        case 'sodium':
          return this.diet.meals[mealId].sodiumTotal
        case 'fatty_acids_poly':
          return this.diet.meals[mealId].fatty_acids_polyTotal
        case 'fatty_acids_mono':
          return this.diet.meals[mealId].fatty_acids_monoTotal
        case 'fatty_acids_sat':
          return this.diet.meals[mealId].fatty_acids_satTotal
        case 'cholesterol':
          return this.diet.meals[mealId].cholesterolTotal
        case 're':
          return this.diet.meals[mealId].reTotal
        case 'vitamin_C':
          return this.diet.meals[mealId].vitamin_CTotal
        case 'thiamine':
          return this.diet.meals[mealId].thiamineTotal
        case 'riboflavin':
          return this.diet.meals[mealId].riboflavinTotal
        case 'pyridoxine':
          return this.diet.meals[mealId].pyridoxineTotal
        case 'niacin':
          return this.diet.meals[mealId].niacinTotal
        case 'calcium':
          return this.diet.meals[mealId].calciumTotal
        case 'manganese':
          return this.diet.meals[mealId].manganeseTotal
        case 'zinc':
          return this.diet.meals[mealId].zincTotal
        case 'magnesium':
          return this.diet.meals[mealId].magnesiumTotal
        case 'potassium':
          return this.diet.meals[mealId].potassiumTotal
        case 'phosphorus':
          return this.diet.meals[mealId].phosphorusTotal
        case 'copper':
          return this.diet.meals[mealId].copperTotal
        default:
          return ''
      }
    },
    updateQty (mealId, itemId) {
      let actualItemId = _.findIndex(this.diet.meals[mealId].items, { 'item_id': itemId })
      let baseQty = _.divide(this.diet.meals[mealId].items[actualItemId].qty, 100)
      this.columns.forEach(column => {
        switch (column.name) {
          case 'energy':
            this.diet.meals[mealId].items[actualItemId].energy = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].energyBase, baseQty), 2)
            break
          case 'carbohydrate':
            this.diet.meals[mealId].items[actualItemId].carbohydrate = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].carbohydrateBase, baseQty), 2)
            break
          case 'protein':
            this.diet.meals[mealId].items[actualItemId].protein = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].proteinBase, baseQty), 2)
            break
          case 'lipid':
            this.diet.meals[mealId].items[actualItemId].lipid = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].lipidBase, baseQty), 2)
            break
          case 'fiber':
            this.diet.meals[mealId].items[actualItemId].fiber = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].fiberBase, baseQty), 2)
            break
          case 'sodium':
            this.diet.meals[mealId].items[actualItemId].sodium = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].sodiumBase, baseQty), 2)
            break
          case 'iron':
            this.diet.meals[mealId].items[actualItemId].iron = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].ironBase, baseQty), 2)
            break
          case 'fatty_acids_poly':
            this.diet.meals[mealId].items[actualItemId].fatty_acids_poly = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].fatty_acids_polyBase, baseQty), 2)
            break
          case 'fatty_acids_mono':
            this.diet.meals[mealId].items[actualItemId].fatty_acids_mono = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].fatty_acids_monoBase, baseQty), 2)
            break
          case 'fatty_acids_sat':
            this.diet.meals[mealId].items[actualItemId].fatty_acids_sat = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].fatty_acids_satBase, baseQty), 2)
            break
          case 'cholesterol':
            this.diet.meals[mealId].items[actualItemId].cholesterol = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].cholesterolBase, baseQty), 2)
            break
          case 're':
            this.diet.meals[mealId].items[actualItemId].re = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].reBase, baseQty), 2)
            break
          case 'vitamin_C':
            this.diet.meals[mealId].items[actualItemId].vitamin_C = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].vitamin_CBase, baseQty), 2)
            break
          case 'thiamine':
            this.diet.meals[mealId].items[actualItemId].thiamine = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].thiamineBase, baseQty), 2)
            break
          case 'riboflavin':
            this.diet.meals[mealId].items[actualItemId].riboflavin = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].riboflavinBase, baseQty), 2)
            break
          case 'pyridoxine':
            this.diet.meals[mealId].items[actualItemId].pyridoxine = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].pyridoxineBase, baseQty), 2)
            break
          case 'niacin':
            this.diet.meals[mealId].items[actualItemId].niacin = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].niacinBase, baseQty), 2)
            break
          case 'calcium':
            this.diet.meals[mealId].items[actualItemId].calcium = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].calciumBase, baseQty), 2)
            break
          case 'manganese':
            this.diet.meals[mealId].items[actualItemId].manganese = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].manganeseBase, baseQty), 2)
            break
          case 'zinc':
            this.diet.meals[mealId].items[actualItemId].zinc = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].zincBase, baseQty), 2)
            break
          case 'magnesium':
            this.diet.meals[mealId].items[actualItemId].magnesium = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].magnesiumBase, baseQty), 2)
            break
          case 'potassium':
            this.diet.meals[mealId].items[actualItemId].potassium = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].potassiumBase, baseQty), 2)
            break
          case 'phosphorus':
            this.diet.meals[mealId].items[actualItemId].phosphorus = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].phosphorusBase, baseQty), 2)
            break
          case 'copper':
            this.diet.meals[mealId].items[actualItemId].copper = _.round(_.multiply(this.diet.meals[mealId].items[actualItemId].copperBase, baseQty), 2)
            break
        }
      })
      this.updateMealTotals(mealId)
    },
    updateMealTotals (mealId) {
      this.columns.forEach(column => {
        let values = _.sum(_.values(_.mapValues(this.diet.meals[mealId].items, column.name)))
        switch (column.name) {
          case 'description':
            break
          case 'qty':
            break
          case 'energy':
            this.diet.meals[mealId].energyTotal = _.round(values, 2)
            break
          case 'carbohydrate':
            this.diet.meals[mealId].carbohydrateTotal = _.round(values, 2)
            break
          case 'protein':
            this.diet.meals[mealId].proteinTotal = _.round(values, 2)
            break
          case 'lipid':
            this.diet.meals[mealId].lipidTotal = _.round(values, 2)
            break
          case 'fiber':
            this.diet.meals[mealId].fiberTotal = _.round(values, 2)
            break
          case 'sodium':
            this.diet.meals[mealId].sodiumTotal = _.round(values, 2)
            break
          case 'iron':
            this.diet.meals[mealId].ironTotal = _.round(values, 2)
            break
        }
      })
      this.updateDietTotals()
    },
    updateDietTotals () {
      this.columns.forEach(column => {
        switch (column.name) {
          case 'description':
            break
          case 'qty':
            break
          case 'energy':
            this.diet.energyTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'energyTotal'))), 2)
            break
          case 'carbohydrate':
            this.diet.carbohydrateTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'carbohydrateTotal'))), 2)
            break
          case 'protein':
            this.diet.proteinTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'proteinTotal'))), 2)
            break
          case 'lipid':
            this.diet.lipidTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'lipidTotal'))), 2)
            break
          case 'fiber':
            this.diet.fiberTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'fiberTotal'))), 2)
            break
          case 'sodium':
            this.diet.sodiumTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'sodiumTotal'))), 2)
            break
          case 'iron':
            this.diet.ironTotal = _.round(_.sum(_.values(_.mapValues(this.diet.meals, 'ironTotal'))), 2)
            break
        }
      })
      this.updateDietEnergy()
    },
    updateDietEnergy () {
      this.diet.carbohydrateTotalEnergy = _.round(_.multiply(this.diet.carbohydrateTotal, 4), 2)
      this.diet.proteinTotalEnergy = _.round(_.multiply(this.diet.proteinTotal, 4), 2)
      this.diet.lipidTotalEnergy = _.round(_.multiply(this.diet.lipidTotal, 9), 2)
      this.updateDietPercentage()
      this.updateAdequation()
    },
    updateDietPercentage () {
      this.diet.carbohydrateTotalPerc = _.round(_.multiply(_.divide(this.diet.carbohydrateTotalEnergy, this.diet.carbohydrateTotalEnergy + this.diet.proteinTotalEnergy + this.diet.lipidTotalEnergy), 100), 2)
      console.log(this.diet.carbohydrateTotalEnergy + this.diet.proteinTotalEnergy + this.diet.lipidTotalEnergy)
      this.diet.proteinTotalPerc = _.round(_.multiply(_.divide(this.diet.proteinTotalEnergy, this.diet.carbohydrateTotalEnergy + this.diet.proteinTotalEnergy + this.diet.lipidTotalEnergy), 100), 2)
      this.diet.lipidTotalPerc = _.round(_.multiply(_.divide(this.diet.lipidTotalEnergy, this.diet.carbohydrateTotalEnergy + this.diet.proteinTotalEnergy + this.diet.lipidTotalEnergy), 100), 2)
    },
    updateAdequation () {
      this.diet.energyAdequation = _.round(_.multiply(_.divide(this.diet.energyTotal, this.diet.energyTarget), 100), 2)
      this.diet.carbohydrateAdequation = _.round(_.multiply(_.divide(this.diet.carbohydrateTotal, this.diet.carbohydrateTarget), 100), 2)
      this.diet.proteinAdequation = _.round(_.multiply(_.divide(this.diet.proteinTotal, this.diet.proteinTarget), 100), 2)
      this.diet.lipidAdequation = _.round(_.multiply(_.divide(this.diet.lipidTotal, this.diet.lipidTarget), 100), 2)
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
          this.diet.lastUpdate = moment().format('ll')
          // Escrever dieta na pasta escolhida
          fs.writeFile(fileName, JSON.stringify(this.diet), 'utf-8', (err) => {
            if (err) throw err
            this.updateDiets(this.diet)
          })
        })
        // Sobreescrever arquivo da dieta caso ele já exista
      } else {
        this.diet.lastUpdate = moment().format('ll')
        console.log(this.diet.lastUpdate)
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
    ...mapGetters('composition', ['getTucunduva']),
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
