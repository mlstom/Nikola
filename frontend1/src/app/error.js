'use client';

export default function Error({ error, reset }) {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Greška</h1>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pokušaj ponovo
      </button>
    </div>
  );
}
