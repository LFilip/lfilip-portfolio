import { personalInfo, intro } from "../data/resume";

export default function Header() {
  return (
    <header className="mb-12">
      <h1 className="text-4xl font-bold text-zinc-100 mb-2">
        {personalInfo.name}
      </h1>
      <p className="text-xl text-emerald-400 font-medium mb-4">
        {personalInfo.title}
      </p>
      <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-6">
        <a
          href={`mailto:${personalInfo.email}`}
          className="hover:text-emerald-400 transition-colors"
        >
          {personalInfo.email}
        </a>
        <span>{personalInfo.location}</span>
      </div>
      <p className="text-zinc-300 leading-relaxed max-w-2xl">{intro}</p>
    </header>
  );
}
