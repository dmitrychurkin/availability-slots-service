import { Edges } from "src/infrastructure/types";
import { AppointmentType } from "../types/appointment.type";

export abstract class IAppointmentRepository {
    public abstract getAppointmentsOfTheDay(date: Date, edges?: Edges): Promise<Array<AppointmentType>>;

    public abstract getActiveAppointments(): Promise<Array<AppointmentType>>;

    public abstract extractAppointmentsWithinSlot(appointments: Array<AppointmentType>, slot: Edges): Array<AppointmentType>;

    public abstract sortAppointmentsAsc(appointments: Array<AppointmentType>): Array<AppointmentType>;
}
