import Button from '../atomes/Button';
import './scss/header.scss';

export default function Header() {
    return (
        <div className="header">
            <img src='./src/assets/img/logo.png' width={100} height={85} alt="Logo" />
            <nav>
                <Button linkTo="/" btnClass="navButton">Accueil</Button>
                <Button linkTo="/appointment" btnClass="navButton">Prendre RDV</Button>
                <Button linkTo="/contact" btnClass="navButton">Contact</Button>
            </nav>
        </div>
    );
}