export default function formatDate(dateStr) {
  // 创建Date对象
  const date = new Date(dateStr);

  // 获取日期、月份、年份、小时和分钟
  const day = date.getDate();
  const month = date.getMonth() + 1; // 月份是从0开始的
  const year = date.getFullYear().toString().substr(-2); // 获取最后两位年份
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
