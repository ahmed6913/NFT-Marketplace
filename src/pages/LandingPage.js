// src/pages/LandingPage.js
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackCarousel from "../components/FeedbackCarousel";
import AnimatedTooltipGroup from "../components/AnimatedTooltipGroup";
import FeaturedNFTs from "../components/FeaturedNFTs";
import CommunityLinks from "../components/CommunityLinks";
import FeedbackForm from "../components/Feedback";
import FeedbackDisplay from "../components/FeedbackDisplay";

const LandingPage = () => {
    const navigate = useNavigate();
    const feedbackRef = useRef(null); // ✅ Ref for scrolling

    const handleConnectWallet = () => {
        navigate("/home");
    };

    const handleScrollToFeedback = () => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    NFT Rewards for Every Purchase
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Earn NFTs as loyalty rewards from your favorite brands.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleConnectWallet}
                        className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100 transition"
                    >
                        Connect Wallet
                    </button>
                    <button
                        onClick={handleScrollToFeedback}
                        className="bg-white/20 border border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition"
                    >
                        Give Feedback
                    </button>
                </div>
            </section>

            {/* Live User Feedback Carousel */}
            <FeedbackCarousel />

            {/* Why Choose Us */}
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">
                    Why Choose Us?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Loyalty NFTs",
                            desc: "Get rewarded with real NFTs each time you shop.",
                        },
                        {
                            title: "Powered by Web3",
                            desc: "Own your rewards — fully decentralized and tradable.",
                        },
                        {
                            title: "For Retail & Real Use",
                            desc: "Use NFTs for discounts, access, and collectibles.",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-purple-600">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-indigo-600">
                        How It Works
                    </h2>
                    <p className="mb-8 text-gray-700">
                        Connect your wallet → Shop with partner brands → Earn NFTs as
                        rewards → Use or Trade them on our marketplace.
                    </p>
                </div>
            </section>

            {/* Featured NFTs */}
            <FeaturedNFTs />

            {/* Tooltip Team */}
            <AnimatedTooltipGroup />

            {/* Community */}
            <div className="mt-5">
                <CommunityLinks />
            </div>

            {/* Feedback Section */}
            <section
                ref={feedbackRef} // ✅ Attach ref for scroll
                className="py-16 px-6 max-w-4xl mx-auto text-center"
            >
                <h2 className="text-3xl font-bold text-indigo-600 mb-4">Your Feedback Matters</h2>
                <p className="text-gray-600 mb-6">
                    We’re building with you in mind. Share what you love or what could be improved!
                </p>

                <FeedbackForm />
               
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Shaikh Saim. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
