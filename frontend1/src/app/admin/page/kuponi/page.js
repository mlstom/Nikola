import KuponClient from "./KuponClient";

export default async function KuponPage() {
  const res = await fetch("http:localhost:3000/api/kupon", { cache: "no-store" });
  const kuponi = await res.json();

  return <KuponClient kuponi={kuponi} />;
}