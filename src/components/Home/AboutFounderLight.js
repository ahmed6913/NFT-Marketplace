import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Quote, Github, Linkedin, Twitter, Mail, Circle } from "lucide-react";

export default function AboutFounder() {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-indigo-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Card className="bg-gradient-to-tr from-indigo-900 to-slate-800 text-white border border-slate-700 shadow-xl rounded-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 transition-colors">
                Meet the Founder
              </Badge>
            </div>

            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built by a Web3 Enthusiast{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  For Web3 Enthusiasts
                </span>
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
              {/* Founder Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                    <img
                      src="/founder.jpg"
                      alt="Shaikh Saim - Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900 shadow-md">
                    <Circle className="w-full h-full text-green-500 fill-current" />
                  </div>
                </div>
              </div>

              {/* Founder Details */}
              <div className="space-y-8">
                <Card className="bg-indigo-900 border border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Quote className="h-6 w-6 text-purple-400 mt-1" />
                      <blockquote className="text-lg italic font-medium leading-relaxed text-slate-200">
                        "Web3 isn't just about technology — it's about empowering
                        students to own their digital future and participate in
                        the decentralized economy."
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-3xl font-bold mb-2">Shaikh Saim</h3>
                  <p className="text-purple-400 text-lg font-semibold mb-4">
                    Creator & Web3 Engineer
                  </p>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    Currently building a blockchain-based NFT rewards marketplace
                    for retail that bridges traditional commerce with Web3
                    technology. Passionate about decentralization, open source,
                    and student empowerment.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-purple-500">
                      <Mail className="w-4 h-4 mr-2" /> Contact
                    </Button>
                    <Button className="bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-purple-500">
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </Button>
                    <Button className="bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-purple-500">
                      <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </Button>
                    <Button className="bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 hover:border-purple-500">
                      <Twitter className="w-4 h-4 mr-2" /> Twitter
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <Card className="bg-indigo-950 border border-slate-700 text-indigo-100">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">
                  Our Mission
                </h4>
                <p className="text-slate-300 max-w-3xl mx-auto text-base leading-relaxed">
                  To democratize NFT rewards in retail using transparent and
                  rewarding Web3 technology, making blockchain benefits accessible
                  to students and everyday consumers through seamless integration
                  with traditional commerce.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
