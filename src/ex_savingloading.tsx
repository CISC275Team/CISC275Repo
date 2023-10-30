// SAVING AND LOADING A DEGREE PLAN

/* How it work: 
The user will be working on a degree plan which is:
    - a degree plan is a collection of semesters, and a semester is a collection of courses.
We want to allow the user to be able to:
    1) refresh page and still retain the degree plan they were working on once the page loads back up 
    2) have a save button that once the user presses will save the dataset in local storage
        - both 1 and 2 kind of tie into each other, the user must save the data in order to retain
          the degree plan. (maybe i can make this functionality better later)

Resources I can use (will update as I go along):
    - https://frontend-fun.github.io/react-hooks-typescript-tome/7-extras/saving.html
*/

/* 
-   I think the first thing that is going to happen is to check whether or not the user
    has existed before and if so we can load in the data, if no then we load in some 
    default data
    
-   This functionality will be one of the first things that happens when the program runs
-   It will work like this...
    - Program starts
    - We create some default data that the user starts with
    - We then create some unique key that we will use to fetch data 
    - we will then check IF the key we created already exists in LocalStorage, if so load that data instead
      of the default data
    - The state that holds the data for the degree plan will start with either the default or stored data
    - We will then have a save button that saves the key and the data to that key in LocalStorage

*/

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

interface RevealRequestButtonProps {
    setAttemptsLeft: (newAttemptsLeft: string) => void;
    requestedAttempts: string;
    attemptsLeft: string;
}
function RequestedAttemptButton({
    setAttemptsLeft,
    requestedAttempts,
    attemptsLeft
}: RevealRequestButtonProps): JSX.Element {
    //make them integers and add them
    const requestedAttemptstoNum: number = parseInt(requestedAttempts, 10) || 0;
    const addedAttempts: number =
        requestedAttemptstoNum + parseInt(attemptsLeft, 10);
    return (
        <Button onClick={() => setAttemptsLeft(`${addedAttempts}`)}>
            gain
        </Button>
    );
}
interface RevealUseButtonProps {
    setAttemptsLeft: (newAttemptsLeft: string) => void;
    attemptsLeft: string;
}
function UseButton({
    setAttemptsLeft,
    attemptsLeft
}: RevealUseButtonProps): JSX.Element {
    return (
        <Button
            onClick={() => setAttemptsLeft(`${parseInt(attemptsLeft, 10) - 1}`)}
            disabled={parseInt(attemptsLeft, 10) === 0}
        >
            use
        </Button>
    );
}

export function GiveAttempts(): JSX.Element {
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

    return (
        <div>
            <div>Number of attempts left: {attemptsLeft}</div>
            <Form.Group controlId="formRequestedAttempts">
                <Form.Label>Requested Attempts: </Form.Label>
                <Form.Control
                    type="number"
                    value={requestedAttempts}
                    onChange={updateRequestedAttempts}
                ></Form.Control>
            </Form.Group>
            <RequestedAttemptButton
                setAttemptsLeft={setAttemptsLeft}
                requestedAttempts={requestedAttempts}
                attemptsLeft={attemptsLeft}
            ></RequestedAttemptButton>
            <UseButton
                setAttemptsLeft={setAttemptsLeft}
                attemptsLeft={attemptsLeft}
            ></UseButton>
            <Button onClick={saveData}>Save</Button>
        </div>
    );
}
