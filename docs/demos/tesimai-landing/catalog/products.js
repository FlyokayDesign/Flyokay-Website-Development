/* Current Figma repeats the same image and supplies one copy set.
   Keep four stable records; replace fields here when approved content exists. */
window.TESIMAI_CATALOG_CONTENT = {
  label: 'Product Catalog',
  desktopHeading: 'Our products deliver field-tested durability, efficiency, and long-term performance worldwide at scale.',
  desktopDescription: 'Supports demanding operations with powerful energy output over time. Supports demanding operations with powerful energy output over time. Supports demanding operations with powerful energy output over time.',
  mobileHeading: 'Choose us to reduce operational costs and gain sales independence. Trust a partner that can deliver reliable, high-performance solutions.',
  cta: 'Get in touch',
  products: ['01', '02', '03', '04'].map(number => ({
    id: `product-${number}`, name: 'Flying Orb', subtitle: 'CAPACITY',
    description: 'Supports demanding operations with powerful energy output over time.',
    image: 'catalog/assets/product-desktop.png', mobileImage: 'catalog/assets/product-desktop.png',
    detailUrl: null
  }))
};
