<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "progressChart",
  mounted() {
    // 初始化echarts实例
    let linecharts = echarts.init(this.$refs.charts);
    linecharts.setOption({
      xAxis: {
        show: false,
        min:0,
        max:100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          //图标形式-柱状图
          type: "bar",
          data: [78],
          color: "cyan",
          //柱状图的宽度
          barWidth: 10,
          color: "yellowgreen",
          //背景颜色设置
          showBackground: true,
          //设置背景颜色
          backgroundStyle: {
            color: "#eee",
          },
          //文本标签
          label:{
             show:true,
             //改变文本内容
             formatter:'|',
             //文本标签位置调试
             position:'right'
          }
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