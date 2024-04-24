import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles"

const useStyles: any = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: "80px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        
    },

    successText: {
        color: theme.palette.success.main,
        marginBottom: "160px",
    },

    button: {
        marginTop: "16px"
    }
}));

export default useStyles;