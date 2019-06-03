import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, withRouter } from "react-router-dom";

const styles = {
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
};

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [
                { route: "/home", text: "Home" },
                { route: "/todo", text: "Todo" }
            ],
        }
    }

    changeLink = (link) => {
        this.props.history.push(link)
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer open={this.props.drawerOpen} onClose={this.props.onClose} >
                <div className={classes.list} onClick={this.props.onClose}>
                    <List>
                        {this.state.Items.map((Item, index) => (
                            <ListItem
                                key={Item.text}
                                button
                                onClick={() => this.changeLink(Item.route)}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={Item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        );
    }
}

export default withRouter(withStyles(styles)(SideBar));