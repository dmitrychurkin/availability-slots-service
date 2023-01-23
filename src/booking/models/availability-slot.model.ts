import type { AvailabilitySlotType, SlotTime } from "../types/availability-slot.type";

export class AvailabilitySlot implements AvailabilitySlotType<SlotTime> {
    public constructor(
        public readonly from: SlotTime,
        public readonly to: SlotTime
    ) { }
}
