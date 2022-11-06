require("dotenv").config();

const axios = require("axios");

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const sendFileToIPFS = async (fileImg) => {
  if (fileImg) {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });

      //const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + resFile.data.IpfsHash,
        pinataHash: resFile.data.IpfsHash,
      };
      //console.log(ImgHash);
      //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      //   console.log("Error sending File to IPFS: ");
      //   console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
