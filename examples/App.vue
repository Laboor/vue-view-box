<template>
  <div id="app">
    <div style="text-align: center; margin: 20px;">
      <label style="margin-right: 50px;">
        <input type="checkbox" v-model="draggable" /> draggable
      </label>
      <label style="margin-right: 50px;">
        <input type="checkbox" v-model="scalable" /> scalable
      </label>
      <button @click="reset">Reset Position</button>
      <br />
      <span style="margin-right: 10px;">minScaleRatio: {{minScaleRatio}}</span>
      <button @click="() => minScaleRatio += 1">+</button>
      <button @click="() => minScaleRatio -= 1" style="margin-right: 30px;">-</button>
      <span style="margin-right: 10px;">maxScaleRatio: {{maxScaleRatio}}</span>
      <button @click="() => maxScaleRatio += 1">+</button>
      <button @click="() => maxScaleRatio -= 1">-</button>
    </div>

    <view-box
      class="container"
      ref="viewBox"
      :draggable="draggable"
      :scalable="scalable"
      :minScaleRatio="minScaleRatio"
      :maxScaleRatio="maxScaleRatio"
      @max-scale="onMaxScale"
      @min-scale="onMinScale"
      @overflow-border="onOverflowBorder"
    >
      <div class="component"></div>
    </view-box>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      draggable: true, // 可拖动使能
      scalable: true, // 可缩放使能
      minScaleRatio: 1, // 最小缩放比例
      maxScaleRatio: 2  // 最大缩放比例
    }
  },
  methods: {
    // 元素缩放到最大值时触发
    onMaxScale(el) {
      console.log('maxScale', 'el:', el);
    },
    // 元素缩放到最小值时触发
    onMinScale(el) {
      console.log('minScale', 'el:', el);
    },
    // 元素触碰或超过边框触发
    onOverflowBorder(direction, el) {
      console.log('border:', direction, 'el:', el);
    },
    // 重置位置
    reset() {
      this.$refs.viewBox.setPosition(0, 0, 1); // 参数分别为：left, top, scaleRatio
    }
  }
}
</script>

<style>
.container {
  border: 1px solid black;
  width: 800px;
  height: 800px;
  margin: auto;
}

.component {
  background: red;
  opacity: 0.3;
  height: 100px;
  width: 100px;
}
</style>
