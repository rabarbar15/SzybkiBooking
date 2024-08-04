<script>

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import DialogModal from './DialogModal.vue'
import { ref } from 'vue'
import { getEvents } from '../../../data/calendarEvents'
import { addReservation } from '../../../data/database'
import { useDisplay } from 'vuetify'

export default {
    components: {
        FullCalendar,
        DialogModal
    },
    computed: {
      roomNumber() {
        return this.$route.params.roomNumber;
      }
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                buttonText: {
                    today: 'Dzisiaj',
                    month: 'Miesiąc',
                    day: 'Dzień',
                    week: 'Tydzień',
                },
                locale: 'pl',
                initialView: 'timeGridWeek',
                weekends: false,
                selectable: true,
                nowIndicator: true,
                slotDuration: "00:15:00",
                slotLabelInterval: "00:15:00",
                selectMirror: true,
                dateClick: this.handleDateClick,
                select: this.handleDateSelect,
                eventsSet: this.handleEvents,
                allDaySlot: false,
                allDayText: "",
                expandRows: true,
                eventOverlap: false,
                selectOverlap: false,
            },
            calendarOptionsMobile: {
                plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridDay'
                },
                buttonText: {
                    today: 'Dzisiaj',
                    month: 'Miesiąc',
                    day: 'Dzień',
                },
                locale: 'pl',
                initialView: 'timeGridDay',
                weekends: false,
                selectable: true,
                nowIndicator: true,
                slotDuration: "00:15:00",
                slotLabelInterval: "00:15:00",
                selectMirror: true,
                dateClick: this.handleDateClick,
                select: this.handleDateSelect,
                eventsSet: this.handleEvents,
                allDaySlot: false,
                allDayText: "",
                expandRows: true,
                eventOverlap: false,
                selectOverlap: false,
            },
            currentEvents: [],
            parentState: ref(false),
            formData: {},
            tmpArg: {},
            roomInfo: null,
            isMobile: false
        }
    },

    methods: {
        handleDateClick: function(arg) {
            if (arg.view['type'] == 'dayGridMonth') {
                let calendarApi = arg.view.calendar
                calendarApi.changeView('timeGridDay', arg.dateStr);
            }
        },

        createEventId() {
            return "id" + Math.random().toString(16).slice(2)
        },

        handleDateSelect(arg) {
            if (arg.view['type'] == 'dayGridMonth') {
                return
            }
            this.updateDialogState()
            this.tmpArg = arg

        },

        async performAddEvent(arg) {
            const calendarApi = this.$refs.calendarRef.getApi();

            calendarApi.unselect() 

            const event = {
                id: this.createEventId(),
                title: 'Rezerwacja oczekująca na zatwierdzenie',
                start: arg.startStr,
                end: arg.endStr,
                allDay: arg.allDay,
                backgroundColor: 'green'
            }

            calendarApi.addEvent(event)

            const reservation = {
              date: arg.startStr.split('T')[0],
              start: arg.startStr.split('T')[1].substring(0, 5),
              finish: arg.endStr.split('T')[1].substring(0, 5),
              name: this.formData.course,
              person: `${this.formData.firstName} ${this.formData.lastName}`,
              roomNumber: this.roomNumber,
              status: 'PENDING'
            }

            addReservation(reservation)
        },

        handleEvents(events) {
            this.currentEvents = events
        },

        updateDialogState() {
            this.parentState = !this.parentState;
            // console.log(this.parentState)
        },

        handleSubmition(args) {
            // console.log(args)
            this.formData = args
            this.updateDialogState()
            this.performAddEvent(this.tmpArg)
        },

        loadEvents(events) {
          const calendarApi = this.$refs.calendarRef?.getApi();
          events.forEach(event => {
            const title = `${event.title} - ${event.person}`;
            // console.log(event);

            if (event.status === 'PENDING') {
                calendarApi.addEvent({
                id: event.id,
                title: 'Rezerwacja oczekująca na zatwierdzenie',
                start: event.startStr,
                end: event.endStr,
                allDay: event.allDay,
                backgroundColor: 'green'
              });
            } else {
              calendarApi.addEvent({
                id: event.id,
                title: title,
                start: event.startStr,
                end: event.endStr,
                allDay: event.allDay,
              });
            }
          });
        }
    },

    async mounted() {
        const { mobile } = useDisplay()
        this.isMobile = mobile.value

        try {
            const events = await getEvents(this.roomNumber);

            if (events && events.length > 0) {
                this.loadEvents(events);
                console.log("Events loaded successfully");
            } else {
                console.log("No data available");
            }
            
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
}
</script>


<template>
    <div class="container">
        <header>
            <h2>Plan zajęć odbywających się w sali {{ roomNumber }}</h2>
            <br>
            <h3>W celu wykonania rezerwacji zaznacz obszar w kalendarzu.</h3>
        </header>

        <div class="calendar-container">
            <FullCalendar v-if="!isMobile" class="calendar-content" :options="calendarOptions" ref="calendarRef"/>
            <FullCalendar v-else class="calendar-content" :options="calendarOptionsMobile" ref="calendarRef"/>
        </div>

        <DialogModal :childProp="parentState" v-on:changeDialogValue="updateDialogState" v-on:form-submitted="handleSubmition"/>
        
    </div>
  
  </template>

<style scoped>

    header {
        padding-bottom: 2rem;
        text-align: left;
        max-width: 1100px;
        margin: 0 auto;
    }

    h2, h3 {
      font-weight: 400;
    }
    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }

    li {
        margin: 1.5em 0;
        padding: 0;
    }

    b {
        margin-right: 3px;
    }

    .container {
        min-height: 100%;
        margin-top: 3rem;
    }

    .fc {
        max-width: 1100px;
        margin: 0 auto;
    }

    .calendar-content {
      width: 70vw;
    }

    @media screen and (max-width: 1000px) {
        header {
            text-align: center;
            align-content: center;
            width: 100%;
        }

        .calendar-content {
            width: 90vw;
            min-height: 150vh;
        }

        ::v-deep .fc .fc-toolbar-title   {
            font-size: 3vw;
        }
    }

</style>