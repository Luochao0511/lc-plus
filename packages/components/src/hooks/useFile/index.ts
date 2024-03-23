import {ElMessage} from 'element-plus';
import {FILE_SUFFIX} from '../../constants/base';

export default function () {
  const fileUrl = 'https://szhy.artcollegehb.cn/gateway/api/oss/uploadMinio'; // 文件上传的请求地址
  // 文件上传校验
  const beforeUpload = fileTypeList => {
    return file => {
      const FileExt = file.name.replace(/.+\./, '');
      if (fileTypeList.indexOf(FileExt.toLowerCase()) === -1 || file.size / 1024 / 1024 > 200) {
        ElMessage.info(`请上传后缀名为${fileTypeList.join(',')}的附件且不能超过200MB`);
        return false;
      }
    };
  };

  // 文件上传失败事件
  const uploadError = () => {
    ElMessage.error('上传失败');
  };

  // 文件上传名字事件
  const uploadFile = str => {
    const arr = str.split('.');
    if (arr.length === 1) return str;
    else if (arr.length === 2) return `(${arr[1].toUpperCase()})${arr[0]}`;
    else {
      let nameStr = '';
      for (let index = 0; index < arr.length - 1; index++) {
        nameStr += arr[index];
      }
      return `(${arr[arr.length - 1].toUpperCase()})${nameStr}`;
    }
  };

  // 把文件大小转化为文字
  function fileSizeMb(size) {
    const computedSize = size / 1048576;
    const fileSizeMb = computedSize.toFixed(2);
    if (Number(fileSizeMb) >= 1) {
      return `${computedSize.toFixed(2) + 'MB'}`;
    } else {
      return `${(size / 1024).toFixed(2) + 'KB'}`;
    }
  }

  // 确定文件类型
  const checkFileType = (fileName:string) => {
    const fileIndex = fileName.lastIndexOf('.'); // 判断是否有小数点
    if (!fileName || fileIndex === -1) return '';
    const suffix = fileName.substr(fileIndex + 1);
    const lowerSuffix = suffix.toLocaleLowerCase();
    // 查找文件类别
    for (const fileSuffix in FILE_SUFFIX) {
      if (Object.prototype.hasOwnProperty.call(FILE_SUFFIX, fileSuffix)) {
        for (const suffixItem of FILE_SUFFIX[fileSuffix]) {
          if (suffixItem === lowerSuffix) {
            return fileSuffix;
          }
        }
      }
    }
    return '';
  };

  return {
    fileSizeMb,
    fileUrl,
    checkFileType,
    beforeUpload,
    uploadError,
    uploadFile
  };
}
