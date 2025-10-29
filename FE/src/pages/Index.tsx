import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/home.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-72 pb-20">
        {/* ↑ increased top padding from pt-44 → pt-72 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="ml-16">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-primary">Queue Sync</span>
              <br />
              <span className="text-foreground">Virtual Wait List</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Because Waiting Shouldn't Cost You time And Safety
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/bookings">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-glow text-lg px-8 py-6 rounded-full"
                >
                  Book Now
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full"
              >
                About Us
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-glow max-w-4xl mx-auto">
            <img
              src={heroImage}
              alt="Karnataka Temple - Our Pride"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 mt-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Queue Sync?</h2>
          <p className="text-xl text-muted-foreground">
            Smart queue management powered by mathematics, not guesswork
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <span className="text-3xl">⏱️</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Real-Time Updates</h3>
            <p className="text-muted-foreground">
              Track your position and estimated wait time with live updates
              every 10 seconds
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Predictions</h3>
            <p className="text-muted-foreground">
              Mathematical models predict accurate wait times based on real
              service data
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Auto Redistribution</h3>
            <p className="text-muted-foreground">
              AI-powered congestion control automatically balances queues across
              counters
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-18 pt-32 pb-20">
        <div className="rounded-3xl bg-gradient-primary p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Skip the Wait?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are saving time with virtual queues
          </p>
          <Link to="/bookings">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2025 Queue Sync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
