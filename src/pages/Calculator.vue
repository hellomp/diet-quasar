<template>
  <q-page padding>
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
      <div class="col-4">
        <q-input
          outlined
          label="IMC"
          v-model="bmi"
          readonly
        />
      </div>
      <div class="col-4">
        <q-input
          outlined
          label="Peso Ideal"
          v-model="idealWeight"
          readonly
        />
      </div>
    </div>
    <div class="row q-col-gutter-xs">
      <div class="col-4"></div>
      <div class="col-2">g/kg</div>
      <div class="col-2">g</div>
      <div class="col-2">kcal</div>
      <div class="col-2">%</div>
    </div>
    <div class="row q-col-gutter-xs">
      <div class="col-4">Carboidrato</div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-4">Proteína</div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-4">Lipídeo</div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
      <div class="col-2">
        <q-input
          outlined
          dense
        />
      </div>
    </div>
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
              v-model="macros.carbohydrate"
            />
          </td>
          <td>
            <q-input
              outlined
              dense
              :value="grams('carbohydrate')"
            />
          </td>
          <td>
            <q-input
              outlined
              dense
            />
          </td>
          <td>
            <q-input
              outlined
              dense
            />
          </td>
        </tr>
        <tr>
          <td>Proteína</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Lipídeo</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      actualWeight: 0,
      usualWeight: 0,
      height: 0,
      age: 0,
      sexOptions: ['Masculino', 'Feminino'],
      sex: 'Masculino',
      macros: {
        carbohydrate: 0,
        protein: 0,
        lipid: 0
      }
    }
  },
  methods: {
    grams (macroName) {
      return this.macros[macroName] * this.actualWeight
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
    bmi () {
      let heightSquare = this.height * this.height
      return this.actualWeight / heightSquare
    }
  }
}
</script>

<style>
</style>
