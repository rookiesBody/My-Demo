import moment from "moment"

moment.locale("zh-cn")

export const formatTime = (date: any) => {
  return moment(date).format('YYYY/MM/DD')
}
