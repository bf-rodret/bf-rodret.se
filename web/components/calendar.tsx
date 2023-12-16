"use client"

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/sv';
import DragDropContext from 'components/dragdropcontext';
import { useMemo, useCallback } from 'react';

export const ResourceCalendar = ({bookings = [], start = 0, end = 24}) => {
  moment.locale('sv');
  const localizer = momentLocalizer(moment);

  const today = new Date();

  const onSelectSlot = useCallback(
      (slotInfo) => {
      if (slotInfo.action == "doubleClick") return; // cancel dbl click 
      if (slotInfo.end < new Date()) return; // ends in the past
      console.log(slotInfo);
    },
    []
  );

  const messages = useMemo(
    () => ({
      date: 'Datum',
      time: 'Tid',
      event: 'Bokning',
      allDay: 'Heldag',
      week: 'Vecka',
      work_week: 'Work Week',
      day: 'Dag',
      month: 'Månad',
      previous: '<',
      next: '>',
      yesterday: 'Igår',
      tomorrow: 'Imorgon',
      today: 'Idag',
      agenda: 'Agenda',
      noEventsInRange: 'Inga bokningar denna period.',
      showMore: total => `+${total} fler`,
    }),
    []
  );

  const tileDisabled = useCallback(
    (date) => {
      if (date < new Date()) {
        return {
          className: "rbc-custom__past-time"
        }
      }
    },
    []
  );

  return (
    <Calendar
      localizer={localizer}
      defaultView={Views.WEEK}
      slotPropGetter={tileDisabled}
      views={[
        Views.DAY,
        Views.WEEK
      ]}
      events={bookings}
      step={60}
      timeslots={1}
      messages={messages}
      min={
        new Date(
          today.getFullYear(), 
          today.getMonth(), 
          today.getDate(), 
          start
        )
      }
     max={
       new Date(
         today.getFullYear(), 
         today.getMonth(), 
         today.getDate(), 
         end
       )
     }
     onSelectSlot={onSelectSlot}
     selectable="ignoreEvents"
     allDayMaxRows={0}
    />
  )
}