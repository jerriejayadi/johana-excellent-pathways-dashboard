import { EUserStatus } from "@/types";

export interface PayloadPostAdminGoogle {
  token: string;
}

export interface ResponsePostAdminGoogle {
  result: {
    profile: IProfile;
    access_token: string;
  };
}

interface IProfile {
  email: string;
  roles: string;
  id: string;
  name: string;
  status: EUserStatus;
}
