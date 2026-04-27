<template>
  <div class="profile-view">
    <div class="profile-header card">
      <div class="profile-info">
        <div class="avatar">
          <span class="avatar-text">我</span>
        </div>
        <div class="info-text">
          <h2 class="username">手作达人</h2>
          <p class="user-bio">热爱手工饰品制作，分享创意与灵感</p>
          <div class="user-stats">
            <span class="stat-item">
              <span class="stat-value">12</span>
              <span class="stat-label">作品</span>
            </span>
            <span class="stat-item">
              <span class="stat-value">25</span>
              <span class="stat-label">收藏</span>
            </span>
            <span class="stat-item">
              <span class="stat-value">156</span>
              <span class="stat-label">粉丝</span>
            </span>
          </div>
        </div>
      </div>
      <div class="publish-buttons">
        <button class="btn btn-primary" @click="showPublishModal = 'material'">
          发布材料求购
        </button>
        <button class="btn btn-secondary" @click="showPublishModal = 'idle'">
          发布成品闲置
        </button>
      </div>
    </div>

    <div class="tabs-section">
      <div class="tabs-header">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          class="tab-btn"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="tab-content">
        <div v-if="activeTab === 'orders'" class="orders-section">
          <h3 class="section-subtitle">材料订单</h3>
          <div class="orders-list">
            <div v-for="order in materialOrders" :key="order.id" class="order-card card">
              <div class="order-header">
                <span class="order-id">订单号: {{ order.orderNo }}</span>
                <span class="order-status" :class="order.status">
                  {{ getOrderStatusText(order.status) }}
                </span>
              </div>
              <div class="order-items">
                <div v-for="item in order.items" :key="item.id" class="order-item">
                  <div class="item-thumbnail">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  <div class="item-info">
                    <h4 class="item-name">{{ item.name }}</h4>
                    <p class="item-specs">{{ item.specs }}</p>
                    <p class="item-price">¥{{ item.price }} x {{ item.quantity }}</p>
                  </div>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-date">{{ order.date }}</span>
                <span class="order-total">
                  共 {{ order.items.length }} 件商品
                  <span class="total-price">合计: ¥{{ order.total }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'transactions'" class="transactions-section">
          <h3 class="section-subtitle">作品成交记录</h3>
          <div class="transactions-list">
            <div v-for="txn in transactions" :key="txn.id" class="transaction-card card">
              <div class="txn-type" :class="txn.type">
                <span class="type-icon">{{ txn.type === 'sale' ? '💰' : '🛒' }}</span>
                <span class="type-text">{{ txn.type === 'sale' ? '卖出' : '买入' }}</span>
              </div>
              <div class="txn-content">
                <div class="txn-item">
                  <div class="item-thumbnail">
                    <img :src="txn.image" :alt="txn.title" />
                  </div>
                  <div class="item-details">
                    <h4 class="item-title">{{ txn.title }}</h4>
                    <p class="counterparty">
                      {{ txn.type === 'sale' ? '买家' : '卖家' }}: {{ txn.counterparty }}
                    </p>
                  </div>
                </div>
                <div class="txn-info">
                  <span class="txn-date">{{ txn.date }}</span>
                  <span class="txn-price" :class="txn.type">
                    {{ txn.type === 'sale' ? '+' : '-' }}¥{{ txn.price }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'tutorials'" class="tutorials-section">
          <h3 class="section-subtitle">新手制作教程</h3>
          <div class="tutorials-grid">
            <div v-for="tutorial in tutorials" :key="tutorial.id" class="tutorial-card card">
              <div class="tutorial-thumbnail">
                <img :src="tutorial.cover" :alt="tutorial.title" />
                <div v-if="tutorial.type === 'video'" class="video-indicator">
                  <span class="play-icon">▶</span>
                </div>
                <div class="tutorial-meta">
                  <span class="tag" :class="`tag-${tutorial.type === 'video' ? 'blue' : 'purple'}`">
                    {{ tutorial.type === 'video' ? '视频教程' : '图文教程' }}
                  </span>
                  <span class="difficulty">{{ getDifficultyLabel(tutorial.difficulty) }}</span>
                </div>
              </div>
              <div class="tutorial-info">
                <h4 class="tutorial-title">{{ tutorial.title }}</h4>
                <p class="tutorial-desc">{{ tutorial.description }}</p>
                <div class="tutorial-stats">
                  <span class="duration">⏱ {{ tutorial.duration }}</span>
                  <span class="views">👁 {{ tutorial.views }} 人学习</span>
                </div>
                <button class="btn btn-primary start-btn">开始学习</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPublishModal" class="modal-overlay" @click.self="showPublishModal = null">
      <div class="modal-content card">
        <div class="modal-header">
          <h2 class="modal-title">
            {{ showPublishModal === 'material' ? '发布材料求购' : '发布成品闲置' }}
          </h2>
          <button class="close-btn" @click="showPublishModal = null">×</button>
        </div>
        <form class="publish-form" @submit.prevent="handlePublish">
          <div class="form-group">
            <label class="form-label">标题</label>
            <input 
              v-model="publishForm.title" 
              type="text" 
              class="form-input"
              :placeholder="showPublishModal === 'material' ? '例如：求购天然石碎石混装' : '例如：古法银月光石手链'"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">详细描述</label>
            <textarea 
              v-model="publishForm.description" 
              class="form-textarea"
              :placeholder="showPublishModal === 'material' ? '请描述所需材料的规格、数量、颜色等要求...' : '请描述成品的材质、尺寸、工艺等信息...'"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                {{ showPublishModal === 'material' ? '所需数量' : '售价 (元)' }}
              </label>
              <input 
                v-model="publishForm.quantity" 
                type="text" 
                class="form-input"
                :placeholder="showPublishModal === 'material' ? '例如：500g 或 1套' : '例如：299'"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">
                {{ showPublishModal === 'material' ? '预算范围' : '新旧程度' }}
              </label>
              <input 
                v-model="publishForm.budget" 
                type="text" 
                class="form-input"
                :placeholder="showPublishModal === 'material' ? '例如：80-120元' : '例如：全新/9成新'"
                :required="showPublishModal === 'material'"
              />
            </div>
          </div>
          <div v-if="showPublishModal === 'material'" class="form-group">
            <label class="form-label">截止日期</label>
            <input 
              v-model="publishForm.deadline" 
              type="date" 
              class="form-input"
              required
            />
          </div>
          <div v-if="showPublishModal === 'idle'" class="form-group">
            <label class="form-label">标签 (用逗号分隔)</label>
            <input 
              v-model="publishForm.tags" 
              type="text" 
              class="form-input"
              placeholder="例如: 手链, 月光石, 古法银"
            />
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showPublishModal = null">
              取消
            </button>
            <button type="submit" class="btn btn-primary">
              发布
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const tabs = [
  { label: '材料订单', value: 'orders' },
  { label: '成交记录', value: 'transactions' },
  { label: '新手教程', value: 'tutorials' }
]

const activeTab = ref('orders')
const showPublishModal = ref<'material' | 'idle' | null>(null)

const materialOrders = ref([
  {
    id: 1,
    orderNo: 'MO20260425001',
    status: 'completed',
    date: '2026-04-25',
    total: 226,
    items: [
      {
        id: 1,
        name: '天然石碎石混装',
        specs: '3-8mm，约100颗/100g',
        price: 68,
        quantity: 2,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20natural%20gemstone%20chips%20in%20various%20colors%20moonstone%20amethyst%20rose%20quartz%20tigers%20eye%20on%20white%20background&image_size=square'
      },
      {
        id: 2,
        name: '捷克水晶珠套装',
        specs: '约200颗，含10种颜色5种形状',
        price: 88,
        quantity: 1,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=czech%20crystal%20glass%20beads%20assorted%20colors%20shapes%20faceted%20for%20jewelry%20making%20on%20white%20background&image_size=square'
      }
    ]
  },
  {
    id: 2,
    orderNo: 'MO20260418002',
    status: 'shipped',
    date: '2026-04-18',
    total: 128,
    items: [
      {
        id: 1,
        name: '古法银配件套装',
        specs: '约50件/套，含6种常用规格',
        price: 128,
        quantity: 1,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20style%20silver%20jewelry%20findings%20spacer%20beads%20bead%20caps%20chain%20extensions%20lobster%20clasps%20on%20white%20background&image_size=square'
      }
    ]
  }
])

const transactions = ref([
  {
    id: 1,
    type: 'sale',
    title: '月光石缠绕手链',
    price: 399,
    date: '2026-04-24',
    counterparty: '水晶爱好者',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20moonstone%20wire%20wrapped%20bracelet%20handmade%20jewelry%20shimmering%20blue%20light%20on%20white%20background&image_size=square'
  },
  {
    id: 2,
    type: 'sale',
    title: '天然石串珠耳环',
    price: 168,
    date: '2026-04-20',
    counterparty: '时尚达人',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20natural%20stone%20beaded%20earrings%20amethyst%20rose%20quartz%20delicate%20jewelry%20on%20white%20background&image_size=square'
  },
  {
    id: 3,
    type: 'purchase',
    title: '紫水晶圆珠散珠',
    price: 158,
    date: '2026-04-15',
    counterparty: '晶石供应商',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20amethyst%20round%20beads%20purple%20crystal%20gemstone%20beads%20for%20jewelry%20making%20on%20white%20background&image_size=square'
  }
])

const tutorials = ref([
  {
    id: 1,
    title: '零基础串珠入门：制作简单手链',
    description: '从认识工具材料开始，学习基础串珠技巧，完成第一条属于自己的手链。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=step%20by%20step%20beading%20tutorial%20making%20simple%20bracelet%20beginner%20jewelry%20making%20on%20white%20background&image_size=square',
    type: 'video',
    difficulty: 'beginner',
    duration: '15分钟',
    views: 3256
  },
  {
    id: 2,
    title: '绕线基础：单石吊坠包裹技巧',
    description: '学习铜线绕线的基础手法，掌握如何用铜线包裹一颗宝石制作吊坠。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wire%20wrapping%20tutorial%20single%20stone%20pendant%20copper%20wire%20jewelry%20making%20technique%20on%20white%20background&image_size=square',
    type: 'video',
    difficulty: 'intermediate',
    duration: '25分钟',
    views: 1892
  },
  {
    id: 3,
    title: '蜡线编织：南美蜡线编绳基础',
    description: '图文教程详细展示各种基础结的编法，包括平结、蛇结、金刚结等。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=macrame%20knotting%20tutorial%20waxed%20cord%20jewelry%20making%20various%20knots%20illustration%20on%20white%20background&image_size=square',
    type: 'article',
    difficulty: 'beginner',
    duration: '阅读时间 10分钟',
    views: 2543
  },
  {
    id: 4,
    title: '天然石入门：认识常见宝石种类',
    description: '图文讲解常见手工饰品用天然石的种类、特点、鉴别方法和保养知识。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=various%20natural%20gemstones%20collection%20moonstone%20amethyst%20rose%20quartz%20citrine%20educational%20guide%20on%20white%20background&image_size=square',
    type: 'article',
    difficulty: 'beginner',
    duration: '阅读时间 8分钟',
    views: 4126
  }
])

const publishForm = reactive({
  title: '',
  description: '',
  quantity: '',
  budget: '',
  deadline: '',
  tags: ''
})

const getOrderStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待付款',
    paid: '已付款',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

const getDifficultyLabel = (level: string) => {
  const labels: Record<string, string> = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级',
    expert: '大师级'
  }
  return labels[level] || '未知'
}

const handlePublish = () => {
  alert(`发布成功！\n\n标题: ${publishForm.title}\n${showPublishModal.value === 'material' ? `数量: ${publishForm.quantity}\n预算: ${publishForm.budget}` : `价格: ${publishForm.quantity}`}`)
  showPublishModal.value = null
  publishForm.title = ''
  publishForm.description = ''
  publishForm.quantity = ''
  publishForm.budget = ''
  publishForm.deadline = ''
  publishForm.tags = ''
}
</script>

<style scoped>
.profile-view {
  padding-bottom: 40px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.profile-info {
  display: flex;
  gap: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: white;
  font-size: 32px;
  font-weight: 600;
}

.info-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.username {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 6px;
}

.user-bio {
  font-size: 14px;
  color: #718096;
  margin-bottom: 12px;
}

.user-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #6b46c1;
}

.stat-label {
  font-size: 12px;
  color: #718096;
}

.publish-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tabs-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
  flex: 1;
  padding: 16px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 500;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

.tab-btn:hover {
  color: #6b46c1;
}

.tab-btn.active {
  color: #6b46c1;
  font-weight: 600;
}

.tab-btn.active::after {
  width: 60%;
}

.tab-content {
  padding: 24px;
}

.section-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 20px;
}

