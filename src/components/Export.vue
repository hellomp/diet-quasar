<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-12">
          <q-markup-table
            id="qualitative"
            flat
            bordered
          >
            <thead>
              <tr>
                <th class="text-left">Refeição</th>
                <th class="text-left">Alimento</th>
                <th class="text-right">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="meal in diet.meals">
                <tr
                  v-for="item in meal.items"
                  :key="item.item_id"
                >
                  <td class="text-left">{{meal.name}}</td>
                  <td class="text-left">{{item.description}}</td>
                  <td class="text-right">{{item.qty}}</td>
                </tr>
              </template>
            </tbody>
          </q-markup-table>
        </div>
        <div class="col-12">
          <q-markup-table
            id="quantitative"
            flat
            bordered
          >
            <thead>
              <tr>
                <th class="text-left">Alimento</th>
                <th
                  v-for="column in visibleColumnsNoDescNoQty"
                  :key="column.name"
                  class="text-right"
                >
                  {{column.label}}
                </th>
              </tr>
            </thead>
            <tbody>
              <template>
                <tr
                  v-for="item in itemsExport"
                  :key="item.item_id"
                >
                  <td class="text-left">
                    {{item.description}}
                  </td>
                  <td
                    v-for="column in visibleColumnsNoDescNoQty"
                    :key="column.name"
                    class="text-right"
                  >
                    {{item[column.name]}}
                  </td>
                </tr>
                <tr>
                  <td>TOTAL</td>
                  <td
                    v-for="column in visibleColumnsNoDescNoQty"
                    :key="column.name"
                    class="text-right"
                  >
                    {{totalColumn(column.name)}}
                  </td>
                </tr>
              </template>
            </tbody>
          </q-markup-table>
        </div>
        <div class="col-12">
          <q-markup-table
            id="adequation"
            flat
            bordered
          >
            <thead>
              <tr>
                <th></th>
                <th class="text-right">Energia</th>
                <th class="text-right">Carb</th>
                <th class="text-right">Prot</th>
                <th class="text-right">Lip</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Recomendado</td>
                <td class="text-right">{{diet.energy.target.kcal}}</td>
                <td class="text-right">{{diet.carbohydrate.target.grams}}</td>
                <td class="text-right">{{diet.protein.target.grams}}</td>
                <td class="text-right">{{diet.lipid.target.grams}}</td>
              </tr>
              <tr>
                <td>Encontrado</td>
                <td class="text-right">{{diet.energy.total.kcal}}</td>
                <td class="text-right">{{diet.carbohydrate.total.grams}}</td>
                <td class="text-right">{{diet.protein.total.grams}}</td>
                <td class="text-right">{{diet.lipid.total.grams}}</td>
              </tr>
              <tr>
                <td>Adequação</td>
                <td class="text-right">{{diet.energy.adequation}}</td>
                <td class="text-right">{{diet.carbohydrate.adequation}}</td>
                <td class="text-right">{{diet.lipid.adequation}}</td>
                <td class="text-right">{{diet.lipid.adequation}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        flat
        label="Cancelar"
        color="primary"
        v-close-popup
      />
      <q-btn
        flat
        label="Exportar"
        color="primary"
        @click="exportDiet"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import _ from 'lodash'
import XLSX from 'xlsx'
import { remote } from 'electron'
import { mapGetters } from 'vuex'

export default {
  name: 'Export',
  props: ['diet'],
  data () {
    return {
      itemsExport: [],
      items: []
    }
  },
  methods: {
    totalColumn (column) {
      if (column === 'energy') {
        return this.diet.energy.total.kcal
      } else {
        return this.diet[column].total.grams
      }
    },
    exportDiet () {
      var workBook = XLSX.utils.book_new()
      var workSheet1 = XLSX.utils.table_to_sheet(document.getElementById('qualitative').getElementsByClassName('q-table')[0])
      XLSX.utils.book_append_sheet(workBook, workSheet1, 'Qualitativa')
      var workSheet2 = XLSX.utils.table_to_sheet(document.getElementById('quantitative').getElementsByClassName('q-table')[0])
      XLSX.utils.book_append_sheet(workBook, workSheet2, 'Quantitativa')
      var workSheet3 = XLSX.utils.table_to_sheet(document.getElementById('adequation').getElementsByClassName('q-table')[0])
      XLSX.utils.book_append_sheet(workBook, workSheet3, 'Adequação')
      var output = remote.dialog.showSaveDialog({
        filters: [{
          name: 'Excel files',
          extensions: ['xlsx']
        },
        {
          name: 'All files',
          extensions: ['*']
        }
        ]
      })
      XLSX.writeFile(workBook, output)
    }
  },
  computed: {
    ...mapGetters('composition', ['getColumnsNoDescQty']),
    visibleColumnsNoDescNoQty () {
      let columnFilter = []
      this.getColumnsNoDescQty.forEach(column => {
        if (_.includes(this.diet.visibleColumns, column.name)) {
          columnFilter.push(column)
        }
      })
      /* this.diet.visibleColumns.forEach(column => {
        if (column !== 'description' && column !== 'qty') {
          columnFilter.push(column)
        }
      }) */
      return columnFilter
    }
  },
  mounted () {
    this.diet.meals.forEach(meal => {
      meal.items.forEach(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.item_id = item.item_id
        newItem.description = item.description
        newItem.qty = item.qty
        this.getColumnsNoDescQty.forEach(column => {
          newItem[column.name] = item[column.name].actual
        })
        this.items.push(newItem)
      })
    })
    this.items.forEach(item => {
      if (this.itemsExport.length > 0) {
        for (let i = 0; i < this.itemsExport.length; i++) {
          let noItemEqual = true
          if (item.item_id === this.itemsExport[i].item_id) {
            return
          }
          if (item.id === this.itemsExport[i].id) {
            this.getColumnsNoDescQty.forEach(column => {
              this.itemsExport[i][column.name] += item[column.name]
            })
            noItemEqual = false
            return
          }
          if (i === this.itemsExport.length - 1 && noItemEqual) {
            this.itemsExport.push(item)
          }
        }
      } else {
        this.itemsExport.push(item)
      }
    })
  }
}
</script>

<style>
</style>
