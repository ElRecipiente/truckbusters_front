// import { useState } from "react";
// import * as dateFns from "date-fns";
// import Button from "../atomes/Button";
// import "./scss/calendar.scss";

// const formatOfYear = "yyy";
// const formatOfMonth = "MMM";
// const formatOfWeek = "eee";
// const formatOfDay = "d";
// // const formatOfHour = "H";

// export default function Calendar() {
//     const [currentDate, setCurrentDate] = useState(new Date());

//     // Find the first day of currentDate
//     const firstDay = dateFns.startOfMonth(currentDate);
//     // Find the last day of currentDate
//     const lastDay = dateFns.lastDayOfMonth(currentDate);
//     // Find the first day of week of firstDay
//     const startDate = dateFns.startOfWeek(firstDay);
//     // Find the last day of week of lastDay
//     const endDate = dateFns.lastDayOfWeek(lastDay);
//     // Render all days
//     const totalDate = dateFns.eachDayOfInterval({ start: startDate, end: endDate });

//     const weeks = (date => {
//         const weeks = [];
//         for (let day = 1; day <= 7; day++) {
//             weeks.push(date[day]);
//         }
//         return weeks;
//     })(totalDate);

//     return (<>
//         <div className="swapper">
//             <button onClick={() => setCurrentDate(dateFns.subMonths(currentDate, 1))}>Précédent</button>
//             <span>{dateFns.format(currentDate, formatOfMonth)}</span>
//             &nbsp;
//             <span>{dateFns.format(currentDate, formatOfYear)}</span>
//             <button onClick={() => setCurrentDate(dateFns.addMonths(currentDate, 1))}>Suivant</button>
//         </div>
//         <div className="calendar">
//             {weeks.map(week => (
//                 <span key={week}>{dateFns.format(week, formatOfWeek)}</span>
//             ))}
//             {totalDate.map(date => (
//                 <span key={date} className={!dateFns.isSameMonth(date, currentDate) ? 'inactive' : 'active'}>{dateFns.format(date, formatOfDay)}</span>
//             ))}
//         </div>

//             <Button linkTo="/create-form/2024-04-19T10:48:04.132+00:00">Enregistrer</Button>
//     </>
//     )
// }

import Button from '../atomes/Button';
import { useState } from 'react';
import { format, addHours, startOfWeek, addDays, subDays, isBefore } from 'date-fns';

export default function Calendar() {

    const [currentDay, setCurrentDay] = useState();
    console.log(currentDay);

    // Define starting & ending hour
    const startHour = 6;
    const endHour = 16;
    
    // Number of slots by day
    const slotNumber = (endHour - startHour) / 2;

    // Fonction pour générer les créneaux horaires
    const generateTimeSlots = (startDate) => {
        const timeSlots = [];
        let currentDate = startOfWeek(startDate);

        // Générer les créneaux horaires pour chaque jour de la semaine
        for (let i = 0; i < 7; i++) {
            const daySlots = [];
            for (let j = 0; j < slotNumber; j++) {
                const startTime = addHours(currentDate, startHour + j * 2);
                const endTime = addHours(startTime, 2);
                daySlots.push({
                    start: startTime,
                    end: endTime,
                    appointmentAvailable: true // Initialiser tous les créneaux comme disponibles
                });
            }
            timeSlots.push(daySlots);
            currentDate = addDays(currentDate, 1);
        }
        return timeSlots;
    };

    const [startDate, setStartDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots(startDate));

    // Fonction pour réserver un rendez-vous
    const reserveAppointment = (dayIndex, slotIndex) => {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[dayIndex][slotIndex].appointmentAvailable = false;
        setTimeSlots(updatedTimeSlots);
        // Récupérer les données de date et heure pour le rendez-vous réservé
        const selectedDateTime = updatedTimeSlots[dayIndex][slotIndex].start;
        // Rediriger vers la page de formulaire avec les données de date et heure
        // history.push('/form', { selectedDateTime });
        console.log("Rendez-vous réservé pour :", selectedDateTime);
    };

    const goToNextWeek = () => {
        const nextWeekStartDate = addDays(startDate, 7);
        setStartDate(nextWeekStartDate);
        setTimeSlots(generateTimeSlots(nextWeekStartDate));
    };

    const goToPreviousWeek = () => {
        if (isBefore(startDate, new Date())) return; // Vérifier si la semaine précédente est antérieure à la semaine actuelle
        const previousWeekStartDate = subDays(startDate, 7);
        setStartDate(previousWeekStartDate);
        setTimeSlots(generateTimeSlots(previousWeekStartDate));
    };

    return (
        <div>
            {/* Header: Jours de la semaine */}
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 auto', width: '100px' }}></div>
                {timeSlots[0].map((slot, index) => (
                    <div key={index} style={{ flex: '1 1 auto', textAlign: 'center' }}>
                        {format(slot.start, 'eee dd/MM')}
                    </div>
                ))}
            </div>

            {/* Corps du calendrier */}
            <div style={{ display: 'flex' }}>
                {/* Colonnes des heures */}
                <div style={{ flex: '0 0 auto', width: '100px' }}>
                    {Array.from({ length: slotNumber }, (_, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            {`${startHour + i * 2}:00 - ${startHour + i * 2 + 2}:00`}
                        </div>
                    ))}
                </div>

                {/* Cases du calendrier */}
                <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                    {timeSlots.map((daySlots, dayIndex) => (
                        <div key={dayIndex} style={{ display: 'flex' }}>
                            {daySlots.map((slot, slotIndex) => (
                                <div
                                    key={slotIndex}
                                    style={{
                                        flex: '1 1 auto',
                                        textAlign: 'center',
                                        backgroundColor: slot.appointmentAvailable ? 'lightgreen' : 'lightgray',
                                        cursor: slot.appointmentAvailable ? 'pointer' : 'not-allowed',
                                        borderRight: '1px solid #ccc',
                                        borderBottom: '1px solid #ccc'
                                    }}
                                    onClick={() => slot.appointmentAvailable && reserveAppointment(dayIndex, slotIndex)}
                                >
                                    {format(slot.start, 'HH:mm')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Boutons pour naviguer vers les semaines suivantes/précédentes */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={goToPreviousWeek}>Semaine précédente</button>
                <button onClick={goToNextWeek}>Semaine suivante</button>
            </div>
            <Button linkTo="/create-form/2024-04-19T10:48:04.132+00:00">Enregistrer</Button>
        </div>
    );
}
