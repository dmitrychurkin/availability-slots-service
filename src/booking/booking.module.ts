import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { AvailabilityRepository } from './repository/availability.repository';
import { AppointmentRepository } from './repository/appointment.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { IAvailabilityRepository } from './interfaces/availability-repository.interface';
import { IAppointmentRepository } from './interfaces/appointment-repository.interface';
import { AvailabilityInteractor } from './interactors/availability.interactor';
import { IAvailabilityInteractor } from './interfaces/availability-interactor.interface';

@Module({
  imports: [InfrastructureModule],
  controllers: [BookingController],
  providers: [
    {
      provide: IAvailabilityRepository,
      useClass: AvailabilityRepository
    },
    {
      provide: IAppointmentRepository,
      useClass: AppointmentRepository
    },
    {
      provide: IAvailabilityInteractor,
      useClass: AvailabilityInteractor
    },
  ]
})
export class BookingModule {}
