import { useTheme } from "../theme/ThemeProvider";

export default function TitleInput({ value, onChange }) {
    const darkMode = useTheme();

    const style = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: darkMode ? '#ffffff' : '#000000',
        fontSize: 36,
        outline: 'none',
    };

    return (
        <input value={value} style={style} onChange={onChange} type="text" />
    );
}