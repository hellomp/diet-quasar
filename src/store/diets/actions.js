import _ from 'lodash'
import fs from 'fs'
import { remote } from 'electron'
const dietsPath = remote.app.getPath('userData') + '/diets.json'
export function setDiets ({ commit, state }) {
  fs.readFile(dietsPath, 'utf-8', (err, data) => {
    if (err == null) {
      console.log('File found')
      commit('SET_DIETS', JSON.parse(data))
    } else if (err.code === 'ENOENT') {
      console.log('Create file')
      fs.writeFile(dietsPath, JSON.stringify(state.diets), 'utf-8', (err) => {
        if (err) throw err
      })
    } else {
      console.log('Some other error: ', err.code)
    }
  })
}
export function updateDiet ({ commit, state }, _diet) {
  // Atualizar a dieta já salva na lista de dietas do app
  let diets = state.diets.slice()
  diets.forEach(diet => {
    if (diet.path === _diet.path) {
      diet.lastUpdate = _diet.lastUpdate
    }
  })
  fs.writeFile(dietsPath, JSON.stringify(diets), 'utf-8', (err) => {
    if (err) throw err
    console.log('Dieta adicionada à lista:' + dietsPath)
    console.log('Dietas:' + diets)
    commit('SET_DIETS', diets)
  })
}
export function addDiet ({ commit, state }, _diet) {
  let diets = state.diets.slice()
  // Verificar se a dieta já existe na lista do app
  if (_.includes(diets, _diet.path)) {
    return
  }
  // Adicionar a dieta salva à lista de dietas do app
  let thisDiet = {
    id: _diet.id,
    name: _diet.name,
    path: _diet.path,
    created: _diet.created,
    updated: _diet.updated
  }
  diets.push(thisDiet)
  fs.writeFile(dietsPath, JSON.stringify(diets), 'utf-8', (err) => {
    if (err) throw err
    console.log('Dieta adicionada à lista:' + dietsPath)
    console.log('Dietas:' + diets)
    commit('SET_DIETS', diets)
  })
}
