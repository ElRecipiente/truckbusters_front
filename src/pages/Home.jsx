import Button from "../atomes/Button"
import "./scss/home.scss"

export default function Home() {
    return (
        <div>
            <h1>TruckBusters, Contrôle Technique Poids Lourd</h1>
            <ul>
                <li>Un moteur qui ricane ?</li>
                <li>Un fantôme sous le capot ?</li>
                <li>Vous ne savez plus qui appeler ?</li>
                <li>N’hésitez plus, contactez nous !</li>
            </ul>
            <Button linkTo={"/appointment"} btnClass="buttonCTA">Prendre RDV</Button>

        </div>
    )
}