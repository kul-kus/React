import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

class ColoredLinearProgress extends Component {
    render() {
        const { classes, primaryColor, secondaryColor, variant } = this.props;
        console.log("ColoredLinearProgress -> render -> classes", primaryColor)
        console.log("ColoredLinearProgress -> render ===-> classes", classes)

        return <LinearProgress style={{ height: "5px" }} {...this.props} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />;
    }
}

const styles = props => ({
    colorPrimary: {
        backgroundColor: '#00a0db',
    },
    barColorPrimary: {
        backgroundColor: '#fdfdfd'
    }
});

export default withStyles(styles)(ColoredLinearProgress);