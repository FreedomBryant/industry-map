<template>
  <transition name="fade-slide">
    <div v-if="chain" class="chain-panel">
      <!-- 头部 -->
      <div class="chain-header">
        <div class="chain-title-row">
          <h3>🔗 {{ chain.label }} 产业链</h3>
          <button class="close-btn" @click="store.selectIndustry(null)">✕</button>
        </div>
        <p class="chain-desc">{{ chain.description }}</p>
        <div class="chain-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-btn"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >{{ tab.label }}</button>
        </div>
      </div>

      <!-- 图谱视图 -->
      <div v-show="activeTab === 'graph'" ref="graphRef" class="graph-container"></div>

      <!-- 列表视图 -->
      <div v-show="activeTab === 'list'" class="list-view">
        <div
          v-for="node in chain.nodes"
          :key="node.name"
          class="node-card"
        >
          <div class="node-header">
            <span class="node-badge" :class="node.category">{{ node.category }}</span>
            <span class="node-name">{{ node.name }}</span>
          </div>
          <div class="node-provinces">
            <span
              v-for="p in node.provinces"
              :key="p"
              class="province-tag"
              :class="{ active: store.selectedProvince === p }"
              @click="store.searchProvince(p)"
            >{{ p }}</span>
          </div>
        </div>
      </div>

      <!-- 底部提示 -->
      <div class="chain-footer">
        <span>点击省份标签在地图上定位</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { useMapStore } from '../stores/mapStore'
import { getChainById } from '../data/industryChains'
import type { IndustryChain } from '../data/industryChains'

const store = useMapStore()

const graphRef = ref<HTMLDivElement>()
const graphChart = shallowRef<echarts.ECharts>()
const activeTab = ref<'graph' | 'list'>('graph')

const tabs = [
  { key: 'graph' as const, label: '图谱' },
  { key: 'list' as const, label: '列表' },
]

const chain = computed<IndustryChain | undefined>(() =>
  store.selectedIndustry ? getChainById(store.selectedIndustry) : undefined,
)

const CATEGORY_COLORS: Record<string, string> = {
  '上游': '#5470c6',
  '中游': '#91cc75',
  '下游': '#fac858',
  '终端': '#ee6666',
}

function buildGraphOption() {
  if (!chain.value) return {}

  const nodes = chain.value.nodes.map((n, i) => ({
    id: n.name,
    name: n.name,
    value: n.provinces.join('、'),
    itemStyle: { color: CATEGORY_COLORS[n.category] || '#999' },
    category: i,
    symbolSize: 28 + n.provinces.length * 2,
    provinces: n.provinces,
  }))

  const links = chain.value.links.map(l => ({
    source: l.source,
    target: l.target,
    value: l.intensity,
    lineStyle: {
      width: 1 + l.intensity / 30,
      opacity: 0.5 + l.intensity / 200,
    },
  }))

  const categories = ['上游', '中游', '下游', '终端'].map(c => ({
    name: c,
    itemStyle: { color: CATEGORY_COLORS[c] || '#999' },
  }))

  return {
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const p = params.data
          return `<b>${p.name}</b><br/>
                  <span style="color: #888;">${p.value}</span>`
        }
        if (params.dataType === 'edge') {
          return `${params.data.source} → ${params.data.target}<br/>
                  关联强度: ${params.data.value}`
        }
        return ''
      },
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 400,
          edgeLength: [120, 250],
          gravity: 0.1,
          friction: 0.1,
        },
        roam: true,
        draggable: true,
        categories,
        data: nodes,
        links,
        label: {
          show: true,
          position: 'bottom',
          fontSize: 11,
          color: '#333',
          formatter: (params: any) => params.name,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 3 },
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 8],
      },
    ],
  }
}

function renderGraph() {
  if (!graphRef.value || !chain.value) return
  if (!graphChart.value) {
    graphChart.value = echarts.init(graphRef.value)
    graphChart.value.on('click', (params: any) => {
      if (params.dataType === 'node' && params.data.provinces) {
        // 点击节点跳转到对应省份
        const p = params.data.provinces[0]
        if (p) store.searchProvince(p)
      }
    })
  }
  graphChart.value.setOption(buildGraphOption(), true)
  graphChart.value.resize()
}

watch(chain, (c) => {
  if (c) {
    activeTab.value = 'graph'
    setTimeout(renderGraph, 100)
  }
})

watch(() => store.selectedIndustry, () => {
  if (store.selectedIndustry) {
    setTimeout(renderGraph, 100)
  }
})

onMounted(() => {
  window.addEventListener('resize', () => graphChart.value?.resize())
})

onUnmounted(() => {
  graphChart.value?.dispose()
})
</script>

<style scoped>
.chain-panel {
  position: fixed;
  top: 72px;
  right: 24px;
  width: 480px;
  max-height: calc(100vh - 100px);
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  z-index: 50;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chain-header {
  padding: 16px 20px 12px;
  border-bottom: var(--border-light);
  flex-shrink: 0;
}

.chain-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chain-title-row h3 {
  font-size: 18px;
  color: var(--green-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px 8px;
  border-radius: 4px;
}

.close-btn:hover {
  background: var(--bg-close-hover);
  color: var(--text-primary);
}

.chain-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  margin: 6px 0 10px;
}

.chain-tabs {
  display: flex;
  gap: 4px;
}

.tab-btn {
  padding: 4px 14px;
  border: 1px solid #ddd;
  border-radius: 14px;
  font-size: 12px;
  cursor: pointer;
  background: var(--bg-card);
  color: var(--text-secondary);
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--green-primary);
  color: #fff;
  border-color: var(--green-primary);
}

.graph-container {
  flex: 1;
  min-height: 420px;
  width: 100%;
}

.list-view {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node-card {
  border: var(--border-lighter);
  border-radius: 8px;
  padding: 10px 12px;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.node-badge {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  font-weight: 600;
  flex-shrink: 0;
}

.node-badge.上游 { background: #e8eaf6; color: #283593; }
.node-badge.中游 { background: #e8f5e9; color: #2e7d32; }
.node-badge.下游 { background: #fff8e1; color: #f57f17; }
.node-badge.终端 { background: #fce4ec; color: #c62828; }

.node-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.node-provinces {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.province-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: #f5f5f5;
  color: #555;
  cursor: pointer;
  transition: all 0.15s;
}

.province-tag:hover {
  background: #e3f2fd;
  color: #1565c0;
}

.province-tag.active {
  background: #1b5e20;
  color: #fff;
}

.chain-footer {
  padding: 8px 20px;
  font-size: 12px;
  color: #bbb;
  border-top: 1px solid #f0f0f0;
  text-align: center;
  flex-shrink: 0;
}

/* 过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
