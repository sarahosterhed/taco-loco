/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_RESTAURANT_ID: string;
  VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
