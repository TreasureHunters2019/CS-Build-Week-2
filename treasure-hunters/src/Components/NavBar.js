import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        background: "#000"
    },
    button: {
        fontSize: "18px",
        display: "flex",
        justifyContent: "flex-end",
        marginLeft: "20px"
    },
    title: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "18px"
    }
}));

const NavBar = ({currentRoom}) => {
    const classes = useStyles();
    console.log('this is the current room', currentRoom);
    
    return (
        <div className={classes.root}>
            <AppBar className={ classes.appBar} position="static" title="Lambda Treasure Hunt 💰">
                <Toolbar>
                    <div className={classes.title}>
                        <Link
                            style={{ fontSize: 36, color: "#ffd014", textDecoration: "none" }}
                            component={RouterLink}
                            to="/"
                        >
                            <span role="img" aria-label="moneybag">
                                💸💰
                            </span>{" "}
                            Treasure Hunters{" "}
                            <span role="img" aria-label="moneybag">
                                💰💸
                            </span>
                        </Link>
                    </div>
                    <Link
                        component={RouterLink}
                        to="/home"
                        style={{ color: "#ffd014", textDecoration: "none" }}
                        color="secondary"
                        className={classes.button}
                    >
                        Home
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
