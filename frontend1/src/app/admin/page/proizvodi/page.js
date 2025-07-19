import ProductTable from "@/components/ProductTable";
export default async function AdminProizvodi() {
  const res = await fetch(`http://localhost:3000/api/proizvod`, {
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
        <h1>Proizvodi:</h1>
        <ProductTable proizvodi={proizvodi} />
      </div>
  );
}