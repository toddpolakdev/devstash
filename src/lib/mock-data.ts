// Placeholder for the signed-in user until auth lands; the sidebar avatar is
// the only consumer. Everything else here is now read from the database.
export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  isPro: boolean;
}

export const currentUser: User = {
  id: "user_1",
  name: "Dana Vega",
  email: "dana@devstash.io",
  initials: "DV",
  isPro: true,
};
