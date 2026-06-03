import { createFileRoute, notFound } from "@tanstack/react-router";
import { QuestionnaireRunner } from "@/components/QuestionnaireRunner";
import { getQuestionnaire, QUESTIONNAIRES } from "@/lib/questionnaires/data";

export const Route = createFileRoute("/q/$slug")({
  head: ({ params }) => {
    const q = params ? getQuestionnaire(params.slug) : undefined;
    const title = q ? `${q.title} — Acompanhamento GLP-1` : "Questionário";
    const description = q?.subtitle ?? "Questionário para pacientes em uso de GLP-1.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const q = getQuestionnaire(params.slug);
    if (!q) throw notFound();
    return { slug: q.slug };
  },
  component: QPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Questionário não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          Disponíveis: {QUESTIONNAIRES.map((q) => q.slug).join(", ")}
        </p>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
    </div>
  ),
});

function QPage() {
  const { slug } = Route.useLoaderData();
  const q = getQuestionnaire(slug)!;
  return (
    <main className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <QuestionnaireRunner q={q} />
    </main>
  );
}