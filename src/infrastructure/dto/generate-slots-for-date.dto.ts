import type { GenerateSlotsDto } from "./generate-slots.dto";

export interface GenerateSlotsForDateDto extends GenerateSlotsDto {
    readonly currentDateIso: Date;
    readonly dateIso: Date;
}
