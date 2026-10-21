export function mergeWorkshopFaqs(items = []) {
  return Array.isArray(items) ? items.filter(item => item?.question && item?.answer) : [];
}
