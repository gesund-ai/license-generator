import crypto from "crypto";
import fs from "fs";
import { ILicenseOptions } from "interface";
import jwt, { JwtPayload } from "jsonwebtoken";

export class License {

    constructor (public options: ILicenseOptions) {
    }


    encrypt() {
        const { expiresIn, name, privateKey, version, JWT_SECRET } = this.options;

        if (!privateKey) throw new Error("Private key is required");

        const privateKeyData = fs.readFileSync(privateKey, 'utf8');

        const data = jwt.sign({ name, version }, JWT_SECRET, { expiresIn });

        return crypto.privateEncrypt({ key: privateKeyData, }, Buffer.from(data)).toString("base64");
    }


    decrypt() {
        const { publicKey, key, JWT_SECRET } = this.options;

        if (!publicKey) throw new Error("Public key is required");
        if (!key) throw new Error("Key is required");

        const publicKeyData = fs.readFileSync(publicKey, 'utf8');

        const data = crypto.publicDecrypt({ key: publicKeyData, }, Buffer.from(key, "base64"));

        return jwt.verify(data.toString(), JWT_SECRET,) as JwtPayload;

    }
}