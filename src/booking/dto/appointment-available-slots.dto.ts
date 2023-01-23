import { Type, Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class AppointmentAvailableSlotsDto {
    @Type(() => Date)
    @Transform(({ value }) => new Date(value.toISOString()), { toClassOnly: true })
    @IsDate()
    public readonly date: Date;
    public readonly meetingDuration: number;
}
