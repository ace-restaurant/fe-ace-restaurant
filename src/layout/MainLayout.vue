<template>
  <div class="wrapper">
    <div class="header d-flex justify-content-center align-items-center">
      <img src="@/assets/icon.svg" />
      <span>에이스 레스토랑</span>
    </div>
    <div class="main-content">
      <router-view />
    </div>
    <div class="footer d-flex justify-content-center align-items-center">
      <span>HUFS CD TEAM A3 - ACE</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  height: 60px;
  border-bottom: 2px solid #e5e5e5;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  z-index: 100;
}
.main-content {
  z-index: 0;
  flex: 1 auto;
  background-color: #ffffff;
  /* #e5e5e5; */
}
.footer {
  border-top: 1px solid #e5e5e5;
  height: 60px;
  font-size: 24px;
  font-weight: 700;
}
</style>
