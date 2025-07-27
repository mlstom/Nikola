import ProductTable from "@/components/ProductTable";
export default async function AdminProizvodi() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/proizvod`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error("Greška pri dohvaćanju proizvoda");
  }

  const proizvodi = await res.json();
  return (
      <div
        className={`antialiased`}
      >
        <ProductTable proizvodi={proizvodi} />
      </div>
  );
}