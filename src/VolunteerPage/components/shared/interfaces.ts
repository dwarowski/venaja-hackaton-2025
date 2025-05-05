import { Event } from "../../../global_functions/global_interfaces";

export interface EventForVolunteer extends Event {
    accepted: Boolean;
}

export interface EventsProps {
    events: EventForVolunteer[];
}
