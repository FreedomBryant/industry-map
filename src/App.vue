<template>
  <div class="app-container">
    <!-- 标题栏 -->
    <header class="app-header">
      <div class="header-left">
        <h1>🗺️ 中国产业地图</h1>
        <span class="subtitle">China Industry Map</span>
      </div>
      <div class="header-center">
        <TimelineSlider />
      </div>
      <div class="header-right">
        <SearchBox />
        <EnterpriseSearch />
        <IndustryFilter />
        <ParkToggle />
        <button class="ds-btn" @click="store.toggleDataSource">📊 数据源</button>
        <button class="theme-btn" @click="store.toggleDark">{{ store.isDark ? '☀️' : '🌙' }}</button>
      </div>
    </header>

    <DashboardPanel />

    <div class="app-body">
      <!-- 左侧地图区 -->
      <div class="map-area">
        <ChinaMap />
      </div>

      <!-- 右侧详情面板 -->
      <aside class="side-panel" :class="{ active: !!store.selectedProvince }">
        <ProvincePanel
          v-if="store.selectedProvinceData"
          @close="store.selectProvince(null)"
        />
        <div v-else class="empty-panel">
          <div class="empty-icon">👆</div>
          <p>点击地图上的省份</p>
          <p>查看详细产业数据</p>
        </div>
      </aside>
    </div>

    <!-- 底部对比面板 -->
    <ComparePanel />

    <!-- 产业链弹窗 -->
    <ChainPanel />

    <!-- 数据源说明 -->
    <DataSourcePanel />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'

watch(() => store.isDark, (val) => {
  document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
})
import ChinaMap from './components/ChinaMap.vue'
import ProvincePanel from './components/ProvincePanel.vue'
import IndustryFilter from './components/IndustryFilter.vue'
import ComparePanel from './components/ComparePanel.vue'
import SearchBox from './components/SearchBox.vue'
import EnterpriseSearch from './components/EnterpriseSearch.vue'
import TimelineSlider from './components/TimelineSlider.vue'
import ChainPanel from './components/ChainPanel.vue'
import DataSourcePanel from './components/DataSourcePanel.vue'
import DashboardPanel from './components/DashboardPanel.vue'
import ParkToggle from './components/ParkToggle.vue'
import { useMapStore } from './stores/mapStore'

const store = useMapStore()

onMounted(() => {
  store.loadData()
})
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-app);
}

.app-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-shrink: 0;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.app-header h1 {
  font-size: 22px;
  color: var(--green-primary);
}

.subtitle {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.app-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.map-area {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  min-width: 0;
}

.side-panel {
  width: 0;
  overflow: hidden;
  transition: width 0.3s ease;
  background: var(--bg-card);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.06);
}

.side-panel.active {
  width: 420px;
  overflow-y: auto;
}

.empty-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-placeholder);
  gap: 8px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-panel p {
  font-size: 14px;
}

.ds-btn {
  padding: 6px 14px;
  border: 1px solid var(--border-accent);
  border-radius: 16px;
  background: var(--bg-card);
  font-size: 13px;
  cursor: pointer;
  color: var(--green-light);
  transition: all 0.2s;
  white-space: nowrap;
}

.ds-btn:hover {
  background: var(--green-bg);
  border-color: var(--green-light);
}

.theme-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-card);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-btn:hover {
  background: var(--bg-hover);
  border-color: var(--border-dark);
}
</style>

<!-- 全局 CSS 变量（深色模式） -->
<style>
:root {
  --bg-app: #f5f7fa;
  --bg-card: #ffffff;
  --bg-hover: #f5f5f5;
  --bg-input: #ffffff;
  --bg-highlight: #f1f8e9;
  --bg-overlay: rgba(0,0,0,0.45);
  --bg-warning: #fff8e1;
  --bg-close-hover: #f0f0f0;
  --bg-menu: #ffffff;
  --bg-side-card: #fafafa;

  --text-primary: #333333;
  --text-secondary: #555555;
  --text-tertiary: #888888;
  --text-muted: #999999;
  --text-placeholder: #bbb;

  --border-color: #e0e0e0;
  --border-light: #eeeeee;
  --border-lighter: #f0f0f0;
  --border-dark: #cccccc;
  --border-accent: #c8e6c9;

  --shadow-sm: 0 1px 4px rgba(0,0,0,0.08);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.18);

  --green-primary: #1b5e20;
  --green-light: #4caf50;
  --green-bg: #e8f5e9;
  --green-border: #c8e6c9;

  --red: #e53935;
  --red-bg: #ffebee;
  --red-border: #ffcdd2;

  --blue: #1565c0;
  --blue-bg: #e3f2fd;
  --blue-light: #1976d2;

  --orange: #e65100;
  --orange-bg: #fff3e0;

  --yellow-border: #ffa726;
}

[data-theme="dark"] {
  --bg-app: #121212;
  --bg-card: #1e1e1e;
  --bg-hover: #333333;
  --bg-input: #2a2a2a;
  --bg-highlight: #1b3a1e;
  --bg-overlay: rgba(0,0,0,0.7);
  --bg-warning: #3d2e00;
  --bg-close-hover: #333333;
  --bg-menu: #2a2a2a;
  --bg-side-card: #252525;

  --text-primary: #e0e0e0;
  --text-secondary: #aaaaaa;
  --text-tertiary: #777777;
  --text-muted: #666666;
  --text-placeholder: #555555;

  --border-color: #333333;
  --border-light: #2a2a2a;
  --border-lighter: #333333;
  --border-dark: #555555;
  --border-accent: #2e7d32;

  --shadow-sm: 0 1px 4px rgba(0,0,0,0.3);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);

  --green-primary: #4caf50;
  --green-light: #66bb6a;
  --green-bg: #1b3a1e;
  --green-border: #2e7d32;

  --red: #ef5350;
  --red-bg: #3e1a1a;
  --red-border: #6b2020;

  --blue: #42a5f5;
  --blue-bg: #1a2e3f;
  --blue-light: #42a5f5;

  --orange: #ff9800;
  --orange-bg: #3d2400;

  --yellow-border: #ffa726;
}
</style>
