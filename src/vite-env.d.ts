/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BIRTHDAY_DATE: string;
  readonly VITE_PERSON_NAME: string;
  readonly VITE_BIRTHDAY_MESSAGE: string;
  readonly VITE_LANGUAGE: string;
  readonly VITE_IMAGE_PROVIDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
