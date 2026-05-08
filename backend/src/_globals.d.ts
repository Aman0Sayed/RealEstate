// Minimal global shims for the backend TypeScript server
declare var process: any;
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: any;
  }
}
