import React from "react"

const mockNFTs = [
  {
    id: 1,
    name: "Cyber Ape #112",
    creator: "Footlockerker Store",
    image: "https://i.ibb.co/q3WtTLyK/7748166.jpg",
    price: "0.15 ETH",
  },
  {
    id: 2,
    name: "HypeBeast Runner",
    creator: "SneakerVault",
    image: "https://i.ibb.co/Q75tLB8h/5348934.jpg",
    price: "0.2 ETH",
  },
  {
    id: 3,
    name: "Urban Samurai",
    creator: "Nike NFT Lab",
    image: "https://i.ibb.co/2YSwRDj2/900-31.jpg",
    price: "0.3 ETH",
  },
  {
    id: 4,
    name: "Digital Kicks #001",
    creator: "MetaVerse Studios",
    image: "https://i.ibb.co/jvL4H5CL/317cae30-c8ce-4cae-a9c8-a4624c3ae699.jpg",
    price: "0.25 ETH",
  },
  {
    id: 5,
    name: "Neon Dreams",
    creator: "CryptoArt Collective",
    image: "https://i.ibb.co/YTF6z1gk/3d-cartoon-style-character.jpg",
    price: "0.18 ETH",
  },
  {
    id: 6,
    name: "Future Warrior",
    creator: "BlockChain Creatives",
    image: "https://i.ibb.co/1twQ4vdj/7748187.jpg",
    price: "0.35 ETH",
  },
]

const NFTPreviewGrid = () => {
  return (
    <section className="mt-16 bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
       
        <button className="text-indigo-600 hover:text-purple-600 font-medium text-sm transition-colors duration-200">
          View All
        </button>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth gap-4 md:gap-6 pb-4">
          {mockNFTs.map((nft) => (
            <div key={nft.id} className="flex-none w-72 md:w-80 snap-start group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                 <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {nft.price}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    {nft.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    By <span className="font-medium text-indigo-600">{nft.creator}</span>
                  </p>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(mockNFTs.length / 3) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NFTPreviewGrid
