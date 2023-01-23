import { Injectable } from '@nestjs/common';
import { AppointmentAvailableSlotsDto } from 'src/booking/dto/appointment-available-slots.dto';
import { IAppointmentRepository } from 'src/booking/interfaces/appointment-repository.interface';
import { IAvailabilityRepository } from 'src/booking/interfaces/availability-repository.interface';
import type { AppointmentType } from 'src/booking/types/appointment.type';
import { AvailabilitySlotType } from 'src/booking/types/availability-slot.type';
import { IDateService } from 'src/infrastructure/interfaces/date-service.interface';
import { ISlotGenerator } from 'src/infrastructure/interfaces/slot-generator.interface';
import type { Edges } from 'src/infrastructure/types';
import type { IAvailabilityInteractor } from '../interfaces/availability-interactor.interface';

@Injectable()
export class AvailabilityInteractor implements IAvailabilityInteractor {
    constructor(
        private readonly dateService: IDateService,
        private readonly appointmentRepository: IAppointmentRepository,
        private readonly availabilityRepository: IAvailabilityRepository,
        private readonly slotGenerator: ISlotGenerator<Edges>
    ) { }

    public async getAppointmentAvailableSlots({ date, meetingDuration }: AppointmentAvailableSlotsDto) {
        const currentDateIso = this.dateService.getCurrentIsoDate();

        const [availabilitySlots, appointments] = await Promise.all([
            this.retrieveAvailabilitySlots(date),
            this.retrieveAppointments(date)
        ]);

        let possibleSlots: Array<Edges> = [];

        if (availabilitySlots.length <= 0) {
            return possibleSlots;
        }

        if (appointments.length <= 0) {
            for (const { from, to } of availabilitySlots) {
                possibleSlots.push(
                    ...this.slotGenerator.getSlotsForDate({
                        dateIso: date,
                        currentDateIso,
                        edges: [from, to],
                        span: meetingDuration
                    })
                );
            }

            return possibleSlots;
        }

        for (const { from, to } of availabilitySlots) {
            const slotScopedAppointments = this.appointmentRepository.extractAppointmentsWithinSlot(appointments, [from, to]);

            possibleSlots.push(
                ...this.slotGenerator.getSlotsForDate({
                    dateIso: date,
                    currentDateIso,
                    edges: [from, slotScopedAppointments[0].startTime],
                    span: meetingDuration
                })
            );

            for (let i = 0; i < slotScopedAppointments.length; i++) {
                const currentAppointment: AppointmentType = slotScopedAppointments[i];
                const nextAppointment: AppointmentType | undefined = slotScopedAppointments[i + 1];

                const [start, end] = [
                    currentAppointment.endTime,
                    nextAppointment
                        ? nextAppointment.startTime
                        : to
                ];

                possibleSlots.push(
                    ...this.slotGenerator.getSlotsForDate({
                        dateIso: date,
                        currentDateIso,
                        edges: [start, end],
                        span: meetingDuration
                    })
                );
            }
        }

        return possibleSlots;
    }

    private async retrieveAvailabilitySlots(date: Date) {
        return this.availabilityRepository.getAvailabilitySlotsOfTheDay(
            date,
            ([hours, minutes]) => {
                const date = this.dateService.getCurrentIsoDate();

                date.setUTCHours(hours);
                date.setUTCMinutes(minutes);

                return date;
            }
        ) as Promise<Array<AvailabilitySlotType<Date>>>;
    }

    private async retrieveAppointments(date: Date): Promise<Array<AppointmentType>> {
        return this.appointmentRepository.getAppointmentsOfTheDay(date);
    }
}
