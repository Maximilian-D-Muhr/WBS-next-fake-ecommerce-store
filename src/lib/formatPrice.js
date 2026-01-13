const EURO_FORMATTER = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export function formatPrice(price) {
  return EURO_FORMATTER.format(price);
}
