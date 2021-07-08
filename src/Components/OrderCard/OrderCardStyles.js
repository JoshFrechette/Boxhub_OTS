import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 5,
    },
    card: {
        padding: 10,
    },
    boxImage: {
        // height: 30,
        width: '100%',
    },
    subBoxImage: {
        margin: '40px 10px 40px 10px',
        textAlign: 'center',
        padding: 10,
        height: 250,
        width: 300,
        backgroundColor: '#d4d1d1',
    },
    subBoxImageText: {
        bottom: '50%',
    }
}))

export default useStyles;