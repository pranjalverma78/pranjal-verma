import Upload from './artifacts/contracts/Upload.sol/Upload.json'
import {useState, useEffect} from "react"
import { ethers } from 'ethers';
import FileUpload from './components/FileUpload'
import Display from './components/Display'
import Modal from './components/Modal'


import './App.css';

function App() {

  const [account, setAccount] = useState("")
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(()=>{
    const provider = new ethers.BrowserProvider(window.ethereum)

    const loadProvider = async()=>{
      if (provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);

        console.log(provider)
        const signer = await provider.getSigner();
        // console.log(signer)
        try {
          const address = await signer.getAddress();
          setAccount(address);
        } catch (error) {
          console.error("Error getting address:", error);
        }
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  
        const contract = new ethers.Contract(
          contractAddress, Upload.abi, signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else{
        console.error("Metmask is not Installed");
      }
    };
    provider && loadProvider()
  },[])

  return<>
      {/* {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
            <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )} */}
      <div className="App"> 
        <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>

            <p style={{ color: "white" }}>
              Account : {account ? account : "Not connected"}
            </p>
            <FileUpload contract={contract} provider={provider} account={account}></FileUpload>
            <Display contract={contract} account={account}></Display>
      </div>
  </> 
  
      
}

export default App;
