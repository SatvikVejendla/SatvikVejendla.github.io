import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const ScrollToTop = ({ children}) => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    });

    return children || null;
  };

ReactDOM.createRoot(document.getElementById('root')).render(
    <ScrollToTop>
        <App />
    </ScrollToTop>
)
