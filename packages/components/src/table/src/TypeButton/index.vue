<template>
  <div
    :class="[params.paramsClass,{cursor:params?.preview}]"
    :style="params.paramsStyle"
    class="type-button"
    @click.stop="params?.preview&&params?.preview?.callback(params)"
  >
    <template v-for="(item,index) in params.toolbar" :key="index">
      <div v-if="item.label!=='删除'" :class="item.className" :style="item.style" class="cursor"
           @click="item.callback(params)">
        <div v-if="item.icon" :class="item.iconClass"/>
        {{ item.label }}
      </div>
      <el-popconfirm
        v-else
        :icon="Delete"
        cancel-button-text="取消"
        cancel-button-type="text"
        confirm-button-text="确认"
        confirm-button-type="danger"
        icon-color="#e74c3c"
        title="确定删除此行数据吗?"
        width="220"
        @confirm="item.callback(params)"
      >
        <template #reference>
          <div :class="item.className" :style="item?.style" class="cursor">
            <div v-if="item.icon" :class="item.iconClass"/>
            删除
          </div>
        </template>
      </el-popconfirm>
    </template>
  </div>
</template>

<script setup>
import {Delete} from '@element-plus/icons-vue';

const props = defineProps({
  params: {
    type: Object,
    default: {}
  }
});
</script>

<style lang="scss" scoped>
//混入
@mixin defaults {
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
}

@mixin icons {
  margin-right: 5px;
  background-size: cover;
  width: 20px;
  height: 20px;
}

.type-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  &.paramsClass {
    justify-content: center;
    border: 1px solid #abb6c3;
  }

  .save-button {
    color: #409eff;
    @include defaults;

    .save {
      background: url("@/assets/icons/svg/save-button.svg") no-repeat;
      @include icons;
    }
  }

  .details-button {
    color: #19be6b;
    @include defaults;

    .details {
      background: url("@/assets/icons/svg/details-button.svg") no-repeat;
      @include icons;
    }
  }

  .add-button {
    color: #19be6b;
    @include defaults;
    margin-left: 10px;

    .add {
      background: url("@/assets/icons/svg/add-button.svg") no-repeat;
      @include icons;
    }
  }

  .del-button {
    color: #e74c3c;
    @include defaults;
    margin-left: 10px;

    .del {
      background: url("@/assets/icons/svg/del-button.svg") no-repeat;
      @include icons;
    }
  }
}
</style>
