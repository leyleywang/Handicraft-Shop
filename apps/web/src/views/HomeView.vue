<template>
  <div class="home-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">发现手工饰品的无限可能</h1>
        <p class="hero-subtitle">分享你的创作，找到独特的材料，连接志同道合的手工艺人</p>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">💎</span>
          成品闲置
        </h2>
        <router-link to="/works" class="view-more">查看全部 →</router-link>
      </div>
      <div class="items-grid">
        <div 
          v-for="item in finishedItems" 
          :key="item.id" 
          class="item-card card"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.title" />
            <div class="item-status">
              <span class="tag tag-green">{{ item.status }}</span>
            </div>
          </div>
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag tag-purple">{{ tag }}</span>
            </div>
            <div class="item-footer">
              <span class="item-price">¥{{ item.price }}</span>
              <span class="item-owner">by {{ item.owner }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🔍</span>
          材料求购
        </h2>
        <router-link to="/profile" class="view-more">发布求购 →</router-link>
      </div>
      <div class="items-grid">
        <div 
          v-for="item in materialRequests" 
          :key="item.id" 
          class="request-card card"
        >
          <div class="request-header">
            <h3 class="request-title">{{ item.title }}</h3>
            <span class="tag tag-orange">求购中</span>
          </div>
          <p class="request-description">{{ item.description }}</p>
          <div class="request-details">
            <div class="detail-item">
              <span class="detail-label">所需数量:</span>
              <span class="detail-value">{{ item.quantity }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">预算范围:</span>
              <span class="detail-value">¥{{ item.budget }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">截止日期:</span>
              <span class="detail-value">{{ item.deadline }}</span>
            </div>
          </div>
          <div class="request-footer">
            <span class="requester">by {{ item.requester }}</span>
            <button class="btn btn-primary">联系卖家</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const finishedItems = ref([
  {
    id: 1,
    title: '古法银月光石手链',
    description: '手工编织，采用天然月光石与古法银配件，每颗月光石都有独特的蓝光效应',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20handmade%20bracelet%20with%20moonstone%20and%20silver%20components%20on%20white%20background&image_size=square',
    price: 299,
    owner: '手作达人小芳',
    tags: ['手链', '月光石', '古法银'],
    status: '待售'
  },
  {
    id: 2,
    title: '天然石串珠耳环',
    description: '选用紫水晶、粉晶等天然石，纯手工串制，适合日常佩戴',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20earrings%20with%20natural%20amethyst%20and%20rose%20quartz%20beads%20on%20white%20background&image_size=square',
    price: 158,
    owner: '晶石匠人',
    tags: ['耳饰', '天然石', '手工串珠'],
    status: '待售'
  },
  {
    id: 3,
    title: '绕线艺术水晶吊坠',
    description: '采用铜线绕线工艺，包裹纯净白水晶，可搭配各种项链',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wire%20wrapped%20crystal%20pendant%20handmade%20jewelry%20copper%20wire%20clear%20quartz%20on%20white%20background&image_size=square',
    price: 199,
    owner: '绕线艺术家',
    tags: ['项链', '绕线', '水晶'],
    status: '待售'
  },
  {
    id: 4,
    title: '串珠流苏胸针',
    description: '捷克水晶珠手工串制，精美流苏设计，适合搭配大衣或连衣裙',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20beaded%20brooch%20with%20czech%20crystals%20and%20tassels%20elegant%20fashion%20accessory%20on%20white%20background&image_size=square',
    price: 128,
    owner: '串珠爱好者',
    tags: ['胸针', '串珠', '流苏'],
    status: '待售'
  }
])

const materialRequests = ref([
  {
    id: 1,
    title: '求购天然石碎石混装',
    description: '需要500g天然石碎石，用于手链和耳饰制作，要求颜色丰富，尺寸在3-8mm之间',
    quantity: '500g',
    budget: '80-120',
    deadline: '2026-05-15',
    requester: '新手小白'
  },
  {
    id: 2,
    title: '求购古法银配件套装',
    description: '寻找古法银质感的配件，包括隔珠、花托、延长链等，用于手链制作',
    quantity: '1套(约50件)',
    budget: '150-200',
    deadline: '2026-05-20',
    requester: '手作达人'
  },
  {
    id: 3,
    title: '求购高品质铜线',
    description: '绕线用铜线，要求0.8mm和1.0mm规格，不易氧化，颜色持久',
    quantity: '各10米',
    budget: '50-80',
    deadline: '2026-05-10',
    requester: '绕线艺术家'
  }
])
</script>

<style scoped>
.home-view {
  padding-bottom: 40px;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -20px -20px 40px -20px;
  padding: 60px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  color: white;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 400;
}

.content-section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  font-size: 28px;
}

.view-more {
  color: #6b46c1;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s ease;
}

.view-more:hover {
  color: #553c9a;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.item-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.item-image {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-status {
  position: absolute;
  top: 12px;
  right: 12px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.item-description {
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 12px;
  flex: 1;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.item-price {
  font-size: 20px;
  font-weight: 700;
  color: #e53e3e;
}

.item-owner {
  font-size: 13px;
  color: #718096;
}

.request-card {
  display: flex;
  flex-direction: column;
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.request-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  flex: 1;
  margin-right: 12px;
}

.request-description {
  font-size: 14px;
  color: #718096;
  line-height: 1.6;
  margin-bottom: 20px;
}

.request-details {
  background: #f7fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 14px;
  color: #718096;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
}

.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.requester {
  font-size: 13px;
  color: #718096;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .items-grid {
    grid-template-columns: 1fr;
  }
}
</style>
