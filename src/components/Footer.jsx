import './scss/footer.scss';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Footer() {

    const [data, setData] = useState(null);
    // Follow loading of fetch, prevent async bug
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // Fetch data from API
        const fetchData = async () => {

            try {
                const response = await axios.get('https://expresscda.onrender.com/api/v1/info');

                // Set data after fetch
                setData(response.data);
                setIsLoading(false);

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
                setIsLoading(false);
            }
        };

        // If data are not fetched
        if (!data) {
            fetchData();
        }
    }, [data]); // Use useEffect when data change

    return (
        <>
            <div className="footer">
                {isLoading ? (

                    <span></span>

                ) : (data && (

                    <ul className='contact'>
                        <li>✉️ {JSON.stringify(data.info[0].mail).replace(/"/g, '')}</li>
                        <li>🏠 {JSON.stringify(data.info[0].adress).replace(/"/g, '')}</li>
                        <li>📱 0{JSON.stringify(data.info[0].tel).replace(/"/g, '')}</li>
                    </ul>

                ))}

                <h2>TruckBusters</h2>
            </div>
        </>
    );
}