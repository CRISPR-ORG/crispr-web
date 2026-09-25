import type { TeamMember as Member } from "../data/team"
import { Frame } from "./ui"

export default function TeamMemberCard({
  member,
  size = "md",
  ratio,
  index,
}: {
  member: Member
  size?: "lg" | "md" | "sm"
  ratio?: string
  index?: string
}) {
  const nameSize =
    size === "lg"
      ? "clamp(1.25rem, 2vw, 1.625rem)"
      : size === "md"
        ? "1.0625rem"
        : "0.9375rem"
  const monogram = size === "lg" ? "3.5rem" : size === "md" ? "2.5rem" : "2rem"

  return (
    <article className="group" data-cursor="view">
      <Frame
        src={member.image}
        alt={member.name}
        monogram={member.initials}
        monogramSize={monogram}
        ratio={ratio ?? (size === "lg" ? "4/5" : "1/1")}
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {index && (
            <div className="mb-1 font-mono text-[0.625rem] tabular-nums text-[color:var(--color-fg-3)]">
              {index}
            </div>
          )}
          <h3
            className="font-semibold leading-tight tracking-[-0.025em] text-[color:var(--color-fg)] transition-colors duration-300 group-hover:text-[color:var(--color-crispr-light)]"
            style={{ fontSize: nameSize }}
          >
            {member.name}
          </h3>
          <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[color:var(--color-fg-3)] transition-colors duration-300 group-hover:text-[color:var(--color-crispr)]">
            {member.role}
          </p>
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.625rem] text-[color:var(--color-fg-3)] transition-colors duration-300 hover:text-[color:var(--color-crispr)]"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
        <span
          className="mt-1 shrink-0 font-mono text-[color:var(--color-crispr)] opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          aria-hidden
        >
          →
        </span>
      </div>
    </article>
  )
}
