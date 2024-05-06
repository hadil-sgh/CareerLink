import { Role } from "./Role";

export interface AuthenticationResponse {
    accessToken?: string;
    refreshToken?:String;
    userRole?:Role;
    mfaEnabled?: string;
    secretImageUri?: string;
}