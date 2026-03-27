import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Operating Procedure | Active Covers Australia",
  description: "Safe operating guidelines for your hydraulically operated swim spa cover by Active Covers Australia.",
};

export default function OperatingProcedurePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-[#0f1117] pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-4">
              Documentation
            </p>
            <h1 className="font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              Operating Procedure
            </h1>
            <p className="text-white/50 text-sm">
              Hydraulically Operated Spa Cover &nbsp;·&nbsp; Active Covers Australia Pty Ltd
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* Warning banner */}
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mb-12 flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-red-700 text-sm mb-1">Important Safety Warning</p>
              <p className="text-red-600 text-sm leading-relaxed">
                Improper use of this hydraulically operated spa cover may cause serious injury or death. Read and follow all instructions before operating.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12">

            {/* Safety Precautions */}
            <div>
              <h2 className="font-bold text-xl text-[#0f1117] mb-4">Safety Precautions</h2>
              <ul className="flex flex-col gap-3">
                {[
                  "Keep all people clear of the cover during operation.",
                  "Ensure the spa or pool is empty of people before closing the cover.",
                  "Check for overhead obstructions before operating.",
                  "Observe the duty cycle — allow 15 minutes before closing the cover, with a maximum of 2 cycles per hour.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fcaf3b] flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Age Restriction */}
            <div>
              <h2 className="font-bold text-xl text-[#0f1117] mb-4">Age Restriction</h2>
              <div className="rounded-xl bg-[#fcaf3b]/10 border border-[#fcaf3b]/30 p-5">
                <p className="text-sm text-[#0f1117] leading-relaxed font-medium">
                  This hydraulically operated spa cover must not be operated by any person under the age of 18. Active Covers Australia Pty Ltd accepts no responsibility for injuries or damages arising from unauthorised operation by a minor.
                </p>
              </div>
            </div>

            {/* Opening */}
            <div>
              <h2 className="font-bold text-xl text-[#0f1117] mb-4">Opening the Cover</h2>
              <ol className="flex flex-col gap-3">
                {[
                  "Use the wall-mounted switch or remote control to begin opening.",
                  "Monitor the operation closely and listen for any unusual sounds or resistance.",
                  "Operate slowly and steadily — do not rush the mechanism.",
                  "Never leave the cover unattended during operation.",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-4 text-sm text-gray-600 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0f1117] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Closing */}
            <div>
              <h2 className="font-bold text-xl text-[#0f1117] mb-4">Closing the Cover</h2>
              <ol className="flex flex-col gap-3">
                {[
                  "Verify that no person remains inside the spa or pool before closing.",
                  "Observe the cover's movement throughout the full closing cycle and watch for malfunctions.",
                  "Maintain slow, steady operation — do not force or rush the mechanism.",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-4 text-sm text-gray-600 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0f1117] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Maintenance */}
            <div>
              <h2 className="font-bold text-xl text-[#0f1117] mb-4">Maintenance</h2>
              <ul className="flex flex-col gap-3">
                {[
                  "Inspect hydraulic systems, hinges, and locks regularly for wear or damage.",
                  "Keep the cover area clean and free of debris at all times.",
                  "Ensure tracks and rails are clear before each use.",
                  "Lubricate all moving parts in accordance with the manufacturer's recommendations.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fcaf3b] flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="font-bold text-base text-[#0f1117] mb-3">Disclaimer</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Active Covers Australia Pty Ltd will not be responsible for any injuries or damages resulting from the failure to adhere to these operating instructions. If you have any questions about safe operation, please contact us before use.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-xs text-gray-400">
            Questions? Contact us at{" "}
            <a href="mailto:info@activecovers.com.au" className="text-[#fcaf3b] hover:underline">
              info@activecovers.com.au
            </a>{" "}
            or call{" "}
            <a href="tel:1300502650" className="text-[#fcaf3b] hover:underline">
              1300 50 26 50
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
