import { Inject, Injectable } from "@nestjs/common";
import { IDateService } from "src/infrastructure/interfaces/date-service.interface";
import type { Edges } from "src/infrastructure/types";
import type { IAppointmentRepository } from "../interfaces/appointment-repository.interface";
import { Appointment } from "../models/appointment.model";
import type { AppointmentType } from "../types/appointment.type";

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
    // 4 September 06:00:00
    private readonly appointments: Array<AppointmentType> = [
        new Appointment(
            new Date(2023, 0, 21, 6, 0),
            new Date(2023, 0, 21, 6, 30)
        ),
        // today - schedule 8:00 - 17:00
        new Appointment(
            new Date(2023, 0, 23, 8, 30),
            new Date(2023, 0, 23, 9, 45)
        ),
        new Appointment(
            new Date(2023, 0, 23, 10, 0),
            new Date(2023, 0, 23, 10, 30)
        ),
        new Appointment(
            new Date(2023, 0, 23, 11, 15),
            new Date(2023, 0, 23, 12, 0)
        ),
        new Appointment(
            new Date(2023, 0, 23, 14, 15),
            new Date(2023, 0, 23, 14, 30)
        ),
        new Appointment(
            new Date(2023, 0, 23, 15, 0),
            new Date(2023, 0, 23, 15, 30)
        )
    ];

    @Inject()
    private dateService: IDateService;

    public async getAppointmentsOfTheDay(date: Date, slot?: Edges) {
        const activeAppointments = await this.getActiveAppointments();

        let appointmentsOfTheDay = activeAppointments.filter(appointment =>
            this.dateService.isSameDay(appointment.startTime, date) &&
            this.dateService.isSameDay(appointment.endTime, date)
        );

        if (slot?.length === 2) {
            appointmentsOfTheDay = this.extractAppointmentsWithinSlot(appointmentsOfTheDay, slot);
        }

        return this.sortAppointmentsAsc(appointmentsOfTheDay);
    }

    public async getActiveAppointments(): Promise<Array<AppointmentType>> {
        return this.appointments.filter(appointment => !appointment.cancelledTime);
    }

    public extractAppointmentsWithinSlot(appointments: Array<AppointmentType>, slot: Edges) {
        return appointments.filter(appointment =>
            this.dateService.isInRange(appointment.startTime, slot)
        );
    }

    public sortAppointmentsAsc(appointments: Array<AppointmentType>): Array<AppointmentType> {
        return appointments.sort((appointmentA, appointmentB) =>
            this.dateService.compareAsc(appointmentA.startTime, appointmentB.startTime)
        );
    }
}
