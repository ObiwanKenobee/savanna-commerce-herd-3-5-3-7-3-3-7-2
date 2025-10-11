import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Safe component with fallbacks
const IndexFixed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      {/* Simple Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-700">
                🦁 Savanna Marketplace
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Login</Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-green-100 text-green-700">
            🇰🇪 Kenya's Premier B2B Marketplace
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Trade Smarter,
            <br />
            <span className="text-green-600">Grow Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Where suppliers and retailers unite. Fast as a cheetah, strong as an
            elephant, growing like the savanna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Wisdom Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-4 bg-amber-100 text-amber-700"
            >
              🏛️ Ancient Wisdom for Modern Trade
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Harambee Spirit in Digital Commerce
            </h2>
            <p className="text-gray-600 text-lg">
              Guided by the timeless wisdom of our ancestors, building the
              future together.
            </p>
          </div>

          {/* Wisdom Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-green-800 italic mb-2">
                "Haraka haraka haina baraka"
              </p>
              <p className="text-green-700 font-medium mb-2">
                Hurry hurry has no blessings
              </p>
              <p className="text-sm text-green-600 opacity-80">
                Context: Patient trading builds lasting partnerships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700"
            >
              🌍 New: Transformative Expansion
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Savannah Ecosystem 2.0
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
              Beyond B2B: A holistic socio-economic-ecological platform where
              every transaction benefits ecosystems, communities, and wildlife.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                🦁 Explore Lion Loyalty Program
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                🎓 Savanna Code Schools
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                emoji: "🦁",
                title: "Consumer-to-Ecosystem",
                desc: "Wildlife impact tracking",
              },
              {
                emoji: "🎓",
                title: "Education-to-Enterprise",
                desc: "Swahili-first programming",
              },
              {
                emoji: "👑",
                title: "Government-to-Grassroots",
                desc: "Digital chief system",
              },
              {
                emoji: "🐘",
                title: "Wildlife-to-Wallet",
                desc: "Animal-AI collaboration",
              },
              {
                emoji: "🌧️",
                title: "Crisis-to-Opportunity",
                desc: "Drought insurance",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-4 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Savanna Marketplace?
            </h2>
            <p className="text-xl text-gray-600">
              Built for Kenyan businesses, by Kenyan entrepreneurs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                animal: "🦌",
                role: "Swift Gazelles",
                type: "Retailers",
                description:
                  "Agile businesses that survive on volume and quick adaptation",
                traits: ["Speed", "Agility", "Volume-focused"],
                count: "2,400+ Active",
              },
              {
                animal: "🐘",
                role: "Wise Elephants",
                type: "Suppliers",
                description:
                  "Powerhouse suppliers with long memory and strong networks",
                traits: ["Memory", "Strength", "Reliability"],
                count: "850+ Trusted",
              },
              {
                animal: "🐆",
                role: "Lightning Cheetahs",
                type: "Drivers",
                description:
                  "Speed-focused delivery specialists racing across Kenya",
                traits: ["Speed", "Precision", "Coverage"],
                count: "1,200+ Ready",
              },
            ].map((ecosystem, index) => (
              <Card
                key={ecosystem.role}
                className="group hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-400"
              >
                <CardHeader className="text-center pb-3">
                  <div className="text-4xl mb-3 group-hover:animate-bounce transition-all duration-300">
                    {ecosystem.animal}
                  </div>
                  <CardTitle className="text-lg text-green-700">
                    {ecosystem.role}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{ecosystem.type}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-center leading-relaxed">
                    {ecosystem.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-green-600">
                      Key Traits:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ecosystem.traits.map((trait) => (
                        <Badge
                          key={trait}
                          variant="outline"
                          className="text-xs border-green-300 text-green-700"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <Badge className="bg-green-600 text-white">
                      {ecosystem.count}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">🦁 Savanna Marketplace</h3>
            <p className="text-gray-400 mb-4">
              Kenya's premier B2B marketplace where businesses thrive together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Marketplace
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Enterprise
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      API Docs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8">
              <p className="text-gray-500">
                © 2024 Savanna Marketplace. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexFixed;
