import React, { useState } from 'react';
import logo from './images/aolda_logo.png';
import scroll from './images/scroll.png';
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

  const handleScroll = () => {
    const targetElement = document.getElementById('body');
    targetElement.scrollIntoView({ behavior: 'smooth' });
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
        <p className='font-title'>
          {"Aolda-FlexiContract"}
        </p>
        <p className='font-subtitle'>
          {"Solidity 외의 언어로 작성된 Smart Contract를 EVM 기반 체인에 적용하기 위한 L2 솔루션"}
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p className='font-link'>
          아올다팀의 FlexiContract을 소개하는 링크입니다 :)
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
        <div onClick={handleScroll} className='scroll-button'>
          <img src={scroll} alt='scroll' className='scroll-img' />
        </div>
      </header>

      <div className='App-container' id='body'>

        <p className='font-1'>
          callAolda에 필요한 데이터를 입력해주세요!
        </p>

        <div>
          <div className='container-input'>
            <span className='font-inputtitle'>
              fileHash :
            </span>
            <input
              type="text"
              value={fileHash}
              onChange={handleFileHash}
            />
          </div>
          <div className='container-input'>
            <span className='font-inputtitle'>
              functionName :
            </span>
            <input
              type="text"
              value={functionName}
              onChange={handleFunctionName}
            />
          </div>
          <div className='container-input'>
            <span className='font-inputtitle'>
              args :
            </span>
            <input
              type="text"
              value={args}
              onChange={handleArgs}
            />
          </div>
        </div>

        <button className='button-emit' onClick={handleButton}>callAolda</button>

        <div>
          <p className='font-inputtitle'>Aolda를 통해 나온 결과 : {result}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
