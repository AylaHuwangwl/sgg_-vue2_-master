import mockRequest from '@/utils/mockRequest'
const state = {
}

const mutations = {
 
}

const actions = {
async getData({commit}){
 const result =  await mockRequest.get('/home/list');
 console.log(result);
 }
}
const getters = {
 
}
export default {
  state,
  mutations,
  actions,
  getters
}

