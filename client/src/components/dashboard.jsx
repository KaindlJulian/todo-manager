import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CheckedIcon from '@material-ui/icons/CheckCircle';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from './navbar';
import green from '@material-ui/core/colors/green';
import GrpcClient from '../services/grpc-client'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';


var grpcClient;

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
    },
    checkedIcon: {
        color: green[400],
        padding: 0
    },
    heading: {
        marginTop: "auto",
        marginBottom: "auto",
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
});

class Dashboard extends React.Component {

    check = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    componentWillMount() {
        grpcClient = new GrpcClient();
    }

    componentDidMount() {
        console.log(grpcClient.listTodos());
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Navbar />

                <List>
                    {[0, 1, 2, 3].map(value => (
                        <ExpansionPanel
                            key={value}
                            role={undefined}
                        >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <IconButton aria-label="Delete" className={classes.button}>
                                    <CheckedIcon fontSize="large" className={classes.checkedIcon} />
                                </IconButton>
                                <Typography className={classes.heading}>Expansion Panel {value + 1}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                details
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </List>

                <Button variant="fab" className={classes.fab} color="secondary">
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);

/*

                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Location</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <div className={classes.column} />
                        <div className={classes.column}>
                            <Chip label="Barbados" className={classes.chip} onDelete={() => { }} />
                        </div>
                        <div className={classNames(classes.column, classes.helper)}>
                            <Typography variant="caption">
                                Select your destination of choice
                                <br />
                                <a href="#sub-labels-and-columns" className={classes.link}>
                                    Learn more
                                </a>
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small">Cancel</Button>
                        <Button size="small" color="primary">
                            Save
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
*/