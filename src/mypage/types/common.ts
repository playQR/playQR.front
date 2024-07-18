import { PromotionCard } from "../../promotion/types";

export interface MyComments {

    id: number;
    promotionId: number;
    content: string;
    createdTime: string;
}
export interface PromotionCommentCard{
    
    comments : MyComments [];
    promotion : PromotionCard;
}