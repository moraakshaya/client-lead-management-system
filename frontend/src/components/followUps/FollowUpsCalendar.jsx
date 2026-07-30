import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './followUpsCalendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function FollowUpsCalendar({ followUps, onAction }) {
  const [view, setView] = React.useState('month');
  const [date, setDate] = React.useState(new Date());

  // Transform the followUps data into events that react-big-calendar understands
  const events = useMemo(() => {
    return followUps.map(followUp => {
      // Handle the case where the date string might be invalid or missing
      const eventDate = followUp.followUpDate ? new Date(followUp.followUpDate) : new Date();
      
      // End date will be 1 hour later for meetings/calls
      const endDate = new Date(eventDate);
      endDate.setHours(endDate.getHours() + 1);

      const clientName = followUp.leadId ? (followUp.leadId.leadName || followUp.leadId.companyName || 'Unknown') : 'Unknown';

      return {
        id: followUp._id,
        title: `${followUp.followUpType || 'Follow-up'} with ${clientName}`,
        start: eventDate,
        end: endDate,
        resource: followUp, // Store the full object for click handlers
      };
    });
  }, [followUps]);

  const handleSelectEvent = (event) => {
    // We pass 'edit' action so the user can immediately edit the follow-up
    if (onAction) {
      onAction('edit', event.resource);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const followUp = event.resource;
    let backgroundColor = 'var(--primary)';
    
    // Customize colors based on status or type
    if (followUp.status === 'Completed') backgroundColor = 'var(--success)';
    if (followUp.status === 'Missed') backgroundColor = 'var(--danger)';
    if (followUp.type === 'Meeting') backgroundColor = '#8b5cf6';
    if (followUp.type === 'Call') backgroundColor = '#3b82f6';
    if (followUp.type === 'Email') backgroundColor = '#ec4899';

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  return (
    <div className="follow-ups-calendar-container" style={{ height: '600px', backgroundColor: 'var(--surface-color)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day', 'agenda']}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
      />
    </div>
  );
}
