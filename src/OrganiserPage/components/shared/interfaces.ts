export interface Participant {
    id: number;
    name: string;
    surname: string;
    birthDate: string;
  }
  
  export interface Application {
    id: number;
    name: string;
    surname: string;
    birthDate: string;
    status: 'pending' | 'approved' | 'rejected';
  }
  
  export interface Event {
    id: number;
    time: string;
    description: string;
    participants: Participant[];
    applications: Application[];
    startDate: string;
    endDate: string;
  }
  
  export interface EventRequest {
    id: number;
    eventTime: string;
    description: string;
    status: 'pending' | 'rejected';
    creationDate: string;
  }
  
  export interface Attendance {
    participantId: number;
    isPresent: boolean;
  }
  
  export interface CompletionEvent {
    id: number;
    time: string;
    description: string;
    participants: Participant[];
  }