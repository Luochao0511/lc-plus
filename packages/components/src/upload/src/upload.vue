<template>
  <div class="upload-files">
    <el-upload
      v-if="isFileUpload"
      ref="uploadRef"
      :action="fileUrl"
      :before-upload="beforeUpload(fileTypeList)"
      :limit="limit"
      :on-change="fileChange"
      :on-exceed="onExceed"
      :on-progress="onProgress"
      :on-success="uploadFileSuccess"
      :show-file-list="false"
      :style="{ width, height }"
      class="my-upload"
      drag
      title="最多上传200MB的文件"
      v-bind="$attrs"
    >
      <!--透传作用域插槽-->
      <template v-for="(_value, name) in $slots" :key="_value" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"/>
      </template>
      <template v-if="isSlotDefault">
        <div class="default">
          <el-icon class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
          <div>最多上传200MB的文件</div>
        </div>
      </template>
    </el-upload>
    <FileList ref="fileListRef" :file-list="loadFileList" :fileUploadType="fileUploadType" v-bind="$attrs"/>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LcUpload'
})
import useFile from '../../hooks/useFile';
import {computed, defineEmits, defineExpose, defineProps, getCurrentInstance, onMounted, ref, useSlots} from 'vue';
import {Plus} from '@element-plus/icons-vue';
import {FILE_SUFFIX} from '../../constants/base';
import {ElMessage} from 'element-plus';
// import {deleteFileApi} from '@/api/login';
import FileList from './fileList/index.vue';

const emits = defineEmits(['uploadFileSuccess']);
const slots = useSlots(); // 传入的所有slot
const isSlotDefault = computed(() => Object.keys(slots).indexOf('default') === -1); // 是否显示默认的html
// 是否展示
const isFileUpload = computed(() => {
  // 首先判断是不是新增或者修改，需不需要展示上传文件按钮
  if (props.fileUploadType === '0') {
    if (props.limit) {
      return props.fileList.length !== props.limit;
    } else {
      return true;
    }
  } else {
    return false;
  }
});
const {fileUrl, beforeUpload} = useFile(); // 上传hook
const instance = getCurrentInstance(); // vue2的this实例
const uploadRef = ref(null); // 上传的ref
onMounted(() => {
  if (props.fileUploadType === '0') {
    // 获取实例上面的全部方法
    const entries = Object.entries(uploadRef.value);
    // 通过遍历方法放在vue里面的组件实例上面，实现方法传递
    for (const [key, value] of entries) {
      instance.exposed[key] = value;
    }
  }
});

const props = defineProps({
  // 上传的文件类型，类型传递数组，可以在base.js里面去找
  fileTypeList: {
    type: Array,
    default: () => {
      return Object.values(FILE_SUFFIX).flat(2);
    }
  },
  // 文件列表
  fileList: {
    type: Array,
    default: () => []
  },
  // 限制文件上传个数
  limit: {
    type: Number
  },
  // 新增修改可传递可不传，详情可传递'1'
  // '0':新增和修改，新增修改可传递可不传，如果硬要传也只能是传字符串0,'1'代表详情，
  // 这里为什么使用字符串类型而不用number，或者布尔类型是有我的打算的，大多数时候都是通过头部的导航栏参数来决定该页面到底是新增修改还是详情，
  // 导航栏获取下来的参数是string类型，所以这里也采用string，就不需要类型转换了，方便一些
  fileUploadType: {
    type: String,
    default: '0',
    // 这里把类型控制起来
    validator(value) {
      return ['0', '1'].includes(value);
    }
  },
  // 宽度
  width: {
    type: [Number, String],
    default: '150px'
  },
  // 高度
  height: {
    type: [Number, String],
    default: '150px'
  }
});

// 文件上传进行中
const loadParams = ref([]);
const onProgress = (event, file) => {
  // 判断是否为新增的文件盒子，因为存在于多选情况
  const index = loadParams.value.findIndex(item => item.uid === file.uid); // 拿到文件的索引
  // 首先注入一个loading效果盒子
  if (index === -1) {
    loadParams.value.push({...file, loading: true, percentage: Math.floor(event.percent)});
  }
  // 进行进度条动态渲染
  if (loadParams.value[index] && loadParams.value[index].percentage >= 0) {
    loadParams.value[index].percentage = Math.floor(event.percent);
  }
};
// 这里是需要动态计算fileList,因为我需要加上loading盒子，所以我不能改变父组件传值的数据，只能创建一个新的数组
const loadFileList = computed(() => {
  return [...props.fileList, ...loadParams.value];
});
// 文件状态改变的时候，我需要删除掉我之前添加loading效果的盒子，为什么使用change事件，因为不管成功还是失败，我都要清除掉loading盒子，我不关心结果
const fileChange = file => {
  const index = loadParams.value.findIndex(item => item.uid === file.uid);
  loadParams.value.splice(index, 1);
};
// 当文件超出限制时，是在使用了limit文件上传限制触发，
const onExceed = files => {
  // 获取已经未上传的文件个数
  const noUploadNum = props.limit - props.fileList.length;
  // 上传文件的个数大于了我未上传的个数，我需要给予用户提示
  if (files.length > noUploadNum) {
    ElMessage.warning(`文件上传个数限制，还需上传${noUploadNum}个文件`);
  }
};
// 文件上传成功回调函数，真的不想写这个函数，这个函数毫无意义，
// 纯粹是为了解决控制台警告，因为vue3的事件严格模式，导致我现在使用$attrs传递给父组件事件，父组件使用时候功能是正常使用，但是控制台警告，看着不爽所以解决
const addFileList = ref([]);
const uploadFileSuccess = (response, file, files) => {
  addFileList.value.push(response.data);
  emits('uploadFileSuccess', response, file, files);
};
const fileListRef = ref(null); // 文件数据Ref
// operation为add或者为update,type代表cancel为取消，还是confirm
const deleteFiles = type => {
  const delFileList = type === 'cancel' ? addFileList.value : fileListRef.value.delFileList;
  // 如果是空数组就不调接口删除文件
  if (!delFileList.length) {
    return;
  }
  // deleteFileApi(delFileList).then(({code}) => {
  //   if (code === 0) {
  //     addFileList.value = []; // 清空添加的数组
  //     fileListRef.value.delFileList = [];
  //   }
  // });
};
defineExpose({deleteFiles});
</script>

<style lang="scss" scoped>
.upload-files {
  display: flex;
  width: 100%;
  height: 100%;

  :deep(.my-upload) {
    width: 100%;
    height: 100%;
    margin-right: 10px;

    .el-upload {
      height: 100%;
      width: 100%;

      .el-upload-dragger {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
