import { useEffect, useRef } from "react";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

import "./LinkifiedText.css";

interface Props {
    text: string;
}

function LinkifiedText({ text }: Props) {
    // need a ref, ids screw up the selection and only the first message will be clickable
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const handleClick = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                if (target.matches(".detected-link")) {
                    event.preventDefault();
                    const url = target.getAttribute("href");
                    if (url) {
                        handleLinkClick(url);
                    }
                }
            };

            const element = textRef.current;
            element.addEventListener("click", handleClick);

            return () => {
                element.removeEventListener("click", handleClick);
            };
        }
    }, []);

    function linkify(inputText: string) {
        let replacedText: string;

        // URLs starting with http://, https://, or ftp://
        const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
        replacedText = inputText.replace(
            replacePattern1,
            "<a href='$1' target='_blank' rel='noopener noreferrer' class='clickable-link detected-link'>$1</a>"
        );

        // URLs starting with "www." (without // before it, or it'd re-link the ones done above)
        const replacePattern2 = /(^|[^\\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(
            replacePattern2,
            "$1<a href='http://$2' target='_blank' rel='noopener noreferrer' class='clickable-link detected-link'>http://$2</a>"
        );

        // CAVE: MAIL TO LINKS SCREW UP GO BACKEND -- NEEDS TO BE FIXED (add class detected-link and href='mailto:$1'>$1</a>)
        // Change email addresses to mailto:: links
        const replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
        replacedText = replacedText.replace(replacePattern3, "<a class='clickable-link'>$1</a>");

        if (replacedText === inputText) {
            return { changed: false, newText: inputText };
        }

        return { changed: true, newText: replacedText };
    }

    function handleLinkClick(url: string) {
        //console.log("Opening URL:", url);
        BrowserOpenURL(url);
    }

    const createMarkup = () => {
        const { changed, newText } = linkify(text);
        if (changed) {
            return { changed: true, __html: newText };
        } else {
            return { changed: false, text: text };
        }
    };

    const markup = createMarkup();

    if (!markup.changed) {
        return <>{text}</>;
    } else if (markup.changed && markup.__html !== undefined){
        return <div ref={textRef} dangerouslySetInnerHTML={{ __html: markup.__html }} />;
    }
}

export default LinkifiedText;
