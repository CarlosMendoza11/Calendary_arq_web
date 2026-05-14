import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState, type ChangeEvent, type SyntheticEvent } from 'react';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useCalendarStore, useUiStore } from '../../hooks';
import { type CalendarEventData } from '..';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

type StartOrEnd = 'start' | 'end';

export const CalendarModal = () => {
    const { activeEvent, setActiveEvent, startSavingEvent } = useCalendarStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState<CalendarEventData>({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if (activeEvent !== null) {
            const timeOut = setTimeout(() => {
                setFormValues({ ...activeEvent as CalendarEventData });
            }, 0);

            return () => clearTimeout(timeOut);
        }

    }, [activeEvent])

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }

    const onDateChange = (event: Date | null, changing: StartOrEnd) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    }

    const onCloseModal = () => {
        closeDateModal();
        setActiveEvent(null);
    }

    const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);

        const different = differenceInSeconds(formValues.end, formValues.start)

        if (isNaN(different) || different <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }
        if (formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setActiveEvent(null);
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Formulario de evento"
            className="modal event-modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="modal-header-modern">
                <div>
                    <p>Calendary</p>
                    <h1>{formValues._id ? 'Editar evento' : 'Nuevo evento'}</h1>
                </div>
                <button type="button" className="modal-close" onClick={onCloseModal}>
                    <i className="fas fa-xmark"></i>
                </button>
            </div>

            <form className="event-form" onSubmit={onSubmit}>
                <div className="form-grid">
                    <div className="form-group mb-3">
                        <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={formValues.start as Date}
                            onChange={(event: Date | null) => onDateChange(event, 'start')}
                            className='form-control'
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Fecha y hora fin</label>
                        <DatePicker
                            minDate={formValues.start as Date}
                            selected={formValues.end as Date}
                            onChange={(event: Date | null) => onDateChange(event, 'end')}
                            className='form-control'
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption='Hora'
                        />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label>Título del evento</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Ejemplo: Reunión de seguimiento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small className="form-text text-muted">Escribe una descripción corta y clara.</small>
                </div>

                <div className="form-group mb-4">
                    <label>Notas</label>
                    <textarea
                        className="form-control"
                        placeholder="Agrega detalles importantes del evento"
                        rows={5}
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small className="form-text text-muted">Información adicional para recordar.</small>
                </div>

                <button type="submit" className="btn-save-event">
                    <i className="far fa-save"></i>
                    <span>Guardar evento</span>
                </button>
            </form>
        </Modal>
    )
}
