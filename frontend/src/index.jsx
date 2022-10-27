import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8080/ws/news');
if (webSocket) {
    webSocket.onopen = () => {
        console.log('Websocket connected!');
    };
}
root.render(
    <React.StrictMode>
        <App webSocket={webSocket} />
    </React.StrictMode>,
);
