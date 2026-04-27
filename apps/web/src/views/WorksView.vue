<template>
  <div class="works-view">
    <div class="page-header">
      <div class="header-content">
        <div>
          <h1 class="page-title">作品展示</h1>
          <p class="page-subtitle">展示你的创意，发现志同道合的手工艺人</p>
        </div>
        <button class="btn btn-primary upload-btn" @click="showUploadModal = true">
          + 上传作品
        </button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-group">
        <span class="filter-label">工艺难度:</span>
        <div class="difficulty-buttons">
          <button 
            v-for="level in difficultyLevels" 
            :key="level.value"
            class="difficulty-btn"
            :class="{ active: selectedDifficulty === level.value }"
            @click="selectedDifficulty = level.value"
          >
            <span class="difficulty-icon">{{ level.icon }}</span>
            <span>{{ level.label }}</span>
          </button>
        </div>
      </div>

      <div class="match-toggle">
        <label class="toggle-label">
          <span class="toggle-text">精准匹配买家</span>
          <div class="toggle-wrapper" @click="preferenceMatch = !preferenceMatch">
            <div class="toggle-slider" :class="{ active: preferenceMatch }"></div>
          </div>
        </label>
        <div v-if="preferenceMatch" class="match-info">
          <span class="info-icon">💡</span>
          根据买家偏好（小众风格、定制需求）推送作品
        </div>
      </div>
    </div>

    <div class="works-grid">
      <div 
        v-for="work in filteredWorks" 
        :key="work.id" 
        class="work-card card"
        @click="showWorkDetail(work)"
      >
        <div class="work-image">
          <img :src="work.coverImage" :alt="work.title" />
          <div class="work-overlay">
            <span class="view-detail">查看详情</span>
          </div>
        </div>
        <div class="work-info">
          <h3 class="work-title">{{ work.title }}</h3>
          <div class="work-stats">
            <div class="difficulty-badge" :class="`difficulty-${work.difficulty}`">
              <span class="difficulty-icon">{{ getDifficultyIcon(work.difficulty) }}</span>
              <span>{{ getDifficultyLabel(work.difficulty) }}</span>
            </div>
            <span class="view-count">👁 {{ work.views }} 浏览</span>
          </div>
          <p class="work-description">{{ work.description }}</p>
          <div class="work-tags">
            <span v-for="tag in work.tags" :key="tag" class="tag tag-purple">{{ tag }}</span>
          </div>
          <div class="work-footer">
            <div class="author-info">
              <span class="author-avatar">{{ work.author.charAt(0) }}</span>
              <span class="author-name">{{ work.author }}</span>
            </div>
            <div class="work-price" v-if="work.price">
              ¥{{ work.price }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUploadModal" class="modal-overlay" @click.self="showUploadModal = false">
      <div class="modal-content card">
        <div class="modal-header">
          <h2 class="modal-title">上传新作品</h2>
          <button class="close-btn" @click="showUploadModal = false">×</button>
        </div>
        <form class="upload-form" @submit.prevent="handleUpload">
          <div class="form-group">
            <label class="form-label">作品标题</label>
            <input 
              v-model="newWork.title" 
              type="text" 
              class="form-input"
              placeholder="请输入作品标题"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">作品描述</label>
            <textarea 
              v-model="newWork.description" 
              class="form-textarea"
              placeholder="请详细描述你的作品..."
              rows="4"
              required
            ></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">工艺难度</label>
              <select v-model="newWork.difficulty" class="form-select" required>
                <option value="beginner">入门</option>
                <option value="intermediate">进阶</option>
                <option value="advanced">高级</option>
                <option value="expert">大师级</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">售价 (可选)</label>
              <input 
                v-model.number="newWork.price" 
                type="number" 
                class="form-input"
                placeholder="0 表示仅展示"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">制作过程 (添加步骤描述)</label>
            <div class="steps-container">
              <div v-for="(step, index) in newWork.steps" :key="index" class="step-item">
                <span class="step-number">第{{ index + 1 }}步</span>
                <input 
                  v-model="step.description" 
                  type="text" 
                  class="form-input step-input"
                  placeholder="描述这一步的操作..."
                />
                <button type="button" class="remove-step-btn" @click="removeStep(index)">
                  ×
                </button>
              </div>
              <button type="button" class="add-step-btn" @click="addStep">
                + 添加制作步骤
              </button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">标签 (用逗号分隔)</label>
            <input 
              v-model="newWork.tagsInput" 
              type="text" 
              class="form-input"
              placeholder="例如: 手链, 月光石, 古法银"
            />
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="newWork.enableMatching"
                class="checkbox-input"
              />
              <span class="checkbox-text">开启"精准匹配买家"功能</span>
            </label>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="showUploadModal = false">
              取消
            </button>
            <button type="submit" class="btn btn-primary">
              发布作品
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="selectedWork" class="modal-overlay" @click.self="selectedWork = null">
      <div class="modal-content detail-modal card">
        <div class="modal-header">
          <h2 class="modal-title">{{ selectedWork.title }}</h2>
          <button class="close-btn" @click="selectedWork = null">×</button>
        </div>
        <div class="detail-content">
          <div class="detail-image">
            <img :src="selectedWork.coverImage" :alt="selectedWork.title" />
          </div>
          <div class="detail-info">
            <div class="detail-meta">
              <div class="difficulty-badge large" :class="`difficulty-${selectedWork.difficulty}`">
                <span class="difficulty-icon">{{ getDifficultyIcon(selectedWork.difficulty) }}</span>
                <span>{{ getDifficultyLabel(selectedWork.difficulty) }}</span>
              </div>
              <div class="detail-stats">
                <span>👁 {{ selectedWork.views }} 浏览</span>
                <span>❤️ {{ selectedWork.likes }} 喜欢</span>
              </div>
            </div>
            <p class="detail-description">{{ selectedWork.description }}</p>
            <div class="detail-tags">
              <span v-for="tag in selectedWork.tags" :key="tag" class="tag tag-purple">{{ tag }}</span>
            </div>
            
            <div v-if="selectedWork.steps && selectedWork.steps.length > 0" class="steps-section">
              <h3 class="section-subtitle">📝 制作过程</h3>
              <div class="steps-list">
                <div v-for="(step, index) in selectedWork.steps" :key="index" class="step-detail">
                  <span class="step-number">{{ index + 1 }}</span>
                  <span class="step-text">{{ step.description }}</span>
                </div>
              </div>
            </div>

            <div class="detail-footer">
              <div class="author-card">
                <span class="author-avatar large">{{ selectedWork.author.charAt(0) }}</span>
                <div class="author-info">
                  <span class="author-name">{{ selectedWork.author }}</span>
                  <span class="author-bio">手工艺人</span>
                </div>
              </div>
              <div class="action-buttons">
                <button class="btn btn-primary" @click="contactAuthor(selectedWork)">
                  💬 私下沟通定制
                </button>
                <button v-if="selectedWork.price" class="btn btn-secondary">
                  ¥{{ selectedWork.price }} 购买
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const difficultyLevels = [
  { label: '全部', value: 'all', icon: '🌟' },
  { label: '入门', value: 'beginner', icon: '🌱' },
  { label: '进阶', value: 'intermediate', icon: '🌿' },
  { label: '高级', value: 'advanced', icon: '🌳' },
  { label: '大师级', value: 'expert', icon: '🌲' }
]

const selectedDifficulty = ref('all')
const preferenceMatch = ref(false)
const showUploadModal = ref(false)
const selectedWork = ref<any>(null)

const works = ref([
  {
    id: 1,
    title: '月光石缠绕手链',
    description: '采用绕线工艺，每颗月光石都经过精心挑选，蓝光效果明显。适合喜欢小众风格的爱好者。',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20moonstone%20wire%20wrapped%20bracelet%20handmade%20jewelry%20shimmering%20blue%20light%20on%20white%20background&image_size=square',
    difficulty: 'advanced',
    author: '手作达人小芳',
    price: 399,
    views: 1256,
    likes: 89,
    tags: ['手链', '绕线', '月光石', '小众风格'],
    steps: [
      { description: '挑选合适的月光石，确保每颗都有蓝光效应' },
      { description: '用0.8mm铜线进行基础框架缠绕' },
      { description: '逐颗固定月光石，注意排列的对称性' },
      { description: '完成收尾工作，打磨铜线末端' },
      { description: '添加延长链和龙虾扣' }
    ]
  },
  {
    id: 2,
    title: '天然石串珠耳环',
    description: '新手友好的串珠作品，使用紫水晶和粉晶搭配，颜色柔和，适合日常佩戴。',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20natural%20stone%20beaded%20earrings%20amethyst%20rose%20quartz%20delicate%20jewelry%20on%20white%20background&image_size=square',
    difficulty: 'beginner',
    author: '晶石匠人',
    price: 168,
    views: 892,
    likes: 56,
    tags: ['耳饰', '串珠', '天然石', '新手友好'],
    steps: [
      { description: '准备好所需珠子和耳钩配件' },
      { description: '根据设计排列珠子顺序' },
      { description: '用弹力线穿起所有珠子' },
      { description: '固定耳钩，检查牢固性' }
    ]
  },
  {
    id: 3,
    title: '古法银编织项链',
    description: '复杂的编织工艺，结合古法银配件和天然石，呈现复古风格，适合定制高级饰品。',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20style%20handwoven%20necklace%20with%20antique%20silver%20components%20and%20gemstones%20bohemian%20jewelry%20on%20white%20background&image_size=square',
    difficulty: 'expert',
    author: '编织艺术家',
    price: 688,
    views: 2341,
    likes: 178,
    tags: ['项链', '编织', '古法银', '高级定制'],
    steps: [
      { description: '设计整体图案和编织结构' },
      { description: '准备蜡线和所有配件' },
      { description: '开始基础编织，注意张力一致' },
      { description: '在指定位置嵌入银配件和宝石' },
      { description: '完成编织，烧粘收尾' },
      { description: '添加调节扣和装饰配件' }
    ]
  },
  {
    id: 4,
    title: '铜丝绕线水晶吊坠',
    description: '经典的绕线作品，展示铜线与水晶的完美结合，适合学习绕线基础技巧。',
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=copper%20wire%20wrapped%20crystal%20quartz%20pendant%20handmade%20jewelry%20artistic%20design%20on%20white%20background&image_size=square',
    difficulty: 'intermediate',
    author: '绕线爱好者',
    price: 258,
    views: 1567,
    likes: 98,
    tags: ['吊坠', '绕线', '水晶', '可定制'],
    steps: [
      { description: '选择主石，测量尺寸' },
      { description: '用粗线制作框架' },
      { description: '用细线进行装饰性缠绕' },
      { description: '制作吊坠扣头' },
      { description: '打磨所有尖锐边缘' }
    ]
  }
])

const newWork = reactive({
  title: '',
  description: '',
  difficulty: 'beginner',
  price: null as number | null,
  tagsInput: '',
  enableMatching: true,
  steps: [] as { description: string }[]
})

const filteredWorks = computed(() => {
  return works.value.filter(work => {
    if (selectedDifficulty.value !== 'all' && work.difficulty !== selectedDifficulty.value) {
      return false
    }
    return true
  })
})

const getDifficultyIcon = (level: string) => {
  const icons: Record<string, string> = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
    expert: '🌲'
  }
  return icons[level] || '⭐'
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

const showWorkDetail = (work: any) => {
  selectedWork.value = work
}

const addStep = () => {
  newWork.steps.push({ description: '' })
}

const removeStep = (index: number) => {
  newWork.steps.splice(index, 1)
}

const handleUpload = () => {
  const tags = newWork.tagsInput.split(',').map(t => t.trim()).filter(t => t)
  const work = {
    id: works.value.length + 1,
    title: newWork.title,
    description: newWork.description,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20jewelry%20craft%20artwork%20elegant%20design&image_size=square',
    difficulty: newWork.difficulty,
    author: '我',
    price: newWork.price || null,
    views: 0,
    likes: 0,
    tags: tags,
    steps: newWork.steps.filter(s => s.description)
  }
  works.value.unshift(work)
  showUploadModal.value = false
  alert('作品发布成功！')
  newWork.title = ''
  newWork.description = ''
  newWork.difficulty = 'beginner'
  newWork.price = null
  newWork.tagsInput = ''
  newWork.steps = []
}

const contactAuthor = (work: any) => {
  alert(`正在打开与「${work.author}」的私聊窗口...\n\n您可以在这里沟通定制需求：\n- 材料选择\n- 尺寸调整\n- 风格修改\n- 价格协商`)
}
</script>

<style scoped>
.works-view {
  padding-bottom: 40px;
}

.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: #718096;
}

