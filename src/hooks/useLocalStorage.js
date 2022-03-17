import { useState, useEffect } from "react";

function getLocalValue(key, initialValue) {
    const value = localStorage.getItem(key);
    return JSON.parse(value) || ((initialValue instanceof Function) ? initialValue() : initialValue);
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => getLocalValue(key, initialValue));

    const setThisValue = (data) => {setValue(data); localStorage.setItem(key, JSON.stringify(value)); console.log('updated')};

    useEffect(() => { console.log('hi', value)},
        [value]
    );

    return [value, setThisValue];
}