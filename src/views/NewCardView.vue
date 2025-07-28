<template>
  <div class="new-card-view">
    <PopNewCard />
  </div>
</template>

<script>
import PopNewCard from '@/components/PopNewCard.vue';

export default {
  name: 'NewCardView',
  components: { PopNewCard }
};
</script>

<style scoped>
.new-card-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>