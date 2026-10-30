export function currentWorkshopPackages(cmsPackages = []) {
  if (!Array.isArray(cmsPackages)) return [];
  return cmsPackages.filter(pkg => pkg?.isVisible !== false).map(pkg => {
    if (pkg.key === 'essential') return {
      ...pkg,
      summary: 'Make your own simple silver ring. 3g of sterling silver and jeweller guidance included.',
      idealFor: 'Simple ring designs you make yourself.',
      highlights: pkg.highlights?.map(item => item.replace(/\b4g of sterling silver\b/g, '3g of sterling silver'))
    };
    if (pkg.key === 'signature') return {
      ...pkg,
      summary: 'Make your own gemstone ring. 5g of silver, LKR 5,000 toward one gemstone and a standard setting included.',
      highlights: pkg.highlights?.map(item => item.replace(/\b6g of sterling silver\b/g, '5g of sterling silver'))
    };
    return pkg;
  });
}
