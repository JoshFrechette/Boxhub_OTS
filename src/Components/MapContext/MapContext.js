import React, { createContext, useReducer, useContext, useState} from 'react';

// Manage global state for the mapmodal across the app and its components

export const MapContext = createContext();

export const MapModalProvider = (props) => {
    const [open, setOpen] = useState(false);
    const [origin, setOrigin] = useState('here');
    const [destination, setDestination] = useState('there');

    return (
        <MapContext.Provider value={{open: [open, setOpen], origin: [origin, setOrigin], destination: [destination, setDestination]}} >
            {props.children}
        </MapContext.Provider>
    );
}
