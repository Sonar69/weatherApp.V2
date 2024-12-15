import React, {useEffect, useState} from "react";
import "../css/video.css";

const WeatherCode = ({code}) => {
    const [currentVideo, setCurrentVideo] = useState("");
    const [description, setDescription] = useState("");

    // fonction d'appel de la videos et description grace au weather code fournit
    const getWeatherDescription = (code) => {
        let videoName = "";
        let desc = "";

        // condition pour la description et la videos en fonction du weather code
        switch (code) {
            case 0:
                desc = 'Ciel dégagé';
                videoName = 'sun';
                break;
            case 1:
                desc = 'Principalement dégagé';
                videoName = 'sun';
                break;
            case 2:
                desc = 'Partiellement nuageux';
                videoName = 'cloud';
                break;
            case 3:
                desc = 'Couvert';
                videoName = 'cloud';
                break;
            case 45:
                desc = 'Brouillard';
                videoName = 'cloud';
                break;
            case 48:
                desc = 'Brouillard givrant';
                videoName = 'cloud';
                break;
            case 51:
                desc = 'Bruine : Légère';
                videoName = 'rain';
                break;
            case 53:
                desc = 'Bruine : Modérée';
                videoName = 'rain- une vidéo spécifique';
                break;
            case 55:
                desc = 'Bruine : Forte intensité';
                videoName = 'rain';
                break;
            case 56:
                desc = 'Bruine verglaçante : Légère';
                videoName = 'rain';
                break;
            case 57:
                desc = 'Bruine verglaçante : Forte intensité';
                videoName = 'rain';
                break;
            case 61:
                desc = 'Pluie : Faible';
                videoName = 'rain- une vidéo spécifique';
                break;
            case 63:
                desc = 'Pluie : Modérée';
                videoName = 'rain';
                break;
            case 65:
                desc = 'Pluie : Forte intensité';
                videoName = 'rain';
                break;
            case 66:
                desc = 'Pluie verglaçante : Légère';
                videoName = 'rain';
                break;
            case 67:
                desc = 'Pluie verglaçante : Forte intensité';
                videoName = 'rain';
                break;
            case 71:
                desc = 'Chute de neige : Légère intensité';
                videoName = 'snow';
                break;
            case 73:
                desc = 'Chute de neige : Intensité modérée';
                videoName = 'snow- une vidéo spécifique';
                break;
            case 75:
                desc = 'Chute de neige : Intensité forte';
                videoName = 'snow- une vidéo spécifique';
                break;
            case 77:
                desc = 'Grains de neige';
                videoName = 'snow- une vidéo spécifique';
                break;
            case 80:
                desc = 'Averses de pluie : Légères';
                videoName = 'rain';
                break;
            case 81:
                desc = 'Averses de pluie : Modérées';
                videoName = 'rain';
                break;
            case 82:
                desc = 'Averses de pluie : Violentes';
                videoName = 'rain';
                break;
            case 85:
                desc = 'Averses de neige : Légères';
                videoName = 'rain';
                break;
            case 86:
                desc = 'Averses de neige : Fortes';
                videoName = 'rain';
                break;
            case 95:
                desc = 'Orage : Léger ou modéré';
                videoName = 'thunderstorm';
                break;
            case 96:
                desc = 'Orage avec légères précipitations';
                videoName = 'thunderstorm';
                break;
            case 99:
                desc = 'Orage avec fortes précipitations de grêle';
                videoName = 'thunderstorm';
                break;
            default:
                desc = 'Erreur : code inconnu';
        }

        return {desc, videoName};
    }

    // Mettre à jour la description et le nom de la videos
    useEffect(() => {
        const {desc, videoName} = getWeatherDescription(code);
        setCurrentVideo(videoName);
        setDescription(desc);
        if (videoName) {
            console.log(`Afficher la vidéo : ${videoName}`);
        }
    }, [code])

    return (
        <div>
            {currentVideo && (
                // Afficher la vidéo en arrière-plan pour le meilleur affichage
                <video
                    id={currentVideo}
                    className="video-weather-background"
                    autoPlay
                    loop
                    muted>
                    {/* chemin relatif au dossier public : /videos... */}
                    <source src={`/videos/${currentVideo}.mp4`} type="video/mp4"/>
                    Votre navigateur ne supporte pas les video.
                </video>
            )}
        </div>
    );
}

export default WeatherCode;