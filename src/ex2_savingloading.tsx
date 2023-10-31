//Example:
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { json } from "stream/consumers";
import { DegreePlan } from "./interfaces/degreeplan";
import degreeplan_json from "./ex2_dummydata.json";

//have some variable that keeps track of id's, notice from the json file we already have id's 1 and 2 taken, so we would start from there
let idCount: number = 2;

//load in json data
//dp = degreeplan
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
    const [degreePlans, setdegreePlan] = useState<DegreePlan[]>(loaded_data);
    const showData = () => console.log(degreePlans);
    //check if newDp does not exist and add it
    function addDegreePlan(newDp: DegreePlan) {
        const dpExist = degreePlans.find(
            (dp: DegreePlan): boolean => dp.id === newDp.id
        );
        if (dpExist === undefined) {
            setdegreePlan([...degreePlans, newDp]);
        }
    }
    return (
        <div>
            <Button onClick={showData}> Show JSON</Button>
        </div>
    );
}
