<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  <Card></Card>
  <Sale></Sale>
  <Observe></Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card/index';
import Sale from './sale/index';
import Observe from './Observe/index';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components:{
    Card,
    Sale,
    Observe
  },
  mounted(){
    this.$store.dispatch("getData");
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
