import type { CalendarEventData } from "..";

interface CalendarEventProps {
    event: CalendarEventData;
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {

    const { title, user } = event;

    return (
        <div>
            <span className="calendar-event-title">{title}</span>
            <span className="calendar-event-user">{user?.name}</span>
        </div>
    )
}
