import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const materialsApi = {
  getMaterials: (params?: {
    jewelryType?: string
    category?: string
    technique?: string
    hasTrialPack?: boolean
  }) => api.get('/materials', { params }),
  getMaterial: (id: number) => api.get(`/materials/${id}`),
  getCategories: () => api.get('/materials/filters/categories'),
  getTechniques: () => api.get('/materials/filters/techniques')
}

export const worksApi = {
  getWorks: (params?: {
    difficulty?: string
    preferenceMatch?: boolean
  }) => api.get('/works', { params }),
  getWork: (id: number) => api.get(`/works/${id}`),
  createWork: (data: any) => api.post('/works', data),
  contactAuthor: (id: number, data: any) => api.post(`/works/${id}/contact`, data)
}

export const usersApi = {
  getUser: (id: number) => api.get(`/users/${id}`),
  getProfile: (id: number) => api.get(`/users/${id}/profile`),
  getStats: (id: number) => api.get(`/users/${id}/stats`)
}

export const ordersApi = {
  getOrders: (params: {
    userId: number
    type?: 'material' | 'transaction'
    status?: string
  }) => api.get('/orders', { params }),
  getOrder: (id: number) => api.get(`/orders/${id}`),
  getTransactions: (userId: number) => api.get(`/orders/transactions/${userId}`)
}

export const tutorialsApi = {
  getTutorials: (params?: {
    type?: 'video' | 'article'
    difficulty?: string
  }) => api.get('/tutorials', { params }),
  getTutorial: (id: number) => api.get(`/tutorials/${id}`)
}

export const marketplaceApi = {
  getIdleItems: (params?: {
    userId?: number
    category?: string
  }) => api.get('/marketplace/idle', { params }),
  getMaterialRequests: (params?: {
    userId?: number
    status?: string
  }) => api.get('/marketplace/requests', { params }),
  getIdleItem: (id: number) => api.get(`/marketplace/idle/${id}`),
  getMaterialRequest: (id: number) => api.get(`/marketplace/requests/${id}`),
  publishIdleItem: (data: any) => api.post('/marketplace/idle', data),
  publishMaterialRequest: (data: any) => api.post('/marketplace/requests', data)
}

export default api
