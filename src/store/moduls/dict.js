
const dict = {
  // 用来创建dict对象
  state: {
    billProduce: {}
  },
  mutations: {
    SET_PRODUCE: (state, produce) => { state.billProduce = produce }
  },
  actions: {
    loadProduce ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}
export default dict
