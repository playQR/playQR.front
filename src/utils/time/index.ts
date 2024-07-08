export function parseKSTDate(dateString : string | null) : Date | null{
    if (dateString === null) {
        return null
    }else{
        const kstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
    
        // Remove 'KST' and parse the date in local time
        const localDate = new Date(dateString.replace(' KST ', ' '));
        
        // Adjust the time to UTC by subtracting the timezone offset
        const utcDate = new Date(localDate.getTime() - kstOffset);
        
        return utcDate;
    }
}

export const convertMerdian = (time : any) => {
      const sm = time.smeridian;
      const lm = time.lmeridian;
      const sh = Number(time.shour);
      const lh = Number(time.lhour);
      if (sm === '오후' && sh !== 12) {
        time.shour = sh + 12;
      }
      if (lm === '오후' && lh !== 12) {
        time.lhour = lh + 12;
      }
      if (sm === '오전' && sh === 12) {
        time.shour = 0;
      }
      if (lm === '오전' && lh === 12) {
        time.lhour = 0;
      }
      // 'HH:mm'
      const startTime = `${time.shour < 10 ? '0' : ''}${time.shour}:${time.sminute}`;
      const endTime = `${time.lhour < 10 ? '0' : ''}${time.lhour}:${time.lminute}`;
      return {
        startTime,
        endTime,
      };
    }

export const convertStringToDate = (time: string) => {
    const timeArr = time.split(':');
    let hour = String(parseInt(timeArr[0]));
    let minute = String(parseInt(timeArr[1]));
    if (hour.length === 1) {
      hour = '0' + hour;
    }
    if (minute.length === 1) {
      minute = '0' + minute;
    }
    
    return `${hour}:${minute}`
}

export function convertformatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
