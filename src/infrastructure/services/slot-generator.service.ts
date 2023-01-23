import { Inject, Injectable } from "@nestjs/common";
import type { GenerateSlotsForDateDto } from "../dto/generate-slots-for-date.dto";
import type { GenerateSlotsDto } from "../dto/generate-slots.dto";
import { IDateService } from "../interfaces/date-service.interface";
import type { ISlotGenerator } from "../interfaces/slot-generator.interface";
import type { Edges } from "../types";

@Injectable()
export class SlotGeneratorService implements ISlotGenerator<Edges> {

    @Inject()
    private readonly dateService: IDateService;

    public generateSlots({ edges, span }: GenerateSlotsDto): Array<Edges> {
        const [start, end] = edges;

        const slots: Array<Edges> = [];

        let temp = start;

        while (
            this.dateService.isBefore(temp, end) &&
            (this.dateService.differenceInMinutes(end, temp) >= span)
        ) {
            const slot: Edges = [
                temp,
                this.dateService.addMinutes(temp, span)
            ];

            slots.push(slot);

            temp = this.dateService.addMinutes(temp, span);
        }

        return slots;
    }

    public getSlotsForDate({
        currentDateIso,
        dateIso,
        edges,
        span
    }: GenerateSlotsForDateDto): Array<Edges> {
        const [start, end] = edges;

        const rangeEdges: Edges = [start, end];
        let generateSlotsDto: GenerateSlotsDto = {
            edges: rangeEdges,
            span
        };

        // Today
        if (this.dateService.isSameDay(dateIso, currentDateIso) &&
            this.dateService.isInRange(currentDateIso, rangeEdges)) {
                generateSlotsDto = {
                    ...generateSlotsDto,
                    edges: [currentDateIso, end]
                };
        }

        // Future
        return this.generateSlots(generateSlotsDto);
    }
}