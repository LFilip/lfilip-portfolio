interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-100 border-b border-zinc-800 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