.orders-list,
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  padding: 0;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.order-id {
  font-size: 13px;
  color: #718096;
}

.order-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.order-status.completed {
  background: #c6f6d5;
  color: #22543d;
}

.order-status.shipped {
  background: #bee3f8;
  color: #2a4365;
}

.order-status.paid {
  background: #feebc8;
  color: #742a2a;
}

.order-items {
  padding: 16px 20px;
}

.order-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px dashed #e2e8f0;
}

.order-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  font-size: 15px;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 4px;
}

.item-specs {
  font-size: 13px;
  color: #718096;
  margin-bottom: 4px;
}

.item-price {
  font-size: 14px;
  font-weight: 500;
  color: #e53e3e;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

.order-date {
  font-size: 13px;
  color: #718096;
}

.order-total {
  font-size: 14px;
  color: #4a5568;
}

.total-price {
  margin-left: 12px;
  font-weight: 600;
  color: #e53e3e;
}

.transaction-card {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.txn-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  border-radius: 8px;
  flex-shrink: 0;
}

.txn-type.sale {
  background: #c6f6d5;
}

.txn-type.purchase {
  background: #fed7d7;
}

.type-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.type-text {
  font-size: 12px;
  font-weight: 500;
  color: #2d3748;
}

.txn-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.txn-item {
  display: flex;
  gap: 12px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 4px;
}

.counterparty {
  font-size: 13px;
  color: #718096;
}

.txn-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px dashed #e2e8f0;
}

.txn-date {
  font-size: 13px;
  color: #718096;
}

.txn-price {
  font-size: 18px;
  font-weight: 700;
}

.txn-price.sale {
  color: #38a169;
}

.txn-price.purchase {
  color: #e53e3e;
}

.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.tutorial-card {
  display: flex;
  flex-direction: column;
}

.tutorial-thumbnail {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.tutorial-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-indicator {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.play-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #6b46c1;
}

.tutorial-meta {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tutorial-meta .tag {
  align-self: flex-start;
}

.difficulty {
  align-self: flex-start;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #4a5568;
}

.tutorial-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tutorial-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.tutorial-desc {
  font-size: 13px;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tutorial-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.duration,
.views {
  font-size: 12px;
  color: #718096;
}

.start-btn {
  width: 100%;
  margin-top: auto;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #e2e8f0;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #cbd5e0;
  color: #4a5568;
}

.publish-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-label {
  font-weight: 500;
  color: #4a5568;
  font-size: 14px;
}

.form-input,
.form-textarea {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2d3748;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #6b46c1;
}

.form-textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 20px;
  }

  .publish-buttons {
    flex-direction: row;
    width: 100%;
  }

  .publish-buttons .btn {
    flex: 1;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .tutorials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