.upload-btn {
  padding: 12px 24px;
  font-size: 15px;
}

.filter-bar {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-label {
  font-weight: 500;
  color: #4a5568;
  min-width: 80px;
}

.difficulty-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.difficulty-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 20px;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.difficulty-btn:hover {
  border-color: #6b46c1;
  color: #6b46c1;
}

.difficulty-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.difficulty-icon {
  font-size: 16px;
}

.match-toggle {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #e2e8f0;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.toggle-text {
  font-weight: 500;
  color: #4a5568;
}

.toggle-wrapper {
  width: 48px;
  height: 26px;
  background: #e2e8f0;
  border-radius: 13px;
  position: relative;
  transition: background 0.2s ease;
}

.toggle-wrapper .toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.toggle-wrapper .toggle-slider.active {
  transform: translateX(22px);
}

.toggle-wrapper:has(.toggle-slider.active) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.match-info {
  font-size: 13px;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  font-size: 16px;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.work-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.work-card:hover {
  transform: translateY(-4px);
}

.work-image {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-overlay {
  position: absolute;
  inset: 0;
  background: rgba(107, 70, 193, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.work-card:hover .work-overlay {
  opacity: 1;
}

.view-detail {
  color: white;
  font-weight: 500;
  font-size: 16px;
}

.work-info {
  display: flex;
  flex-direction: column;
}

.work-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.work-stats {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.difficulty-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.difficulty-badge.difficulty-beginner {
  background: #c6f6d5;
  color: #22543d;
}

.difficulty-badge.difficulty-intermediate {
  background: #e9d8fd;
  color: #553c9a;
}

.difficulty-badge.difficulty-advanced {
  background: #feebc8;
  color: #742a2a;
}

.difficulty-badge.difficulty-expert {
  background: #fed7d7;
  color: #742a2a;
}

.difficulty-badge.large {
  padding: 8px 16px;
  font-size: 14px;
}

.view-count {
  font-size: 13px;
  color: #718096;
}

.work-description {
  font-size: 14px;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.work-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.author-avatar.large {
  width: 48px;
  height: 48px;
  font-size: 20px;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.work-price {
  font-size: 18px;
  font-weight: 700;
  color: #e53e3e;
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
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content.detail-modal {
  max-width: 900px;
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
  font-size: 22px;
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

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-label {
  font-weight: 500;
  color: #4a5568;
  font-size: 14px;
}

.form-input,
.form-textarea,
.form-select {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2d3748;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #6b46c1;
}

.form-textarea {
  resize: vertical;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-number {
  font-size: 13px;
  font-weight: 500;
  color: #6b46c1;
  min-width: 60px;
}

.step-input {
  flex: 1;
}

.remove-step-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #fed7d7;
  border-radius: 50%;
  color: #c53030;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-step-btn {
  padding: 10px;
  border: 1px dashed #cbd5e0;
  background: transparent;
  border-radius: 8px;
  color: #718096;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.add-step-btn:hover {
  border-color: #6b46c1;
  color: #6b46c1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.detail-image {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #718096;
}

.detail-description {
  font-size: 15px;
  color: #4a5568;
  line-height: 1.7;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.section-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
}

.steps-section {
  background: #f7fafc;
  border-radius: 8px;
  padding: 16px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-detail {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.step-detail .step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
}

.step-text {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
}

.detail-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-bio {
  font-size: 12px;
  color: #718096;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .works-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-footer {
    flex-direction: column;
    gap: 16px;
  }

  .detail-footer .action-buttons {
    width: 100%;
  }

  .detail-footer .action-buttons .btn {
    flex: 1;
  }
}
</style>
