import NarudzbinaTable from './NarudzbinaTable';

export default async function NarudzbinaPage() {
  const res = await fetch('/api/narudzbina', { cache: 'no-store' });
  const data = await res.json();
  return <NarudzbinaTable initialNarudzbine={data.narudzbine} />;
}