import {
  Soup, Candy, Wine, Cookie, Milk, Pill, Coffee, GlassWater, UtensilsCrossed,
  CloudDrizzle, Heart, Wind, Scissors, Battery, Droplet,
  Drama, Timer, Handshake, Sparkles, Shield, Weight, RotateCw, Zap,
  Frown, Hourglass, Flame, CircleDot, Droplets, RotateCcw, Ban,
  Sun, Sandwich, Moon,
} from "lucide-react";
import type { Questionnaire } from "./types";
import escalaCafe from "@/assets/escala-cafe.jpg.asset.json";
import escalaAlmoco from "@/assets/escala-almoco.jpg.asset.json";
import escalaLanche from "@/assets/escala-lanche.jpg.asset.json";
import escalaJantar from "@/assets/escala-jantar.jpg.asset.json";

/* ------------------------- 1. Sintomas GLP-1 ------------------------- */
const sintomasColumns = [
  { id: "0", label: "0%", sublabel: "Sem sintoma", tone: "strong-positive" as const, symbol: "0%" },
  { id: "25", label: "25%", sublabel: "Leve", tone: "positive" as const, symbol: "25%" },
  { id: "50", label: "50%", sublabel: "Moderado", tone: "neutral" as const, symbol: "50%" },
  { id: "75", label: "75%", sublabel: "Importante", tone: "warning" as const, symbol: "75%" },
  { id: "100", label: "100%", sublabel: "Severo", tone: "negative" as const, symbol: "100%" },
];

const sintomasDescriptions: Record<string, string[]> = {
  gases: [
    "Sem gases. Intestino tranquilo.",
    "Gases ocasionais, sem desconforto importante.",
    "Gases frequentes, com estufamento leve.",
    "Gases frequentes, com desconforto abdominal.",
    "Gases constantes, dor e estufamento intensos.",
  ],
  cabelo: [
    "Sem queda. Cabelo normal.",
    "Queda leve, percebe fios no banho ou pente.",
    "Queda moderada, mais fios que o habitual.",
    "Queda evidente, áreas mais ralas começando a aparecer.",
    "Queda intensa, clareiras visíveis.",
  ],
  letargia: [
    "Disposição normal, energia boa.",
    "Cansaço leve, mas realiza as atividades.",
    "Cansaço moderado, precisa de mais descanso.",
    "Muito cansado(a), dificuldade para manter rotina.",
    "Exaustão constante, dificuldade para atividades básicas.",
  ],
  boca: [
    "Sem boca seca. Hidratação normal.",
    "Boca um pouco seca em alguns momentos.",
    "Boca seca com frequência, precisa beber água.",
    "Boca muito seca, desconforto ao falar ou engolir.",
    "Boca extremamente seca, difícil falar/engolir. Desconforto intenso.",
  ],
  bemestar: [
    "Sinto-me bem e equilibrado(a).",
    "Leve sensação de bem estar.",
    "Sensação neutra, nem bem, nem mal.",
    "Pouca sensação de bem estar.",
    "Não me sinto bem geralmente.",
  ],
  humor: [
    "Humor estável e positivo.",
    "Leve oscilação de humor.",
    "Oscilações de humor frequentes.",
    "Irritabilidade, tristeza ou ansiedade frequentes.",
    "Humor muito alterado, tristeza/ansiedade intensa.",
  ],
};

const buildSintomaCells = (key: keyof typeof sintomasDescriptions) => ({
  "0": { label: sintomasDescriptions[key][0] },
  "25": { label: sintomasDescriptions[key][1] },
  "50": { label: sintomasDescriptions[key][2] },
  "75": { label: sintomasDescriptions[key][3] },
  "100": { label: sintomasDescriptions[key][4] },
});

