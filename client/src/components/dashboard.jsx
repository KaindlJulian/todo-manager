import React from 'react';
import PropTypes from 'prop-types';

import GrpcClient from '../services/grpc-client'
import Navbar from './navbar';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CheckedIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';

var grpcClient;

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    checkButton: {
        marginRight: theme.spacing.unit * 1.5
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
    },
    form: {
        overflow: 'hidden',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Dashboard extends React.Component {

    todos = [];

    state = {
        open: false,
        titleValue: '',
        bodyValue: '',
    };

    componentWillMount() {
        grpcClient = new GrpcClient();
    }

    componentDidMount() {
        this.getTodos()
    }

    getTodos() {
        grpcClient.listTodos().then((data) => {
            this.todos = data.todosList;
            const newState = Object.assign({}, this.state, {
                todos: data.todoList
            });
            this.setState(newState);
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            titleValue: '',
            bodyValue: '',
        });
    };

    handleSubmit = () => {
        if (this.state.titleValue) {
            grpcClient.insertTodo(this.todos.length + 1, this.state.titleValue, this.state.bodyValue)
                .then(() => {
                    this.getTodos();
                });

            this.setState({
                open: false,
                titleValue: '',
                bodyValue: '',
            });
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleDelete = id => () => {
        grpcClient.deleteTodo(id).then(() => {
            this.getTodos();
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Navbar />

                <List>
                    {this.todos.map(todo => (
                        <ListItem
                            key={todo.id}
                            role={undefined}
                        >
                            <ListItemText primary={todo.title} secondary={todo.body ? todo.body : '-'} />
                            <ListItemSecondaryAction>
                                <Tooltip title="Mark as done" placement="left">
                                    <IconButton onClick={this.handleDelete(todo.id)} className={classes.checkButton} aria-label="Done">
                                        <CheckedIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                <Button variant="fab" className={classes.fab} onClick={this.handleClickOpen} color="secondary">
                    <AddIcon />
                </Button>

                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Add a new Task
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">

                        </DialogContentText>
                        <form className={classes.form} autoComplete="off">
                            <TextField
                                className={classes.textField}
                                label="Title"
                                value={this.state.titleValue}
                                onChange={this.handleChange('titleValue')}
                                margin="normal"
                            />
                            <TextField
                                className={classes.textField}
                                label="Description"
                                value={this.state.bodyValue}
                                onChange={this.handleChange('bodyValue')}
                                multiline
                                rows="4"
                                margin="normal"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={this.handleSubmit} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);