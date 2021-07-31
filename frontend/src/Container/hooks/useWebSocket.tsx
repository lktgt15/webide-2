import { useEffect, useState } from "react";
import Stomp, { Client, Message } from "webstomp-client";
import SockJS from "sockjs-client";

export interface WebSocketHookProps {
  socketEndPointUrl: string;
  subscribeUrl: string;
  postUrl: string;
}

let stompClient: Client | undefined = undefined;

function useWebSocket({
  socketEndPointUrl,
  subscribeUrl,
  postUrl,
}: WebSocketHookProps) {

  const [isConnected, setConnected] = useState(false);
  const [message, setMessage] = useState<any>([]);

  useEffect(() => {
    var socket = new SockJS(socketEndPointUrl);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      setConnected(true);
      stompClient!.subscribe(subscribeUrl, function (message) {
        setMessage(message);
      });
      return () => disconnect();
    });
  }, []);

  function disconnect() {
    if (stompClient) {
      stompClient.disconnect();
    }
    setConnected(false);
  }

  function postMessage(data: object) {
    if (stompClient) return;
    if (!isConnected) return;
    stompClient!.send(postUrl, JSON.stringify(data));
  }
  return [message, postMessage];
}

export default useWebSocket;