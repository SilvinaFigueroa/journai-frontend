
const calculateDateRange = (range) => {
    const endDate = new Date()
    let startDate

    switch (range) {
        case 'lastWeek':
            startDate = new Date(endDate)
            startDate.setDate(endDate.getDate() - 7)
            break

        case 'lastMonth':
            startDate = new Date(endDate)
            startDate.setMonth(endDate.getMonth() - 1)
            break

        case 'last6Months':
            startDate = new Date(endDate)
            startDate.setMonth(endDate.getMonth() - 6)
            break

        default:
            startDate = endDate;
    }

    //convert startDate and endDate to ISO strings and get only the date part 
    // the 'T' removes the time part HH:MM:SS.sssZ

    const formattedStartDate = startDate.toISOString().split('T')[0]
    const formattedEndDate = endDate.toISOString().split('T')[0]

    return { startDate: formattedStartDate, endDate: formattedEndDate };
}

export default calculateDateRange