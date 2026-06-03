import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardList, HeartPulse, Dumbbell, Apple, Stethoscope } from "lucide-react";
import { QUESTIONNAIRES } from "@/lib/questionnaires/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Acompanhamento GLP-1 — Questionários para pacientes" },
      { name: "description", content: "Plataforma de questionários interativos para acompanhar pacientes em uso de GLP-1: sintomas, alimentação, treino e treino de luta." },
      { property: "og:title", content: "Acompanhamento GLP-1 — Questionários para pacientes" },
      { property: "og:description", content: "Questionários interativos para acompanhar pacientes em uso de GLP-1." },
    ],
  }),
  component: Index,
});

const ICONS = {
  "sintomas-digestivos": Stethoscope,
  sintomas: HeartPulse,
  "antes-x-agora": Apple,
  treino: Dumbbell,
} as const;

function Index() {
  return (
    <main className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <header className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-accent)" }}>
            <ClipboardList className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">Acompanhamento GLP-1</p>
            <p className="text-sm font-medium text-muted-foreground">Para pacientes</p>
          </div>
        </header>

        <section className="mb-12 max-w-3xl">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
            Como você está se sentindo no seu tratamento?
          </h1>
          <p className="mt-5 text-lg text-foreground/75 sm:text-xl">
            Escolha um dos questionários abaixo. Suas respostas geram um resumo
            que você pode levar — ou enviar — para sua consulta.
          </p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {QUESTIONNAIRES.map((q) => {
            const Icon = ICONS[q.slug as keyof typeof ICONS] ?? ClipboardList;
            return (
              <Link
                key={q.slug}
                to="/q/$slug"
                params={{ slug: q.slug }}
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand-teal sm:p-8"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
                    {q.category}
                  </span>
                </div>
                <h2 className="text-balance text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
                  {q.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {q.subtitle}
                </p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-brand-teal">
                  <span>{q.rows.length} itens</span>
                  <span className="flex items-center gap-1.5 transition-transform group-hover:translate-x-0.5">
                    Começar
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Esta ferramenta apoia o acompanhamento clínico e não substitui a avaliação do seu profissional de saúde.
        </footer>
      </div>
    </main>
  );
}
