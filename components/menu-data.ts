export type SignatureDrink = {
  slug: string;
  name: string;
  priceHot?: number;
  priceCold?: number;
  description: string;
  image: string;
};

export type MenuItem = {
  no: number;
  name: string;
  hot?: number;
  cold?: number;
  price?: number;
  note?: string;
};

export type MenuCategory = {
  slug: string;
  title: string;
  size?: string;
  items: MenuItem[];
};

export const signatureDrinks: SignatureDrink[] = [
  {
    slug: 'candid-heaven-latte',
    name: 'Candid Heaven Latte',
    priceHot: 840,
    priceCold: 840,
    description: 'Silky signature latte with a dreamy, sweet finish and the kind of comfort that earns a second sip.',
    image: '/images/signatures/candid-heaven-latte.png',
  },
  {
    slug: 'floral-pistachio',
    name: 'Floral Pistachio',
    priceHot: 880,
    priceCold: 880,
    description: 'Nutty pistachio richness softened with floral notes for a more elevated, aromatic cup.',
    image: '/images/signatures/floral-pistachio.png',
  },
  {
    slug: 'blueberry-latte',
    name: 'Blueberry Latte',
    priceHot: 880,
    priceCold: 880,
    description: 'A playful latte with creamy espresso and a bright blueberry twist that feels instantly memorable.',
    image: '/images/signatures/blueberry-latte.png',
  },
  {
    slug: 'tiramisu-latte',
    name: 'Tiramisu Latte',
    priceHot: 920,
    priceCold: 920,
    description: 'Dessert-inspired, cocoa-kissed and indulgent, finished with a tiramisu-style creamy top.',
    image: '/images/signatures/tiramisu-latte.png',
  },
  {
    slug: 'dark-mocha',
    name: 'Dark Mocha',
    priceHot: 880,
    priceCold: 880,
    description: 'A richer, deeper take on mocha for chocolate lovers who want their coffee with real presence.',
    image: '/images/signatures/dark-mocha.png',
  },
  {
    slug: 'coconut-mocha',
    name: 'Coconut Mocha',
    priceHot: 880,
    priceCold: 880,
    description: 'Creamy coconut meets smooth mocha in a tropical-leaning cup that still feels unmistakably coffee.',
    image: '/images/signatures/coconut-mocha.png',
  },
  {
    slug: 'almond-mocha',
    name: 'Almond Mocha',
    priceHot: 880,
    priceCold: 880,
    description: 'Chocolate and almond come together in a warm, balanced mocha with a roasted, nutty edge.',
    image: '/images/signatures/almond-mocha.png',
  },
  {
    slug: 'strawberry-white-choco-mocha',
    name: 'Strawberry White Choco Mocha',
    priceHot: 920,
    priceCold: 920,
    description: 'The most playful signature: creamy white chocolate, a strawberry lift, and a premium dessert feel.',
    image: '/images/signatures/strawberry-white-choco-mocha.png',
  },
];

