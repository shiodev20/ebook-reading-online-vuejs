<template>
  <div class="quote">
    <hr class="quote__divider quote__divider--top">
    
    <p class="quote__content">{{ quote.content }}</p>

    <p class="quote__author">{{ quote.author }}</p>

    <hr class="quote__divider quote__divider--bottom">

    </div>
</template>

<script>
import { ref } from 'vue';
import quotes from "@/assets/data/quotes";

export default {
  name: 'Quote',
  setup() {

    const quote = ref({})

    const randomQoute = () => {
      const randomIdx = Math.floor((Math.random() * quotes.length))
      quote.value = quotes[randomIdx]
    }

    randomQoute()

    return {
      quote,
    }
  }
}
</script>

<style>

</style>