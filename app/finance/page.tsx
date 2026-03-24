import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Finance Options | Active Covers Australia",
  description: "Flexible finance options for your hydraulic swim spa cover. Apply online with HandyPay.",
};

export default function FinancePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-[#0f1117] pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-4">
              Flexible Payments
            </p>
            <h1 className="font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              Finance Your Cover
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
              Spread the cost of your new swim spa cover with flexible finance options through our partner HandyPay. Fast approval, no hassle.
            </p>
          </div>
        </div>

        {/* HandyPay Widget */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div id="omm-landing-page" className="omm-page">&nbsp;</div>
        </div>

      </main>

      <Footer />

      {/* HandyPay Scripts */}
      <Script id="handypay-vendor" strategy="afterInteractive">
        {`window.handypayVendor = "ActiveCoversAustralia";`}
      </Script>
      <Script
        src="https://storage.googleapis.com/handypay/landing-page/v2/js/handypay-vlp-integration.js"
        strategy="afterInteractive"
      />
    </>
  );
}
