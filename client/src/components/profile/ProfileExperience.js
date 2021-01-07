import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  experience: { company, title, location, from, to, description }
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      <Moment format='MM/DD/YYYY'>{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='MM/DD/YYYY'>{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Pozicija: </strong> {title}
    </p>
    <p>
      <strong>Lokacija: </strong> {location}
    </p>
    <p>
      <strong>Opis: </strong> {description}
    </p>
  </div>
)

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
}

export default ProfileExperience
