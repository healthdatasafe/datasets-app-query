/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATASETS_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