export const menuCategories: MenuCategory[] = [
  {
    slug: 'classics',
    title: 'Classics',
    items: [
      { no: 1, name: 'Espresso', hot: 420 },
      { no: 2, name: 'Americano', hot: 520, cold: 520 },
      { no: 3, name: 'Cortado', hot: 520 },
      { no: 4, name: 'Flat White', hot: 580 },
      { no: 5, name: 'Cappuccino', hot: 600 },
      { no: 6, name: 'Latte', hot: 600, cold: 600 },
      { no: 7, name: 'Spanish Latte', hot: 660, cold: 660 },
      { no: 8, name: 'Flavoured Latte', hot: 680, cold: 680, note: 'Caramel, Hazelnut, Vanilla' },
    ],
  },
  {
    slug: 'signatures',
    title: 'YDC Signatures',
    items: [
      { no: 9, name: 'Candid Heaven Latte', hot: 840, cold: 840 },
      { no: 10, name: 'Floral Pistachio', hot: 880, cold: 880 },
      { no: 11, name: 'Blueberry Latte', hot: 880, cold: 880 },
      { no: 12, name: 'Tiramisu Latte', hot: 920, cold: 920 },
      { no: 13, name: 'Dark Mocha', hot: 880, cold: 880 },
      { no: 14, name: 'Coconut Mocha', hot: 880, cold: 880 },
      { no: 15, name: 'Almond Mocha', hot: 880, cold: 880 },
      { no: 16, name: 'Strawberry White Choco Mocha', hot: 920, cold: 920 },
    ],
  },
  {
    slug: 'frappe',
    title: 'Frappe',
    items: [
      { no: 17, name: 'Mocha', price: 980 },
      { no: 18, name: 'Lotus Candy', price: 1080 },
      { no: 19, name: 'Pistachio', price: 1180 },
      { no: 20, name: 'KitKat', price: 1120 },
    ],
  },
  {
    slug: 'hot-chocolate',
    title: 'Hot Chocolate',
    items: [
      { no: 21, name: 'Classic Hot Chocolate', price: 750 },
      { no: 22, name: 'Salted Caramel Hot Chocolate', price: 820 },
      { no: 23, name: 'White Hot Chocolate Pistachio', price: 880 },
      { no: 24, name: 'Blueberry White Hot Chocolate', price: 880 },
    ],
  },
  {
    slug: 'matcha',
    title: 'Matcha',
    size: '12oz',
    items: [
      { no: 25, name: 'Classic Vanilla', price: 820 },
      { no: 26, name: 'OG Strawberry', price: 880 },
      { no: 27, name: 'White Choco Coconut', price: 980 },
      { no: 28, name: 'Blueberry Lavender', price: 980 },
    ],
  },
  {
    slug: 'daiquiris',
    title: 'Daiquiris',
    size: '12oz',
    items: [
      { no: 29, name: 'Strawberry Froast', price: 620 },
      { no: 30, name: 'Melon Wave', price: 660 },
      { no: 31, name: 'Tropical Fizz', price: 660 },
    ],
  },
  {
    slug: 'iced-teas',
    title: 'Iced Teas',
    items: [
      { no: 32, name: 'Peach Iced Tea', price: 520 },
      { no: 33, name: 'Watermelon Lychee', price: 580 },
      { no: 34, name: 'Mango Berry', price: 580 },
      { no: 35, name: 'Yuzu Iced Tea', price: 580 },
    ],
  },
  {
    slug: 'desserts',
    title: 'Desserts',
    items: [
      { no: 36, name: 'Classic (Brownie)', price: 520 },
      { no: 37, name: 'Fudge (Brownie)', price: 710 },
      { no: 38, name: 'Oreo And Salted Caramel (Brownie)', price: 760 },
      { no: 39, name: 'Double Choco Brown Butter (Cookie)', price: 640 },
      { no: 40, name: 'Death By Cookie', price: 700 },
      { no: 41, name: 'Banana Bread', price: 520 },
      { no: 42, name: 'Lotus Cheesecake (Slice)', price: 700 },
      { no: 43, name: 'Blueberry Cheesecake (Slice)', price: 700 },
      { no: 44, name: 'Plain Croissant', price: 620 },
    ],
  },
  {
    slug: 'breakfast',
    title: 'Breakfast',
    items: [
      { no: 45, name: 'YDC Omelette', price: 920 },
      { no: 46, name: 'European Omelette', price: 899 },
      { no: 47, name: 'ShakShuka', price: 1350 },
      { no: 48, name: 'Club Sandwich', price: 1185 },
      { no: 49, name: 'Croissant Sandwich', price: 1399 },
      { no: 50, name: 'Tuscan Chicken Sandwich', price: 1399 },
      { no: 51, name: 'Fajita Pasta', price: 1490 },
      { no: 52, name: 'Alfredo Pasta', price: 1490 },
      { no: 53, name: 'Lotus French Toast', price: 1450 },
    ],
  },
];

export const addOns = [
  'Espresso Shot',
  'Almond Milk',
  'Lactose Free Milk',
  'Low Fat Milk',
];
