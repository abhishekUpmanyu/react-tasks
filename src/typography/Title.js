import { useTheme } from "../theme/ThemeProvider";

export default function Title(props) {
    const darkMode = useTheme();

    const style = {
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 36,
    };

    return (
        <div style={style}>
            {props.text}
        </div>
    );
}