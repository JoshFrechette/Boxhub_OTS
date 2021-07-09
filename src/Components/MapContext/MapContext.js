import React, { createContext, useReducer, useContext, useState} from 'react';

export const MapContext = createContext();

export const MapModalProvider = (props) => {
    const [open, setOpen] = useState(true);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    return (
        <MapContext.Provider open={open} origin={origin} destination={destination}>
            {props.children}
        </MapContext.Provider>
    );
}


// const { Provider } = MapContext;

// const mapReducer = (state, action) => {
//     console.log("state: ", state)
//     const modalOpen = state.open;
//     const mapOrigin = state.origin;
//     const mapDestination = state.origin;
//     console.log("Modal State: ", modalOpen, mapOrigin, mapDestination)
// };

// const MapModalProvider = ({
//     value = {
//         modal: {
//             open: false,
//             origin: '',
//             destination: '',
//         },
//     },
//     ...props
// }) => {
//     const [state, dispatch] = useReducer(mapReducer, {...value });

//     return <Provider value={[state, dispatch]} {...props} />;
// };

// const useMapContext = () => {
//     return useContext(MapContext);
// };

// console.log(MapModalProvider)
