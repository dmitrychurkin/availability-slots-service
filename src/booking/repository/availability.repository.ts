import { Inject, Injectable } from "@nestjs/common";
import { IDateService } from "src/infrastructure/interfaces/date-service.interface";
import type { IAvailabilityRepository } from "../interfaces/availability-repository.interface";
import { AvailabilitySlot } from "../models/availability-slot.model";
import type { AvailabilitySlotType, SlotTime } from "../types/availability-slot.type";

type WeekDay =
    | 'MON'
    | 'TUE'
    | 'WED'
    | 'THU'
    | 'FRI'
    | 'SAT'
    | 'SUN';

@Injectable()
export class AvailabilityRepository implements IAvailabilityRepository {
    private readonly availabilityMap: Map<
        WeekDay,
        Array<AvailabilitySlotType<SlotTime>>
    > = new Map()
        .set('MON', [
            new AvailabilitySlot(
                [8, 0],
                [13, 0]
            ),
            new AvailabilitySlot(
                [14, 0],
                [17, 0]
            )
        ])
        .set('TUE', [
            new AvailabilitySlot(
                [8, 0],
                [13, 0]
            ),
            new AvailabilitySlot(
                [14, 0],
                [17, 0]
            )
        ])
        .set('WED', [
            new AvailabilitySlot(
                [8, 0],
                [13, 0]
            ),
            new AvailabilitySlot(
                [14, 0],
                [17, 0]
            )
        ])
        .set('THU', [
            new AvailabilitySlot(
                [8, 0],
                [13, 0]
            ),
            new AvailabilitySlot(
                [14, 0],
                [17, 0]
            )
        ])
        .set('FRI', [
            new AvailabilitySlot(
                [8, 0],
                [13, 0]
            ),
            new AvailabilitySlot(
                [14, 0],
                [17, 0]
            )
        ])
        .set('SUN', [
            new AvailabilitySlot(
                [8, 0],
                [13, 0]
            ),
            new AvailabilitySlot(
                [14, 0],
                [23, 0]
            )
        ]);

    @Inject()
    private dateService: IDateService;

    public async getAvailabilitySlotsOfTheDay<TSlot>(
        date: Date,
        formatSlot?: (slot: SlotTime) => TSlot
    ) {
        const dayOfWeek = this.dateService.getDay(date);

        const availabilitySlots = this.availabilityMap.get(
            this.getWeekDayToken(dayOfWeek)
        ) ?? [];

        if (typeof formatSlot === 'function') {
            return availabilitySlots.map(({ from, to }) => ({
                from: formatSlot(from),
                to: formatSlot(to)
            }) as AvailabilitySlotType<TSlot>);
        }

        return availabilitySlots;
    }

    private getWeekDayToken(numberOfDayInWeek: number): WeekDay {
        return ([
            'SUN',
            'MON',
            'TUE',
            'WED',
            'THU',
            'FRI',
            'SAT'
        ] as const)[numberOfDayInWeek];
    }
}
