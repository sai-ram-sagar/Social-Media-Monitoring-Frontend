// const API_URL = "http://localhost:5000/api"; // Backend URL

const API_URL = "https://social-media-monitoring-backend-production.up.railway.app/api"; // Backend URL

export const fetchCrimeReports = async () => {
  try {
    const response = await fetch(`${API_URL}/crime-reports`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching crime reports:", error);
    return [];
  }
};
