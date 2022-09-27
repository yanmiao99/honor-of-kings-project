import {nextTick} from 'vue'

export let tableHeight = $ref(100) // table 高度

// 动态计算高度
export const getAutoHeight = (otherHeight) => {
  nextTick(() => {
    // 屏幕高度 - 188 (除了表格之外其他元素的高度)
    tableHeight = document.body.scrollHeight - otherHeight
  })
}

let flag = $ref(true)
// 窗口发生改变, 重新计算 table 高度
window.onresize = () => {
  if (!flag) return
  getAutoHeight()
  flag = false
  setTimeout(() => {
    flag = true
  }, 100)
}
