export const getWeatherData = async () => {
    const apiKey = 'f7d689e8d836580162297e4ceff2de80'; // Tu API Key
    const city = 'San Salvador'; // Ciudad de la cual deseas obtener el clima
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=San+Salvador&appid=f7d689e8d836580162297e4ceff2de80&units=metric';
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
  
    const data = await response.json();
    return data;
  };
  