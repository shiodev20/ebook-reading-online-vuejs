<template>
  <slot></slot>
</template>

<script>
export default {
  name: "Helmet",
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
    document.title = 'ShioBook | ' + props.title
  }
}
</script>

<style>

</style>