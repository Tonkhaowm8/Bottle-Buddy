// routes.js

export const fetchData = async () => {
  try {
    const response = await fetch('https://76yp3k3sbd.execute-api.ap-southeast-1.amazonaws.com/items/Tonkhaow');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
