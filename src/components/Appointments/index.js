// Write your code here

import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialAppointmentsList = []
class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
    isFilteredItems: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dateInFormat = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointmentItem = {
      id: uuid(),
      title,
      date: dateInFormat,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmentItem],
      title: '',
      date: '',
    }))
  }

  onClickStarChange = id => {
    const {appointmentsList} = this.state

    const newListAfterStar = appointmentsList.map(eachItem => {
      if (id === eachItem.id) {
        return {...eachItem, isStarred: !eachItem.isStarred}
      }
      return eachItem
    })
    this.setState({appointmentsList: newListAfterStar})
  }

  onClickStarredItemsButton = () => {
    const {isFilteredItems} = this.state
    this.setState({isFilteredItems: !isFilteredItems})
  }

  filteringBasedOnStar = () => {
    const {isFilteredItems, appointmentsList} = this.state
    if (isFilteredItems) {
      return appointmentsList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFilteredItems} = this.state
    const filteredList = this.filteringBasedOnStar()
    const filterButton = isFilteredItems
      ? 'button-with-filter'
      : 'button-without-filter'

    return (
      <div className="app-container">
        <div className="Appointments-container">
          <div className="top-container">
            <div className="details-container">
              <form onSubmit={this.onSubmitForm} className="form">
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="input-title">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={this.onChangeTitle}
                  placeholder="title"
                />
                <label className="input-title" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={this.onChangeDate}
                  id="date"
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="hr-line" />
          <div className="bottom-container">
            <div className="heading-and-star">
              <h1 className="appointments-subheading">Appointments</h1>
              <button
                type="button"
                className={filterButton}
                onClick={this.onClickStarredItemsButton}
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  onClickStarChange={this.onClickStarChange}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
