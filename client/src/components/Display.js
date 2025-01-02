import {useState, useEffect} from "react"
import axios from "axios"
import "./Display.css"

const Display = ({contract, account}) => {
    const [data, setData] = useState("");
    const getData = async() =>{
        let dataArray;
        const OtherAddresses = document.querySelector(".address").value;
        try{
            console.log(OtherAddresses);
            if(OtherAddresses){
                console.log("yes");
                dataArray = await contract.display(OtherAddresses);
                console.log(dataArray);
            }
            else{
                console.log(account)
                dataArray = await contract.display(account);
            }
        }
        catch(e){
            alert("You donn't have access");
            return;
        }
        console.log(OtherAddresses);
        const isEmpty  = Object.keys(dataArray).length===0;
        if(!isEmpty){
            const data = dataArray.toString();
            const str_arr = data.split(",");

            const images = str_arr.map((item, i)=>{
                return (
                    <a href={item} key={i} target="_blank">
                    <img
                      key={i}
                      src={`https:${item.substring(6)}`}
                      alt="new"
                      className="image-list"
                    ></img>
                  </a>
                );
            });
            setData(images);
        }
        else {
            alert("No image to display");
          }
    };

    return (
    <>
        <div className="image-list">{data}</div>
        <input
            type="text"
            placeholder="Enter Address"
            className="address"></input>
        <button className="center button" onClick={getData}>
            Get Data
        </button>
    </>
    );
};

export default Display;