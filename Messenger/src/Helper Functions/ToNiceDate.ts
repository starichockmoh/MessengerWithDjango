export const ToNiceDate = (date: string | undefined) => {
    if (date !== undefined) {
        const TodayData = new Date()
        const TodayDay = TodayData.getDate().toString()
        const TodayMonth = (TodayData.getMonth() + 1 < 10 ? '0' + (TodayData.getMonth() + 1) : (TodayData.getMonth() + 1).toString())
        const TodayYear = TodayData.getFullYear().toString()
        const ServerDay  = date.substring(8, 10)
        const ServerMonth  = date.substring(5, 7)
        const ServerYear = date.substring(0, 4)
        const ServerTime = Number(date.substring(11, 13)) + 4 + date.substring(13, 16)
        if (ServerYear === TodayYear && ServerMonth === TodayMonth && ServerDay === TodayDay) {
            return ServerTime
        }
        if (ServerYear === TodayYear) {
            return ServerMonth + '.' + ServerDay
        }
        return ServerYear
    }
    return ''
}