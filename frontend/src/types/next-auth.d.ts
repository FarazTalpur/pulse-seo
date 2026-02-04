import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    organizationId?: string | null;
    organizationName?: string | null;
    organizationSlug?: string | null;
    accessToken?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      organizationId?: string | null;
      organizationName?: string | null;
      organizationSlug?: string | null;
    };
    accessToken?: string;
  }
}
