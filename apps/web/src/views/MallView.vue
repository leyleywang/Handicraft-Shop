<template>
  <div class="mall-view">
    <div class="page-header">
      <h1 class="page-title">材料商城</h1>
      <p class="page-subtitle">精选小众手工饰品专用材料，提供精准筛选与小份试用装</p>
    </div>

    <div class="filter-section card">
      <div class="filter-row">
        <div class="filter-item">
          <span class="filter-label">饰品类型</span>
          <div class="filter-options compact">
            <button 
              v-for="type in jewelryTypes" 
              :key="type.value"
              class="filter-btn compact"
              :class="{ active: selectedTypes.includes(type.value) }"
              @click="toggleFilter('types', type.value)"
            >
              {{ type.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="filter-row">
        <div class="filter-item">
          <span class="filter-label">材料类别</span>
          <div class="filter-options compact">
            <button 
              v-for="category in materialCategories" 
              :key="category.value"
              class="filter-btn compact"
              :class="{ active: selectedCategories.includes(category.value) }"
              @click="toggleFilter('categories', category.value)"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="filter-row">
        <div class="filter-item">
          <span class="filter-label">工艺适配</span>
          <div class="filter-options compact">
            <button 
              v-for="tech in techniques" 
              :key="tech.value"
              class="filter-btn compact"
              :class="{ active: selectedTechniques.includes(tech.value) }"
              @click="toggleFilter('techniques', tech.value)"
            >
              {{ tech.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="filter-row filter-row-inline">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="showTrialOnly"
            class="checkbox-input"
          />
          <span class="checkbox-text">仅显示有试用装的商品</span>
        </label>
        <button class="reset-btn" @click="resetFilters">
          <Icon name="refresh-cw" class="btn-icon" />
          重置筛选
        </button>
      </div>
    </div>

    <div class="results-info">
      共找到 <span class="highlight">{{ filteredMaterials.length }}</span> 件商品
    </div>

    <div class="materials-grid">
      <div 
        v-for="material in filteredMaterials" 
        :key="material.id" 
        class="material-card card"
      >
        <div class="material-image">
          <img :src="material.image" :alt="material.name" />
          <div v-if="material.hasTrialPack" class="trial-badge">
            <span class="tag tag-blue">有试用装</span>
          </div>
        </div>
        <div class="material-info">
          <h3 class="material-name">{{ material.name }}</h3>
          <p class="material-description">{{ material.description }}</p>
          
          <div class="material-tags">
            <span v-for="tag in material.categories" :key="tag" class="tag tag-purple">{{ tag }}</span>
            <span v-for="tech in material.techniques" :key="tech" class="tag tag-green">{{ tech }}</span>
          </div>

          <div class="specs-section">
            <div class="spec-item">
              <span class="spec-label">适配饰品:</span>
              <div class="spec-values">
                <span v-for="jt in material.jewelryTypes" :key="jt" class="spec-tag">{{ jt }}</span>
              </div>
            </div>
            <div v-if="material.specs" class="spec-item">
              <span class="spec-label">规格:</span>
              <span class="spec-text">{{ material.specs }}</span>
            </div>
          </div>

          <div class="material-footer">
            <div class="price-section">
              <span class="price">¥{{ material.price }}</span>
              <span class="unit">/{{ material.unit }}</span>
            </div>
            <div class="action-buttons">
              <button v-if="material.hasTrialPack" class="btn btn-secondary" @click="showTrialInfo(material)">
                试用装 ¥{{ material.trialPrice }}
              </button>
              <button class="btn btn-primary">加入购物车</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'

const jewelryTypes = [
  { label: '全部', value: 'all' },
  { label: '手链', value: 'bracelet' },
  { label: '耳饰', value: 'earring' },
  { label: '项链', value: 'necklace' },
  { label: '胸针', value: 'brooch' }
]

const materialCategories = [
  { label: '全部', value: 'all' },
  { label: '天然石', value: 'stone' },
  { label: '银配件', value: 'silver' },
  { label: '珠子', value: 'bead' },
  { label: '线材', value: 'wire' },
  { label: '金属配件', value: 'metal' }
]

const techniques = [
  { label: '全部', value: 'all' },
  { label: '串珠', value: 'beading' },
  { label: '绕线', value: 'wrapping' },
  { label: '编织', value: 'weaving' },
  { label: '焊接', value: 'soldering' }
]

const selectedTypes = ref<string[]>(['all'])
const selectedCategories = ref<string[]>(['all'])
const selectedTechniques = ref<string[]>(['all'])
const showTrialOnly = ref(false)

const materials = ref([
  {
    id: 1,
    name: '天然石碎石混装',
    description: '精选多种天然石碎石，颜色丰富，适合各类饰品制作。包含月光石、紫水晶、粉晶、虎眼石等多种材质。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20natural%20gemstone%20chips%20in%20various%20colors%20moonstone%20amethyst%20rose%20quartz%20tigers%20eye%20on%20white%20background&image_size=square',
    price: 68,
    unit: '100g',
    hasTrialPack: true,
    trialPrice: 25,
    categories: ['天然石'],
    techniques: ['串珠', '编织'],
    jewelryTypes: ['手链', '耳饰', '项链'],
    specs: '3-8mm，约100颗/100g'
  },
  {
    id: 2,
    name: '古法银配件套装',
    description: '高品质仿古银配件套装，包含隔珠、花托、延长链、龙虾扣等常用配件，质感复古，不易氧化。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20style%20silver%20jewelry%20findings%20spacer%20beads%20bead%20caps%20chain%20extensions%20lobster%20clasps%20on%20white%20background&image_size=square',
    price: 128,
    unit: '1套',
    hasTrialPack: true,
    trialPrice: 38,
    categories: ['银配件', '金属配件'],
    techniques: ['串珠', '编织'],
    jewelryTypes: ['手链', '耳饰', '项链'],
    specs: '约50件/套，含6种常用规格'
  },
  {
    id: 3,
    name: '紫水晶圆珠散珠',
    description: '天然紫水晶圆珠，颜色浓郁，晶体通透，适合制作高端手链和项链。提供多种尺寸选择。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20amethyst%20round%20beads%20purple%20crystal%20gemstone%20beads%20for%20jewelry%20making%20on%20white%20background&image_size=square',
    price: 158,
    unit: '1条(约40颗)',
    hasTrialPack: true,
    trialPrice: 45,
    categories: ['天然石', '珠子'],
    techniques: ['串珠', '编织'],
    jewelryTypes: ['手链', '项链'],
    specs: '8mm，AAA级品质'
  },
  {
    id: 4,
    name: '优质铜线套装',
    description: '绕线专用铜线，含0.4mm、0.6mm、0.8mm三种常用规格，不易氧化，硬度适中，适合各种绕线工艺。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=copper%20wire%20spools%20for%20jewelry%20wire%20wrapping%20craft%20various%20gauges%20on%20white%20background&image_size=square',
    price: 45,
    unit: '3卷套装',
    hasTrialPack: false,
    categories: ['线材', '金属配件'],
    techniques: ['绕线'],
    jewelryTypes: ['手链', '耳饰', '项链', '胸针'],
    specs: '0.4mm/0.6mm/0.8mm，每卷10米'
  },
  {
    id: 5,
    name: '捷克水晶珠套装',
    description: '进口捷克水晶珠，光泽度好，切面精致，包含多种形状和颜色，是串珠爱好者的必备材料。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=czech%20crystal%20glass%20beads%20assorted%20colors%20shapes%20faceted%20for%20jewelry%20making%20on%20white%20background&image_size=square',
    price: 88,
    unit: '1盒',
    hasTrialPack: true,
    trialPrice: 28,
    categories: ['珠子'],
    techniques: ['串珠'],
    jewelryTypes: ['手链', '耳饰', '项链', '胸针'],
    specs: '约200颗，含10种颜色5种形状'
  },
  {
    id: 6,
    name: '月光石水滴吊坠',
    description: '精选天然月光石水滴吊坠，蓝光效应明显，晶体通透，单颗包装，适合制作项链或手链。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20moonstone%20teardrop%20pendant%20with%20blue%20adularescence%20gemstone%20jewelry%20on%20white%20background&image_size=square',
    price: 228,
    unit: '1颗',
    hasTrialPack: false,
    categories: ['天然石'],
    techniques: ['串珠', '绕线'],
    jewelryTypes: ['项链'],
    specs: '约15x25mm，AAA级'
  }
])

const toggleFilter = (filterType: string, value: string) => {
  let targetArray: string[]
  
  switch (filterType) {
    case 'types':
      targetArray = selectedTypes.value
      break
    case 'categories':
      targetArray = selectedCategories.value
      break
    case 'techniques':
      targetArray = selectedTechniques.value
      break
    default:
      return
  }

  if (value === 'all') {
    targetArray.length = 0
    targetArray.push('all')
  } else {
    const allIndex = targetArray.indexOf('all')
    if (allIndex > -1) {
      targetArray.splice(allIndex, 1)
    }

    const index = targetArray.indexOf(value)
    if (index > -1) {
      targetArray.splice(index, 1)
      if (targetArray.length === 0) {
        targetArray.push('all')
      }
    } else {
      targetArray.push(value)
    }
  }
}

const filteredMaterials = computed(() => {
  return materials.value.filter(material => {
    if (showTrialOnly.value && !material.hasTrialPack) {
      return false
    }

    if (!selectedTypes.value.includes('all')) {
      const typeMap: Record<string, string> = {
        bracelet: '手链',
        earring: '耳饰',
        necklace: '项链',
        brooch: '胸针'
      }
      const hasMatchingType = selectedTypes.value.some(t => 
        material.jewelryTypes.includes(typeMap[t])
      )
      if (!hasMatchingType) return false
    }

    if (!selectedCategories.value.includes('all')) {
      const categoryMap: Record<string, string> = {
        stone: '天然石',
        silver: '银配件',
        bead: '珠子',
        wire: '线材',
        metal: '金属配件'
      }
      const hasMatchingCategory = selectedCategories.value.some(c => 
        material.categories.includes(categoryMap[c])
      )
      if (!hasMatchingCategory) return false
    }

    if (!selectedTechniques.value.includes('all')) {
      const techMap: Record<string, string> = {
        beading: '串珠',
        wrapping: '绕线',
        weaving: '编织',
        soldering: '焊接'
      }
      const hasMatchingTech = selectedTechniques.value.some(t => 
        material.techniques.includes(techMap[t])
      )
      if (!hasMatchingTech) return false
    }

    return true
  })
})

const resetFilters = () => {
  selectedTypes.value = ['all']
  selectedCategories.value = ['all']
  selectedTechniques.value = ['all']
  showTrialOnly.value = false
}

const showTrialInfo = (material: any) => {
  alert(`试用装信息：\n${material.name} 试用装\n价格: ¥${material.trialPrice}\n\n试用装为小份包装，适合新手尝试。`)
}
</script>

<style scoped>
.mall-view {
  padding-bottom: 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
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

.filter-section {
  margin-bottom: 24px;
  padding: 16px 20px;
}

.filter-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.filter-row:last-child {
  margin-bottom: 0;
}

.filter-row-inline {
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.filter-item {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
}

.filter-label {
  font-weight: 500;
  color: #4a5568;
  font-size: 13px;
  white-space: nowrap;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-options.compact {
  flex: 1;
}

.filter-btn {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 16px;
  font-size: 13px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn.compact {
  padding: 5px 12px;
  font-size: 12px;
}

.filter-btn:hover {
  border-color: #6b46c1;
  color: #6b46c1;
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.reset-btn {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 16px;
  font-size: 13px;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.reset-btn:hover {
  border-color: #6b46c1;
  color: #6b46c1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  accent-color: #6b46c1;
}

.checkbox-text {
  font-size: 14px;
  color: #4a5568;
}

.results-info {
  margin-bottom: 20px;
  font-size: 14px;
  color: #718096;
}

.highlight {
  color: #6b46c1;
  font-weight: 600;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.material-card {
  display: flex;
  flex-direction: column;
}

.material-image {
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.material-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.trial-badge {
  position: absolute;
  top: 12px;
  right: 12px;
}

.material-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.material-name {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.material-description {
  font-size: 14px;
  color: #718096;
  line-height: 1.6;
  margin-bottom: 12px;
}

.material-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.specs-section {
  background: #f7fafc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.spec-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 8px;
}

.spec-item:last-child {
  margin-bottom: 0;
}

.spec-label {
  font-size: 13px;
  color: #718096;
  min-width: 60px;
}

.spec-values {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.spec-tag {
  padding: 2px 8px;
  background: white;
  border-radius: 4px;
  font-size: 12px;
  color: #4a5568;
}

.spec-text {
  font-size: 13px;
  color: #4a5568;
}

.material-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.price-section {
  display: flex;
  align-items: baseline;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #e53e3e;
}

.unit {
  font-size: 13px;
  color: #718096;
  margin-left: 4px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons .btn {
  padding: 8px 14px;
  font-size: 13px;
}

@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
    gap: 12px;
  }

  .filter-label {
    min-width: auto;
    padding-top: 0;
  }

  .materials-grid {
    grid-template-columns: 1fr;
  }

  .material-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .action-buttons {
    width: 100%;
  }

  .action-buttons .btn {
    flex: 1;
  }
}
</style>
