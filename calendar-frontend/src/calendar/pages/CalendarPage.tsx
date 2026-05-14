import { useEffect, useState } from 'react'
import { Calendar, type View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar, type CalendarEventData, type User } from ".."

import { localizer, getMessagesES } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'
import { FabCancelSelect } from '../components/FabCancelSelect'


export const CalendarPage = () => {
    const { user } = useAuthStore();
    const currentUser = user as User;
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') || 'week') as View);

    const eventStyleGetter = (event: CalendarEventData) => {
        const isMyEvent = (currentUser?._id === event.user?._id);

        const style = {
            background: isMyEvent
                ? 'linear-gradient(135deg, #2563eb, #0ea5e9)'
                : 'linear-gradient(135deg, #475569, #64748b)',
            borderRadius: '10px',
            border: '0',
            opacity: 0.96,
            color: 'white',
            boxShadow: '0 8px 18px rgba(15, 23, 42, 0.16)',
            padding: '2px 6px',
        }

        return {
            style,
        }
    }

    const onDoubleClick = () => {
        openDateModal();
    }

    const onSelect = (event: CalendarEventData) => {
        setActiveEvent(event);
    }

    const onViewChanged = (event: View) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }

    useEffect(() => {
        startLoadingEvents();
    }, [startLoadingEvents])

    return (
        <main className="calendar-page">
            <Navbar />

            <section className="calendar-shell">
                <div className="calendar-header-card">
                    <div>
                        <p className="calendar-overline">Gestión de eventos</p>
                        <h1>Mi calendario</h1>
                        <p>Consulta, crea y administra tus actividades desde un solo lugar.</p>
                    </div>
                    <div className="calendar-stats">
                        <span>{events.length}</span>
                        <small>Eventos registrados</small>
                    </div>
                </div>

                <div className="calendar-card">
                    <Calendar
                        culture='es'
                        localizer={localizer}
                        events={events}
                        defaultView={lastView}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 'calc(100vh - 250px)', minHeight: '560px' }}
                        messages={getMessagesES()}
                        eventPropGetter={eventStyleGetter}
                        components={{
                            event: CalendarEvent
                        }}
                        onDoubleClickEvent={onDoubleClick}
                        onSelectEvent={onSelect}
                        onView={onViewChanged}
                    />
                </div>
            </section>

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
            <FabCancelSelect />
        </main>
    )
}
