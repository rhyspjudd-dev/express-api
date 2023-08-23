import React, { useState, useEffect } from 'react';
import { ColorRing } from  'react-loader-spinner';
import './App.css';

function App() {
  const [serverTime, setServerTime] = useState(0);
  const [timeDifference, setTimeDifference] = useState(0);
  const [metrics, setMetrics] = useState('');
  const [loadingTime, setLoadingTime] = useState(false);
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  // Function to fetch server time from the API
  const fetchServerTime = async () => {
    setLoadingTime(true);
    setTimeout(async () => {
      const response = await fetch('/time', {
        headers: {
          Authorization: 'mysecrettoken' // Include authorization header
        }
      });
      const data = await response.json();
      setServerTime(data.epoch);
      setLoadingTime(false);
    }, 1000);
  };

  // Function to fetch Prometheus metrics from the API
  const fetchMetrics = async () => {
    setLoadingMetrics(true);
    setTimeout(async () => {
      const response = await fetch('/metrics', {
        headers: {
          Authorization: 'mysecrettoken' // Include authorization header
        }
      });
      const data = await response.text();
      setMetrics(data);
      setLoadingMetrics(false);
    }, 1000);
  };

  // Effect hook to fetch initial data and set up periodic data fetching every 30 secs
  useEffect(() => {
    fetchServerTime();
    fetchMetrics();
    const interval = setInterval(() => {
      fetchServerTime();
      fetchMetrics();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Effect hook to calculate and update time difference in a human-readable format
  useEffect(() => {
    const timeDifferenceInSeconds = Math.round(
      (new Date().getTime() - serverTime * 1000) / 1000
    );
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;
    setTimeDifference(`${hours}:${minutes}:${seconds}`);
  }, [serverTime]);


  return (
    <div className="App">
      <div className="grid grid-cols-2 font-body">
      <div className="half h:screen flex justify-center items-center bg-green text-white">
        <div className='container'>
        <h2 className="text-3xl font-bold font-blue-grey-900 font-heading">Server Time</h2>
        {loadingTime ? (
        <div className='w-full flex justify-center items-center'>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        ) : (
          <>
            <p><span className='font-bold'>Epoch server time:</span> {serverTime}</p>
            <p><span className='font-bold'>Time Difference:</span> {timeDifference}</p>
            <p><span className='font-bold'>Applicant:</span> <a href='https://rpj-dev.netlify.app/' className="underline cursor-pointer" target='blank'>Rhys P. Judd</a></p>
          </>
        )}
        </div>
      </div>
      <div className="half h-screen flex justify-center items-center">
      <div className='container p-4'>
        <h2 className="text-3xl font-bold font-heading">Metrics</h2>
        {loadingMetrics ? 
        <div className='w-full flex justify-center items-center'>
              <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              className="mx-auto"
            />
        </div> 
        : 
        <pre className=' h-64 overflow-y-auto bg-gray-300'>{metrics}</pre>
        }
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;

