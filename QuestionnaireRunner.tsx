import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, ClipboardCheck, HeartPulse, Info, RotateCcw, AlertTriangle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Column, Questionnaire } from "@/lib/questionnaires/types";
import { CellIndicator } from "./CellIndicator";

type Answers = Record<string, string>;

const toneClasses: Record<string, { text: string; bg: string; border: string }> = {
  "strong-positive": { text: "text-tone-strong-positive", bg: "bg-tone-strong-positive/10", border: "border-tone-strong-positive/30" },
  positive: { text: "text-tone-positive", bg: "bg-tone-positive/10", border: "border-tone-positive/30" },
  neutral: { text: "text-tone-neutral", bg: "bg-tone-neutral/10", border: "border-tone-neutral/30" },
  warning: { text: "text-tone-warning", bg: "bg-tone-warning/10", border: "border-tone-warning/30" },
  negative: { text: "text-tone-negative", bg: "bg-tone-negative/10", border: "border-tone-negative/30" },
};
const toneOf = (c: Column) => toneClasses[c.tone ?? "neutral"];

export function QuestionnaireRunner({ q }: { q: Questionnaire }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [submitted, setSubmitted] = useState(false);

  const select = (rowId: string, colId: string) =>
    setAnswers((p) => ({ ...p, [rowId]: colId }));

  const completed = Object.keys(answers).length;
  const total = q.rows.length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  const alerts = useMemo(() => {
    if (!q.alertRule) return [] as string[];
    return q.rows.filter((r) => answers[r.id] === q.alertRule).map((r) => r.label);
  }, [answers, q]);

  if (submitted) {
    return (
      <ResultView
        q={q}
        answers={answers}
        notes={notes}
        date={date}
        alerts={alerts}
        onEdit={() => setSubmitted(false)}
        onReset={() => {
          setAnswers({});
          setNotes("");
          setSubmitted(false);
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Todos os questionários
      </Link>

      {/* Header */}
      <div className="mb-6 rounded-3xl border border-border bg-card p-6 sm:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
              {q.category}
            </span>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl lg:text-4xl">
              {q.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-foreground/80 sm:text-base">
              {q.subtitle}
            </p>
            {q.helper && (
              <p className="mt-1 max-w-3xl text-sm font-medium text-brand-teal sm:text-base">
                {q.helper}
              </p>
            )}
          </div>
          {q.page && (
            <span className="hidden whitespace-nowrap rounded-2xl border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground sm:block">
              {q.page}
            </span>
          )}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>{completed} de {total} respondidas</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "var(--gradient-accent)" }}
            />
          </div>
        </div>
      </div>

      {/* Desktop: table grid */}
      <div
        className={cn(
          "hidden overflow-hidden rounded-3xl border border-border bg-card lg:block",
          q.layout === "image-cards" && "lg:hidden"
        )}
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-[22%] bg-brand-navy p-5 text-left align-middle text-base font-bold uppercase tracking-wider text-primary-foreground">
                Item
              </th>
              {q.columns.map((col) => {
                const t = toneOf(col);
                return (
                  <th key={col.id} className={cn("border-l border-border p-3 align-top text-center", t.bg)}>
                    <div className={cn("text-xs font-bold uppercase tracking-wider", t.text)}>
                      {col.label}
                    </div>
                    {col.symbol && (
                      <div className={cn("mt-1 text-xl font-bold", t.text)}>{col.symbol}</div>
                    )}
                    {col.sublabel && (
                      <div className="mt-1 text-[11px] font-normal leading-tight text-muted-foreground">
                        {col.sublabel}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {q.rows.map((row, idx) => {
              const Icon = row.icon;
              return (
                <tr key={row.id} className={cn("border-t border-border", idx % 2 === 1 && "bg-secondary/30")}>
                  <td className="p-4 align-middle">
                    <div className="flex items-start gap-3">
                      {Icon && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-brand-navy">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-brand-navy">
                          {row.number ? `${row.number}. ` : ""}{row.label}
                        </p>
                        {row.sublabel && (
                          <p className="text-xs text-muted-foreground">{row.sublabel}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  {q.columns.map((col) => {
                    const cell = row.cells?.[col.id];
                    const selected = answers[row.id] === col.id;
                    const isEmpty = cell?.empty;
                    return (
                      <td key={col.id} className="border-l border-border p-3 text-center align-middle">
                        <button
                          type="button"
                          disabled={isEmpty}
                          onClick={() => !isEmpty && select(row.id, col.id)}
                          className={cn(
                            "group flex w-full flex-col items-center justify-center gap-2 rounded-xl p-2 transition-all",
                            !isEmpty && "cursor-pointer hover:bg-secondary",
                            isEmpty && "cursor-default opacity-40"
                          )}
                        >
                          <CellIndicator cell={cell} />
                          {!isEmpty && (
                            <span
                              className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                                selected
                                  ? "border-brand-navy bg-brand-navy text-primary-foreground"
                                  : "border-border bg-background text-transparent group-hover:border-brand-teal"
                              )}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className={cn("space-y-4", q.layout === "image-cards" ? "block" : "lg:hidden")}>
        {q.rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.id} className="rounded-2xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="mb-4 flex items-start gap-3">
                {Icon && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand-navy">
                    <Icon className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-navy">
                    {row.number ? `${row.number}. ` : ""}{row.label}
                  </p>
                  {row.sublabel && (
                    <p className="text-xs text-muted-foreground">{row.sublabel}</p>
                  )}
                </div>
              </div>
              {row.scaleImage && (
                <div className="relative mb-4 overflow-hidden rounded-xl border border-border bg-background">
                  <img
                    src={row.scaleImage}
                    alt={`Escala visual — ${row.label}`}
                    className="block h-auto w-full object-contain"
                    loading="lazy"
                  />
                  {/* 4 overlay click zones aligned with the 25/50/75/100 columns */}
                  <div className="absolute inset-0 grid grid-cols-4">
                    {q.columns
                      .filter((c) => /^\d+$/.test(c.id))
                      .map((col) => {
                        const selected = answers[row.id] === col.id;
                        return (
                          <button
                            key={col.id}
                            type="button"
                            onClick={() => select(row.id, col.id)}
                            aria-label={`Selecionar ${col.label} para ${row.label}`}
                            className={cn(
                              "group relative flex items-end justify-end p-2 transition-all",
                              selected
                                ? "bg-brand-navy/10 ring-4 ring-inset ring-brand-navy"
                                : "hover:bg-brand-navy/5 hover:ring-2 hover:ring-inset hover:ring-brand-teal/60"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-md transition-all",
                                selected
                                  ? "border-brand-navy bg-brand-navy text-primary-foreground"
                                  : "border-border bg-background text-transparent group-hover:border-brand-teal"
                              )}
                            >
                              <Check className="h-4 w-4" />
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                {q.columns.map((col) => {
                  const cell = row.cells?.[col.id];
                  if (cell?.empty) return null;
                  // When the row uses a scale image, the 25/50/75/100 selections happen on the image itself.
                  if (row.scaleImage && /^\d+$/.test(col.id)) return null;
                  const selected = answers[row.id] === col.id;
                  const t = toneOf(col);
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => select(row.id, col.id)}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                        selected
                          ? "border-brand-navy bg-brand-navy/5"
                          : "border-border bg-background hover:border-brand-teal/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-bold", t.bg, t.text)}>
                          {col.symbol ?? "•"}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {cell?.label ?? col.label}
                          </p>
                          {col.sublabel && (
                            <p className="text-xs text-muted-foreground">{col.sublabel}</p>
                          )}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                          selected
                            ? "border-brand-navy bg-brand-navy text-primary-foreground"
                            : "border-border text-transparent"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info box */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary/60 p-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-teal text-primary-foreground">
          <Info className="h-5 w-5" />
        </div>
        <p className="text-sm text-foreground/80">
          <strong className="font-bold text-brand-navy">IMPORTANTE: </strong>
          {q.importantNote}
        </p>
      </div>

      {/* Footer grid */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-navy">
            {q.howTo ? "Observações" : "Anotações"}{" "}
            <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={1000}
            rows={4}
            className="mt-2 resize-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:ring-0"
            placeholder="Escreva aqui..."
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                Por que acompanhar?
              </p>
              <p className="mt-1 text-sm text-foreground/80">{q.whyTrack}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy">
            <CalendarDays className="h-4 w-4" />
            Data
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {completed === total
            ? "Tudo preenchido! Veja o resumo."
            : `Faltam ${total - completed} ${total - completed === 1 ? "item" : "itens"}.`}
        </p>
        <Button
          size="lg"
          onClick={() => setSubmitted(true)}
          disabled={completed === 0}
          className="gap-2 rounded-full px-7"
          style={{ background: "var(--gradient-accent)", boxShadow: "var(--shadow-soft)" }}
        >
          <ClipboardCheck className="h-4 w-4" />
          Ver resumo
        </Button>
      </div>
    </div>
  );
}

function ResultView({
  q, answers, notes, date, alerts, onEdit, onReset,
}: {
  q: Questionnaire; answers: Answers; notes: string; date: string; alerts: string[];
  onEdit: () => void; onReset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onEdit} className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Voltar ao questionário
      </button>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10" style={{ boxShadow: "var(--shadow-card)" }}>
        <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
          Resumo de respostas
        </span>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
          {q.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Data: {new Date(date + "T00:00").toLocaleDateString("pt-BR")}
        </p>

        {alerts.length > 0 && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-tone-negative/30 bg-tone-negative/5 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-tone-negative" />
            <div>
              <p className="text-sm font-bold text-tone-negative">Atenção</p>
              <p className="mt-1 text-sm text-foreground/80">
                {alerts.length} {alerts.length === 1 ? "item está" : "itens estão"} em nível que requer informar seu profissional de saúde: {alerts.join(", ")}.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 divide-y divide-border">
          {q.rows.map((row) => {
            const colId = answers[row.id];
            const col = q.columns.find((c) => c.id === colId);
            const cell = colId ? row.cells?.[colId] : undefined;
            const t = col ? toneOf(col) : null;
            return (
              <div key={row.id} className="flex items-start justify-between gap-4 py-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-brand-navy">
                    {row.number ? `${row.number}. ` : ""}{row.label}
                  </p>
                  {row.sublabel && <p className="text-xs text-muted-foreground">{row.sublabel}</p>}
                </div>
                {col ? (
                  <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", t!.bg, t!.text)}>
                    {col.symbol ? `${col.symbol} ` : ""}{cell?.label ?? col.label}
                  </span>
                ) : (
                  <span className="text-xs italic text-muted-foreground">— não respondido</span>
                )}
              </div>
            );
          })}
        </div>

        {notes && (
          <div className="mt-8 rounded-2xl bg-secondary/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-navy">Anotações</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/80">{notes}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => window.print()} className="gap-2 rounded-full">
          <Printer className="h-4 w-4" />
          Imprimir / salvar PDF
        </Button>
        <Button variant="ghost" onClick={onReset} className="gap-2 rounded-full">
          <RotateCcw className="h-4 w-4" />
          Refazer
        </Button>
      </div>
    </div>
  );
}