import fs from 'node:fs'
import { resolve } from 'node:path'
import { rootPath } from './path'

const stayFile = ['package.json', 'README.md']

export async function delPath(path: string) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    for (const file of files) {
      const currentPath = resolve(path, file);

      if (fs.statSync(currentPath).isDirectory()) {
        await delPath(currentPath); // 递归删除子目录下的内容
        fs.rmdirSync(currentPath); // 删除空的子目录
      } else {
        fs.unlinkSync(currentPath); // 删除文件
      }
    }
  }
}