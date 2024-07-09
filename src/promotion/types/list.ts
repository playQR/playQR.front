import * as common from './common';

export interface SetListMusic {
    id: number,
    song_like : boolean,
    song_like_num : number
}

export interface Comment {
    id : number;
    content : string;
    createdTime : string;
    memberResponse : common.Member;
}