export type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  strict: string;
  reactionsEnabled: string;
  emitMetadata: string;
  inputPosition: "top" | "bottom";
  theme: string;
  lang: string;
  loading: "lazy" | "eager";
};

type Env = NodeJS.ProcessEnv;

const INPUT_POSITIONS = new Set(["top", "bottom"] as const);
const LOADING_VALUES = new Set(["lazy", "eager"] as const);

const pickInputPosition = (env: Env): "top" | "bottom" => {
  const value = env.NEXT_PUBLIC_GISCUS_INPUT_POSITION;
  if (value && INPUT_POSITIONS.has(value as "top" | "bottom")) {
    return value as "top" | "bottom";
  }
  return "bottom";
};

const pickLoading = (env: Env): "lazy" | "eager" => {
  const value = env.NEXT_PUBLIC_GISCUS_LOADING;
  if (value && LOADING_VALUES.has(value as "lazy" | "eager")) {
    return value as "lazy" | "eager";
  }
  return "lazy";
};

export function getGiscusConfig(): GiscusConfig | null {
  const env = process.env;
  const repo = env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return {
    repo,
    repoId,
    category,
    categoryId,
    mapping: env.NEXT_PUBLIC_GISCUS_MAPPING ?? "pathname",
    strict: env.NEXT_PUBLIC_GISCUS_STRICT ?? "0",
    reactionsEnabled: env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED ?? "1",
    emitMetadata: env.NEXT_PUBLIC_GISCUS_EMIT_METADATA ?? "0",
    inputPosition: pickInputPosition(env),
    theme: env.NEXT_PUBLIC_GISCUS_THEME ?? "preferred_color_scheme",
    lang: env.NEXT_PUBLIC_GISCUS_LANG ?? "ko",
    loading: pickLoading(env),
  };
}
