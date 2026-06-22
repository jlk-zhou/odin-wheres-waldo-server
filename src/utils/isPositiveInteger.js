export default function isPositiveInteger(n) {
  if (!Number.isInteger(+n) || n <= 0) {
    return false;
  } else {
    return true;
  }
}
