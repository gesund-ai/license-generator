import { expect, jest, test } from '@jest/globals';
import LicenseGenerator from "../src/index";

jest.setTimeout(10000);

const testOptions = {
    name: "test",
    version: "1.0.0",
    expiresIn: "3s",
    privateKey: "private.pem",
    publicKey: "public.pem",
    JWT_SECRET: "FALSE_SECRET",
};

let license;

test('Testing License Generator', () => {

    license = LicenseGenerator.generateLicense(testOptions);

    expect(typeof (license) == "string").toBeTruthy();
});

test('Testing License Verifier', () => {

    const data = LicenseGenerator.verifyLicense({ ...testOptions, key: license, });

    expect(data.name).toBe(testOptions.name);
    expect(data.version).toBe(testOptions.version);;
});

test('Testing License Expire Time', async () => {
    try {
        await testExpireTime();
    } catch (error: any) {
        expect(error.message).toBe("jwt expired");
    }
}
);

export function testExpireTime(): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                LicenseGenerator.verifyLicense({ ...testOptions, key: license, });
                resolve();
            } catch (error) {
                reject(error);
            }
        }, 5000);
    });
}