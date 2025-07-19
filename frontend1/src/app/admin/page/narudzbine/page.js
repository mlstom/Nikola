import NarudzbinaTable from './NarudzbinaTable';

export default async function NarudzbinaPage() {
  const res = await fetch('http://localhost:3000/api/narudzbina', { cache: 'no-store' });
  const data = await res.json();
  return <NarudzbinaTable initialNarudzbine={data.narudzbine} />;
}