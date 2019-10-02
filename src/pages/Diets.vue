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
          label="Abrir"
        />
      </template>
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click.native="openDiet(props.row.path)"
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
            key="lastUpdate"
            :props="props"
          >
            {{props.row.updated}}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-btn
      rounded
      color="primary"
      icon="add"
      label="Nova dieta"
      @click="newDietDialog = true"
    />
    <q-dialog v-model="newDietDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Nova newDietDialog</div>
        </q-card-section>

        <q-card-section>
          <div class="row">
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
import moment from 'moment'
import uniqid from 'uniqid'
import tmp from 'tmp'
import fs from 'fs'
import { mapGetters } from 'vuex'
import { remote } from 'electron'

export default {
  data () {
    return {
      diets: [],
      columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'created', label: 'Criado em', field: 'created', sortable: true },
        { name: 'updated', label: 'Última atualização', field: 'updated', sortable: true }
      ],
      newDiet: {
        id: null,
        name: '',
        path: '',
        created: null,
        updated: null,
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
        visibleColumns: ['description', 'qty', 'energy', 'carbohydrate', 'protein', 'lipid']
      },
      newDietDialog: false
    }
  },
  computed: {
    ...mapGetters('diets', ['getDiets'])
  },
  methods: {
    openDiet (path) {
      this.$router.push({
        name: 'diet',
        params: {
          dietPath: path
        }
      })
    },
    createDiet () {
      this.newDiet.id = uniqid()
      this.newDiet.created = moment().format('ll')
      this.newDiet.carbohydrate.target.perc = _.round(_.multiply(_.divide(this.newDiet.carbohydrate.target.kcal, this.newDiet.energy.target.kcal), 100), 2)
      this.newDiet.protein.target.perc = _.round(_.multiply(_.divide(this.newDiet.protein.target.kcal, this.newDiet.energy.target.kcal), 100), 2)
      this.newDiet.lipid.target.perc = _.round(_.multiply(_.divide(this.newDiet.lipid.target.kcal, this.newDiet.energy.target.kcal), 100), 2)

      let newDietData = JSON.stringify(this.newDiet)
      let instance = this
      tmp.file({
        dir: remote.app.getPath('temp')
      }, function _tempFileCreated (err, path, fd, cleanupCallback) {
        if (err) throw err
        console.log('File: ', path)
        console.log('Filedescriptor: ', fd)
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
      })
    }
  }
}
</script>

<style>
</style>
