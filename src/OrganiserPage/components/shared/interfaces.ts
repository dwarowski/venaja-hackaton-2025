import { TimeRange } from "../../../global_functions/Datetime_redact";
import { Event } from '../../../global_functions/global_interfaces';

export interface Participant {
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
  }
  
  export interface Application {
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    status: 'pending' | 'approved' | 'rejected';
  }
  
  export interface EventForOrganiser extends Event {
    participants: Participant[];
    applications: Application[];
  }
  
  export interface EventRequest extends Event{
    status: 'pending' | 'rejected';
    creationDate: Date;
  }
  
  export interface Attendance {
    participantId: number;
    isPresent: boolean;
  }
  
  export interface CompletionEvent extends Event {
    participants: Participant[];
  }