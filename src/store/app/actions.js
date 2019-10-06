export function setSavingDiet ({ commit }, value) {
  commit('SET_SAVING_DIET', value)
}
export function toggleResults ({ commit }) {
  commit('TOGGLE_RESULTS')
}
export function toggleExportDialog ({ commit }) {
  commit('TOGGLE_EXPORT')
}
