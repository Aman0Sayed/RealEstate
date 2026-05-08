// Lightweight shims to silence TS server in this workspace until proper @types packages are installed.

declare module 'cors' { const x: any; export default x; }
declare module 'helmet' { const x: any; export default x; }
declare module 'dotenv' { const x: any; export default x; }
declare module 'express-rate-limit' { const x: any; export default x; }
declare module 'bcrypt' { const x: any; export default x; }
declare module 'jsonwebtoken' { const x: any; export default x; }

declare module 'mongoose' { const mongoose: any; export default mongoose; export const Schema: any; export const Types: any; }

// Minimal express declarations so imports of Request/Response don't error.
declare module 'express' {
  export type Request = any;
  export type Response = any;
  export type NextFunction = any;
  export type RequestHandler = any;
  export function Router(): any;
  export function json(): any;
  const exp: any;
  export default exp;
}
