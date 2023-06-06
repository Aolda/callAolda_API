import React, { useState } from 'react';
import logo from './images/aolda_logo.png';
import scroll from './images/scroll.png';
import './App.css';

function App() {
  const [fileHash, setFileHash] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [args, setArgs] = useState([]);
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTx, setFileTx] = useState('');
  const [resultTx, setResultTx] = useState('');

  const jsonData = {
    fileHash: fileHash,
    functionName: functionName,
    args: args
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
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

  const handleScrollDown = () => {
    const targetElement = document.getElementById('body');
    targetElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollUp = () => {
    const targetElement = document.getElementById('header');
    targetElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadButton = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log('POST 요청 결과:', data);
        setFileTx(data);
      })
      .catch(error => {
        console.error('POST 요청 중 오류 발생:', error);
      });
  };

  const handleButton = () => {
    console.log(jsonData);
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

  const parsedData = fileTx ? JSON.parse(fileTx) : null;

  return (
    <div className="App">
      <header className="App-header" id="header">
        <p className="font-title">{"Aolda-FlexiContract"}</p>
        <p className="font-subtitle">
          {"Solidity 외의 언어로 작성된 Smart Contract를 EVM 기반 체인에 적용하기 위한 L2 솔루션"}
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="font-link">
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
        <div onClick={handleScrollDown} className="scrolldown-button">
          <img src={scroll} alt="scroll" className="scroll-img" />
        </div>
      </header>

      <div className="App-container" id="body">
        <div onClick={handleScrollUp} className="scrollup-button">
          <img src={scroll} alt="scroll" className="scroll-img" />
        </div>

        <div className="tabs">
          <p
            style={{ color: activeTab === 0 ? '#61dafb' : 'black' }}
            className="tab"
            onClick={() => handleTabChange(0)}
          >
            파일 등록
          </p>
          <p
            style={{ color: activeTab === 1 ? '#61dafb' : 'black' }}
            className="tab"
            onClick={() => handleTabChange(1)}
          >
            callAolda
          </p>
        </div>
        <div>
          {activeTab === 0 && (
            <div className="tab-content">
              <p className="font-1">
                FlexiContract에 업로드 할 파일을 추가해주세요!
              </p>

              <input type="file" onChange={handleFileChange} />
              {selectedFile && <p>선택한 파일: {selectedFile.name}</p>}

              <button className="button-emit" onClick={handleUploadButton}>
                upload File
              </button>

              <div className={`transaction-section ${fileTx ? 'visible' : ''}`}>
                <p className="font-inputtitle">Transaction :</p>
                {parsedData && (
                  <div>
                    <p>Type: {parsedData.header.type}</p>
                    <p>Hash: {parsedData.header.hash}</p>
                    <p>Block Number: {parsedData.header.blockNumber}</p>
                    <p>Transaction Index: {parsedData.header.transactionIndex}</p>
                    <p>From: {parsedData.header.from}</p>
                    <p>Nonce: {parsedData.header.nonce}</p>
                    <p>Signature R: {parsedData.header.signature.R}</p>
                    <p>Signature S: {parsedData.header.signature.S}</p>
                    <p>Signature V: {parsedData.header.signature.V}</p>
                    <p>Timestamp: {parsedData.header.timeStamp}</p>
                    <p>File Hash: {parsedData.body.fileHash}</p>
                    <p>Function Name: {parsedData.body.functionName}</p>
                    <p>Arguments: {parsedData.body.arguments}</p>
                    <p>Result: {parsedData.body.result}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="tab-content">
              <p className="font-1">필요한 데이터를 입력해주세요!</p>

              <div>
                <div className="container-input">
                  <span className="font-inputtitle">fileHash :</span>
                  <input
                    className="input"
                    type="text"
                    value={fileHash}
                    onChange={handleFileHash}
                  />
                </div>
                <div className="container-input">
                  <span className="font-inputtitle">functionName :</span>
                  <input
                    className="input"
                    type="text"
                    value={functionName}
                    onChange={handleFunctionName}
                  />
                </div>
                <div className="container-input">
                  <span className="font-inputtitle">args :</span>
                  <input
                    className="input"
                    type="text"
                    value={args}
                    onChange={handleArgs}
                  />
                </div>
              </div>

              <button className="button-emit" onClick={handleButton}>
                callAolda
              </button>

              <div>
                <p className="font-inputtitle">
                  Aolda를 통해 나온 결과 : {result}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
