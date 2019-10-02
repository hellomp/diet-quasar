export function getTucunduva (state) {
  console.log('3. Get taco database')
  return state.tucunduva
}
export function getColumns (state) {
  return state.columns
}
export function getColumnsFilter (state) {
  let columnFilter = []
  state.columns.forEach(column => {
    if (column.name !== 'description' && column.name !== 'qty') {
      columnFilter.push(column)
    }
  })
  return columnFilter
}
