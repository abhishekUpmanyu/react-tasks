import { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

export default function BodyTextInputArea({ value, onChange }) {
    const [height, setHeight] = useState('18px');
    const textAreaRef = useRef(null);
    const darkMode = useTheme();

    useEffect(() => {
        setHeight(textAreaRef.current.scrollHeight);
    }, [value]);

    const style = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 18,
        height: height,
        outline: 'none',
        resize: 'none',
    };

    const updateHeight = (el) => {
        console.log(el);
        setHeight(el.scrollHeight);
    }

    return (
        <textarea
            ref={textAreaRef}
            style={style}
            value={value}
            onChange={onChange}
            type="text"
        />
    );
}