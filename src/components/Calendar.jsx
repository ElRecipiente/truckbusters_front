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

import { useEffect, useState } from 'react';
import { format, addHours, startOfWeek, addDays, subDays, isBefore } from 'date-fns';
import axios from 'axios';
import "./scss/calendar.scss"
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    // Définir les heures de début et de fin de la journée
    const startHour = 6;
    const endHour = 16;
    // Nombre de créneaux horaires par jour
    const numSlots = (endHour - startHour) / 2;
    // Nombre de jours affiché dans la semaine
    const weekDays = 7;

    // Nombre de rdv disponible par créneau
    const [truckLiftNumber, setTruckLiftNumber] = useState();
    // Nombre de rdv disponible par créneau
    const [allAppointment, setAllAppointment] = useState();

    useEffect(() => {
        const fetchTruckLiftNumber = async () => {

            try {
                const response = await axios.get('https://expresscda.onrender.com/api/v1/config');

                // Set data after fetch
                setTruckLiftNumber(response.data);
                console.log(response.data)

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        // If data are not fetched
        if (!truckLiftNumber) {
            fetchTruckLiftNumber();
        }
    }, [truckLiftNumber]);



    useEffect(() => {
        const fetchStartDate = async () => {

            try {
                const response = await axios.get('https://expresscda.onrender.com/api/v1/appointment');

                // Set data after fetch
                setAllAppointment(response.data);
                console.log(response.data)

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        // If data are not fetched
        if (!allAppointment) {
            fetchStartDate();
        }
    }, [allAppointment]);



    // Time slots function
    const generateTimeSlots = (startDate) => {

        const timeSlots = [];

        let currentDate = startOfWeek(startDate);

        // Generate all day slots
        for (let i = 0; i < weekDays; i++) {
            const daySlots = [];
            for (let j = 0; j < numSlots; j++) {
                const startTime = addHours(currentDate, startHour + j * 2);
                const endTime = addHours(startTime, 2);
                daySlots.push({
                    start: startTime,
                    end: endTime,
                    // Available appointment true by default
                    appointmentAvailable: true 
                });
            }
            timeSlots.push(daySlots);
            currentDate = addDays(currentDate, 1);
        }
        return timeSlots;
    };

    const [startDate, setStartDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots(startDate));

    const navigate = useNavigate();

    // Book appointment function
    const bookAppointment = (dayIndex, slotIndex) => {
        // Get date & hour data
        const selectedDateTime = timeSlots[dayIndex][slotIndex].start;
        // Redirect to form with selected date time
        navigate(`/create-form/${selectedDateTime}`);
        console.log("Rendez-vous réservé pour :", selectedDateTime);
    };

    const goToNextWeek = () => {
        const nextWeekStartDate = addDays(startDate, 7);
        setStartDate(nextWeekStartDate);
        setTimeSlots(generateTimeSlots(nextWeekStartDate));
    };

    const goToPreviousWeek = () => {
        // Check if startDate is before new date
        if (isBefore(startDate, new Date())) return;
        const previousWeekStartDate = subDays(startDate, 7);
        setStartDate(previousWeekStartDate);
        setTimeSlots(generateTimeSlots(previousWeekStartDate));
    };

    return (
        <div>
            {/* Nav between weeks buttons */}
            <div className="navigation">
                <div onClick={goToPreviousWeek} ></div>
                <div onClick={goToNextWeek}></div>
            </div>
            {/* Header: Jours de la semaine */}
            <div className="table-head">
                <div className="day-label"></div>
                {timeSlots[0].map((slot, index) => (
                    <div key={index} className="day-label">
                        {format(addDays(startDate, index), 'eee dd/MM')}
                    </div>
                ))}
            </div>

            {/* Corps du calendrier */}
            <div className="calendar-body">
                {/* Colonnes des heures */}
                <div className="time-column">
                    {Array.from({ length: numSlots }, (_, i) => (
                        <div key={i} className="time-slot">
                            {`${startHour + i * 2}:00 - ${startHour + i * 2 + 2}:00`}
                        </div>
                    ))}
                </div>

                {/* Cases du calendrier */}
                <div className="day-column">
                    {Array.from({ length: numSlots }, (_, i) => (
                        <div key={i} className="slot-row">
                            {timeSlots.map((daySlots, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className={daySlots[i].appointmentAvailable ? "slot available" : "slot unavailable"}
                                    onClick={() => daySlots[i].appointmentAvailable && bookAppointment(dayIndex, i)}
                                >
                                    {daySlots[i].appointmentAvailable ?  "Dispo": "Pas dispo" }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}