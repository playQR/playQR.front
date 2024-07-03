export function parseKSTDate(dateString : string | null) : Date | null{
    if (dateString === null) {
        return null
    }else{
        const kstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
    
        // Remove 'KST' and parse the date in local time
        const localDate = new Date(dateString.replace(' KST ', ' '));
        console.log(localDate)
        // Adjust the time to UTC by subtracting the timezone offset
        const utcDate = new Date(localDate.getTime() - kstOffset);
        
        return utcDate;
    }
}

export const convertMerdian = (time : any) => {
      const sm = time.smeridian;
      const lm = time.lmeridian;
      const sh = time.shour;
      const lh = time.lhour;
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