//importing LOGIN constants
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants";
import { GET_COURSES_REQUEST, GET_COURSES_SUCCESS, GET_COURSES_FAILURE } from "../constants"
import { GET_LESSONS_REQUEST, GET_LESSONS_SUCCESS, GET_LESSONS_FAILURE } from "../constants"
import { SET_COURSE_IDREQ , SET_COURSE_IDSUCCESS , SET_COURSE_IDFAIL } from "../constants"
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../constants";
import { GET_ALL_INSTRUCTORS_REQUEST , GET_ALL_INSTRUCTORS_SUCCESS , GET_ALL_INSTRUCTORS_FAILURE } from "../constants"
import { GET_ALL_STUDENTS_REQUEST , GET_ALL_STUDENTS_SUCCESS , GET_ALL_STUDENTS_FAILURE } from "../constants"
import { ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE } from "./constants";
import { createSession, destroySession, validateSession } from "./sessions";
import axios from "axios";

//action: LOGIN_SUCCESS once backend call is successfull
const loginSuccess = (authObj) => ({
  type:    LOGIN_SUCCESS,
  isFetchingAuth: false,
  isAuthenticatedUser: true,
  payload: authObj,
});

//action: LOGIN_FAILURE if backend call is unsuccessful
const loginFailed = (error) => ({
  type:    LOGIN_FAILURE,
  isFetchingAuth: false,
  isAuthenticatedUser: false,
  payload: error,
});

//action: LOGIN_REQUEST  to backend REST api
export const loginAttempt = (creds) => {
  //function receives credentials
  return (dispatch, getState) => {
    //dispatch action to notify client
    //of login request in progress
    dispatch({
        type: LOGIN_REQUEST,
        isFetchingAuth: true,
        isAuthenticatedUser: false
      });
    //use axios to query REST api for login.
    axios
      .post("/api/auth/signin", creds)
      .then( (response) => {
        //if request is successful, persist a session and dispatch
        //login success action
        if(response.status === 200){
          createSession(response.data);
          dispatch(loginSuccess(response.data));
        }
      })
      .catch( (error) => {
        dispatch(loginFailed(error.message));
      });
  }
}

///Action to load courses
const getCourseSuccess = (courses) => ({
  type: GET_COURSES_SUCCESS,
  payload: courses
})
//When Request from API fails
const getCourseFailure = (error) => ({
  type: GET_COURSES_FAILURE,
  payload: error,
})


//courses Api request for instructor
export const getCourses = (token) => {
 
  return (dispatch, getState) => {
    dispatch({type: GET_COURSES_REQUEST});
    axios
      .get("/api/user/instructor/courses", {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        dispatch(getCourseSuccess(response.data))
     
      })
      .catch((error) => {
        dispatch(getCourseFailure(error.message))
      })
  }
}


//Get Courses Student API request
export const getStuCourses = (token) => {
  return (dispatch, getState) => {
    dispatch({type: GET_COURSES_REQUEST});
    axios
      .get("/api/user/student/courses", {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        console.log(response)
        let stuResponse = response.data.data.Courses
        dispatch(getCourseSuccess(stuResponse))
        console.log(response)

      })
      .catch((error) => {
        dispatch(getCourseFailure(error.message))
      })
  }
}


//Actions to get lessons for the instructors page
///Action to load courses
const getLessonsSuccess = (lessons) => ({
  type: GET_LESSONS_SUCCESS,
  payload: lessons
})
//When Request from API fails
const getLessonsFailure = (error) => ({
  type: GET_LESSONS_FAILURE,
  payload: error,
})


//courses Api request for instructor
export const getLessons = (token, id) => {
  return (dispatch, getState) => {
    dispatch({type: GET_LESSONS_REQUEST});
    axios
      .get("/api/user/instructor/lessons/" + id , {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        
        dispatch(getLessonsSuccess(response.data))
        
      })
      .catch((error) => {
        dispatch(getLessonsFailure(error.message))
      })
  }
}

//Get Lessons for students pages
export const getStuLessons = (token, id) => {
  return (dispatch, getState) => {
    dispatch({type: GET_LESSONS_REQUEST});
    axios
      .get("/api/user/student/courses/" + id +"/lessons", {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        console.log(response)
        dispatch(getLessonsSuccess(response.data))
        
      })
      .catch((error) => {
        dispatch(getLessonsFailure(error.message))
      })
  }
}


