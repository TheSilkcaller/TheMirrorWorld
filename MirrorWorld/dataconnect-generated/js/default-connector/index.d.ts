import { ConnectorConfig } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AIOutput_Key {
  id: UUIDString;
  __typename?: 'AIOutput_Key';
}

export interface PromptTemplate_Key {
  id: UUIDString;
  __typename?: 'PromptTemplate_Key';
}

export interface Recording_Key {
  id: UUIDString;
  __typename?: 'Recording_Key';
}

export interface Transcription_Key {
  id: UUIDString;
  __typename?: 'Transcription_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

