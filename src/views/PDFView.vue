<template>
  <SectionContainer>
    <SectionBody>
      <div class="pdf-container">
        
      </div>
      <div class="top-bar">
        <button class="btn" id="prev-page" @click="showPrevPage">
          <i class="bx bx-chevron-left"></i> Prev Page
        </button>
        <button class="btn" id="next-page" @click="showNextPage">
          Next Page <i class="bx bx-chevron-right"></i>
        </button>
        <span class="page-info">
          Page
          <span id="page-num">{{ pageNum }}</span>
          of
          <span id="page-count">{{ pageCount }}</span>
        </span>
      </div>

      <canvas id="pdf-render"></canvas>

    </SectionBody>
  </SectionContainer>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import SectionContainer from "@/components/SectionContainer.vue";
import SectionBody from "@/components/SectionBody.vue";

export default {
  porps: {},
  components: {
    SectionContainer,
    SectionBody,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const pdfUrl = ref(`/file/${route.params.slug}.pdf`);

    let pdfDoc = reactive(null);
    const pageNum = ref(1);
    const pageCount = ref(0);
    const pageIsRendering = ref(false);
    const pageNumIsPending = ref(null);
    const canvas = ref(null);
    const ctx = ref(null);

    const renderPage = (num) => {
      pageIsRendering.value = true;

      pdfDoc
        .getPage(num)
        .then((page) => {
          const viewport = page.getViewport({ scale: 1 });
          canvas.value.height = viewport.height;
          canvas.value.width = viewport.width;

          const renderCtx = {
            canvasContext: ctx.value,
            viewport,
          };

          page.render(renderCtx).promise.then(() => {
            pageIsRendering.value = false;

            if (pageNumIsPending.value !== null) {
              renderPage(pageNumIsPending.value);
              pageNumIsPending.value = null;
            }
          });
        })
        .catch((err) => console.log(err));
    };

    const queueRenderPage = (num) => {
      if (pageIsRendering.value) pageIsRendering.value = num;
      else renderPage(num);
    };

    const showPrevPage = () => {
      if (pageNum.value <= 1) return;
      pageNum.value = pageNum.value - 1;
      queueRenderPage(pageNum.value);
    };

    const showNextPage = () => {
      if (pageNum.value >= pageCount.value) return;
      pageNum.value = pageNum.value + 1;
      queueRenderPage(pageNum.value);
    };

    onMounted(async () => {
      const canvasEl = document.querySelector("#pdf-render");
      const ctxEl = canvasEl.getContext("2d");

      canvas.value = canvasEl;
      ctx.value = ctxEl;

      pdfjsLib
        .getDocument(pdfUrl.value)
        .promise.then((pdfDoc_) => {
          pdfDoc = pdfDoc_;

          pageCount.value = pdfDoc.numPages;

          renderPage(pageNum.value);
        })
        .catch((err) => console.log(err));
    });

    return {
      pageCount,
      pageNum,
      showNextPage,
      showPrevPage,
    };
  },
};
</script>

<style lang="scss" scoped>
    #pdf-render {
      max-width: 900px;
      width: 100%;
    }
</style>