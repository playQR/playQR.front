import { PromotionCreate } from '../../promotion/types';
import { ViewPromotion } from '../../promotion/types';
export function convertViewPromotionToPromotionCreate(response: ViewPromotion): PromotionCreate {
  const [startHour, startMinute] = response.startTime.split(':').map(Number);
  const [endHour, endMinute] = response.endTime.split(':').map(Number);

  const convertTo12HourFormat = (hour: number) => {
    const meridian = hour < 12 ? '오전' : '오후';
    const adjustedHour = hour % 12 || 12;
    return { meridian, hour: adjustedHour };
  };

  const startTime = convertTo12HourFormat(startHour);
  const endTime = convertTo12HourFormat(endHour);

  return {
    step1: {
      team: response.team,
      title: response.title,
      imageList: response.imageList, // 여기에 파일 리스트를 추가해야 합니다.
      showDate: response.date,
      time: {
        smeridian: startTime.meridian,
        shour: startTime.hour,
        sminute: startMinute,
        lmeridian: endTime.meridian,
        lhour: endTime.hour,
        lminute: endMinute,
      },
      showLocation: response.location,
      maxAudience: response.maxAudience,
    },
    step2: {
      content: response.content,
      musicList: response.musicList.map(music => ({
        id: music.id,
        title: music.title,
        artist: music.artist,
        isOpen: music.isOpen,
      })),
    },
    step3: {
      billing: {
        entranceFee: response.entranceFee,
        bankName: response.bankName,
        account: response.account,
        accountHolder: response.accountHolder,
        refundInfo: response.refundInfo,
      },
    },
  };
}