const sintomas: Questionnaire = {
  slug: "sintomas",
  title: "Escala visual de sintomas — GLP-1.2",
  subtitle: "Marque o nível que melhor representa como você se sentiu nos últimos 7 dias.",
  category: "Sintomas",
  page: "Página 2 de 2",
  importantNote:
    "Se algum sintoma estiver em nível 75% ou 100% com frequência, informe seu profissional de saúde.",
  whyTrack:
    "Monitorar seus sintomas ajuda a ajustar o tratamento, melhorar sua alimentação e aumentar sua qualidade de vida com segurança.",
  alertRule: "75",
  howTo: [
    "Avalie como você se sentiu nos últimos 7 dias.",
    "Marque APENAS 1 nível por sintoma.",
    "Leve esta avaliação para sua consulta.",
  ],
  columns: sintomasColumns,
  rows: [
    { id: "gases", label: "Gases / Flatulência", icon: Wind, cells: buildSintomaCells("gases") },
    { id: "cabelo", label: "Queda de cabelo", icon: Scissors, cells: buildSintomaCells("cabelo") },
    { id: "letargia", label: "Letargia / Desânimo", icon: Battery, cells: buildSintomaCells("letargia") },
    { id: "boca", label: "Boca seca", icon: Droplet, cells: buildSintomaCells("boca") },
    { id: "bemestar", label: "Sensação de bem estar geral", icon: Heart, cells: buildSintomaCells("bemestar") },
    { id: "humor", label: "Humor", icon: Drama, cells: buildSintomaCells("humor") },
  ],
};

/* ------------------------- 2. Antes x Agora (alimentação) ------------------------- */
const antesXAgoraCols = [
  { id: "same", label: "Sem alteração", sublabel: "Como antes", symbol: "=", tone: "neutral" as const },
  { id: "down1", label: "Redução leve", sublabel: "Diminuiu um pouco", symbol: "↓", tone: "positive" as const },
  { id: "down2", label: "Redução importante", sublabel: "Diminuiu muito", symbol: "↓↓", tone: "strong-positive" as const },
  { id: "zero", label: "Vontade Zero", sublabel: "Desapareceu", symbol: "0", tone: "strong-positive" as const },
  { id: "up1", label: "Aumento leve", sublabel: "Aumentou um pouco", symbol: "↑", tone: "warning" as const },
  { id: "up2", label: "Aumento importante", sublabel: "Aumentou muito", symbol: "↑↑", tone: "negative" as const },
];

const antesXAgora: Questionnaire = {
  slug: "antes-x-agora",
  title: "Comparação subjetiva — Antes x Agora",
  subtitle: "Como você avalia sua alimentação e hábitos hoje em comparação com ANTES de usar GLP-1?",
  helper: "Marque a opção que melhor representa a sua experiência atual.",
  category: "Alimentação",
  importantNote:
    "Essa comparação é subjetiva e ajuda a entender como seu corpo e seus hábitos estão respondendo ao tratamento. Compartilhe suas respostas com seu profissional de saúde.",
  whyTrack:
    "Monitorar seus sintomas ajuda a ajustar o tratamento, melhorar sua alimentação e aumentar sua qualidade de vida com segurança.",
  columns: antesXAgoraCols,
  rows: [
    { id: "qtd", number: 1, label: "Quantidade de alimentos", icon: Soup, cells: { zero: { empty: true } } },
    { id: "doce", number: 2, label: "Vontade por doce", icon: Candy },
    { id: "alcool", number: 3, label: "Ingestão de álcool", icon: Wine },
    { id: "beliscar", number: 4, label: "Beliscar durante o dia", icon: Cookie },
    {
      id: "whey",
      number: 5,
      label: "Aceitação do whey",
      icon: Milk,
      cells: {
        down1: { label: "Aceitação piorou" },
        down2: { label: "Não estou conseguindo tomar" },
        up1: { label: "Aceitando bem" },
        up2: { empty: true },
        zero: { empty: true },
      },
    },
    {
      id: "pilhas",
      number: 6,
      label: "Aceitação da suplementação em cápsulas",
      icon: Pill,
      cells: {
        down1: { label: "Aceitação piorou" },
        down2: { label: "Não estou conseguindo tomar" },
        up1: { label: "Aceitando bem" },
        up2: { empty: true },
        zero: { empty: true },
      },
    },
    {
      id: "creatina",
      number: 7,
      label: "Aceitação da creatina",
      icon: Coffee,
      cells: {
        down1: { label: "Aceitação piorou" },
        down2: { label: "Não estou conseguindo tomar" },
        up1: { label: "Aceitando bem" },
        up2: { empty: true },
        zero: { empty: true },
      },
    },
    { id: "agua", number: 8, label: "Ingestão de água", icon: GlassWater, cells: { zero: { empty: true } } },
    { id: "solidas", number: 9, label: "Aceitação de refeições sólidas", icon: UtensilsCrossed, cells: { zero: { empty: true } } },
    { id: "desejos", number: 10, label: "Desejos em relação a comidas", icon: CloudDrizzle, cells: { zero: { empty: true } } },
    { id: "prazer", number: 11, label: "Prazer gerado pela alimentação", icon: Heart, cells: { zero: { empty: true } } },
  ],
};

