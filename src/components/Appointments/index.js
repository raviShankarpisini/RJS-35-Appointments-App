import React, { useState } from "react";
import { v4 } from "uuid";
import { format } from "date-fns";
import AppointmentItem from "../AppointmentItem";
import "./index.css";

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);

  const toggleIsStarred = (id) => {
    setAppointmentsList((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, isStarred: !appointment.isStarred }
          : appointment
      )
    );
  };

  const onFilter = () => {
    setIsFilterActive((prev) => !prev);
  };

  const onChangeDateInput = (event) => {
    setDateInput(event.target.value);
  };

  const onChangeTitleInput = (event) => {
    setTitleInput(event.target.value);
  };

  const onAddAppointment = (event) => {
    event.preventDefault();
    const formattedDate = dateInput
      ? format(new Date(dateInput), "dd MMMM yyyy, EEEE")
      : "";
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    };

    setAppointmentsList((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
    setTitleInput("");
    setDateInput("");
  };

  const getFilteredAppointmentsList = () => {
    if (isFilterActive) {
      return appointmentsList.filter(
        (appointment) => appointment.isStarred === true
      );
    }
    return appointmentsList;
  };

  const filteredAppointmentsList = getFilteredAppointmentsList();
  const filterClassName = isFilterActive ? "filter-filled" : "filter-empty";

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="appointments-container">
          <div className="add-appointment-container">
            <form className="form" onSubmit={onAddAppointment}>
              <h1 className="add-appointment-heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={onChangeTitleInput}
                className="input"
                placeholder="Title"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={dateInput}
                onChange={onChangeDateInput}
                className="input"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="hr" />
          <div className="header-with-filter-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map((eachAppointment) => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
