<template>
  <div class="community">
    <!-- 搜索框 -->
    <van-search
        v-model="searchValue"
        placeholder="模糊搜索标题"
        show-action
        @search="handleSearch"
        class="community-search"
    />

    <!-- 滚动加载 + 懒加载 + 卡片 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
          v-model:loading="contentListLoading"
          :finished="contentListFinished"
          finished-text="没有更多了"
          @load="onLoad"
          class="community-content"
      >
        <div class="content-item"
             v-for="item in contentList"
             :key="item.id"
             @click="handleContentItem(item)"
        >
          <lazy-component>
            <van-cell-group inset>
              <van-cell :title="item.title" class="item-top">
                <template #right-icon>
                  <img src="@images/community/icon-cat.png" alt="" class="item-top-icon">
                </template>
              </van-cell>
              <van-cell :border="false" class="item-center">
                <template #title>
                <span class="van-multi-ellipsis--l3">
                  {{ item.text }}
                </span>
                </template>
                <template #label>
                  <div class="item-center-img-box">
                    <div class="item-center-img" v-for="(img,index) in item.imgList" :key="index">
                      <van-image
                          show-error
                          show-loading
                          fit="cover"
                          position="center"
                          lazy-load
                          :src="img.url"
                          width="100%"
                          height="100%"
                      >
                        <template #loading>
                          <van-loading type="spinner" size="20"/>
                        </template>
                        <template #error>
                          加载失败
                        </template>
                      </van-image>
                    </div>
                  </div>
                </template>
              </van-cell>
              <van-cell class="item-bottom">
                <template #title>
                  <span class="item-bottom-time">{{ item.time }}</span>
                </template>
                <template #value>
                  <van-icon name="fire-o" color="#ee0a24"/>
                  <span class="item-bottom-num">{{ item.viewNum }}</span>
                  <span class="item-bottom-unit">人浏览</span>
                </template>
              </van-cell>
            </van-cell-group>
          </lazy-component>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 返回顶部 -->
    <BackTop></BackTop>
  </div>
</template>

<script setup>
import BackTop from '../components/back-top.vue'
import { Toast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 搜索
const searchValue = $ref('')
const handleSearch = (val) => {
  console.log(val)
}

// 每一条卡片的点击
const handleContentItem = (item) => {
  console.log(item)
  Toast(item.title)

  // 跳转路由
  router.push(`/community-article/${item.id}/${item.title}`)
}

// 滚动加载 + 内容
const contentList = ref([])
let contentListLoading = $ref(false)
let contentListFinished = $ref(false)
let refreshing = $ref(false)

// 请求数据
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    // 判断是否加载完成
    if (refreshing) {
      contentList.value = []
      refreshing = false
    }

    for (let i = 0; i < 10; i++) {
      contentList.value.push({
        id: contentList.value.length + 1,
        title: '给猫猫找个家',
        text: '白手套布偶妹妹,6月大,未绝育,无偿领养,性格乖巧, 粘人可爱,已经接种三针疫苗, 有疫苗本白手套布偶妹妹,6月大,未绝育,无偿领养,性格乖巧, 粘人可爱,已经接种三针疫苗, 有疫苗本',
        imgList: [
          { url: 'https://unpkg.com/@vant/assets/cat.jpeg' },
          { url: 'https://unpkg.com/@vant/assets/cat.jpeg' }
        ],
        time: '2022-09-03',
        viewNum: '666'
      })
    }

    // 加载状态结束
    contentListLoading = false

    // 数据全部加载完成
    if (contentList.value.length >= 400) {
      contentListFinished = true
    }
  }, 1000)
}

// 下拉刷新
const onRefresh = () => {
  // 加载完成状态设为 false
  contentListFinished = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  contentListLoading = true
  onLoad()
}

// const imgBox = new URL('./src/assets/images/community/icon-cat.png', import.meta.url).href

</script>

<style scoped lang="scss">
.community {
  .community-search {
    margin-bottom: 10px;
  }

  .community-content {
    .content-item {
      margin-bottom: 10px;

      .item-top {
        align-items: center;

        ::v-deep(.van-cell__title) {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          span {
            font-weight: bold;
            font-size: 16px;
            color: #2B8AEC;
          }
        }

        .item-top-icon {
          width: 20px;
          height: 20px;
          margin-left: 15px;
        }

      }

      .item-center {
        .item-center-img-box {
          display: flex;

          .item-center-img {
            margin: 15px 5px 0 5px;
            flex: 1;

            ::v-deep(.van-image) {
              border-radius: 8px;
              overflow: hidden;
              min-height: 50px;
            }
          }
        }
      }

      .item-bottom {
        .item-bottom-time {
          color: #999;
        }

        .item-bottom-num {
          color: #999;
          margin: 0 3px;
        }

        .item-bottom-unit {
          color: #999;
        }
      }
    }
  }
}

</style>
