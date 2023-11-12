"use client"

import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/sv';
import DragDropContext from 'components/dragdropcontext';

export const ResourceCalendar = ({bookings = [], start = 0, end = 24}) => {
  moment.locale('sv');
  const localizer = momentLocalizer(moment);

  const today = new Date();

  const onSelectSlot = (slotInfo) => {
    console.log(slotInfo);
  }

  return (
    <Calendar
      localizer={localizer}
      defaultView={Views.WEEK}
      views={[
        Views.DAY,
        Views.WEEK
      ]}
      events={bookings}
      step={120}
      timeslots={1}
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