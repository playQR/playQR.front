import * as common from './common';

export interface SetListMusic {
    song : common.Music,
    song_like : boolean,
    song_like_num : number
}

export interface Comment {
    content : string;
    created_at : string;
    member : common.Member;
}