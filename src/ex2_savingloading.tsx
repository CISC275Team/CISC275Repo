//Example:
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { json } from "stream/consumers";
import { DegreePlan } from "./interfaces/degreeplan";
import degreeplan_json from "./ex2_dummydata.json";

//load in json data
const DEGREEPLANS: DegreePlan[] = degreeplan_json.map(
    (dp): DegreePlan => ({ ...dp })
);

//this is the initial data if the user is new
let loaded_data = DEGREEPLANS;
//this will be the key we use to access previous data
const SAVE_KEY = "MY-PAGE-DEGREEPLANS";
const previousData = localStorage.getItem(SAVE_KEY);
//load data if previoudData was found into loaded_data which will either default to 3 or to previous data
if (previousData !== null) {
    loaded_data = JSON.parse(previousData);
}

export function DegreePlanView(): JSX.Element {
    const [degreePlan, setdegreePlan] = useState<DegreePlan[]>(loaded_data);
    const showData = () => console.log(degreePlan);
    return (
        <div>
            <Button onClick={showData}> Show JSON</Button>
        </div>
    );
}
