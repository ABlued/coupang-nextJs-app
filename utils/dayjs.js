export function formatTime(time, format = 'YYYY.MM.DD') {
  return dayjs(reviewDate).format(format);
}
