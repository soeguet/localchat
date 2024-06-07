import type { MessagePayload } from "../../../../../utils/customTypes";
import { decodeBase64ToFile } from "../../../../../utils/encoder";

type PictureBubblePanelProps = {
        messagePayload: MessagePayload;

}
 
function PictureBubblePanel(props: PictureBubblePanelProps){
 console.log(props.messagePayload.imageType)
    if (props.messagePayload.imageType?.data === undefined || props.messagePayload.imageType?.data === null || props.messagePayload.imageType.data ==="") {
        return;
    }

    return (
        <>
            <div>
                <img src={props.messagePayload.imageType?.data} alt="message" className="w-64 h-64" />
            </div>
        </>
    );
}
 
export default PictureBubblePanel;