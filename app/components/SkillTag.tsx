interface SkillTagProps {
  label: string;
  variant?: "skill" | "cert";
}

export default function SkillTag({ label, variant = "skill" }: SkillTagProps) {
  const baseStyles =
    "inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2";

  const variantStyles =
    variant === "cert"
      ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
      : "bg-zinc-800 text-zinc-300 border border-zinc-700";

  return <span className={`${baseStyles} ${variantStyles}`}>{label}</span>;
}
