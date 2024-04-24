import { jwtDecode } from "jwt-decode";

export const getClaimsFromToken = (token: any): Record<string, any> | null => {
    try {
        const decodedToken: any = jwtDecode(token);

        if (decodedToken) {

            return decodedToken;
        } else {

            return null;
        }
    } catch (error) {
        console.error('Error decoding token:', error);

        return null;
    }
};