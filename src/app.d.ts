declare global {
  namespace App {
    interface Locals {
      user: {
        id: string;
        name: string;
        given_name?: string;
        family_name?: string;
        email?: string;
        roles: string[];
      } | null;
    }
    interface PageData {
      user: Locals["user"];
      token: string | null;
    }
  }
}

export {};
