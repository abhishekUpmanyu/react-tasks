import { useTheme } from "../theme/ThemeProvider";

export default function Subtitle(props) {
    const darkMode = useTheme();

    const style = {
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 24,
    };

    return (
        <div style={style}>
            {props.text}
        </div>
    );
}