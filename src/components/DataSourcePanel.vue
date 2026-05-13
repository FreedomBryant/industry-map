<template>
  <Teleport to="body">
    <div v-if="store.showDataSource" class="ds-overlay" @click.self="store.toggleDataSource">
      <div class="ds-modal">
        <div class="ds-header">
          <h2>📊 数据源说明</h2>
          <button class="ds-close" @click="store.toggleDataSource">✕</button>
        </div>

        <div class="ds-body">
          <section>
            <h3>数据来源</h3>
            <ul>
              <li><strong>国家统计局</strong> — 各省 GDP、产值、企业数量等宏观指标</li>
              <li><strong>工业和信息化部</strong> — 产业分类标准及重点企业名录</li>
              <li><strong>各省统计局 &amp; 统计年鉴</strong> — 地市级产业分布数据</li>
              <li><strong>上市公司年报 / 行业白皮书</strong> — 大型企业营收及区域分布</li>
            </ul>
          </section>

          <section>
            <h3>数据口径</h3>
            <ul>
              <li><strong>地理层级：</strong> 省级（34 个省/直辖市/自治区/特别行政区）</li>
              <li><strong>城市下钻：</strong> 80+ 个主要地级市产业数据</li>
              <li><strong>产业分类：</strong> 涵盖 IT/通信、制造业、能源化工、农业、金融、文旅、生物医药、交通物流、房地产、教育科研 10 大类别</li>
              <li><strong>产值占比：</strong> 各产业占该省 GDP 的百分比（估算值，与实际统计口径可能有偏差）</li>
            </ul>
          </section>

          <section>
            <h3>时间范围</h3>
            <ul>
              <li><strong>基准年份：</strong> 2025 年（当前最新数据）</li>
              <li><strong>历史回溯：</strong> 2020 ~ 2024 年（基于增长率模型推算）</li>
              <li><strong>更新频率：</strong> 年度更新</li>
            </ul>
          </section>

          <section>
            <h3>计算方式</h3>
            <ul>
              <li><strong>综合指数：</strong> 基于 GDP 规模、产业多样性、高端产业占比综合加权计算（满分 100）</li>
              <li><strong>产业链图谱：</strong> 根据上市公司公开数据和行业报告梳理的上下游关系</li>
              <li><strong>时间轴数据：</strong> 以 2025 年为基线，按行业公开增长率反推历史值</li>
            </ul>
          </section>

          <section class="ds-disclaimer">
            <h3>⚠️ 免责声明</h3>
            <p>本平台数据仅供学习与参考之用，不构成任何投资建议。部分数据为模拟或估算值，可能与官方统计存在差异。如需精确数据，请以国家统计局或各省统计年鉴公布为准。</p>
          </section>

          <div class="ds-footer">
            <span class="ds-updated">最后更新：2025 年 4 月</span>
            <span class="ds-version">v1.0</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useMapStore } from '../stores/mapStore'

const store = useMapStore()
</script>

<style scoped>
.ds-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.ds-modal {
  background: var(--bg-card);
  border-radius: 12px;
  width: 560px;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  animation: dsFadeIn 0.2s ease;
}

@keyframes dsFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.ds-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: var(--border-lighter);
}

.ds-header h2 {
  margin: 0;
  font-size: 18px;
  color: var(--green-primary);
}

.ds-close {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: var(--bg-close-hover);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.ds-close:hover {
  background: var(--bg-hover);
}

.ds-body {
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
}

.ds-body section {
  margin-bottom: 18px;
}

.ds-body h3 {
  font-size: 15px;
  color: var(--text-primary);
  margin: 0 0 8px;
  padding-left: 4px;
  border-left: var(--green-light);
  padding-left: 10px;
}

.ds-body ul {
  margin: 0;
  padding: 0 0 0 20px;
}

.ds-body li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.ds-disclaimer {
  background: var(--bg-warning);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 0;
}

.ds-disclaimer h3 {
  border-left-color: var(--yellow-border);
}

.ds-disclaimer p {
  font-size: 13px;
  color: var(--text-tertiary);
  margin: 4px 0 0;
  line-height: 1.6;
}

.ds-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 14px;
  margin-top: 6px;
  border-top: var(--border-light);
  font-size: 12px;
  color: var(--text-muted);
}
</style>
