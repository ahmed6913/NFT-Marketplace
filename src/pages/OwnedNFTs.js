export default function OwnedNFTs() {
  const nfts = [
    {
      id: "1",
      name: "Cosmic Warrior #1234",
      creator: "ArtistDAO",
      price: "2.5",
      image: "/placeholder.svg?height=256&width=256",
      blockchainUrl: "#",
    },
    {
      id: "2",
      name: "Digital Dreams",
      creator: "CryptoCreator",
      price: "1.8",
      image: "/placeholder.svg?height=256&width=256",
      blockchainUrl: "#",
    },
    {
      id: "3",
      name: "Neon Genesis",
      creator: "FutureArt",
      price: "3.2",
      image: "/placeholder.svg?height=256&width=256",
      blockchainUrl: "#",
    },
    {
      id: "4",
      name: "Abstract Reality",
      creator: "ModernMint",
      price: "0.9",
      image: "/placeholder.svg?height=256&width=256",
      blockchainUrl: "#",
    },
    {
      id: "5",
      name: "Pixel Paradise",
      creator: "RetroStudio",
      price: "4.1",
      image: "/placeholder.svg?height=256&width=256",
      blockchainUrl: "#",
    },
    {
      id: "6",
      name: "Ethereal Essence",
      creator: "SpiritualNFT",
      price: "2.7",
      image: "/placeholder.svg?height=256&width=256",
      blockchainUrl: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-indigo-600">
            Your NFTs
          </h1>
         
        </div>

        {nfts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="bg-white border border-slate-200 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:border-indigo-200"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={nft.image || "/placeholder.svg?height=256&width=256"}
                    alt={nft.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 truncate">{nft.name}</h3>
                  <p className="text-slate-600 mb-3 text-sm">
                    by <span className="text-indigo-600 font-medium">{nft.creator}</span>
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-slate-900">{nft.price}</span>
                      <span className="text-indigo-600 font-semibold">ETH</span>
                    </div>
                    <div className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-200">
                      Owned
                    </div>
                  </div>
                  <a
                    href={nft.blockchainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl text-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    View on Blockchain
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 border border-indigo-200">
              <div className="text-indigo-500 text-4xl">🎨</div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No NFTs Found</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Start collecting NFTs to see them here! Explore the marketplace to find amazing digital art.
            </p>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
              Explore Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
