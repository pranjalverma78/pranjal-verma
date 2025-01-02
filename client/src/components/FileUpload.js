import {useState, useEffect} from "react"
import axios from "axios"
import "./FileUpload.css"

const FileUpload = ({contract, provider, account}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(file){
            try {
                console.log(file);
                const formData = new FormData();
                console.log(formData);
                formData.append("file",file);
                console.log(formData.get("file"));


                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `6f5184f68947958224e8`,
                      pinata_secret_api_key: `fb69ce7dda7d3ac11717788665c292658ad188849ca29203455722d1c64bdc0d`,
                    },
                    "Content-Type": "multipart/form-data",
                  });
                console.log(resFile.data.IpfsHash);
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.add(account,ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);
            } catch (error) {
                alert("unable to upload image to pinata");
            }
        }
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
        setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return <>
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                Choose Image
                </label>
                <input
                disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile}
                />
                <span className="textArea">Image: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                Upload File
                </button>
            </form>
        </div>
    </>
};

export default FileUpload;