<template>
  <div
    ref="viewBox"
    class="view-box"
    :style="{ 'cursor': draggable? 'move': 'default' }"
    @mousedown.prevent="_onMousedown"
    @mousewheel.prevent="_onMousewheel"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'view-box',
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    scalable: {
      type: Boolean,
      default: true
    },
    minScaleRatio: {
      type: Number,
      default: 0.2
    },
    maxScaleRatio: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      slotElem: {
        el: Object,
        left: 0,
        top: 0,
        scaleRatio: 1
      },
      viewBox: Object,
    }
  },
  methods: {
    _checkOverflowBorder() {
      let elCoords = this.slotElem.el.getBoundingClientRect();
      let marginLeft = elCoords.left - this.viewBox.offsetLeft;
      let marginTop = elCoords.top - this.viewBox.offsetTop;
      let marginRight = this.viewBox.offsetLeft + this.viewBox.offsetWidth - elCoords.right;
      let marginBottom = this.viewBox.offsetTop + this.viewBox.offsetHeight - elCoords.bottom;
      if (marginLeft <= 0) {
        this.$emit('overflow-border', 'left', this.slotElem);
      }
      if (marginTop <= 0) {
        this.$emit('overflow-border', 'top', this.slotElem);
      }
      if (marginRight <= 0) {
        this.$emit('overflow-border', 'right', this.slotElem);
      }
      if (marginBottom <= 0) {
        this.$emit('overflow-border', 'bottom', this.slotElem);
      }
    },
    _checkScaleRatio() {
      if (this.slotElem.scaleRatio <= this.minScaleRatio) {
        this.slotElem.scaleRatio = this.minScaleRatio;
        this.$emit('min-scale', this.slotElem);
      } else if (this.slotElem.scaleRatio >= this.maxScaleRatio) {
        this.slotElem.scaleRatio = this.maxScaleRatio
        this.$emit('max-scale', this.slotElem);
      }
    },
    _onMousedown(e) {
      if (!this.draggable) return;
      let startDragX = e.clientX - this.viewBox.offsetLeft;
      let startDragY = e.clientY - this.viewBox.offsetTop;
      this.viewBox.onmousemove = (e) => {
        let endDragX = e.clientX - this.viewBox.offsetLeft - startDragX;
        let endDragY = e.clientY - this.viewBox.offsetTop - startDragY;
        this.slotElem.el.style.left = this.slotElem.left + endDragX + 'px';
        this.slotElem.el.style.top = this.slotElem.top + endDragY + 'px';
        this._checkOverflowBorder();
      }
      this.viewBox.onmouseup = () => {
        this.slotElem.left = +this.slotElem.el.style.left.slice(0, -2);
        this.slotElem.top = +this.slotElem.el.style.top.slice(0, -2);
        this.viewBox.onmousemove = null;
        this.viewBox.onmouseup = null;
      }
      this.viewBox.onmouseleave = () => {
        this.slotElem.left = +this.slotElem.el.style.left.slice(0, -2);
        this.slotElem.top = +this.slotElem.el.style.top.slice(0, -2);
        this.viewBox.onmousemove = null;
        this.viewBox.onmouseup = null;
        this.viewBox.onmouseleave = null;
      }
    },
    _onMousewheel(e) {
      if (!this.scalable) return;
      this.slotElem.scaleRatio += ~e.deltaY / 1000;
      this._checkScaleRatio();
      this.slotElem.el.style.transform = `scale(${this.slotElem.scaleRatio})`;
      this._checkOverflowBorder();
    },
    setPosition(left = 0, top = 0, scaleRatio = 1) {
      this.slotElem.left = left;
      this.slotElem.top = top;
      this.slotElem.scaleRatio = scaleRatio;
      this.slotElem.el.style.left = `${this.slotElem.left}px`;
      this.slotElem.el.style.top = `${this.slotElem.top}px`;
      this._checkScaleRatio();
      this.slotElem.el.style.transform = `scale(${this.slotElem.scaleRatio})`;
      this._checkOverflowBorder();
    }
  },
  mounted() {
    this.viewBox = this.$refs.viewBox;
    this.slotElem.el = this.$slots.default[0].elm;
    this.slotElem.el.style.position = 'relative';
  }
}
</script>

<style scoped>
.view-box {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
