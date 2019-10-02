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
    <div
      class="row"
      v-if="checkVisibleColumn('energy')"
    >
      <span class="subtitle">Energia</span>
      <div class="results">
        <div class="result">
          <span>{{diet.energy.total.kcal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.energy.adequation}}%</div>
        <div class="result">
          <span>{{diet.energy.target.kcal}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('carbohydrate')"
    >
      <span class="subtitle">Carboidrato</span>
      <div class="results">
        <div class="result">
          <span>{{diet.carbohydrateTotalEnergy}} kcal</span>
          <span>{{diet.carbohydrateTotalPerc}}%</span>
          <span>{{diet.carbohydrateTotal}} g/kg</span>
        </div>
        <div class="adequation positive">{{diet.carbohydrateAdequation}}%</div>
        <div class="result">
          <span>{{diet.carbohydrate.target.kcal}} kcal</span>
          <span>{{diet.carbohydrateTargetPerc}}%</span>
          <span>{{diet.carbohydrateTarget}} g/kg</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('protein')"
    >
      <span class="subtitle">Proteína</span>
      <div class="results">
        <div class="result">
          <span>{{diet.proteinTotalEnergy}} kcal</span>
          <span>{{diet.proteinTotalPerc}}%</span>
          <span>{{diet.proteinTotal}} g/kg</span>
        </div>
        <div class="adequation positive">{{diet.proteinAdequation}}%</div>
        <div class="result">
          <span>{{diet.proteinTarget}} kcal</span>
          <span>{{diet.proteinTargetPerc}}%</span>
          <span>{{diet.proteinTarget}} g/kg</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('lipid')"
    >
      <span class="subtitle">Lipídeo</span>
      <div class="results">
        <div class="result">
          <span>{{diet.lipidTotalEnergy}} kcal</span>
          <span>{{diet.lipidTotalPerc}}%</span>
          <span>{{diet.lipidTotal}} g/kg</span>
        </div>
        <div class="adequation positive">{{diet.lipidAdequation}}%</div>
        <div class="result">
          <span>{{diet.lipidTarget}} kcal</span>
          <span>{{diet.lipidTargetPerc}}%</span>
          <span>{{diet.lipidTarget}} g/kg</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('fiber')"
    >
      <span class="subtitle">Fibra</span>
      <div class="results">
        <div class="result">
          <span>{{diet.fiberTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.fiberAdequation}}%</div>
        <div class="result">
          <span>{{diet.fiberTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('sodium')"
    >
      <span class="subtitle">Sódio</span>
      <div class="results">
        <div class="result">
          <span>{{diet.sodiumTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.sodiumAdequation}}%</div>
        <div class="result">
          <span>{{diet.sodiumTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('fatty_acids_poly')"
    >
      <span class="subtitle">Á.G. Poli.</span>
      <div class="results">
        <div class="result">
          <span>{{diet.fatty_acids_polyTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.fatty_acids_polyAdequation}}%</div>
        <div class="result">
          <span>{{diet.fatty_acids_polyTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('fatty_acids_mono')"
    >
      <span class="subtitle">Á.G. Mono.</span>
      <div class="results">
        <div class="result">
          <span>{{diet.fatty_acids_monoTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.fatty_acids_monoAdequation}}%</div>
        <div class="result">
          <span>{{diet.fatty_acids_monoTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('fatty_acids_sat')"
    >
      <span class="subtitle">Á.G. Sat.</span>
      <div class="results">
        <div class="result">
          <span>{{diet.fatty_acids_satTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.fatty_acids_satAdequation}}%</div>
        <div class="result">
          <span>{{diet.fatty_acids_satTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('cholesterol')"
    >
      <span class="subtitle">Colesterol</span>
      <div class="results">
        <div class="result">
          <span>{{diet.cholesterolTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.cholesterolAdequation}}%</div>
        <div class="result">
          <span>{{diet.cholesterolTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('re')"
    >
      <span class="subtitle">Retinol</span>
      <div class="results">
        <div class="result">
          <span>{{diet.reTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.reAdequation}}%</div>
        <div class="result">
          <span>{{diet.reTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('vitamin_C')"
    >
      <span class="subtitle">Á. Ascórbico (C)</span>
      <div class="results">
        <div class="result">
          <span>{{diet.vitamin_CTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.vitamin_CAdequation}}%</div>
        <div class="result">
          <span>{{diet.vitamin_CTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('thiamine')"
    >
      <span class="subtitle">Tiamina</span>
      <div class="results">
        <div class="result">
          <span>{{diet.thiamineTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.thiamineAdequation}}%</div>
        <div class="result">
          <span>{{diet.thiamineTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('riboflavin')"
    >
      <span class="subtitle">Riboflavina</span>
      <div class="results">
        <div class="result">
          <span>{{diet.riboflavinTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.riboflavinAdequation}}%</div>
        <div class="result">
          <span>{{diet.riboflavinTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('pyridoxine')"
    >
      <span class="subtitle">Piridoxina</span>
      <div class="results">
        <div class="result">
          <span>{{diet.pyridoxineTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.pyridoxineAdequation}}%</div>
        <div class="result">
          <span>{{diet.pyridoxineTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('niacin')"
    >
      <span class="subtitle">Niacina</span>
      <div class="results">
        <div class="result">
          <span>{{diet.niacinTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.niacinAdequation}}%</div>
        <div class="result">
          <span>{{diet.niacinTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('calcium')"
    >
      <span class="subtitle">Cálcio</span>
      <div class="results">
        <div class="result">
          <span>{{diet.calciumTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.calciumAdequation}}%</div>
        <div class="result">
          <span>{{diet.calciumTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('manganese')"
    >
      <span class="subtitle">Manganês</span>
      <div class="results">
        <div class="result">
          <span>{{diet.manganeseTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.manganeseAdequation}}%</div>
        <div class="result">
          <span>{{diet.manganeseTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('zinc')"
    >
      <span class="subtitle">Zinco</span>
      <div class="results">
        <div class="result">
          <span>{{diet.zincTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.zincAdequation}}%</div>
        <div class="result">
          <span>{{diet.zincTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('magnesium')"
    >
      <span class="subtitle">Magnésio</span>
      <div class="results">
        <div class="result">
          <span>{{diet.magnesiumTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.magnesiumAdequation}}%</div>
        <div class="result">
          <span>{{diet.magnesiumTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('potassium')"
    >
      <span class="subtitle">Potássio</span>
      <div class="results">
        <div class="result">
          <span>{{diet.potassiumTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.potassiumAdequation}}%</div>
        <div class="result">
          <span>{{diet.potassiumTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('phosphorus')"
    >
      <span class="subtitle">Fósforo</span>
      <div class="results">
        <div class="result">
          <span>{{diet.phosphorusTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.phosphorusAdequation}}%</div>
        <div class="result">
          <span>{{diet.phosphorusTarget}} kcal</span>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="checkVisibleColumn('copper')"
    >
      <span class="subtitle">Cobre</span>
      <div class="results">
        <div class="result">
          <span>{{diet.copperTotal}} kcal</span>
        </div>
        <div class="adequation positive">{{diet.copperAdequation}}%</div>
        <div class="result">
          <span>{{diet.copperTarget}} kcal</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
</style>
