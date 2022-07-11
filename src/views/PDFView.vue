<template>
  <template v-if="isLoading">
    <Loading></Loading>
  </template>

  <SectionContainer v-else>
    <SectionBody>
      <div class="pdf-viewer">
        
        <div class="pdf-viewer__meta">
          <div class="pdf-viewer__meta__title">Sách: <span>{{ book.title }}</span></div>
          <div class="pdf-viewer__meta__author">Tác giả: <span>{{ book.author }}</span></div>
        </div>

        <div class="pdf-viewer__navigation">
          <button 
            class="pdf-viewer__navigation__btn pdf-viewer__navigation__btn--prev" 
            @click="showPrevPage"
          >
            <i class="bx bx-chevron-left"></i>
          </button>

          <span class="pdf-viewer__navigation__page">
            <input 
              type="text" 
              v-model="pageNum"
            >
            /
            <span id="pdf-viewer__navigation__page--page-count">{{ pageCount }}</span>
          </span>

          <button 
            class="pdf-viewer__navigation__btn pdf-viewer__navigation__btn--next"
            @click="showNextPage"
          >
            <i class="bx bx-chevron-right"></i>
          </button>

        </div>

        <canvas class="pdf-viewer__render"></canvas>
      </div>
    </SectionBody>
  </SectionContainer>
</template>

<script>
import { computed, onUpdated, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import useBook from '@/composables/useBook';

import SectionContainer from "@/components/SectionContainer.vue";
import SectionBody from "@/components/SectionBody.vue";
import Loading from "@/components/Loading.vue";

export default {
  porps: {},
  components: {
    SectionContainer,
    SectionBody,
    Loading,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { getBookById } = useBook();

    let pdfDoc = reactive({});

    const book = ref({});
    const pdfUrl = ref(`/file/${route.params.slug}.pdf`);
    const pageNumInput = ref(1);
    const pageNum = ref(1);
    const pageCount = ref(0);
    const pageIsRendering = ref(false);
    const pageNumIsPending = ref(null);
    const canvas = ref(null);
    const ctx = ref(null);

    const isBookViewed = computed(() => store.getters.isBookViewed(route.query.id))
    const isLoading = computed(() => store.state.isLoading)
  
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
      pageNum.value = +pageNum.value - 1;
      queueRenderPage(pageNum.value);
    };

    const showNextPage = () => {
      if (pageNum.value >= pageCount.value) return;
      pageNum.value = +pageNum.value + 1;
      queueRenderPage(pageNum.value);
    };

    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = getBookById(route.query.id)
  
          resolve({ book })
        }, 1000)
      })
    }
 
    const initialPage = () => {
      store.commit("toggleLoading", true)

      fetchData().then(data => {
        book.value = data.book

        if(isBookViewed.value) {
          const viewedBook = store.getters.getViewedBook(route.query.id)
          pageNum.value = viewedBook.page
        }
        else {
          store.commit("addViewedBook", {
            id: book.value.id,
            page: pageNum.value 
          })
        }

        store.commit("toggleLoading", false)
      })
    }

    watch(pageNum, (n, o) => {
      const specificNum = Number(n)

      if(specificNum < 1 || isNaN(specificNum) || specificNum > pageCount.value) return

      queueRenderPage(specificNum)
      store.commit('updateViewedBook', {id: book.value.id, page: specificNum})
    })

    onUpdated(async () => {
      const canvasEl = document.querySelector('.pdf-viewer__render');

      if(canvasEl) {
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
      }
    });

    initialPage()

    return {
      book,
      pageCount,
      pageNum,
      pageNumInput,
      showNextPage,
      showPrevPage,
      isLoading,
    };
  },
};
</script>