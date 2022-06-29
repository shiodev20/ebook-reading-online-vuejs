<template>
  <Transition name="show-toast">
    <div class="toast" v-if="toast" ref="toastRef">
      <span 
        class="toast__close" 
        v-if="close"
        @click="closeToast"
      ><i class="bx bx-x"></i></span>

      <slot></slot>
    </div>
  </Transition>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "Toast",
  props: {
    close: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: [Number, Boolean],
      default: 3000,
    }
  },
  setup(props) {
    const store = useStore();

    const toastRef = ref(null);
    const toast = computed(() => store.state.toast);

    const closeToast = () => store.commit('closeToast')

    watch(toastRef, (n, o) => {
      if(n && props.timeout) {
        setTimeout(() => {
          store.commit('closeToast')
        }, props.timeout)
      }
    })
    return {
      toastRef,
      toast,
      closeToast,
    };
  },
};
</script>

<style>
.show-toast-enter-from {
  left: -100px;
  opacity: 0;
}

.show-toast-enter-active {
  transition: all .5s ease;
}

.show-toast-enter-to {
  left: 2rem;
  opacity: 1;
}

.show-toast-leave-from {
  left: 2rem;
  opacity: 1;
}

.show-toast-leave-active {
  transition: all .3s ease;
}

.show-toast-leave-to {
  left: -100px;
  opacity: 0;
}
</style>
