export type AppointmentType = {
    readonly startTime: Date;
    readonly endTime: Date;
    readonly cancelledTime: Date | null;
};
