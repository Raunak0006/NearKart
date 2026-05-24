import DeliveryTrackingClient from './DeliveryTrackingClient';

export function generateStaticParams() {
  return [
    { id: 'NK-9021' },
    { id: 'NK-8951' },
  ];
}

export default function DeliveryTrackingPage() {
  return <DeliveryTrackingClient />;
}
