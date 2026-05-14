<template>
  <div class="industry-filter">
    <span
      class="filter-chip"
      :class="{ active: !store.selectedCategory }"
      @click="() => store.setCategory(null)"
    >全部</span>
    <span
      v-for="cat in categories"
      :key="cat"
      class="filter-chip"
      :class="{ active: store.selectedCategory === cat }"
      @click="() => store.setCategory(cat)"
    >{{ cat }}</span>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '../stores/mapStore'
import { allCategories } from '../data'

const store = useMapStore()
const categories = allCategories
</script>

<style scoped>
.industry-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.filter-chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 14px;
  font-size: 12px;
  cursor: pointer;
  background: #f0f0f0;
  color: var(--text-secondary);
  transition: all 0.2s;
  user-select: none;
  border: 1px solid transparent;
}

.filter-chip:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.filter-chip.active {
  background: var(--green-primary);
  color: #fff;
  border-color: var(--green-primary);
}
</style>
