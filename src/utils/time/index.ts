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