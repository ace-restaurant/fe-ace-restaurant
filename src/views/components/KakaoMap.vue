<template>
  <div>
    <div id="map" style="width: 800px; height: 600px"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
    propPlaceList: {
      type: Array,
      default: () => [
        {
          name: "",
          type: "",
          keywords: [],
        },
      ],
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
      placeList: [],
    };
  },
  watch: {
    propPlaceList: "initPlaceList",
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=82885c42ee75117237a2ad05bd845d86";
      document.head.appendChild(script);
    }

    // this.searchKeyword();
  },
  methods: {
    initPlaceList() {
      console.log(this.propPlaceList);
      this.placeList = this.propPlaceList;
      this.display();
    },

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.4994819739, 127.02809126759875),
        level: 6,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    async searchKeyword() {
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      this.placeList.forEach((item) => {
        ps.keywordSearch(item.name, this.placesSearchCB);
      });
    },

    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const index = this.placeList.findIndex(
          (i) => i.name == data[0].place_name
        );
        if (index != -1) {
          this.placeList[index].id = data[0].id;
          (this.placeList[index].x = data[0].x),
            (this.placeList[index].y = data[0].y);

          this.displayMarker();
        }
      }
    },
    displayMarker() {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (var i = 0; i < this.placeList.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        console.log(this.placeList[i]);
        // 마커를 생성합니다
        if (this.placeList[i].x) {
          const marker = new kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(
              this.placeList[i].y,
              this.placeList[i].x
            ), //this.placeList[i].latlng, // 마커를 표시할 위치
            title: this.placeList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });

          marker.setMap(this.map);
          var markerContent =
            '<div class="overlaybox">' +
            `    <div class="boxtitle">${this.placeList[i].name}</div>` +
            '    <div class="star">★★★★★</div>' +
            `<div class="keyword"> #${this.placeList[i].keywords[0]} #${this.placeList[i].keywords[1]}` +
            `#${this.placeList[i].keywords[2]} #${this.placeList[i].keywords[3]} #${this.placeList[i].keywords[4]}  #${this.placeList[i].keywords[5]}  #${this.placeList[i].keywords[6]}  #${this.placeList[i].keywords[7]}  #${this.placeList[i].keywords[8]}  #${this.placeList[i].keywords[9]}` +
            `</div>` +
            "</div>";

          var infowindow = new kakao.maps.InfoWindow({
            // position: new kakao.maps.LatLng(
            //   this.placeList[i].y,
            //   this.placeList[i].x
            // ),
            // map: this.map,
            content: markerContent,
          });
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            this.makeOverListener(this.map, marker, infowindow)
          );
          kakao.maps.event.addListener(
            marker,
            "mouseout",
            this.makeOutListener(infowindow)
          );
          // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          // kakao.maps.event.addListener(marker, "click", function () {
          //   console.log(1);
          //   customOverlay.open(this.map, )
          // });
        }
      }
    },
    makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    },

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    },
    display() {
      this.initMap();
      this.searchKeyword();
    },
    displayTest1() {
      this.initMap();
      this.placeList = [
        {
          title: "로제닭갈비",
          keywords: ["가성비", "닭갈비", "로제", "치즈", "볶음밥"],
          rating: 5,
          //id
        },
        {
          title: "밥밥디라라",
          keywords: ["가성비", "혼밥", "덮밥", "매장", "깔끔"],
          rating: 5,
          //id
        },
        {
          title: "강남 돼지상회 무한리필",
          keywords: ["가성비", "무한", "냉면", "삼겹살", "배부르다"],
          rating: 5,
        },
        {
          title: "이대성의진면목",
          keywords: ["가성비", "깔끔", "샤브", "칼국수", "점심"],
        },
        {
          title: "이층고깃집 강남구청역점",
          keywords: ["가성비", "소고기", "넓어서", "깔끔", "고깃집"],
        },
        {
          title: "류몽민",
          keywords: ["가성비", "닭갈비", "치즈", "학동역", "직원분"],
        },
        {
          title: "온돌 더프라임",
          keywords: ["가성비", "전골", "소고기", "온돌", "부드럽다"],
        },
        {
          title: "몽블리 강남역11번출구점",
          keywords: ["가성비", "소고기", "무한", "곱창", "신선"],
        },
        {
          title: "수묵당",
          keywords: ["가성비", "분위기", "만족", "식사", "코스"],
        },
        {
          title: "미테리언육식주의자",
          keywords: ["가성비", "분위기", "깔끔", "만족", "와규"],
        },
        {
          title: "화기애애 강남점",
          keywords: ["가성비", "분위기", "만족", "갈비살", "소고기"],
        },
        {
          title: "곱창고 강남역점",
          keywords: ["가성비", "곱창", "볶음밥", "강남", "직원분"],
        },
      ];
      this.searchKeyword();
    },
    displayTest2() {
      this.initMap();
      this.placeList = [
        {
          title: "백억하누 강남본점",
          keywords: ["분위기", "룸", "전복", "소고기", "부모님"],
          //id
        },
        {
          title: "도쿄등심 청담점",
          keywords: ["분위기", "룸", "코스", "만족", "예약"],
          //id
        },
        {
          title: "도쿄등심 압구정점",
          keywords: ["분위기", "룸", "코스", "만족", "특별한"],
        },
        {
          title: "창고43 강남점",
          keywords: ["분위기", "룸", "예약", "만족", "식사"],
        },
        {
          title: "창고43 삼성점",
          keywords: ["분위기", "룸", "예약", "만족", "점심"],
        },
      ];
      this.searchKeyword();
    },
    displayTest3() {
      this.initMap();
      this.placeList = [
        {
          title: "두껍삼 역삼직영점",
          keywords: ["삼겹살", "예약", "회식", "편하다", "만족"],
        },
      ];
      this.searchKeyword();
    },
  },
};
</script>

<style>
.overlaybox {
  border: 2px solid #000000;
  padding: 10px;
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.overlaybox div,
ul {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.overlaybox .boxtitle {
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}
.overlaybox .keyword {
  text-align: center;
  /* color:  */
}
.overlaybox .keyword .strong {
  font-weight: 700;
  /* color:  */
}
.overlaybox .star {
  color: #ff3131;
  margin-bottom: 8px;
}
.overlaybox keyword {
  text-align: center;
  color: #000000;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}
.overlaybox:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-top-color: #ffffff;
  border-bottom: 0;
  border-right: 0;
  margin-left: -10px;
  margin-bottom: -20px;
}
</style>
