// import React, { createContext, ReactNode, useEffect, useState } from "react";
// import NetInfo from "@react-native-community/netinfo";

// interface NetInfoProps {
//   type: string;
//   isConnected: boolean;
//   isInternetReachable: boolean | null | undefined;
// }

// const NetInfoContext = createContext({} as NetInfoProps);

// interface ProviderProps {
//   children: ReactNode;
// }

// export const NetInfoProvider: React.FC<ProviderProps> = (props) => {
//   const [connectionDetails, setconnectionDetails] = useState<NetInfoProps>({
//     isConnected: false,
//     isInternetReachable: false,
//     type: "",
//   });

//   useEffect(() => {
//     NetInfo.addEventListener((state) => {
//       const { isConnected, type, isInternetReachable } = state;

//       setconnectionDetails({ isConnected, type, isInternetReachable });
//     });
//   }, []);

//   return (
//     <NetInfoContext.Provider value={connectionDetails}>
//       {props.children}
//     </NetInfoContext.Provider>
//   );
// };

// export default NetInfoContext;
