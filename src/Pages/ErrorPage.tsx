import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* MAIN */}
      <main className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-16">
          {/* Image */}
          <div className="w-full md:w-5/12">
            <div className="aspect-3/4 rounded-2xl overflow-hidden minimal-shadow grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwoczpneBn6WQNqaxD8zRxFdEm9bl3jtqRTSed7S2Q5O6zj6XJ2n3_BLwPjWP-jGYHvKZN6MiqQkvjGwYIlPfQLLnDm0_TDA1s67EjTvdhLU5hO4T6e33gCHv2bN5FZomLS8zNIcPv7fb-fIsTmCJ7e-xFWFZK28-nY9BZxTIS7t8u80Fg4ds3M-Ka_ru4nZGtAq_NI0btqoNopRsyBBw8kvl-nKjfLowCUii_jXO-QbDPXJsNrUDQdrEBrxMVoNscImhqQieQKWZt"
                alt="Serene Wedding Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-7/12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary/60 font-label font-bold uppercase tracking-widest text-[10px]">
                Error 404
              </h2>

              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-on-surface leading-tight tracking-tight">
                Page Not Found.
              </h1>

              <p className="text-lg text-on-surface-variant font-body leading-relaxed max-w-md">
                This specific arrangement hasn't been orchestrated yet. Like a
                celebration waiting to begin, this path leads to a quiet corner
                of our archive.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-on-primary rounded-full font-headline font-semibold text-sm transition-all hover:bg-on-primary-container active:scale-[0.98] hover:border border-outline-variant/50 duration-200"
              >
                Return to Home
              </Link>
              <Link
                to="/search-artist"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-on-surface border border-outline-variant/50 rounded-full font-headline font-semibold text-sm transition-all hover:bg-surface-container active:scale-[0.98]"
              >
                Search Artists
              </Link>
            </div>

            {/* Useful Links */}
            <div className="pt-10 space-y-4">
              <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                Useful destinations
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <a className="text-sm font-medium text-on-surface/70 hover:text-primary transition-colors flex items-center gap-2 underline underline-offset-4 decoration-outline-variant/30">
                  Verified Artists
                </a>

                <a className="text-sm font-medium text-on-surface/70 hover:text-primary transition-colors flex items-center gap-2 underline underline-offset-4 decoration-outline-variant/30">
                  Luxury Venues
                </a>

                <a className="text-sm font-medium text-on-surface/70 hover:text-primary transition-colors flex items-center gap-2 underline underline-offset-4 decoration-outline-variant/30">
                  Heritage Planners
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
