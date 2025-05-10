import { TimeRange } from "../../../global_functions/Datetime_redact";
import { Event } from '../../../global_functions/global_interfaces';

export interface Participant {
  id: number;
  name: string;
  surname: string;
  birthDate: Date;
}

export interface ComplitionParticipants extends Participant {
  isExisted: boolean;
}
  
export interface Application extends Participant {
  status: 'pending' | 'approved' | 'rejected';
}

export interface EventForOrganiser extends Event {
  participants: Participant[];
  applications: Application[];
}

export interface EventRequest extends Event{
  status: 'pending' | 'rejected';
}

export interface CompletionEvent extends Event {
  participants: ComplitionParticipants[];
}