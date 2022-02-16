import '../Dashboard/Dashboard.scss';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TripCard from '../TripCard/TripCard';
import { Link, useLocation } from 'react-router-dom';
import { store } from '../../state/store';
import { addUserToStore } from '../../state/userSlice';
import { getAllTripsAsync, getSharedTripAsync } from '../../state/tripSlice';

const Dashboard = () => {
  const state = useSelector((state) => state);
  const [currentUser, setCurrentUser] = useState('');
  const [currentTrips, setCurrentTrips] = useState([]);
  const [sharedTripId, setSharedTripId] = useState('')
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const retrievedUser = localStorage.getItem('savedUser');
  const parsedUser = JSON.parse(retrievedUser);


  const sendUserToStore = () => {
    dispatch(
      addUserToStore(parsedUser)
    )
    setCurrentUser(parsedUser)

  }

  const getSharedTrip = () => {
    let tripId = localStorage.getItem('sharedTripId')
    setSharedTripId(tripId)
    dispatch (
      getSharedTripAsync(tripId)
    )
  }

  const showSharedTrip = () => {
    if(!sharedTripId) {
      return (
        <p>You have no pending trips.</p>
      )
    } else {
      return (
        <>
          <p>You've been invited on a trip! We need a little more info.</p>
          <Link to="/add"><button>Click here</button></Link>
        </>
      )
    }
  }


  // const getAllTrips = () => {
  //   dispatch(
  //     getAllTripsAsync()
  //     )
  //     .then(() => {
  //     })
  //   }

  // const getDates = () => {
  //   state.users.trip_set.forEach(trip => 
  //     trip.proposed_dates.map(dateSet => {
  //       return (
          
  //             <p>{dateSet.start_date} - {dateSet.end_date}</p>
  //       )
  //     }))
  // }

  const createTripCards = () => {
    if(currentUser['trip_set']) {
      const currentUserCards = state.users['trip_set'].map((trip) => {
        console.log(trip)
        return (
          <TripCard
          key={Math.floor(Math.random() * .5)}
          tripName={trip.name}
          createdBy={trip.created_by}
          confirmed={trip.confirmed}
          budget={trip.budget}
          dates={trip.proposed_dates}
          // users={trip.users}
          />
          )
        })
        return currentUserCards
      }
      else {
        console.log('nothing here for ya')
      }
    }

  useEffect(() => {
    sendUserToStore()
    getSharedTrip()

    // getAllTrips()
  }, [])
  // setTimeout(() => {
  //   tripCards = createTripCards()

  // }, 4000)

  if (!state.users.id) {
    return (
      <h1>LMAO SUPER FUCK</h1>
    )
  } else {
    return (
      <div className="dashboard">
        <div className="dashboard-greeting">
          <h1>Welcome {currentUser.name}</h1>
          <p>Here's an overview of your account</p>
          {showSharedTrip()}
        </div>
        <div className="dashboard-content">
          <div className="create-invite-wrapper">
          <Link to="/schedule">
            <button className="dashboard-create-btn">Create a new trip</button>
          </Link>
          </div>
          <div className="dash-cards-wrapper">
            <h2>Your Trips</h2>
            <div className="dashboard-cards">
              {createTripCards()}
            </div>
          </div>
          {/* <p>You've been invited on a trip! We need a little more info.</p>
          <Link to="/add"><button>Click here</button></Link> */}
        </div>
      </div>
    )
  }
}

export default Dashboard