/* ------------------------- 3. Treino ------------------------- */
const treinoCols = [
  { id: "down2", label: "Diminuiu muito", sublabel: "Muito pior", symbol: "↓↓", tone: "negative" as const },
  { id: "down1", label: "Diminuiu pouco", sublabel: "Um pouco pior", symbol: "↓", tone: "warning" as const },
  { id: "same", label: "Manteve (igual)", sublabel: "Igual", symbol: "=", tone: "neutral" as const },
  { id: "up1", label: "Aumentou pouco", sublabel: "Um pouco melhor", symbol: "↑", tone: "positive" as const },
  { id: "up2", label: "Aumentou muito", sublabel: "Muito melhor", symbol: "↑↑", tone: "strong-positive" as const },
];

const treino: Questionnaire = {
  slug: "treino",
  title: "Comparação subjetiva — Treino",
  subtitle: "Como você avalia seu treino atualmente em comparação com ANTES de usar GLP-1?",
  helper: "Marque a opção que melhor representa a sua experiência atual.",
  category: "Treino",
  page: "Página 1 de 1",
  importantNote:
    "Essa comparação é subjetiva e ajuda a entender como seu corpo e seu desempenho estão respondendo ao tratamento. Compartilhe suas respostas com seu profissional de saúde.",
  whyTrack:
    "Monitorar seu treino ajuda a ajustar o tratamento, preservar massa muscular e manter sua performance e qualidade de vida.",
  alertRule: "down2",
  columns: treinoCols,
  rows: [
    { id: "carga", number: 1, label: "Carga", sublabel: "peso utilizado", icon: Weight },
    { id: "reps", number: 2, label: "Repetições", sublabel: "quantidade", icon: RotateCw },
    {
      id: "fimtreino",
      number: 3,
      label: "Ao fim do treino",
      sublabel: "força e energia",
      icon: Zap,
      cells: {
        down2: { label: "Cansando \u201CNormal\u201D", face: "great" },
        down1: { label: "Igual antes", face: "ok" },
        same: { label: "Mais cansada", face: "meh" },
        up1: { label: "Força faltando", face: "bad" },
        up2: { label: "Muito cansada", face: "worst" },
      },
    },
    {
      id: "chega",
      number: 4,
      label: "Chega no treino",
      sublabel: "disposição",
      icon: Battery,
      cells: {
        down2: { label: "Com energia", battery: 100 },
        down1: { label: "Igual antes", battery: 75 },
        same: { label: "Um pouco menos de energia", battery: 50 },
        up1: { label: "Pouca energia e cansaço muscular", battery: 25 },
        up2: { empty: true },
      },
    },
    {
      id: "cardio",
      number: 5,
      label: "Cardio",
      sublabel: "atual",
      icon: Heart,
      cells: {
        down2: { label: "Fazendo normalmente", runner: "ok" },
        down1: { label: "Fazendo, mas diminuiu pouco", runner: "slow" },
        same: { label: "Diminuiu muito", runner: "walk" },
        up1: { label: "Faço, mas canso demais", runner: "tired" },
        up2: { label: "Não estou fazendo", runner: "stop" },
      },
    },
    {
      id: "aquec", number: 6, label: "Cansa no aquecimento", sublabel: "Como se sente desde o início", icon: Timer,
      cells: {
        down2: { label: "Já canso no aquecimento", face: "worst" },
        same: { label: "Igual antes", face: "ok" },
      },
    },
    {
      id: "pegada", number: 7, label: "Pegada de mão (força)", sublabel: "Força de pegada e controle", icon: Handshake,
      cells: {
        down2: { label: "Pegada com menos força", face: "bad" },
        same: { label: "Pegada igual", face: "ok" },
      },
    },
    {
      id: "explosao", number: 8, label: "Explosão", sublabel: "Potência, velocidade e explosividade", icon: Sparkles,
      cells: {
        down2: { label: "Menos explosão", face: "bad" },
        same: { label: "Explosão igual", face: "ok" },
        up1: { label: "Mais explosão", face: "great" },
      },
    },
    {
      id: "resist", number: 9, label: "Resistência", sublabel: "Capacidade de manter ritmo e intensidade", icon: Shield,
      cells: {
        down2: { label: "Menos resistência", face: "bad" },
        same: { label: "Resistência igual", face: "ok" },
        up1: { label: "Mais resistência", face: "great" },
      },
    },
  ],
};

