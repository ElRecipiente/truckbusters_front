import { useState } from "react";
import * as dateFns from "date-fns";
import Button from "../atomes/Button";
import "./scss/calendar.scss";

const formatOfYear = "yyy";
const formatOfMonth = "MMM";
const formatOfWeek = "eee";
const formatOfDay = "d";
// const formatOfHour = "H";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Find the first day of currentDate
    const firstDay = dateFns.startOfMonth(currentDate);
    // Find the last day of currentDate
    const lastDay = dateFns.lastDayOfMonth(currentDate);
    // Find the first day of week of firstDay
    const startDate = dateFns.startOfWeek(firstDay);
    // Find the last day of week of lastDay
    const endDate = dateFns.lastDayOfWeek(lastDay);
    // Render all days
    const totalDate = dateFns.eachDayOfInterval({ start: startDate, end: endDate });

    const weeks = (date => {
        const weeks = [];
        for (let day = 1; day <= 7; day++) {
            weeks.push(date[day]);
        }
        return weeks;
    })(totalDate);

    return (<>
        <div className="swapper">
            <button onClick={() => setCurrentDate(dateFns.subMonths(currentDate, 1))}>Précédent</button>
            <span>{dateFns.format(currentDate, formatOfMonth)}</span>
            &nbsp;
            <span>{dateFns.format(currentDate, formatOfYear)}</span>
            <button onClick={() => setCurrentDate(dateFns.addMonths(currentDate, 1))}>Suivant</button>
        </div>
        <div className="calendar">
            {weeks.map(week => (
                <span key={week}>{dateFns.format(week, formatOfWeek)}</span>
            ))}
            {totalDate.map(date => (
                <span key={date} className={!dateFns.isSameMonth(date, currentDate) ? 'inactive' : 'active'}>{dateFns.format(date, formatOfDay)}</span>
            ))}
        </div>
        
            <Button linkTo="/create-form/2024-04-19T10:48:04.132+00:00">Enregistrer</Button>
    </>
    )
}