import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

/** /admin — til prefiksisiz alohida bo'lim, next-intl unga tegmaydi */
export const config = {
  matcher: "/((?!api|admin|_next|_vercel|.*\\..*).*)",
};
