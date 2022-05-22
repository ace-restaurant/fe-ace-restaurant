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
      <KakaoMap ref="kakaoMap" />
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
    filters: ["한식", "중식", "일식", "양식", "카페", "패스트푸드"],
    selectedFilter: "한식",
    tags1: [
      "분위기",
      "가성비",
      "깔끔",
      "만족",
      "예약",
      "국물",
      "점심",
      "볶음밥",
      "부드럽다",
      "소고기",
      "곱창",
      "포장",
      "룸",
      "코스",
      "갈비탕",
      "삼겹살",
      "웨이팅",
      "특별한",
    ],
    tags2: [
      "재방문",
      "갈비",
      "목살",
      "반찬",
      "전골",
      "만두",
      "냉면",
      "설명",
      "닭갈비",
      "치즈",
      "국밥",
      "감자탕",
      "족발",
      "정갈",
      "김치",
      "코엑스",
      "불친절",
      "순대",
    ],
    tags3: [
      "줄서",
      "최애",
      "뼈해장국",
      "양념",
      "선릉",
      "육회",
      "들기름",
      "무한",
      "대창",
      "오겹살",
      "회식",
      "이베리코",
      "삼성동",
      "부모님",
      "삼합",
      "생갈비",
      "차돌",
      "넓고",
    ],
    selectedTags: [],
    condition: 0,
  }),
  components: {
    VueSlickCarousel,
    KakaoMap: () => import("./components/KakaoMap.vue"),
  },

  methods: {
    selectFilter(item) {
      this.selectedFilter = item;
    },
    selectTag(item) {
      const itemIndex = this.selectedTags.indexOf(item);
      if (itemIndex > -1) {
        this.selectedTags.splice(itemIndex, 1);
      } else {
        this.selectedTags.push(item);
        if (item == "가성비") {
          console.log("가성비");
          this.$refs.kakaoMap.displayTest1();
        } else if (item == "룸") {
          this.$refs.kakaoMap.displayTest2();
        } else if (item == "회식") {
          this.$refs.kakaoMap.displayTest3();
        }
      }
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
