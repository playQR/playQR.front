import { Member } from "../../promotion/types";

export enum GuestStatus{
    BEFORE_CONFIRMATION = 'BEFORE_CONFIRMATION',
    AFTER_CONFIRMATION = 'AFTER_CONFIRMATION',
    CHECKED_IN ='CHECKED_IN'
}
export interface GuestCardType {
    guestId : number;
    name: string;
    depositer : string;
    reservationCount : number;
    reservationStatus : GuestStatus;
    depositDate : string;
    writer : Member;

}