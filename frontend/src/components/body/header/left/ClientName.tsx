import useClientStore from "../../../../stores/clientStore";
import useUserStore from "../../../../stores/userStore";
import useDoNotDisturbStore from "../../../../stores/doNotDisturbStore";
import Timer from "../../../reuseable/Timer";

function ClientName() {

    const clientDbId = useUserStore((state) => state.myId);
    const username = useClientStore(
        (state) =>
            state.clients.find((c) => c.clientDbId === clientDbId)?.clientUsername
    );

    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

    return (
        <>
            {
                doNotDisturb
                    ?
                    <div className="flex">
                        <span className="ml-3 font-medium mr-1">Do Not Disturb:</span>
                        <Timer/>
                    </div>
                    :
                    <span className="ml-3 font-medium">{username}</span>
            }
        </>
    );
}

export default ClientName;