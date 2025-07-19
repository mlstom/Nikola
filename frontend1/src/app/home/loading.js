import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-screen column bg-gray-900 flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Alati Nidža Logo"
        width={72}
        height={72}
        priority
        className="mr-2 rounded-full"
      />
      <span className="text-2xl animate-pulse text-orange-500">Učitavanje...</span>
    </div>
  );
}