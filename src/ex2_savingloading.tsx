//Example:
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { json } from "stream/consumers";
import { DegreePlan } from "./interfaces/degreeplan";
import degreeplan_json from "./ex2_dummydata.json";
import { AddDegreePlanModule } from "./ex2_component";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";

//have some variable that keeps track of id's, notice from the json file we already have id's 1 and 2 taken, so we would start from there

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
    const [degreePlans, setdegreePlans] = useState<DegreePlan[]>(loaded_data);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    //handles opening and closing the popup (modal)
    const handleCloseModal = () => setShowAddModal(false);
    const handleShowModal = () => setShowAddModal(true);

    //add new dp
    function addDegreePlan(title: string) {
        setdegreePlans([
            ...degreePlans,
            { title: title, id: 0, totalCredits: 0, semestersList: [] }
        ]);
    }

    //allow the user to save the data to local storage
    function saveData() {
        localStorage.setItem(SAVE_KEY, JSON.stringify(degreePlans));
    }
    return (
        <div>
            <h2>Degree Plans</h2>
            <Row>
                <Col>
                    {degreePlans.map((dp: DegreePlan) => (
                        <div key={dp.title} style={{ marginBottom: "4px" }}>
                            <h2>{dp.title}</h2>
                            <p>ID: {dp.id}</p>
                            <p>Total Credits: {dp.totalCredits}</p>
                            <Row>
                                <Col>
                                    {dp.semestersList.map(
                                        (semester: Semester) => (
                                            <div
                                                key={semester.title}
                                                style={{ marginBottom: "4px" }}
                                            >
                                                <h5>{semester.title}</h5>
                                                <p>
                                                    Semester Total Credits:{" "}
                                                    {semester.totalCredits}
                                                </p>
                                                <Row>
                                                    <Col>
                                                        {semester.classesList.map(
                                                            (
                                                                course: Course
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        course.classTitle
                                                                    }
                                                                    style={{
                                                                        marginBottom:
                                                                            "4px"
                                                                    }}
                                                                >
                                                                    <h5>
                                                                        {
                                                                            course.classTitle
                                                                        }
                                                                    </h5>
                                                                    <p>
                                                                        Course
                                                                        Credits:{" "}
                                                                        {
                                                                            course.credits
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Course
                                                                        Credits:{" "}
                                                                        {
                                                                            course.classCode
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    )}
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
            </Row>
            <Button className="add_btn" onClick={handleShowModal}>
                Add New Quiz
            </Button>
            {showAddModal && (
                <AddDegreePlanModule
                    show={showAddModal} //should be true until its not once the user clicks close
                    handleClose={handleCloseModal} //close modal since it is now open
                    addDp={addDegreePlan}
                ></AddDegreePlanModule>
            )}
            <Button onClick={saveData}>Save</Button>
        </div>
    );
}

//{dp.semestersList.map((semester: Semester) =>())}
