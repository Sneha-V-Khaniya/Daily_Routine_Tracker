import axios from "axios";

const handleAuthRequest = async (apiEndpoint, formData, setUser, navigate, failMessage, setErrorMessage) => {

  try {
    const response = await axios.post(apiEndpoint, formData, setErrorMessage);
    setUser(response.data.user);

    navigate('/');
  }
  catch (error) {
    setErrorMessage(error.response?.data?.message || failMessage);
    console.error('Error:', error);

  }
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

function formatTaskData(data) {
  return data?.map(item => ({
    ...item,
    date: formatDate(new Date(item.date)),
    height: 1
  }));

}

function getCurrentWeekDates() {
  const currentDate = new Date();
  const weekDates = [];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Find the current week's Sunday date
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push({
      date: formatDate(date),
      day: weekDays[date.getDay()]
    });
  }

  return weekDates;
}

const getTaskDetails = async (apiEndpoint, userID) => {
  try {
    const response = await axios.post(apiEndpoint, { userID });
    return response.data.taskDetails;
  }
  catch (error) {
    console.error('Failed to fetch task details:', error);
    return [];
  }
}

const addTask = async (apiEndpoint, taskName, userID) => {
  try {
    await axios.post(apiEndpoint, { taskName, userID });
  }
  catch (error) {
    console.error('Failed to add task:', error);
  }
}

const saveTaskData = async (apiEndpoint, taskID, value, date) => {
  try {
    await axios.post(apiEndpoint, { taskID, value, date });

  }
  catch (error) {
    console.error('Failed to save task data:', error);
  }
}

const fetchTaskData = async (apiEndpoint) => {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data.taskDetail;
  }
  catch (error) {
    console.error('Failed to fetch task data:', error);
  }
}



export {
  handleAuthRequest, 
  formatDate,
  formatTaskData, 
  getCurrentWeekDates, 
  getTaskDetails, 
  addTask, 
  saveTaskData,
  fetchTaskData,
  
}
