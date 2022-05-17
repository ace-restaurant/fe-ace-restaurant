<template>
  <div class="main-wrapper">
    <div class="main-header">
      <div class="main-title text-center">
        <span>강남역</span> 근처 식당을 찾는 가장 즐거운 방법.
      </div>

      <div class="main-sub-title text-center">
        <span>키워드</span> 로 당신이 원하는 맛집을 찾을 수 있습니다.
      </div>
    </div>
    <div class="main-category-group text-center">
      <button
        v-for="(item, i) in filters"
        :key="`review-filter-${i}`"
        @click="selectFilter(item)"
        class="btn btn-main"
        :class="selectedFilter == item ? 'selected' : ''"
      >
        {{ item }}
      </button>
    </div>
    <div class="main-tag-container">
      <VueSlickCarousel :arrows="true" :dots="true">
        <div class="main-tag-group text-center">
          <button
            v-for="(item, i) in tags"
            :key="`review-filter-${i}`"
            @click="selectTag(item)"
            class="tag tag-main"
            :class="isSelectedTag(item) ? 'selected' : ''"
          >
            {{ item }}
          </button>
        </div>
        <div class="main-tag-group text-center">
          <button
            v-for="(item, i) in tags"
            :key="`review-filter-${i}`"
            @click="selectTag(item)"
            class="tag tag-main"
            :class="isSelectedTag(item) ? 'selected' : ''"
          >
            {{ item }}
          </button>
        </div>
        <div class="main-tag-group text-center">
          <button
            v-for="(item, i) in tags"
            :key="`review-filter-${i}`"
            @click="selectTag(item)"
            class="tag tag-main"
            :class="isSelectedTag(item) ? 'selected' : ''"
          >
            {{ item }}
          </button>
        </div>
      </VueSlickCarousel>
    </div>
    <div class="kakao-map-container">
      <KakaoMap />
    </div>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data: () => ({
    filters: [
      "한식",
      "중식",
      "일식",
      "양식",
      "분식",
      "카페",
      "패스트푸드",
      "주점",
    ],
    selectedFilter: "한식",
    tags: [
      "#맛있다",
      "#맛있다1",
      "#맛있다2",
      "#맛있다3",
      "#맛있다4",
      "#맛있다5",
      "#맛있다6",
      "#맛있다7",
      "#맛있다8",
      "#맛있다9",
      "#맛있다10",
      "#맛있다11",
      "#맛있다12",
      "#맛있다14",
      "#맛있다15",
      "#맛있다16",
      "#맛있다17",
      "#맛있다18",
      "#맛있다19",
      "#맛있다20",
    ],
    selectedTags: [],
  }),
  components: {
    VueSlickCarousel,
    KakaoMap: () => import("./components/KakaoMap.vue"),
  },

  methods: {
    selectFilter(item) {
      console.log(1);
      this.selectedFilter = item;
    },
    selectTag(item) {
      this.selectedTags.push(item);
    },
    isSelectedTag(item) {
      if (this.selectedTags.includes(item)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 50;
}
.main-header {
  margin: 120px auto 100px;
  font-size: 36px;
  font-weight: 700;
  color: #000000;
  z-index: 1000;
}
.main-title span {
  font-size: 64px;
}
.main-sub-title {
  color: #8c8c8c;
}
.main-sub-title span {
  color: #000000;
}

.main-category-group {
  z-index: 1000;
  margin: 30px auto;
}
.btn-main {
  color: #000000;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  height: 50px;
  font-size: 24px;
  border-radius: 10%;
  margin-right: 10px;
  margin-left: 10px;
}
.btn-main.selected {
  color: #000000;
  background: #c4c4c4;
}
.main-tag-container {
  margin: 30px 0px;
  padding: 30px 0px;
  background-color: #f7f8fb;
}
.main-tag-group {
  width: 900px !important;
  display: block !important;
  margin: 60px auto;
}
.tag {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  margin: 15px 10px;
  padding: 5px 10px;
  font-size: 20px;
  border: 0px !important;
  border-width: 0px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.tag.selected {
  background-color: #c6eaff;
  /* #c6eaff; */
}

.circle-1 {
  position: absolute;
  top: -150px;
  left: -150px;
  z-index: 1;
  border-radius: 50%;
  width: 600px;
  height: 600px;
  background-color: #ffa9a9;
}

.circle-2 {
  position: absolute;
  top: 320px;
  right: 70px;
  z-index: 1;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  background-color: #feffcb;
}

.circle-3 {
  position: absolute;
  top: 170px;
  right: 70px;
  z-index: 1;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-color: #ffcdb1;
}
.kakao-map-container {
  margin: 30px auto;
}
</style>

<style>
.slick-dots {
  bottom: 0 !important;
}
</style>
