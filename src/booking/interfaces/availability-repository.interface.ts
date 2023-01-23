import type { AvailabilitySlotType, SlotTime } from "../types/availability-slot.type";

export abstract class IAvailabilityRepository {
    public abstract getAvailabilitySlotsOfTheDay<TSlot>(
        date: Date,
        formatSlot?: (slot: SlotTime) => TSlot
    ): Promise<Array<AvailabilitySlotType<SlotTime | TSlot>>>;
}
