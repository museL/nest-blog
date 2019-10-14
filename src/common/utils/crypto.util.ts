import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { clone } from '@babel/types';

@Injectable()
export class CryptoUtil {

    /**
     * 加密登录密码
     *
     * @param password 登录密码
     */
    encryptPassword(password: string): string {
        console.log("1212"+password)
        return createHash('sha256').update(password).digest('hex');
    }

    /**
     * 检查登录密码是否正确
     *
     * @param password 登录密码
     * @param encryptedPassword 加密后的密码
     */
    checkPassword(password: string, encryptedPassword): boolean {
        console.log(password);
        const currentPass = this.encryptPassword(password);
     
        if (currentPass === encryptedPassword) {
            return true;
        }
        return false;
    }
}