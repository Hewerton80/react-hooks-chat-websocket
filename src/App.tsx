import React, { useState, useEffect,useMemo } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Container } from './styles';

const baseUrl = 'http://localhost:3001';

const App: React.FC = () => {
  const [count,setCount] = useState<number>(0);
  const [msgs, setMsgs] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>('');
  const socket = useMemo(()=> io.connect(baseUrl),[])
  useEffect(():any => {
    //const socket = io.connect(baseUrl);
    socket.emit('connectToMsgs');
    // socket.on('subscribeInRoon', (msgsData: any) => {
    // setMsgs(oldMsgs=> [...oldMsgs, msgData]);
    //   console.log('response from sockt: ', msgsData);
    // })
    socket.on('msgToClient', (msgData: any) => {
      setMsgs(oldMsgs=> {
        console.log('oldMsgs:',oldMsgs)
        return [...oldMsgs, msgData]
      });
      console.log('response from sockt msgToClient: ', msgData);
    })
    return () => {
      console.log( 'destruido');
      socket && socket.disconnect();
    };
  },[])
  
  useEffect((): any => {
    async function getMsgs(){
      try {
        const resposta = await axios.get(`${baseUrl}/message`);
        console.log('messages: ',resposta.data);
        setMsgs(oldMsgs=>{
          console.log('oldMsgs: ',Object.getOwnPropertyDescriptors(oldMsgs))
          return resposta.data;
        })
      } catch (error) {
        console.log(error);
      }
    }
    getMsgs()
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request: any = {
      msg
    }
    try {
      await axios.post(`${baseUrl}/message`,request);
      //setMsgs(oldMsgs=> [...oldMsgs, msg]);
      setMsg('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div className='chat'>
        <button onClick={()=>setCount(count+1)}>al</button>
        <div className='msgs'>
          {msgs.map((msg, i) =>
            <p key={String(i)}>
              {msg}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <span>
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              type="submit"
            >
              Enviar
            </button>
          </span>
        </form>
      </div>
    </Container>
  );
}

export default App;
