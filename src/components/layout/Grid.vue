<template>
  <div 
    class="grid"
    :class="[smCol, mdCol, lgCol, col]"
    :style="[gap]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Grid',
  props: {
    smCol: Number,
    mdCol: Number,
    lgCol: Number,
    col: Number,
    gap: Number,
  },
  setup(props) {

    const smCol = ref(props.smCol ? `col-sm-${props.smCol}` : '')
    const mdCol = ref(props.mdCol ? `col-md-${props.mdCol}` : '')
    const lgCol = ref(props.lgCol ? `col-lg-${props.lgCol}` : '')
    const col = ref(props.col ? `col-${props.col}` : '')
    const gap = ref({gap: props.gap ?  `${props.gap}px` : '0'})

    return {
      smCol,
      mdCol,
      lgCol,
      col,
      gap,
    }

  }
}
</script>

<style>

</style>