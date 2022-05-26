import { useEffect, useState } from "react"
import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import Loader from "./loader";


export default function Home() {
  const [polygon, setPolygon] = useState([])
  const [eth, setEth] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [address, setAddress] = useState("") //0x2D2E4c335EEE674Bd8F2EB3622E4156EbAbC864d
  const [isLoading, setLoading] = useState(false)

  const handleClick = () => {
    setAddress(searchValue);
    console.log(searchValue);
  };
  const handleSearch= (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {    
    const polygonNFT =  async () => {
      setLoading(true)
      try {
        const web3 = createAlchemyWeb3(
          "https://polygon-mainnet.g.alchemy.com/v2/Ldh3zmCuAdHAsJATa51xXzF14sGYbwuX",
        );
        if(!address) throw "Enter a valid address";
        const nfts = await web3.alchemy.getNfts({ owner:address})
          if(nfts){
            setPolygon(nfts?.ownedNfts);
            setLoading(false);
          } else{
            setPolygon([]);
            setLoading(false);
          }
      } catch (error) {
        setPolygon([]);
        setLoading(false);
        console.log(error)
      }
    }
    polygonNFT();
  },[address]);

  useEffect(() => {
    const ethNFT = async() => {
      setLoading(true)
      try {
        const web3 =createAlchemyWeb3(
          "https://eth-mainnet.alchemyapi.io/v2/uEQQbEYufrEyrWbuNnfnTol_LgMKUfQn",
        );
        if(!address) throw "Enter a valid address";
        const nfts = await web3.alchemy.getNfts({ owner:address});
        if(nfts) {
          setEth(nfts?.ownedNfts);
          setLoading(false);
        } else {
          setLoading(false);
          setEth([]);
        };
      } catch (error) {
        setEth([]);
        setLoading(false);
        console.log(error)
      }
    }
    ethNFT();
  },[address]);
  
  return (
    <>
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
              <div className="relative mx-auto text-gray-600 lg:block hidden">
                  <input
                      className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                      type="search" name="search" placeholder="Search" onChange={handleSearch}/>
                  <button type="submit" className="absolute right-0 top-0 mt-3 mr-2" onClick={handleClick}>
                      <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                          version="1.1" id="Capa_1" x="0px" y="0px"
                          viewBox="0 0 56.966 56.966" 
                          xmlSpace="preserve"
                          width="512px" height="512px">
                  <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                </svg>
                  </button>
              </div>
      
      </nav>
     {isLoading? (<Loader></Loader>) :
     (<div> 
          <div className="grid grid-cols-2 gap-6 rounded-lg pt-2 p-10 container mx-auto">
          {polygon[0] ? (<div className="col-span-3 text-center text-2xl text-bold font-mono tracking-wide bg-slate-300 rounded-md p-1">Polygon</div>) : null}
          {
            polygon?.map((nft, i) => (
                <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img src={nft.metadata.image} alt="img not found" className="w-full"></img>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{nft?.title}</div>
                      <p className="text-gray-700 text-base">{nft?.description}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Contract Address:</p>
                      <p className="text-gray-700 text-base">{nft?.contract.address}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Token Id:</p>
                      <p className="text-gray-700 text-base">{nft?.id.tokenId}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Token Typ:</p>
                      <p className="text-gray-700 text-base">{nft?.id.tokenMetadata.tokenType}</p>
                      
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Gateway TokenURI:</p>
                      <p className="text-gray-700 text-base">{nft?.tokenUri.gateway}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">External URL:</p>
                      <p className="text-gray-700 text-base">{nft?.metadata.external_url}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Time Last Updated:</p>
                      <p className="text-gray-700 text-base">{nft?.timeLastUpdated}</p>

                    </div>
                </div>
            ))}
          {eth[0] ? (<div className="col-span-3 text-center text-2xl text-bold font-mono tracking-wide bg-slate-300 rounded-md p-1">Ethereum</div>) : null}
            {
            eth?.map((nft, i) => (
                <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img src={nft.metadata.image} alt="img not found" className="w-full"></img>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{nft?.title}</div>
                      <p className="text-gray-700 text-base">{nft?.description}</p>
                      <p className="text-gray-800 text-base font-bold ">Contract Address:</p>
                      <p className="text-gray-700 text-base">{nft?.contract.address}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Token Id:</p>
                      <p className="text-gray-700 text-base">{nft?.id.tokenId}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Token Typ:</p>
                      <p className="text-gray-700 text-base">{nft?.id.tokenMetadata.tokenType}</p>
                      
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Gateway TokenURI:</p>
                      <p className="text-gray-700 text-base">{nft?.tokenUri.gateway}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">External URL:</p>
                      <p className="text-gray-700 text-base">{nft?.metadata.external_url}</p>
                      <br></br>
                      <p className="text-gray-800 text-base font-bold ">Time Last Updated:</p>
                      <p className="text-gray-700 text-base">{nft?.timeLastUpdated}</p>
                    </div>
                    
                </div>
            ))}
            </div>
      </div>)
      }
    </>
  );
}
