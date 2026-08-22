import { ref, watch } from 'vue'

const STORAGE_KEY = 'sigap-role'
const validRoles = ['warga', 'relawan', 'admin']

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && validRoles.includes(saved)) return saved
  } catch (e) {
    /* localStorage unavailable — fall back to default */
  }
  return 'admin'
}

const currentRole = ref(loadInitial())

watch(currentRole, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, val)
  } catch (e) {
    /* ignore persistence errors */
  }
})

export const roleLabel = {
  warga: 'Warga',
  relawan: 'Relawan',
  admin: 'Admin',
}

export const roleHomePath = {
  warga: '/warga/peta-utama',
  relawan: '/relawan/dashboard-tugas',
  admin: '/admin/dashboard',
}

export function useRole() {
  function setRole(role) {
    if (validRoles.includes(role)) currentRole.value = role
  }
  return { currentRole, setRole }
}