/* ------------------------- 4. Escala visual de sintomas digestivos ------------------------- */
const digestColumns = [
  { id: "0", label: "0%", sublabel: "Sem sintoma", tone: "strong-positive" as const, symbol: "0%" },
  { id: "25", label: "25%", sublabel: "Leve", tone: "positive" as const, symbol: "25%" },
  { id: "50", label: "50%", sublabel: "Moderado", tone: "neutral" as const, symbol: "50%" },
  { id: "75", label: "75%", sublabel: "Importante", tone: "warning" as const, symbol: "75%" },
  { id: "100", label: "100%", sublabel: "Severo", tone: "negative" as const, symbol: "100%" },
];

const digestDescriptions: Record<string, string[]> = {
  nausea: [
    "Sem náusea. Come normalmente.",
    "Leve enjoo após refeições maiores. Melhora rápido.",
    "Precisa reduzir o volume das refeições. Algumas comidas \u201Cpesam\u201D.",
    "Dificuldade frequente para completar refeições. Prefere líquidos.",
    "Náusea constante. Alimentação e hidratação muito prejudicadas.",
  ],
  constipacao: [
    "Intestino funciona normalmente.",
    "Intestino mais lento que o normal.",
    "Dificuldade para evacuar. Fezes ressecadas.",
    "Vários dias sem ir ao banheiro. Desconforto abdominal.",
    "Constipação intensa. Muito desconforto e inchaço.",
  ],
  refluxo: [
    "Sem azia ou queimação.",
    "Azia leve esporádica.",
    "Azia após algumas refeições. Arrotos ou queimação.",
    "Azia frequente. Desconforto que atrapalha atividades.",
    "Azia constante. Interfere no sono e na rotina.",
  ],
  empachamento: [
    "Come bem, sem sensação de empachamento.",
    "Sensação de estômago cheio após refeições maiores.",
    "Saciedade acontece muito rápido. Come menos.",
    "Dificuldade para completar refeições. Desconforto abdominal.",
    "Não consegue se alimentar. Muito desconforto.",
  ],
  distensao: [
    "Sem inchaço.",
    "Inchaço leve no final do dia.",
    "Inchaço visível após refeições.",
    "Inchaço frequente e desconfortável.",
    "Inchaço intenso. Roupas apertam.",
  ],
  diarreia: [
    "Intestino normal, fezes formadas.",
    "Fezes mais moles, 1x ao dia.",
    "Fezes moles frequentes (2-3x/dia).",
    "Diarreia que atrapalha atividades.",
    "Diarreia intensa. Risco de desidratação.",
  ],
  inapetencia: [
    "Apetite normal.",
    "Vontade de comer reduzida.",
    "Precisa se esforçar para comer.",
    "Pouca vontade de comer.",
    "Sem vontade de comer nada.",
  ],
  fadiga: [
    "Energia normal.",
    "Cansaço leve.",
    "Cansaço moderado.",
    "Cansaço frequente.",
    "Fadiga intensa. Dificulta rotina.",
  ],
  tontura: [
    "Sem tontura.",
    "Tontura leve ocasional.",
    "Tontura em alguns momentos do dia.",
    "Tontura frequente. Precisa de atenção.",
    "Tontura intensa. Restrição de atividades.",
  ],
  aversao: [
    "Sem aversão a alimentos.",
    "Leve aversão a alguns alimentos específicos.",
    "Vários alimentos passaram a incomodar.",
    "Muitos alimentos provocam aversão. Cardápio reduzido.",
    "Aversão intensa. Quase nada é tolerado.",
  ],
};

const buildDigestCells = (key: keyof typeof digestDescriptions) => ({
  "0": { label: digestDescriptions[key][0] },
  "25": { label: digestDescriptions[key][1] },
  "50": { label: digestDescriptions[key][2] },
  "75": { label: digestDescriptions[key][3] },
  "100": { label: digestDescriptions[key][4] },
});

