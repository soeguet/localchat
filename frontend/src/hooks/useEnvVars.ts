// import { useState } from "react";
// import { GetLocalChatEnvVars } from "../../wailsjs/go/main/App";
// import { EnvVars } from "../utils/customTypes";

// function useEnvVars() {
//     async function retrieveLocalClientEnvVariables(): Promise<EnvVars> {
//         const clientEnvVars = await GetLocalChatEnvVars();
//         return JSON.parse(clientEnvVars);
//     }
//
//     const [envVars, setEnvVars] = useState<EnvVars>({
//         id: "",
//         username: "",
//         ip: "",
//         port: "",
//         os: "",
//     });
//
//     const checkIfAllEnvVarsAreSet = (envVars: EnvVars) => {
//         return (
//             envVars.username !== "" &&
//             envVars.ip !== "" &&
//             envVars.port !== "" &&
//             envVars.os !== ""
//         );
//     };
//
//     const handleEnvVarsChange = (newEnvVars: EnvVars) => {
//         setEnvVars(newEnvVars);
//     };
//
//     const checkForEnvData = async () => {
//         await retrieveLocalClientEnvVariables().then((data: EnvVars) => {
//             const envs = {
//                 id: data.id,
//                 username: data.username,
//                 ip: data.ip,
//                 port: data.port,
//                 os: data.os,
//             };
//             console.log("envs", envs);
//             setEnvVars(envs);
//         });
//     };
//
//     checkForEnvData().finally(() => {
//         console.log("Env vars set.");
//     });
//
//     // useEffect(() => {
//     //     const checkForEnvData = async () => {
//     //         await retrieveLocalClientEnvVariables().then((data: EnvVars) => {
//     //             const envs = {
//     //                 id: data.id,
//     //                 username: data.username,
//     //                 ip: data.ip,
//     //                 port: data.port,
//     //                 os: data.os,
//     //             };
//     //             console.log("envs", envs);
//     //             setEnvVars(envs);
//     //         });
//     //     };
//     //
//     //     checkForEnvData().finally(() => {
//     //         console.log("Env vars set.");
//     //     });
//     // }, []);
//
//     return [envVars, handleEnvVarsChange, checkIfAllEnvVarsAreSet];
// }

// export default useEnvVars;

