import './scss/footer.scss';
import { useLoaderData } from "react-router-dom"

export default function Footer() {
    const infos = useLoaderData().info[0];
    console.log(infos);
    return (
        <div className="footer">
        <ul className='contact'>
            <li>✉️ {infos.mail}</li>
            <li>🏠 {infos.adress}</li>
            <li>📱 0{infos.tel}</li>
        </ul>
            <h2>TruckBusters</h2>
        </div>
    );
}