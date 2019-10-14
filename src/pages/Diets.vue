<template>
  <q-page padding>
    <q-table
      :data="getDiets"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-right="props">
        <q-btn
          flat
          color="primary"
          label="Nova dieta"
          @click="newDietDialog = true"
        />
      </template>
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click.native="openDiet(props.row.id)"
        >
          <q-td
            key="name"
            :props="props"
          >
            {{props.row.name}}
          </q-td>
          <q-td
            key="created"
            :props="props"
          >
            {{props.row.created}}
          </q-td>
          <q-td
            key="updated"
            :props="props"
          >
            {{props.row.updated}}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="newDietDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Nova dieta</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-xs">
            <div class="col-12">
              <q-input
                outlined
                v-model="newDiet.name"
                label="Nome"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="newDiet.energy.target.kcal"
                label="Energia (kcal)"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="newDiet.carbohydrate.target.kcal"
                label="Carboidrato (g)"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="newDiet.protein.target.kcal"
                label="Proteína (g)"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="newDiet.lipid.target.kcal"
                label="Lipídeo (g)"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="newDiet.patient.weight"
                label="Peso (kg)"
              />
            </div>
            <div class="col-6">
              <q-input
                outlined
                v-model="newDiet.patient.age"
                label="Idade"
              />
            </div>
            <div class="col-6">
              <q-select
                :options="sexOptions"
                outlined
                v-model="newDiet.patient.sex"
                label="Sexo"
                emit-value
                map-options
              />
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
            label="Criar"
            color="primary"
            @click="createDiet"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import _ from 'lodash'
import { db } from '../plugins/firebase'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      diets: [],
      columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'created', label: 'Criado em', field: 'created', sortable: true },
        { name: 'updated', label: 'Última atualização', field: 'updated', sortable: true }
      ],
      sexOptions: [
        {
          value: 'male',
          label: 'Masculino'
        },
        {
          value: 'female',
          label: 'Feminino'
        }
      ],
      newDiet: {
        id: null,
        name: '',
        path: '',
        created: null,
        updated: null,
        patient: {
          age: 0,
          sex: 'male',
          weight: 0
        },
        energy: {
          target: {
            kcal: 0
          },
          total: {
            kcal: 0
          },
          adequation: 0
        },
        carbohydrate: {
          target: {
            perc: 0,
            kcal: 0,
            grams: 0
          },
          total: {
            perc: 0,
            kcal: 0,
            grams: 0
          },
          adequation: 0
        },
        protein: {
          target: {
            perc: 0,
            kcal: 0,
            grams: 0
          },
          total: {
            perc: 0,
            kcal: 0,
            grams: 0
          },
          adequation: 0
        },
        lipid: {
          target: {
            perc: 0,
            kcal: 0,
            grams: 0
          },
          total: {
            perc: 0,
            kcal: 0,
            grams: 0
          },
          adequation: 0
        },
        meals: [],
        visibleColumns: ['energy', 'carbohydrate', 'protein', 'lipid']
      },
      newDietDialog: false
    }
  },
  computed: {
    ...mapGetters('diets', ['getDiets']),
    ...mapGetters('composition', ['getColumnsNoDescQty'])
  },
  methods: {
    ...mapActions('diets', ['addDiet', 'setDiets']),
    // Abrir dieta da lista de dietas salvas no aplicativo
    openDiet (id) {
      this.$router.push({
        name: 'diet',
        params: {
          dietId: id
        }
      })
    },
    // Criar arquivo temporário da dieta e abri-la
    createDiet () {
      this.newDiet.created = moment().format('ll')
      // Definir porcentagem de cada macro na energia total e declarar as variáveis dos micro
      this.getColumnsNoDescQty.forEach(column => {
        if (column.name === 'carbohydrate' || column.name === 'protein' || column.name === 'lipid') {
          this.newDiet[column.name].target.perc = _.round(_.multiply(_.divide(this.newDiet[column.name].target.kcal, this.newDiet.energy.target.kcal), 100), 2)
        } else if (column.name !== 'energy') {
          this.newDiet[column.name] = { target: { grams: 0 }, total: { grams: 0 }, adequation: 0 }
        }
      })
      db.collection('diets').add(this.newDiet)
        .then(docRef => {
          this.$router.push({
            name: 'diet',
            params: {
              dietId: docRef.id
            }
          })
        }).catch(err => {
          console.error('Error adding diet: ', err)
        })
      /* let newDietData = JSON.stringify(this.newDiet)
      let instance = this
      tmp.file({
        dir: remote.app.getPath('temp')
      }, function _tempFileCreated (err, path, fd, cleanupCallback) {
        if (err) throw err
        fs.writeFile(path, newDietData, 'utf-8', (err) => {
          if (err) throw err
          // instance.cancelModal()
          instance.$router.push({
            name: 'diet',
            params: {
              dietPath: path
            }
          })
        })
      }) */
    }
  },
  created () {
    this.setDiets()
  }
}
</script>

<style>
</style>
