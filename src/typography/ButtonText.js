import { useTheme } from "../theme/ThemeProvider";

export default function BodyText(props) {
    const darkMode = useTheme();

    const style = {
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 14,
    };

    return (
        <div style={style}>
            {props.text}
        </div>
    );
}