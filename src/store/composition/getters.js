export function getTucunduva (state) {
  console.log('3. Get Tucunduva database')
  return state.tucunduva
}
export function getIBGE (state) {
  console.log('3. Get IBGE database')
  return state.ibge
}
export function getDRIs (state) {
  return state.dris
}
export function getColumns (state) {
  return state.columns
}
export function getColumnsNoDescQty (state) {
  let columnFilter = []
  state.columns.forEach(column => {
    if (column.name !== 'description' && column.name !== 'qty') {
      columnFilter.push(column)
    }
  })
  return columnFilter
}
export function getColumnsNoDesc (state) {
  let columnFilter = []
  state.columns.forEach(column => {
    if (column.name !== 'description') {
      columnFilter.push(column)
    }
  })
  return columnFilter
}
export function getColumnsNoQty (state) {
  let columnFilter = []
  state.columns.forEach(column => {
    if (column.name !== 'qty') {
      columnFilter.push(column)
    }
  })
  return columnFilter
}
