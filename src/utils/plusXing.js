export default function plusXing(str, frontLen = 3, endLen = 3, place = "...") {
  if (!str) return;
  return str.substring(0, frontLen) + place + str.substring(str.length - endLen);
}
