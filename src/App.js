import React, { useState } from 'react';
import logo from './aolda_logo.png';
import './App.css';

function App() {

  const [fileHash, setFileHash] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [args, setArgs] = useState([]);
  const [result, setResult] = useState('');

  const jsonData = {
    fileHash: fileHash,
    functionName: functionName,
    args: args
  };

  const handleFileHash = (event) => {
    setFileHash(event.target.value);
  };

  const handleFunctionName = (event) => {
    setFunctionName(event.target.value);
  };

  const handleArgs = (event) => {
    setArgs(event.target.value);
  };

  const handleButton = () => {
    fetch('http://localhost:8000/emit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.text())
      .then(data => {
        console.log('POST 요청 결과:', data);
        setResult(data);
      })
      .catch(error => {
        console.error('POST 요청 중 오류 발생:', error);
      });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {"Aolda"}
        </h1>
        <h5>
          {"2023-1 파란학기제 아올다 팀입니다!"}
        </h5>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          아올다 팀을 소개하는 각종 링크입니다 :)
        </p>
        <a
          className="App-link"
          href="https://github.com/Aolda"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="App-link"
          href="https://velog.io/@aolda_aww"
          target="_blank"
          rel="noopener noreferrer"
        >
          Velog
        </a>
      </header>

      <div className='container'>
        <div>
          <p>
            callAolda에 필요한 데이터를 입력해주세요!
          </p>
          <div>
            <span>
              fileHash :
            </span>
            <input
              type="text"
              value={fileHash}
              onChange={handleFileHash}
            />
          </div>
          <div>
            <span>
              functionName :
            </span>
            <input
              type="text"
              value={functionName}
              onChange={handleFunctionName}
            />
          </div>
          <div>
            <span>
              fileHash :
            </span>
            <input
              type="text"
              value={args}
              onChange={handleArgs}
            />
          </div>
          <button onClick={handleButton}>callAolda</button>
        </div>

        <div>
          <p>Aolda를 통해 나온 결과 : {result}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
