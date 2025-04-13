import { TimeRange } from "../../../global_functions/Datetime_redact";

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
  
  export interface Event {
    id: number;
    title: string;
    description: string;
    participants: Participant[];
    applications: Application[];
    eventDate: TimeRange;
  }
  
  export interface EventRequest {
    id: number;
    eventTime: TimeRange;
    description: string;
    status: 'pending' | 'rejected';
    creationDate: Date;
  }
  
  export interface Attendance {
    participantId: number;
    isPresent: boolean;
  }
  
  export interface CompletionEvent {
    id: number;
    eventTime: TimeRange;
    description: string;
    participants: Participant[];
  }