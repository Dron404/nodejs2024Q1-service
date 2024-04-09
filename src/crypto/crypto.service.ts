import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  async hashString(str: string): Promise<string> {
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
  }
}
