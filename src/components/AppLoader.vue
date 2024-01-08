<template>
  <span class="loader"></span>
</template>

<style scoped>
/*.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  border: 10px solid;
  border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25) rgba(0, 0, 0, 0.35) rgba(0, 0, 0, 0.5);
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
}*/
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
