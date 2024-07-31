import { getNewReservations, getScheduleReservations } from "./database";


function transformReservations(reservations) {
    const newList = reservations.map(oldObject => {
        return {
            start: oldObject.date + "T" + oldObject.start + ":00.000Z",
            end: oldObject.date + "T" + oldObject.finish + ":00.000Z",
            startStr: oldObject.date + "T" + oldObject.start + ":00+02:00",
            endStr: oldObject.date + "T" + oldObject.finish + ":00+02:00",
            title: oldObject.name,
            status: oldObject.status,
            person: oldObject.person,
            allDay: false,
            jsEvent: {
                isTrusted: true
            },
            view: {
                type: "timeGridWeek",
                dateEnv: {
                    timeZone: "local",
                    canComputeOffset: true,
                    calendarSystem: {},
                    locale: {
                        codeArg: "pl",
                        codes: ["pl"],
                        week: {
                            dow: 0,
                            doy: 4
                        },
                        simpleNumberFormat: {},
                        options: {
                            direction: "ltr",
                            buttonText: {
                                prev: "prev",
                                next: "next",
                                prevYear: "prev year",
                                nextYear: "next year",
                                year: "year",
                                today: "today",
                                month: "month",
                                week: "week",
                                day: "day",
                                list: "list"
                            },
                            weekText: "W",
                            weekTextLong: "Week",
                            closeHint: "Close",
                            timeHint: "Time",
                            eventHint: "Event",
                            allDayText: "all-day",
                            moreLinkText: "more",
                            noEventsText: "No events to display",
                            buttonHints: {
                                prev: "Previous $0",
                                next: "Next $0"
                            },
                            viewHint: "$0 view",
                            navLinkHint: "Go to $0"
                        }
                    },
                    weekDow: 0,
                    weekDoy: 4,
                    weekText: "W",
                    weekTextLong: "Week",
                    cmdFormatter: null,
                    defaultSeparator: " - "
                }
            }
        };
    });

    return newList;
}

async function loadEvents(roomNumber) {
    try {
        const scheduleReservations = await getScheduleReservations();
        const newReservations = await getNewReservations()
        
        const newReservationsValues = Object.values(newReservations)

        const reservations = [...scheduleReservations, ...newReservationsValues]

        // console.log("original", reservations);

        // const reservations = scheduleReservations + newReservations
        const filteredEvents = reservations.filter(reservation => reservation.roomNumber === roomNumber);
        const transformedReservations = transformReservations(filteredEvents)

        return transformedReservations

    } catch (error) {
        console.error("Error loading reservations:", error);
    }
}

export async function getEvents(roomNumber) {
    return await loadEvents(roomNumber); 
}

export async function getAllEvents() {
    try {
        const scheduleReservations = await getScheduleReservations();
        const newReservations = await getNewReservations()
        
        const newReservationsValues = Object.values(newReservations)

        const reservations = [...scheduleReservations, ...newReservationsValues]
        const transformedReservations = transformReservations(reservations)

        return transformedReservations
    } catch (error) {
        console.error("Error loading reservations:", error);
    }
}
