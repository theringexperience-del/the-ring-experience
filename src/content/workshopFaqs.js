export function mergeWorkshopFaqs(items = []) {
  if (!Array.isArray(items)) return [];
  return items.filter(item => item?.question && item?.answer).map(item => ({
    ...item,
    answer: item.answer
      .replace(/Essential includes 4g of sterling silver/g, 'Essential includes 3g of sterling silver for simple ring designs')
      .replace(/Signature Gem Discovery includes 6g of silver/g, 'Signature Gem Discovery includes 5g of silver')
  }));
}
