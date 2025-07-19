import KuponClient from "./KuponClient";

export default async function KuponPage() {
  const res = await fetch("https://alatinidza.rs/api/kupon", { cache: "no-store" });
  const kuponi = await res.json();

  return <KuponClient kuponi={kuponi} />;
}