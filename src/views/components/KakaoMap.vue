<template>
  <div>
    {{ placeList }}
    <div id="map" style="width: 800px; height: 600px"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
      placeList: [
        {
          title: "마녀주방 강남점",
          keywords: [],
          //id
        },
        {
          title: "바비레드 강남본점",
          keywords: [],
          //id
        },
        {
          title: "스타벅스 강남논현점",
          keywords: [],
        },
      ],
      placeInfoList: [],
    };
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
    this.searchKeyword();
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.4994819739, 127.02809126759875),
        level: 5,
      };
      console.log(123);
      console.log(new kakao.maps.LatLng(37.4994819739, 127.02809126759875));
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      console.log(this.map);
    },
    async searchKeyword() {
      console.log(1);
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      this.placeList.forEach((item) => {
        ps.keywordSearch(item.title, this.placesSearchCB);
      });
    },

    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const index = this.placeList.findIndex(
          (i) => i.title == data[0].place_name
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
            `    <div class="boxtitle">${this.placeList[i].title}</div>` +
            '        <div class="star">★★★★</div>' +
            '<div class="keyword"> #맛있다 #맛없다' +
            "</div> " +
            "</div>";

          var customOverlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(
              this.placeList[i].y,
              this.placeList[i].x
            ),
            map: this.map,
            content: markerContent,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            console.log(1);
            customOverlay.setMap(this.map);
          });
        }
      }
    },
  },
};
</script>

<style>
.overlaybox {
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
}
.overlaybox .star {
  color: #ff3131;
  margin-bottom: 8px;
}
.overlaybox keyword {
  color: #000000;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
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
