import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-warm text-brand-dark-grey flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white shadow-sm rounded-xl p-10 border border-gray-100">
        <header className="mb-8 border-b border-gray-100 pb-6 text-center">
          <h1 className="text-4xl font-semibold text-brand-blue tracking-tight mb-2">
            Edge Learning & Delivery OS
          </h1>
          <p className="text-brand-neutral text-lg">
            Powered by Strengthscape
          </p>
        </header>

        <main className="space-y-6">
          <div className="p-6 bg-brand-warm rounded-lg border border-gray-100">
            <h2 className="text-xl font-medium text-brand-maroon mb-3">System Status</h2>
            <div className="flex items-center space-x-3 text-sm">
              <div className="h-3 w-3 rounded-full bg-brand-green"></div>
              <span className="font-medium">Platform Foundation Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-gray-100 rounded-lg">
              <h3 className="font-medium text-brand-blue mb-2">Learner Portal</h3>
              <p className="text-sm text-brand-neutral mb-4">Access assigned programs and AI-guided paths.</p>
              <button className="px-4 py-2 bg-brand-blue text-white rounded-md text-sm font-medium hover:bg-brand-blue/90 transition-colors w-full">
                Sign In
              </button>
            </div>
            <div className="p-5 border border-gray-100 rounded-lg">
              <h3 className="font-medium text-brand-blue mb-2">Admin & Facilitator</h3>
              <p className="text-sm text-brand-neutral mb-4">Manage cohorts, view heat maps, and access insights.</p>
              <button className="px-4 py-2 bg-white border border-brand-blue text-brand-blue rounded-md text-sm font-medium hover:bg-gray-50 transition-colors w-full">
                Workspace Login
              </button>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-brand-neutral">
          &copy; {new Date().getFullYear()} Strengthscape. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
