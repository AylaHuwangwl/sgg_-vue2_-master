<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "barchart",
  mounted() {
    // 初始化echarts实例
    let linecharts = echarts.init(this.$refs.charts);
    linecharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          color:"cyan"
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip:{},
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>