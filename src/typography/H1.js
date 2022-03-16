import { useTheme } from "../theme/ThemeProvider";

export default function H1(props) {
    const darkMode = useTheme();

    const style = {
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 32,
    };

    return (
        <div style={style}>
            {props.text}
        </div>
    );
}