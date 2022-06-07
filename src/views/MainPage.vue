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
            v-for="(item, i) in tags1"
            :key="`review-filter-${i}`"
            @click="selectTag(item)"
            class="tag tag-main"
            :class="isSelectedTag(item) ? 'selected' : ''"
          >
            #{{ item }}
          </button>
        </div>
        <div class="main-tag-group text-center">
          <button
            v-for="(item, i) in tags2"
            :key="`review-filter-${i}`"
            @click="selectTag(item)"
            class="tag tag-main"
            :class="isSelectedTag(item) ? 'selected' : ''"
          >
            #{{ item }}
          </button>
        </div>
        <div class="main-tag-group text-center">
          <button
            v-for="(item, i) in tags3"
            :key="`review-filter-${i}`"
            @click="selectTag(item)"
            class="tag tag-main"
            :class="isSelectedTag(item) ? 'selected' : ''"
          >
            #{{ item }}
          </button>
        </div>
      </VueSlickCarousel>
    </div>
    <div class="kakao-map-container">
      <KakaoMap ref="kakaoMap" :propPlaceList="placeList" />
    </div>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
  </div>
</template>

<script>
import axios from "axios";
import {
  korean,
  chinense,
  japanese,
  western,
  cafe,
  fastfood,
} from "../service/keywords";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data: () => ({
    name: "",
    filters: ["한식", "중식", "일식", "양식", "카페", "패스트푸드"],
    selectedFilter: "한식",
    tags1: [],
    tags2: [],
    tags3: [],
    type: "1",
    selectedTags: [],
    placeList: [],
  }),
  components: {
    VueSlickCarousel,
    KakaoMap: () => import("./components/KakaoMap.vue"),
  },

  created() {
    this.getTagsByFilter();
  },
  watch: {
    selectedFilter: "getTagsByFilter",
  },

  methods: {
    getTagsByFilter() {
      if (this.selectedFilter == "한식") {
        this.tags1 = korean.tags1;
        this.tags2 = korean.tags2;
        this.tags3 = korean.tags3;
        this.type = "1";
      } else if (this.selectedFilter == "중식") {
        this.tags1 = chinense.tags1;
        this.tags2 = chinense.tags2;
        this.tags3 = chinense.tags3;
        this.type = "2";
      } else if (this.selectedFilter == "일식") {
        this.tags1 = japanese.tags1;
        this.tags2 = japanese.tags2;
        this.tags3 = japanese.tags3;
        this.type = "3";
      } else if (this.selectedFilter == "양식") {
        this.tags1 = western.tags1;
        this.tags2 = western.tags2;
        this.tags3 = western.tags3;
        this.type = "4";
      } else if (this.selectedFilter == "카페") {
        this.tags1 = cafe.tags1;
        this.tags2 = cafe.tags2;
        this.tags3 = cafe.tags3;
        this.type = "5";
      } else {
        this.tags1 = fastfood.tags1;
        this.tags2 = fastfood.tags2;
        this.tags3 = fastfood.tags3;
        this.type = "6";
      }
      this.selectedTags = [];
    },
    selectFilter(item) {
      this.selectedFilter = item;
    },
    selectTag(item) {
      const itemIndex = this.selectedTags.indexOf(item);
      if (itemIndex > -1) {
        this.selectedTags.splice(itemIndex, 1);
      } else {
        this.selectedTags.push(item);
      }
      this.api(this.selectedTags);
    },
    isSelectedTag(item) {
      if (this.selectedTags.includes(item)) {
        return true;
      } else {
        return false;
      }
    },
    api() {
      console.log(this.selectedTags);
      axios
        .post("http://localhost:3000/restaurant", {
          tags: this.selectedTags.join(","),
          type: this.type,
        })
        .then((res) => {
          console.log(res);
          this.placeList = res.data;
        });
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
  font-size: 25px;
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
