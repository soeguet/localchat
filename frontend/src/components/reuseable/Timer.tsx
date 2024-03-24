import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";

function Timer() {
    const {t} = useTranslation()
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <>
            <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} {t("timer_time_left")}</span>
        </>
    );
}

export default Timer;