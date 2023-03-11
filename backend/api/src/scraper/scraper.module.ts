import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Module({
  providers: [ScraperService],
  controllers: [],
  exports: [ScraperService],
})
export class ScraperModule {}
