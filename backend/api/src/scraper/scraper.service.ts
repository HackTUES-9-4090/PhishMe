import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class ScraperService {
  callScraperService(scrapeUrl: string, attackId: string) {
    execSync(`python3 ../scrape/main.py ${scrapeUrl} ${attackId}`, {
      cwd: '../scrape',
    });
  }
}
