import { IEventuality } from "../interfaces/ICalendar";
import Session from "./Session";
import Subscription from "./Subscription";

import { ISchedule } from "interfaces/ICalendar";

interface AuthProperties {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  email?: string;
  verified?: boolean;
  role?: string;
  level?: string | string[];
  sessions?: Session[];
  subscriptions?: Subscription[];
  schedule?: ISchedule[];
  eventualities?: IEventuality[];
  studentId?: string;
  teacherId?: string;
  refreshToken?: string;
}

export default class Auth {
  id;
  firstName;
  lastName;
  phone;
  address;
  dateOfBirth;
  email;
  role;
  level;
  sessions;
  subscriptions;
  schedule;
  eventualities;

  studentId;
  teacherId;
  refreshToken;
  verified = false;

  constructor(properties: AuthProperties = {}) {
    this.id = properties.id || "";
    this.firstName = properties.firstName || "";
    this.lastName = properties.lastName || "";
    this.phone = properties.phone || "";
    this.address = properties.address || "";
    this.dateOfBirth = properties.dateOfBirth || new Date().toISOString();
    this.email = properties.email || "";
    this.role = properties.role || "";
    this.verified = properties.verified || false;
    this.level = properties.level || "";
    this.sessions = properties.sessions || [];
    this.subscriptions = properties.subscriptions || [];
    this.schedule = properties.schedule || [];
    this.eventualities = properties.eventualities || [];

    this.studentId = properties.studentId || "";
    this.teacherId = properties.teacherId || "";
    this.refreshToken = properties.refreshToken || "";
  }
}
