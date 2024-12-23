export function generateYear() {
  const links = [];
  const tenurePeriod = 3;
  let baseYear = 2070;

  for (let i = 0; i < 10; i++) {
    links.push({
      title: `${baseYear}-${baseYear + tenurePeriod}`,
      to: `/${baseYear}`,
    });
    baseYear = baseYear + tenurePeriod;
  }

  return links;
}
