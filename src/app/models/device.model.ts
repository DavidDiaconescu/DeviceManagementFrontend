export enum DeviceType {
  Phone = 'Phone',
  Tablet = 'Tablet'
}

export interface Device {
  id: number;
  name: string;
  manufacturer: string;
  type: DeviceType;
  operatingSystem: string;
  osVersion: string;
  processor: string;
  ram: number;
  description: string | null;
  assignedUserId: number | null;
  assignedUserName: string | null;
}

export interface CreateDeviceRequest {
  name: string;
  manufacturer: string;
  type: DeviceType;
  operatingSystem: string;
  osVersion: string;
  processor: string;
  ram: number;
}

export interface UpdateDeviceRequest {
  name: string;
  manufacturer: string;
  type: DeviceType;
  operatingSystem: string;
  osVersion: string;
  processor: string;
  ram: number;
  description: string | null;
}

export interface AssignDeviceRequest {
  userId: number;
}
