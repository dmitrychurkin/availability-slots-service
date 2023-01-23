import type { Edges } from "src/infrastructure/types";
import type { AppointmentAvailableSlotsDto } from "../dto/appointment-available-slots.dto";

export abstract class IAvailabilityInteractor {
    public abstract getAppointmentAvailableSlots(
        appointmentAvailabilitySlotsDto: AppointmentAvailableSlotsDto): Promise<Array<Edges>>;
}
