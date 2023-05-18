import React, {useState} from "react";
import {Badge, IconButton, Menu, MenuItem} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {BsHandbag} from "react-icons/bs";
import * as PropTypes from "prop-types";

export default function HeaderMenuSmall(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>

            <Badge badgeContent={props.cartCounter} color="secondary">
                <IconButton onClick={handleMenuOpen} size="large" edge="end" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
            </Badge>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
                  anchorOrigin={{vertical: "top", horizontal: "right"}}
                  transformOrigin={{vertical: "top", horizontal: "right"}}>
                <MenuItem component={NavLink} to="/">
                    Main Page
                </MenuItem>
                <MenuItem component={NavLink} to="/products">
                    All Products
                </MenuItem>
                <MenuItem component={NavLink} to="/sales/all">
                    All Sales
                </MenuItem>
                <MenuItem component={NavLink} to="/bucket">
                    <Badge badgeContent={props.cartCounter} color="secondary">
                        <BsHandbag/>
                    </Badge>
                </MenuItem>
            </Menu>

        </>
    );
}

HeaderMenuSmall.propTypes = {cartCounter: PropTypes.any};