<template>
  <transition name="modal">
    <div class="modal" v-if="open">
      <div 
        class="modal__bg" 
        v-if="backdrop" 
        @click="$emit('close-modal')"
      >
        <backdrop></backdrop>
      </div>

      <div class="modal__header">
        <slot name="header"></slot>
      </div>

      <div class="modal__body">
        <slot></slot>
      </div>

      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Backdrop from "./Backdrop.vue";

export default {
  components: { Backdrop },
  props: {
    open: Boolean,
    backdrop: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style>
.modal-enter-from {
  opacity: 0;
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-enter-to {
  opacity: 1;
}

.modal-leave-from {
  opacity: 1;
}

.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-leave-to {
  opacity: 0;
}
</style>