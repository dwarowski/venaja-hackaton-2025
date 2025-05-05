import { TimeRange } from './Datetime_redact';

export interface Event {
    id: number;
    title: string;
    eventDate: TimeRange;
    description: string;
    creationDate: Date;
}
