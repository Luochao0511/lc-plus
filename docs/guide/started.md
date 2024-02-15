# 快速上手

::: tip 提示
lc-plus基于vue3+ts+Element-plus二次封装组件库
:::

## 安装

> ### 温馨提示node版本建议16+以上

```
# install lc-plus
npm install lc-plus -S

pnpm install lc-plus -S
```

## 使用

> ### 全局引入

```ts
//main.ts
import lcPlus from 'lc-plus'
import 'lc-plus/index.css'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(lcPlus)

```

> ### 按需引入

```vue
//app.vue
<template>
  <LcTable :columns="columns" />
</template>
<script setup lang="ts">
  import { LcTable } from 'lc-plus'
  import { ref } from 'vue'

  const columns = ref([])
</script>

```
```ts
//main.ts
import 'lc-plus/index.css'
```