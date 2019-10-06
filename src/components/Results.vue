<template>
  <div class="container">
    <div class="header">
      <div class="title">
        Dieta
      </div>
      <div class="divider"></div>
      <div class="title">
        Calculado
      </div>
    </div>
    <template v-for="column in getColumnsNoDescQty">
      <div
        class="row"
        v-if="checkVisibleColumn(column.name)"
        :key="column.name"
      >
        <span class="subtitle">{{column.label}}</span>
        <div class="results">
          <div class="result">
            <template v-if="column.name === 'energy'">
              <span>{{diet[column.name].total.kcal}} kcal</span>
            </template>
            <template v-else-if="column.name === 'carbohydrate' || column.name === 'protein' || column.name === 'lipid'">
              <span>{{diet[column.name].total.grams}} g</span>
              <span>{{diet[column.name].total.kcal}} kcal</span>
              <span>{{diet[column.name].total.perc}}%</span>
            </template>
            <template v-else>
              <span>{{diet[column.name].total.grams}} {{column.unit}}</span>
            </template>
          </div>
          <div
            v-if="diet[column.name].adequation > 89.99 && diet[column.name].adequation < 110.01"
            class="adequation positive"
          >{{diet[column.name].adequation}}%</div>
          <div
            v-else
            class="adequation negative"
          >{{diet[column.name].adequation}}%</div>
          <div class="result">
            <template v-if="column.name === 'energy'">
              <span>{{diet[column.name].target.kcal}} kcal</span>
            </template>
            <template v-else-if="column.name === 'carbohydrate' || column.name === 'protein' || column.name === 'lipid'">
              <span>{{diet[column.name].target.grams}} g</span>
              <span>{{diet[column.name].target.kcal}} kcal</span>
              <span>{{diet[column.name].target.perc}}%</span>
            </template>
            <template v-else>
              <span>{{diet[column.name].target.grams}} {{column.unit}}</span>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Results',
  props: ['diet'],
  methods: {
    checkVisibleColumn (column) {
      return _.includes(this.diet.visibleColumns, column)
    }
    /* updateAdequation (param, totalValue, targetValue) {
      this.diet.energyAdequation = _.round(_.multiply(_.divide(this.diet.energyTotal, this.diet.energyTarget), 100), 2)
      this.diet.carbohydrateAdequation = _.round(_.multiply(_.divide(this.diet.carbohydrateTotal, this.diet.carbohydrateTarget), 100), 2)
      this.diet.proteinAdequation = _.round(_.multiply(_.divide(this.diet.proteinTotal, this.diet.proteinTarget), 100), 2)
      this.diet.lipidAdequation = _.round(_.multiply(_.divide(this.diet.lipidTotal, this.diet.lipidTarget), 100), 2)

      if (adequation > 90 && adequation < 110) {
        result = true
      } else {
        result = false
      }
      let adequation = _.round(_.multiply(_.divide(totalValue, targetValue), 100), 2)
      let result = false
      if (adequation > 90 && adequation < 110) {
        result = true
      } else {
        result = false
      }
      if (result) {
        switch (param) {
          case 'energy':
            this.diet.energyAdequated = true
            break
          case 'carbohydrate':
            this.diet.carbohydrateAdequated = true
            break
          case 'protein':
            this.diet.proteinAdequated = true
            break
          case 'lipid':
            this.diet.lipidAdequated = true
            break
        }
      } else {
        switch (param) {
          case 'energy':
            this.diet.energyAdequated = false
            break
          case 'carbohydrate':
            this.diet.carbohydrateAdequated = false
            break
          case 'protein':
            this.diet.proteinAdequated = false
            break
          case 'lipid':
            this.diet.lipidAdequated = false
            break
        }
      }
      return adequation
    } */
  },
  computed: {
    ...mapGetters('composition', ['getColumnsNoDescQty'])
  }
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0.7rem 0;
  border-bottom: 1px solid #d1d1d1;
}
.divider {
  min-width: 60px;
}
.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid #d1d1d1;
}
.title {
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.subtitle {
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  margin-top: -1rem;
  margin-bottom: 0.25rem;
  border: 1px solid #d1d1d1;
  border-radius: 1rem;
  background: #ffffff;
}
.results {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.adequation {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
}
.positive {
  background-color: #51c08a !important;
}
.negative {
  background-color: #db4437 !important;
}
</style>
