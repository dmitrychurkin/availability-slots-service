import type { GenerateSlotsForDateDto } from "../dto/generate-slots-for-date.dto";
import type { GenerateSlotsDto } from "../dto/generate-slots.dto";

export abstract class ISlotGenerator<T> {
    public abstract generateSlots(input: GenerateSlotsDto): Array<T>;

    public abstract getSlotsForDate(input: GenerateSlotsForDateDto): Array<T>;
}
