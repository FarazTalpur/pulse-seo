export class AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
  };
  organization: {
    id: string;
    name: string;
    slug: string;
    role: string;
  } | null;
}