const sintomasDigestivos: Questionnaire = {
  slug: "sintomas-digestivos",
  title: "Escala visual de sintomas — GLP-1.1",
  subtitle: "Marque o nível que melhor representa como você se sentiu nos últimos 7 dias.",
  category: "Digestivo",
  page: "Página 1 de 2",
  importantNote:
    "Se algum sintoma estiver em nível 75% ou 100% com frequência, informe seu profissional de saúde.",
  whyTrack:
    "Monitorar seus sintomas ajuda a ajustar o tratamento, melhorar sua alimentação e aumentar sua qualidade de vida com segurança.",
  alertRule: "75",
  howTo: [
    "Avalie como você se sentiu nos últimos 7 dias.",
    "Marque APENAS 1 nível por sintoma.",
    "Leve esta avaliação para sua consulta.",
  ],
  columns: digestColumns,
  rows: [
    { id: "nausea", label: "Náusea", icon: Frown, cells: buildDigestCells("nausea") },
    { id: "constipacao", label: "Constipação", icon: Hourglass, cells: buildDigestCells("constipacao") },
    { id: "refluxo", label: "Refluxo / Azia", icon: Flame, cells: buildDigestCells("refluxo") },
    { id: "empachamento", label: "Empachamento / Saciedade excessiva", icon: Soup, cells: buildDigestCells("empachamento") },
    { id: "distensao", label: "Distensão / Inchaço abdominal", icon: CircleDot, cells: buildDigestCells("distensao") },
    { id: "diarreia", label: "Diarreia", icon: Droplets, cells: buildDigestCells("diarreia") },
    { id: "inapetencia", label: "Apetite", icon: UtensilsCrossed, cells: buildDigestCells("inapetencia") },
    { id: "fadiga", label: "Fadiga / Cansaço", icon: Battery, cells: buildDigestCells("fadiga") },
    { id: "tontura", label: "Tontura / Sensação de fraqueza", icon: RotateCcw, cells: buildDigestCells("tontura") },
    { id: "aversao", label: "Aversão ou intolerância a alimentos", icon: Ban, cells: buildDigestCells("aversao") },
  ],
};

/* ------------------------- 5. Quanto você está conseguindo comer ------------------------- */
const comerCols = [
  { id: "25", label: "25%", sublabel: "Muito abaixo do ideal", tone: "negative" as const, symbol: "25%" },
  { id: "50", label: "50%", sublabel: "Metade do caminho", tone: "warning" as const, symbol: "50%" },
  { id: "75", label: "75%", sublabel: "Quase lá!", tone: "neutral" as const, symbol: "75%" },
  { id: "100", label: "100%", sublabel: "Perfeito!", tone: "strong-positive" as const, symbol: "100%" },
  { id: "nao-fazendo", label: "Não estou fazendo", sublabel: "essa refeição", tone: "neutral" as const, symbol: "⊘" },
  { id: "sem-plano", label: "Meu plano não tem", sublabel: "essa refeição", tone: "neutral" as const, symbol: "—" },
];

const comer: Questionnaire = {
  slug: "quanto-comendo",
  title: "Quanto você está conseguindo comer",
  subtitle: "Para cada refeição, marque a opção que mais se assemelha a como você está comendo atualmente.",
  helper: "Marque apenas 1 opção por refeição.",
  category: "Alimentação",
  importantNote:
    "Esse acompanhamento ajuda a entender sua adesão às refeições do plano alimentar. Compartilhe com seu profissional de saúde.",
  whyTrack:
    "Monitorar o quanto você está conseguindo comer em cada refeição ajuda a ajustar o plano alimentar e garantir energia, saciedade e resultados.",
  alertRule: "25",
  howTo: [
    "Pense em como você tem feito cada refeição nos últimos dias.",
    "Marque APENAS 1 opção por refeição.",
    "Use \u201CNão estou fazendo\u201D ou \u201CMeu plano não tem\u201D quando aplicável.",
  ],
  layout: "image-cards",
  columns: comerCols,
  rows: [
    { id: "cafe", label: "Café da manhã", icon: Sun, scaleImage: escalaCafe.url },
    { id: "almoco", label: "Almoço", icon: UtensilsCrossed, scaleImage: escalaAlmoco.url },
    { id: "lanche", label: "Lanche", icon: Sandwich, scaleImage: escalaLanche.url },
    { id: "jantar", label: "Jantar", icon: Moon, scaleImage: escalaJantar.url },
  ],
};

export const QUESTIONNAIRES: Questionnaire[] = [sintomasDigestivos, sintomas, antesXAgora, treino, comer];

export const getQuestionnaire = (slug: string) =>
  QUESTIONNAIRES.find((q) => q.slug === slug);