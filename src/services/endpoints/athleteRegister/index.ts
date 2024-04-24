import axios from "axios";

export const checkEmailPaymentStatusQRY = async (email?: string, stateUnit?: string, productInfo?: string, transactionId?: string) => {
    try {
        let apiUrl = `${process.env.REACT_APP_BASE_URL}/api/check-email-payment-status`;

        const queryParams = [];

        if (email) {
            queryParams.push(`email=${email}`);
        }

        if (stateUnit) {
            queryParams.push(`stateunit=${stateUnit}`);
        }

        if (productInfo) {
            queryParams.push(`productInfo=${productInfo}`);
        }

        if (transactionId) {
            queryParams.push(`tnxId=${transactionId}`);
        }

        if (queryParams.length > 0) {
            apiUrl += `?${queryParams.join('&')}`;
        }

        const response = await axios.get(apiUrl);

        return response.data;
    } catch (error) {
        console.error("Error checking email payment status:", error);
        throw error;
    }
};

export const checkRegistrationDetailsQRY = async (email?: any, stateUnit?: string, passportNumber?: any, contactNumber?: any) => {
    try {
        let apiUrl = `${process.env.REACT_APP_BASE_URL}/api/check-registration-status`;

        const queryParams = [];

        if (email) {
            queryParams.push(`email=${email}`);
        }

        if (stateUnit) {
            queryParams.push(`stateunit=${stateUnit}`);
        }

        if (passportNumber) {
            queryParams.push(`passportNumber=${passportNumber}`);
        }

        if (contactNumber) {
            queryParams.push(`contactNumber=${contactNumber}`);
        }

        if (queryParams.length > 0) {
            apiUrl += `?${queryParams.join('&')}`;
        }

        const response = await axios.get(apiUrl);

        return response;
    } catch (error) {
        console.error("Error checking:", error);
        throw error;
    }
};
