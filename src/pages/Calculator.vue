<template>
  <q-page padding>
    <div class="column q-col-gutter-sm">
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-xs">
              <div class="col-4">
                <q-input
                  outlined
                  label="Peso atual"
                  v-model.number="actualWeight"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Peso usual"
                  v-model.number="usualWeight"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Altura"
                  v-model.number="height"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Idade"
                  v-model.number="age"
                />
              </div>
              <div class="col-8">
                <q-select
                  outlined
                  label="Sexo"
                  v-model="sex"
                  :options="sexOptions"
                />
              </div>
              <div class="col-3">
                <q-input
                  outlined
                  label="IMC (kg/m²)"
                  :value="bmi"
                  readonly
                />
              </div>
              <div class="col-3">
                <q-input
                  outlined
                  label="Perda de peso (%)"
                  :value="weightLost"
                  readonly
                />
              </div>
              <div class="col-3">
                <q-input
                  outlined
                  label="Peso Ideal"
                  :value="idealWeight"
                  readonly
                />
              </div>
              <div class="col-3">
                <q-input
                  outlined
                  label="Peso Ajustado"
                  :value="adjustedWeight"
                  readonly
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-xs">
              <div class="col-4">
                <q-input
                  outlined
                  label="Circunferência do Braço (cm)"
                  v-model="armCircumference"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Prega Cutânea Tricipital (mm)"
                  v-model="tricipitalSkinfold"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Circunferência da Cintura (cm)"
                  v-model="waistCircumference"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Adequação CB (%)"
                  v-model="armCircumferenceAdequation"
                  readonly
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="Adequação PCT (%)"
                  v-model="tricipitalSkinfoldAdequation"
                  readonly
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-xs">
              <div class="col-4">
                <q-input
                  outlined
                  label="Peso"
                  v-model="energyWeight"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="kcal/kg"
                  v-model="kcalPerGram"
                />
              </div>
              <div class="col-4">
                <q-input
                  outlined
                  label="VET"
                  :value="energy"
                  readonly
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-markup-table>
          <thead>
            <tr>
              <th></th>
              <th>g/kg</th>
              <th>g</th>
              <th>kcal</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Carboidrato</td>
              <td>
                <q-input
                  outlined
                  dense
                  v-model="macros.carbohydrate.gramature"
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.carbohydrate.grams"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.carbohydrate.kcal"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.carbohydrate.perc"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td>Proteína</td>
              <td>
                <q-input
                  outlined
                  dense
                  v-model="macros.protein.gramature"
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.protein.grams"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.protein.kcal"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.protein.perc"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td>Lipídeo</td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.lipid.gramature"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.lipid.grams"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.lipid.kcal"
                  readonly
                />
              </td>
              <td>
                <q-input
                  outlined
                  dense
                  :value="macros.lipid.perc"
                  readonly
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Calculator',
  data () {
    return {
      actualWeight: 0,
      usualWeight: 0,
      energyWeight: 0,
      kcalPerGram: 0,
      height: 0,
      age: 0,
      sexOptions: ['Masculino', 'Feminino'],
      sex: 'Masculino',
      waistCircumference: 0,
      armCircumference: 0,
      tricipitalSkinfold: 0,
      macros: {
        carbohydrate: {
          gramature: 0,
          grams: 0,
          kcal: 0,
          perc: 0
        },
        protein: {
          gramature: 0,
          grams: 0,
          kcal: 0,
          perc: 0
        },
        lipid: {
          gramature: 0,
          grams: 0,
          kcal: 0,
          perc: 0
        }
      }
    }
  },
  methods: {
    grams (macroName) {
      return this.macros[macroName] * this.actualWeight
    },
    updateCarbohydrate () {
      this.macros.carbohydrate.grams = _.round(this.macros.carbohydrate.gramature * this.energyWeight, 2)
      this.macros.carbohydrate.kcal = this.macros.carbohydrate.grams * 4
      this.macros.carbohydrate.perc = (this.macros.carbohydrate.kcal / this.energy) * 100
    },
    updateProtein () {
      this.macros.protein.grams = _.round(this.macros.protein.gramature * this.energyWeight, 2)
      this.macros.protein.kcal = this.macros.protein.grams * 4
      this.macros.protein.perc = (this.macros.protein.kcal / this.energy) * 100
    },
    updateLipid () {
      this.macros.lipid.perc = 100 - (this.macros.carbohydrate.perc + this.macros.protein.perc)
      this.macros.lipid.kcal = (this.macros.lipid.perc / 100) * this.energy
      this.macros.lipid.grams = this.macros.lipid.kcal / 9
      this.macros.lipid.gramature = this.macros.lipid.grams / this.energyWeight
    }
  },
  computed: {
    idealWeight () {
      let heightSquare = this.height * this.height
      if (this.age > 64) {
        return _.round(heightSquare * 23, 2)
      } else if (this.sex === 'Masculino') {
        return _.round(heightSquare * 22, 2)
      } else {
        return _.round(heightSquare * 21, 2)
      }
    },
    adjustedWeight () {
      return _.round((this.actualWeight + this.idealWeight) / 2, 2)
    },
    energy () {
      return _.round(this.energyWeight * this.kcalPerGram, 2)
    },
    bmi () {
      let heightSquare = this.height * this.height
      return _.round(this.actualWeight / heightSquare, 2)
    },
    weightLost () {
      return (this.actualWeight / this.usualWeight) * 100
    },
    armCircumferenceAdequation () {
      let result = 0
      if (this.sex === 'Masculino') {
        result = (this.armCircumference * 100) / 29.3
      } else {
        result = (this.armCircumference * 100) / 28.5
      }
      return _.round(result, 2)
    },
    tricipitalSkinfoldAdequation () {
      let result = 0
      if (this.sex === 'Masculino') {
        result = (this.tricipitalSkinfold * 100) / 12.5
      } else {
        result = (this.tricipitalSkinfold * 100) / 16.5
      }
      return _.round(result, 2)
    }
  },
  watch: {
    actualWeight: [
      'updateCarbohydrate',
      'updateProtein',
      'updateLipid'
    ],
    energy: [
      'updateCarbohydrate',
      'updateProtein',
      'updateLipid'
    ],
    'macros.carbohydrate.gramature': ['updateCarbohydrate', 'updateLipid'],
    'macros.protein.gramature': ['updateProtein', 'updateLipid']
  }
}
</script>

<style>
</style>
