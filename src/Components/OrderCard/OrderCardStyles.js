import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        margin: 5,
    },
    card: {
        // padding: 10,
    },
    boxImage: {
        // height: 30,
        width: '100%',
    },
    subBoxImage: {
        position: 'relative',
        margin: '40px 10px 40px 10px',
        padding: 10,
        height: 250,
        width: 300,
        backgroundColor: '#d4d1d1',
    },
    subBoxImageText: {
        position: 'absolute',
        top: '50%',
        left: '30%',
    }
}))

export default useStyles;