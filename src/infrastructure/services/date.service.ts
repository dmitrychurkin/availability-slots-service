import { Injectable } from "@nestjs/common";
import {
    addMinutes,
    compareAsc,
    differenceInMinutes,
    getDay,
    isBefore,
    isSameDay
} from "date-fns";
import type { IDateService } from "../interfaces/date-service.interface";

@Injectable()
export class DateService implements IDateService {
    public isSameDay(dateLeft: Date, dateRight: Date): boolean {
        return isSameDay(dateLeft, dateRight);
    }

    public getDay(date: Date): number {
        return getDay(date);
    }

    public differenceInMinutes(
        dateLeft: Date,
        dateRight: Date,
        options = { roundingMethod: 'ceil' }
    ): number {
        return differenceInMinutes(dateLeft, dateRight, options);
    }

    public addMinutes(date: Date, amount: number): Date {
        return addMinutes(date, amount);
    }

    public isBefore(date: Date, dateToCompare: Date): boolean {
        return isBefore(date, dateToCompare);
    }

    public compareAsc(dateLeft: Date, dateRight: Date): number {
        return compareAsc(dateLeft, dateRight);
    }

    public isInRange(date: Date, range: [any, any]): boolean {
        const [from, to] = range;

        return (from instanceof Date) &&
            (to instanceof Date) &&
            [0, 1].includes(this.compareAsc(date, from)) &&
            [-1].includes(this.compareAsc(date, to));
    }

    public getCurrentIsoDate(): Date {
        return new Date(new Date().toISOString());
    }
}
