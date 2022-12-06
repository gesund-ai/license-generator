import { ILicenseOptions } from "interface";
import { License } from "./License";

export default class LicenseGenerator {
    static generateLicense(options: Omit<ILicenseOptions, "publicKey" | "key">, extraOptions?: Record<string, any>) {
        const license = new License(options, extraOptions);

        return license.encrypt();
    }

    static verifyLicense(options: Pick<ILicenseOptions, "publicKey" | "key" | "JWT_SECRET">) {
        const license = new License(options);

        return license.decrypt();
    }
}
