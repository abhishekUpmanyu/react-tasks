import { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";

function getLocalValue(key, initialValue) {
    const value = localStorage.getItem(key);
    return JSON.parse(value) || ((initialValue instanceof Function) ? initialValue() : initialValue);
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => getLocalValue(key, initialValue));

    const setThisValue = (data) => { setValue(cloneDeep(data)); };

    useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); },
        [value]
    );

    return [value, setThisValue];
}