type SetListType = {
    song_title : string,
    song_artist : string,
    song_like : boolean,
    song_like_num : number
  }
  
type CommentType ={
nickname : string,
profile_img : string | undefined,
comment_date : string,
comment_content : string
}
type PromotionType = {
    img : string | undefined,
    band_name : string,
    title : string,
    location : string,
    date : string, 
    price : string,
    setlist : SetListType [],
    promotion_info : string,
    refund_info : string,
    comment : CommentType []
}

export type {SetListType, PromotionType, CommentType}