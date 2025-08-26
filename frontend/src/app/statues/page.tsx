import EstatuasClient from "./client";
export default function Page() {
  return (
    <section className="p-4">
      <h1 className="text-xl mb-2">Estatuas</h1>
      <EstatuasClient />
    </section>
  );
}
