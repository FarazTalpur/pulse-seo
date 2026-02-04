import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard",
    "/audits",
    "/briefs",
    "/reports",
    "/automations",
    "/integrations",
    "/team",
    "/settings",
    "/status",
  ],
};
