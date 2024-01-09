<template>
  <span class="loader" />
</template>

<style scoped>
.loader {
  width: 96px;
  height: 96px;
  border: 15px solid #ccc;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 45%;
  z-index: 100;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
