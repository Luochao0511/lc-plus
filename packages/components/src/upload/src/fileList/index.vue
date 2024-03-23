<template>
  <el-card
    v-for="(item, index) in fileList"
    :key="index"
    :class="[deleteIndex === index ? 'fade_out_up_big' : 'rotate-z-in']"
    class="card-List animate__animated"
    shadow="hover"
  >
    <template v-if="item.loading">
      <div class="loading-box">
        <el-progress :percentage="item.percentage" class="progress" type="circle"/>
      </div>
    </template>
    <template v-else>
      <div class="img-box">
        <div :style="{ height: isLookFileInfo ? '70%' : '100%' }" class="avatar">
          <el-image v-if="isMatchType(item.name, 'image')" :src="item.path" alt="" class="img-item" fit="cover">
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <Picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
          <div v-else :class="`icon-${checkFileType(item.name)}`" class="file-rests"/>
          <div class="file-dusty">
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="font-icon"
              title="预览"
              @click="previewImage(item.name, item.path)"
            />
            <font-awesome-icon :icon="['fas', 'download']" class="font-icon" title="下载" @click="downloadFile(item)"/>
            <font-awesome-icon
              v-if="fileUploadType !== '1'"
              :icon="['fas', 'trash-can']"
              class="font-icon"
              title="删除"
              @click="deleteFile(index, item)"
            />
          </div>
        </div>
        <div v-if="isLookFileInfo" class="imgInfo">
          <div :title="uploadFile(item.name)" class="imgInfoName">{{ uploadFile(item.name) }}</div>
          <div class="imgInfoSize">{{ fileSizeMb(item.size) }}</div>
        </div>
      </div>
    </template>
  </el-card>
  <!--  不能放到循环之中会造成打开重复预览文件组件-->
  <el-image-viewer
    v-if="showImageView"
    :initial-index="initialIndex"
    :url-list="srcPreviewList"
    hide-on-click-modal
    teleported
    @close="closeImagePreview"
  />
</template>

<script setup lang="ts">
import {computed, defineEmits, defineExpose, defineProps, onBeforeUnmount, ref} from 'vue';
import useFile from '../../../hooks/useFile';
import {Picture} from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus';

const initialIndex = ref(0);
const {checkFileType, uploadFile, fileSizeMb} = useFile();
const props = defineProps({
  // 文件list
  fileList: {
    type: Array,
    default: () => []
  },
  // 是否查看文件信息
  isLookFileInfo: {
    type: Boolean,
    default: true
  },
  // 是否为详情页面,如果是详情页面的话就不需要展示删除文件的按钮
  fileUploadType: {
    type: String,
    default: '0',
    // 这里把类型控制起来
    validator(value) {
      return ['0', '1'].includes(value);
    }
  }
});
const emits = defineEmits(['deleteFile']);
// 文件预览数组
const srcPreviewList = computed(() =>
  props.fileList.filter(item => isMatchType(item.name, 'image')).map(i => i.path)
);
// 校验类型
const isMatchType = (name, type) => {
  return checkFileType(name) === type;
};
// 预览图片
const showImageView = ref(false);
const previewImage = (name, path) => {
  if (isMatchType(name, 'image')) {
    initialIndex.value = srcPreviewList.value.findIndex(item => item === path);
    showImageView.value = true;
  } else {
    window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(path)}`);
  }
};
// 关闭图片预览功能
const closeImagePreview = () => {
  showImageView.value = false;
};
// 下载文件
const downloadFile = params => {
  window.open(params.path);
};
// 删除文件
const deleteIndex = ref(-1);
const timerId = ref(null);
const delFileList = ref([]); // 删除文件数组
const deleteFile = (index, params) => {
  deleteIndex.value = index;
  delFileList.value.push(params);
  // 这里添加异步是为了让动画有效进行
  timerId.value = setTimeout(() => {
    emits('deleteFile', params);
    ElMessage.success('删除成功');
    deleteIndex.value = -1;
  }, 300);
};
// 卸载事件
onBeforeUnmount(() => {
  // 清除定时器
  timerId.value && window.clearTimeout(timerId.value);
  timerId.value = null;
});
defineExpose({delFileList});
</script>

<style lang="scss" scoped>
@import "../style/index";
.card-List {
  padding: 10px;
  width: 180px;
  height: 180px;
  min-width: 110px;
  margin-right: 10px;

  &.animate__animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  &.rotate-z-in {
    -webkit-animation-name: ROTATE-Z-IN;
    animation-name: ROTATE-Z-IN;
  }

  &.fade_out_up_big {
    -webkit-animation-name: FADEOUT_UP_BIG;
    animation-name: FADEOUT_UP_BIG;
  }

  :deep(.el-card__body) {
    padding: 0;
    height: 100%;

    .loading-box {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .progress {
        width: 100%;
        //没办法只能用important，内部是用的style写的
        .el-progress-circle {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }

    .img-box {
      display: flex;
      flex-direction: column;
      height: 100%;

      .avatar {
        height: 70%;
        position: relative;

        .file-dusty {
          position: absolute;
          border-radius: 5px;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          cursor: default;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          opacity: 0;
          font-size: 20px;
          background: rgba(0,0,0,0.5);
          transition: opacity var(--el-transition-duration);

          .font-icon {
            cursor: pointer;

            &:hover {
              color: $COLOR-INFO;
            }

            + .font-icon {
              margin-left: 10px;
            }
          }

          &:hover {
            opacity: 1;
          }
        }

        .img-item {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }

        .file-rests {
          width: 100%;
          height: 100%;
          $iconList: ("pdf", "word", "excel", "ppt", "txt", "zip");
          @each $value in $iconList {
            &.icon-#{$value} {
              background: url(('../../../assets/upload/#{$value}.svg')) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }

      .imgInfo {
        font-size: 14px;
        height: 30%;

        .imgInfoSize {
          text-align: center;
        }

        .imgInfoName {
          @include TEXT-CLAMP(2);
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
