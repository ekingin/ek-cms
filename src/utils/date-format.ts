import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_TIME_FORMAT = 'YYYY:MM:DD HH:mm:ss'

// 格式化utc时间
export function formatUtcTime(utcTime: string, format: string = DEFAULT_TIME_FORMAT) {
  return dayjs.utc(utcTime).utcOffset(8).format(format)
}
