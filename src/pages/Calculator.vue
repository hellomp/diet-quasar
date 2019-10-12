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
                  label="IMC"
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
      this.macros.carbohydrate.grams = this.macros.carbohydrate.gramature * this.energyWeight
      this.macros.carbohydrate.kcal = this.macros.carbohydrate.grams * 4
      this.macros.carbohydrate.perc = (this.macros.carbohydrate.kcal / this.energy) * 100
    },
    updateProtein () {
      this.macros.protein.grams = this.macros.protein.gramature * this.energyWeight
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
        return heightSquare * 23
      } else if (this.sex === 'Masculino') {
        return heightSquare * 22
      } else {
        return heightSquare * 21
      }
    },
    adjustedWeight () {
      return (this.actualWeight + this.idealWeight) / 2
    },
    energy () {
      return this.energyWeight * this.kcalPerGram
    },
    bmi () {
      let heightSquare = this.height * this.height
      return this.actualWeight / heightSquare
    },
    weightLost () {
      return (this.actualWeight / this.usualWeight) * 100
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
