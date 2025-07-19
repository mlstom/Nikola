import ProductForm from "@/components/ProductForm";

export default async function ProductModal({ searchParams }) {
    const sP =await searchParams;
    const id = sP.id
    let proizvod
    if(id){
        const res = await fetch(`http://localhost:3000/api/proizvod/${id}`, {
        cache: "no-store",
      });
      
      proizvod = await res.json();
    }

    return (
        <div>
            <ProductForm proizvod={proizvod} />
        </div>
    )
}