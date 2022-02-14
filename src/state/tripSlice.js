import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createNewTripAsync = createAsyncThunk(
  'trips/createNewTripAsync',
  async (payload) => {
    const resp = await fetch('https://free-tomorrow-be.herokuapp.com/trips/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trip_info: {
          name: payload.name,
          created_by: payload.email,
          budget: payload.budget
        },
        dates: payload.dates
      })
    })
    // });

    if (resp.ok) {
      const newTrip = await resp.json();
      // console.log(newTrip)
      return { newTrip };
    } else {
      // console.log(resp.errors)
      // state.error = resp.status
    }
  }
);

export const getAllTripsAsync = createAsyncThunk(
  'trips/getAllTripsAsync',
  async () => {
    const resp = await fetch('https://free-tomorrow-be.herokuapp.com/trips/')
    if (resp.ok) {
      const allTrips = await resp.json()
      return { allTrips }
    } else {
      console.log(resp.err)
    }
  },
)

export const getSharedTripAsync = createAsyncThunk(
  'trips/getSharedTripAsync',
  async (payload) => {
    console.log(payload, 'PAYLOAD!')
    const resp = await fetch(`https://free-tomorrow-be.herokuapp.com/trips/${payload}/`)
    if(resp.ok) {
      const sharedTrip = await resp.json()
      console.log(sharedTrip, 'SHARED TRIP JSON')
      return { sharedTrip }
    } else {
      console.log(resp.err)
    }
  }
)

export const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    tempTrip: {
      tripName: null,
      dates: [],
      budget: null
    },
    sharedTrip: {},
    allTrips: null,
    respTripId: []
  },
  reducers: {
    addDates: (state, action) => {
      const newDates = {
        start_date: action.payload.startDate,
        end_date: action.payload.endDate
      }
      state.tempTrip.dates.push(newDates)
    },
    addBudget: (state, action) => {
      state.tempTrip.budget = action.payload;
    },
    addEmails: (state, action) => {
      state.tempTrip.shareEmails = action.payload;
    }
  },
  extraReducers: {
    [createNewTripAsync.fulfilled]: (state, action) => {
      // something needs to go here. bad request
      const savedTrip = JSON.stringify(action.payload.newTrip)
      localStorage.setItem('savedTrip', savedTrip)
      // state.respTripId.push(action.payload.newTrip.id)
      state.allTrips = action.payload.newTrip
    },
    [getAllTripsAsync.pending] : (state,action) => {
      // console.log("PENDING")
    },
    [getAllTripsAsync.fulfilled]: (state, action) => {
      state.allTrips = action.payload.allTrips;
      // console.log(state.allTrips)
      // console.log("FULFILLED")
    },
    [getSharedTripAsync.pending]: (state, action) => {
      // state.sharedTrip = action.payload.sharedTrip;
      console.log(action.payload, 'pending')
      // console.log(action.payload)
    },
    [getSharedTripAsync.fulfilled]: (state, action) => {
      state.sharedTrip = action.payload.sharedTrip;
      console.log(action.payload, 'fulfilled')
      // console.log(action.payload)
    }
  },

})

export const { addDates, addBudget, addEmails } = tripSlice.actions

export default tripSlice.reducer