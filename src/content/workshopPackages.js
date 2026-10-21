export function currentWorkshopPackages(cmsPackages = []) {
  return Array.isArray(cmsPackages) ? cmsPackages.filter(pkg => pkg?.isVisible !== false) : [];
}
