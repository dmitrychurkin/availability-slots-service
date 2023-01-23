import { Module, Provider } from '@nestjs/common';
import { IDateService } from './interfaces/date-service.interface';
import { ISlotGenerator } from './interfaces/slot-generator.interface';
import { DateService } from './services/date.service';
import { SlotGeneratorService } from './services/slot-generator.service';

const infrastructureProviders: Array<Provider> = [
    {
        provide: IDateService,
        useClass: DateService
    },
    {
        provide: ISlotGenerator,
        useClass: SlotGeneratorService
    }
];

@Module({
  providers: infrastructureProviders,
  exports: infrastructureProviders
})
export class InfrastructureModule {}
