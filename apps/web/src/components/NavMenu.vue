<template>
  <nav class="nav-menu">
    <div class="nav-container">
      <router-link to="/" class="nav-brand">
        <Icon name="gem" class="brand-icon" />
        <span class="brand-text">手工饰品坊</span>
      </router-link>
      <div class="nav-links">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          <Icon :name="item.icon" class="nav-icon" />
          <span class="nav-text">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icon from './Icon.vue'

const route = useRoute()

const menuItems = [
  { name: '首页', path: '/', icon: 'home' },
  { name: '商城', path: '/mall', icon: 'shopping-cart' },
  { name: '作品', path: '/works', icon: 'artboard' },
  { name: '我的', path: '/profile', icon: 'user' }
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.nav-menu {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  transition: transform 0.2s ease;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 24px;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: white;
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav-link:hover::before {
  width: 80%;
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
}

.nav-link.active::before {
  width: 80%;
}

.nav-icon {
  font-size: 16px;
}

.nav-text {
  letter-spacing: 0.5px;
}

@media (max-width: 640px) {
  .nav-container {
    padding: 0 10px;
  }

  .nav-link {
    padding: 8px 12px;
  }

  .nav-text {
    display: none;
  }

  .nav-icon {
    font-size: 20px;
  }
}
</style>
