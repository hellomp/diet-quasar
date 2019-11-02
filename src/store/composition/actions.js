import fs from 'fs'

export function setTucunduva ({ commit }) {
  fs.readFile('src/database/tucunduva.json', 'utf-8', (err, data) => {
    if (err == null) {
      commit('SET_TUCUNDUVA', JSON.parse(data))
    } else if (err.code === 'ENOENT') {
      console.log('File doesnt exist')
    } else {
      console.log('Error reading file: ', err.code)
    }
  })
  console.log('1. Read Tucunduva database')
}
export function setIBGE ({ commit }) {
  fs.readFile('src/database/ibge.json', 'utf-8', (err, data) => {
    if (err == null) {
      commit('SET_IBGE', JSON.parse(data))
    } else if (err.code === 'ENOENT') {
      console.log('File doesnt exist')
    } else {
      console.log('Error reading file: ', err.code)
    }
  })
  console.log('1. Read IBGE database')
}
export function setDRIs ({ commit }) {
  fs.readFile('src/database/dris.json', 'utf-8', (err, data) => {
    if (err == null) {
      commit('SET_DRIS', JSON.parse(data))
    } else if (err.code === 'ENOENT') {
      console.log('File doesnt exist')
    } else {
      console.log('Error reading file: ', err.code)
    }
  })
}
