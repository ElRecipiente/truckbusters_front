import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {

    const { date } = useParams();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    const onSubmit = async (data) => {

        try {

            const formattedData = {
                start_date: data.start_date,
                society: {
                    name: data.society_name,
                    mail: data.society_mail,
                    driver: {
                        firstname: data.society_driver_firstname,
                        lastname: data.society_driver_lastname
                    },
                    vehicle: {
                        brand: data.society_vehicle_brand,
                        model: data.society_vehicle_model,
                        registration_number: data.society_vehicle_registration_number
                    }
                }
            };

            await axios.post('http://localhost:3333/api/v1/appointment/book', formattedData);

            console.log("Envoi réussi !");
            navigate("/confirmation");

        } catch (error) {

            console.error('Erreur lors de l\'envoi des données :', error);

        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div>
                <h2>COORDONNÉES ENTREPRISE</h2>
                <input
                    type="text" {...register("society_name", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="NOM" />
                <input
                    type="email"
                    {...register("society_mail", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="MAIL"
                />
            </div>

            <div>
                <h2>INFORMATIONS CHAUFFEUR</h2>
                <input
                    type="text"
                    {...register("society_driver_firstname", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="PRENOM"
                />
                <input
                    type="text"
                    {...register("society_driver_lastname", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="NOM"
                />
            </div>

            <div>
                <h2>INFORMATIONS VÉHICULE</h2>
                <input
                    type="text"
                    {...register("society_vehicle_brand", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="MARQUE"
                />
                <input
                    type="text"
                    {...register("society_vehicle_model", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="MODÈLE"
                />
                <input
                    type="text"
                    {...register("society_vehicle_registration_number", {
                        required: "Ce champ est requis."
                    })}
                    placeholder="IMMATRICULATION"
                />
            </div>

            <div>
                <h2>DATE RDV</h2>
                <input
                    type="text"
                    {...register("start_date")}
                    value={date}
                    readOnly
                />
            </div>
            <button type="submit">Enregistrer</button>
        </form>
    )
}



