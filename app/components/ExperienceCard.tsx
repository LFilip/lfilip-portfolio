import { Experience } from "../data/resume";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">
            {experience.title}
          </h3>
          <p className="text-emerald-400 font-medium">{experience.company}</p>
        </div>
        <div className="text-sm text-zinc-400 mt-1 sm:mt-0 sm:text-right">
          <p>{experience.location}</p>
          <p>
            {experience.startDate} – {experience.endDate}
          </p>
        </div>
      </div>
      <ul className="list-disc list-inside space-y-1 text-zinc-400">
        {experience.highlights.map((highlight, index) => (
          <li key={index} className="text-sm leading-relaxed">
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}
