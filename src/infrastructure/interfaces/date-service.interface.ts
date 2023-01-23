export abstract class IDateService {
    public abstract isSameDay(dateLeft: Date, dateRight: Date): boolean;

    public abstract getDay(date: Date): number;

    public abstract differenceInMinutes(dateLeft: Date, dateRight: Date): number;

    public abstract addMinutes(date: Date, amount: number): Date;

    public abstract isBefore(date: Date, dateToCompare: Date): boolean;

    public abstract compareAsc(dateLeft: Date, dateRight: Date): number;

    public abstract isInRange(date: Date, range: [any, any]): boolean;

    public abstract getCurrentIsoDate(): Date;
}
