// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onClickStarChange} = props
  const {id, title, date, isStarred} = eachAppointment
  const imgSrc = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onClickStarChange(id)
  }

  return (
    <li className="li-item">
      <div className="li-heading-button">
        <p className="li-heading">{title}</p>
        <button type="button" onClick={onClickStar} testid="star">
          <img src={imgSrc} alt="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
