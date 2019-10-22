import React from "react";

const Notification = ({ message }) => {
    const notificationStyle = {
        color: "green",
        fontStyle: "italic",
        fontSize: 16,
        border: "1px solid green",
        padding: 8
    };

    if (message === null) {
        return null;
    }

    return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
