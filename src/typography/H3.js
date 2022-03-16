import { useTheme } from "../theme/ThemeProvider";

export default function H3(props) {
    const darkMode = useTheme();

    const style = {
        color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        fontSize: 12,
        fontWeight: 600,
    };

    return (
        <div style={style}>
            {props.text}
        </div>
    );
}