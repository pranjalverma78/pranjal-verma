import { useEffect } from "react";
import "./Modal.css";
const Modal = ({setModalOpen, contract}) => {
    const sharing = async() => {
        const address = document.querySelector('.address');
        await contract.allow(address);
        console.log("shared");
        setModalOpen(false);
    }

    return <>
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="title">Share with</div>
            <div className="body">
                <input
                type="text"
                className="address"
                placeholder="Enter Address"
                ></input>
            </div>
            <form id="myForm">
                <select id="selectNumber">
                <option className="address">People With Access</option>
                </select>
            </form>
            <div className="footer">
                <button
                onClick={() => {
                    setModalOpen(false);
                }}
                id="cancelBtn"
                >
                Cancel
                </button>
                <button onClick={() => sharing()}>Share</button>
            </div>
            </div>
        </div>
    </>
};

export default Modal;