const setCourseIdSuccess = (id) => {
 
return {
  type: SET_COURSE_IDSUCCESS,
  payload: id
}
}

//When Request from API fails
const setCourseIdFailure = (error) => ({
  type: SET_COURSE_IDFAIL,
  payload: error,
})

export const setCourseId = (id) => {
  return (dispatch, getState) => {
    if(id){
      dispatch(setCourseIdSuccess(id))

    } else {
      dispatch(setCourseIdFailure())
    }

  }
}

///Action to get all instructors
const getAllInstructorsSuccess = (allInstructors) => ({
  type: GET_ALL_INSTRUCTORS_SUCCESS,
  payload: allInstructors
})
//When Request from API fails
const getAllInstructorsFailure = (error) => ({
  type: GET_ALL_INSTRUCTORS_FAILURE,
  payload: error,
})

//view instructor Api request for admin
export const getAllInstructors = (token) => {
 
  return (dispatch, getState) => {
    dispatch({type: GET_ALL_INSTRUCTORS_REQUEST});
    axios
      .get("/api/user/admin/view/instructors", {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        dispatch(getAllInstructorsSuccess(response.data))
     
      })
      .catch((error) => {
        dispatch(getAllInstructorsFailure(error.message))
      })
  }
}

///Action to get all student
const getAllStudentsSuccess = (allStudents) => ({
  type: GET_ALL_STUDENTS_SUCCESS,
  payload: allStudents
})
//When Request from API fails
const getAllStudentsFailure = (error) => ({
  type: GET_ALL_STUDENTS_FAILURE,
  payload: error,
})


//view students Api request for admin
export const getAllStudents = (token) => {
 
  return (dispatch, getState) => {
    dispatch({type: GET_ALL_STUDENTS_REQUEST});
    axios
      .get("/api/user/admin/view/students", {
        headers: {
          'x-access-token': token
        }
      })
      .then((response) => {
        dispatch(getAllStudentsSuccess(response.data))
     
      })
      .catch((error) => {
        dispatch(getAllStudentsFailure(error.message))
      })
  }
}

const logoutSuccess = () => ({
  type:    LOGOUT_SUCCESS,
  isAuthenticatedUser: false,
});

const logoutFail = (error) => ({
  type:    LOGOUT_FAILURE,
  isAuthenticatedUser: false,
  payload: error,
});

//action: LOGOUT_REQUEST
export const logoutAttempt = () => {
  //dispatch logout request
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT_REQUEST
    });
    //call helper function to remove session from localStorage
    destroySession();
    //validate session to check if it was properly deleted
    if(!validateSession()){
      dispatch(logoutSuccess());
    }
    else{
      //__session was not removed
      dispatch(logoutFail("Error deleting existing session."))
    }
  }
}

//action: Add_STUDENT_FAILURE if backend call is unsuccessful
const addStudentFailed = (error) => ({
  type:    ADD_STUDENT_FAILURE,
  isFetchingAuth: false,
  isAuthenticatedUser: false,
  payload: error,
});

//action: ADD_STUDENT_SUCCESS once backend call is successfull
const addStudentSuccess = (stuObj) => ({
  type:    ADD_STUDENT_SUCCESS,
  isFetchingAuth: false,
  isAuthenticatedUser: true,
  payload: stuObj,
});

//action: ADD_STUDENT_REQUEST to REST API
export const addStudentAttempt = (data, accessToken) => {
  console.log("what data is this?", data, accessToken)
    //function receives credentials
    return (dispatch, getState) => {
      //dispatch action to notify client 
      //of add student request in progress
      dispatch({ 
          type: ADD_STUDENT_REQUEST, 
          isAddingNewUser: true, 
          isAuthenticatedUser: true 
        });
      //use axios to query REST api for add student.
      axios
        .post("/api/auth/signup", data, {
          headers: {
            "x-access-token": accessToken
          }
        })
        .then( (response) => {
          //if request is successful, persist a session and dispatch
          //login success action
          if(response.status === 200){
            dispatch(addStudentSuccess(response.data));
          }
        })
        .catch( (error) => {
          dispatch(addStudentFailed(error.message));
        });
      }
  }
  


