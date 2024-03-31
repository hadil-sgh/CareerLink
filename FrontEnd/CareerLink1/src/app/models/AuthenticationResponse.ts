import { Role } from "./Role";

export interface AuthenticationResponse {
    accessToken?: string;
    refreshToken?:String;
    userRoles?:Role;
    mfaEnabled?: string;
    secretImageUri?: string;
}