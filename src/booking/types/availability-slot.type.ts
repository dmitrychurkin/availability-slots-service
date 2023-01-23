import type { Hours, Minutes } from "src/infrastructure/types";

export type SlotTime = [Hours, Minutes];

export type AvailabilitySlotType<TSlot = SlotTime> = {
    readonly from: TSlot;
    readonly to: TSlot;
};
