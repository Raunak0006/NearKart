import ShopDetailsClient from './ShopDetailsClient';

export function generateStaticParams() {
  return [
    { id: 'shop_1' },
    { id: 'shop_2' },
    { id: 'shop_3' },
    { id: 'shop_4' },
    { id: 'shop_5' },
  ];
}

export default function ShopDetailsPage() {
  return <ShopDetailsClient />;
}
