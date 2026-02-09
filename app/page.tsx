import Header from "./components/Header";
import Section from "./components/Section";
import ExperienceCard from "./components/ExperienceCard";
import SkillTag from "./components/SkillTag";
import { experiences, skills, certifications, education } from "./data/resume";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <Header />

        <Section title="Experience">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <div className="flex flex-wrap">
            {certifications.map((cert) => (
              <SkillTag key={cert} label={cert} variant="cert" />
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">
              {education.degree}
            </h3>
            <p className="text-emerald-400 font-medium">{education.school}</p>
            <div className="text-sm text-zinc-400 mt-1">
              <p>
                {education.location} | {education.graduationDate}
              </p>
              {education.gpa && <p>{education.gpa}</p>}
            </div>
            {education.highlights && (
              <div className="mt-4">
                <p className="text-sm text-zinc-400 mb-2">
                  Relevant Coursework:
                </p>
                <div className="flex flex-wrap">
                  {education.highlights.map((course) => (
                    <span
                      key={course}
                      className="inline-block px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs mr-2 mb-2"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}
