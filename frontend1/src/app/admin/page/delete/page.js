import DeletePageComponent from "../../../../components/DeletePageComponent";

export default async function DeletePage({ searchParams }) {
    const {id} = await searchParams
  return <DeletePageComponent id={id} />;
}
