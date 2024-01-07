<template>
  <div class="header-wrapper">
    <div class="logo">Rijks Museum</div>
    <div class="favorites">Favorites</div>
  </div>
</template>
<style scoped>
.header-wrapper {
  display: flex;
  width: 100%;
  background-color: #4b39ef;
  justify-content: space-between;
}
.logo,
.favorites {
  color: #ffffff;
  font-family: Saira Stencil One;
  padding: 16px 20px;
  font-size: 22px;
  @media (max-width: 1024px) {
    font-size: 32px;
  }
  @media (max-width: 500px) {
    font-size: 24px;
  }
}
</style>
