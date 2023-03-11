import { AttackService } from '@/attack/attack.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class StaticfilesMiddleware implements NestMiddleware {
  constructor(private readonly attackService: AttackService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    for (const header of req.rawHeaders) {
      if (header.includes('?targetId')) {
        const queryParam = header.split('?targetId=')[1];
        await this.attackService.updateTarget(queryParam);
      }
    }
    next();
  }
}
