import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentAvailableSlotsDto } from './dto/appointment-available-slots.dto';
import { IAvailabilityInteractor } from './interfaces/availability-interactor.interface';

@Controller('booking')
export class BookingController {

    public constructor(
        private availabilityService: IAvailabilityInteractor
    ) {}

    @Post()
    async getAvailabilitySlots(@Body() appoitmentAvailableSlotsDto: AppointmentAvailableSlotsDto) {
        return this.availabilityService.getAppointmentAvailableSlots(appoitmentAvailableSlotsDto);
    }
}
