//Example:
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { json } from "stream/consumers";

//this is the initial data if the user is new
let loaded_data = "3";
//this will be the key we use to access previous data
const SAVE_KEY = "MY-PAGE-DATA";
const previousData = localStorage.getItem(SAVE_KEY);
//load data if previoudData was found into loaded_data which will either default to 3 or to previous data
if (previousData !== null) {
    loaded_data = JSON.parse(previousData);
}

export function DegreePlanView(): JSX.Element {
    const [attemptsLeft, setAttemptsLeft] = useState<string>(loaded_data);
    const [requestedAttempts, setRequestedAttempts] = useState<string>("");
    function updateRequestedAttempts(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setRequestedAttempts(event.target.value);
    }
    function saveData() {
        localStorage.setItem(SAVE_KEY, JSON.stringify(attemptsLeft));
    }

    return <div></div>;
}
