import { ILicenseOptions } from "interface";
import { License } from "./License";

export default class LicenseGenerator {
    static generateLicense(options: Omit<ILicenseOptions, "publicKey" | "key">) {
        const license = new License(options);

        return license.encrypt();
    }

    static verifyLicense(options: Pick<ILicenseOptions, "publicKey" | "key" | "JWT_SECRET">) {
        const license = new License(options);

        const data = license.decrypt();

        return {
            name: data.name,
            version: data.version,
        };
    }
}
