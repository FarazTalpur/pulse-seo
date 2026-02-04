import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    organizationId: string | null;
    role: string | null;
    organization: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}
