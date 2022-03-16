import { useTheme } from "../theme/ThemeProvider";

export default function Caption(props) {
    const darkMode = useTheme();

    const style = {
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 12,
    };

    return (
        <div style={style}>
            {props.text}
        </div>
    );
}