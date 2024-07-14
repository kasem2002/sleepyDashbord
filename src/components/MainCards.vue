<script setup lang="ts">
interface Props {
  title: string
  description?: string
  image: string
  to?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <VCard
      :to="props.to"
      width="250"
      height="250"
    >
      <VCardTitle class="d-flex flex-column text-center justify-center align-center pa-5">
        <img
          :src="props.image"
          alt=""
          height="110"
          srcset=""
        >
        <span class="mt-5 text-h3 font-weight-medium">
          {{ props.title }}
        </span>
      </VCardTitle>

      <!--
        <div class="top-right-frame" />
        <div class="bottom-left-frame" />
      -->
      <div class="top-left-frame" />
      <div class="bottom-right-frame" />
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.v-card {
  z-index: 5 !important;
  overflow: visible;

  &:hover {
    background: rgb(0 0 0 / 10%);
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
}

.top-right-frame {
  position: absolute;
  z-index: 1;
  top: -10px;
  right: -5px;
  width: 40px;
  height: 50px;
  background: url("/top-right.svg") no-repeat;
  background-position: center;
  background-size: contain;
}

.bottom-left-frame {
  position: absolute;
  z-index: 1;
  bottom: -10px;
  left: -5px;
  width: 40px;
  height: 50px;
  background: url("/top-right.svg") no-repeat;
  background-position: center;
  background-size: contain;
  transform: rotate(180deg);
}

.bottom-right-frame {
  position: absolute;
  z-index: 1;
  right: -5px;
  bottom: -10px;
  width: 40px;
  height: 50px;
  background: url("/top-right.svg") no-repeat;
  background-position: center;
  background-size: contain;
  transform: rotate(90deg);
}

.top-left-frame {
  position: absolute;
  z-index: 1;
  top: -10px;
  left: -5px;
  width: 40px;
  height: 50px;
  background: url("/top-right.svg") no-repeat;
  background-position: center;
  background-size: contain;
  transform: rotate(-90deg);
}
</style>
