import run from '../build/run.ts'
import { rootPath } from '../build/path.ts'
import { series } from 'gulp'

export const publishComponent = async () => {
  await run('release-it  --dry-run', `${rootPath}/dist`)
}

export default series(async () => publishComponent())