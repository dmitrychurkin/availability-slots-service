import { AppointmentType } from "../types/appointment.type";

export class Appointment implements AppointmentType {
    public constructor(
        public readonly startTime: Date,
        public readonly endTime: Date,
        public readonly cancelledTime: Date | null = null
    ) {}
}
