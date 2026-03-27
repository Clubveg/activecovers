import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Warranty | Active Covers Australia",
  description: "5 Year Limited Warranty for Active Covers Australia hydraulic swim spa covers.",
};

const exclusions = [
  "Failure to provide reasonable periodic maintenance",
  "Cleaning with harsh chemicals, chlorine, or abrasives",
  "Damage caused by animals, mould, or mildew",
  "Events of nature, wind or storm damage, or acts of God",
  "Alterations or unauthorised repairs",
  "Damage caused during freight transportation",
  "Damage to underside insulation foam due to excessive chemicals, ozone, or improper water balance",
  "Tearing, puncturing, or scuffing of the insulation foam",
  "Any modification, installation, or addition (including decking) performed by a third party not authorised in writing by Active Covers Australia Pty Ltd",
  "Any structural or cosmetic issue resulting from incorrect or non-compliant site preparation or construction (e.g., pit dimensions not matching provided specifications)",
];

export default function WarrantyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-[#0f1117] pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-4">
              Peace of Mind
            </p>
            <h1 className="font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              5 Year Limited Warranty
            </h1>
            <p className="text-white/50 text-sm">
              Active Covers Australia Pty Ltd &nbsp;·&nbsp; Covers both parts and labour
            </p>
          </div>
        </div>

        {/* Coverage summary cards */}
        <div className="bg-[#fcaf3b]/10 border-b border-[#fcaf3b]/20 px-6 py-10">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6">
            {[
              { years: "Years 1–2", coverage: "100%", label: "Full parts & labour" },
              { years: "Years 3–5", coverage: "50%", label: "Parts & labour" },
              { years: "Electrical", coverage: "OEM", label: "Original manufacturer warranty" },
            ].map((c) => (
              <div key={c.years} className="rounded-2xl bg-white border border-[#fcaf3b]/30 p-6 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#fcaf3b] mb-1">{c.years}</p>
                <p className="font-bold text-3xl text-[#0f1117] mb-1">{c.coverage}</p>
                <p className="text-xs text-gray-500">{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">

          {/* Overview */}
          <div>
            <h2 className="font-bold text-xl text-[#0f1117] mb-4">Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your Active Covers Australia spa cover is warranted for five (5) years from the date of purchase, to be free of defects in materials and workmanship, covering both parts and labour unless otherwise specified. This warranty extends only to the original consumer purchaser and terminates upon any transfer of ownership.
            </p>
          </div>

          {/* Performance / Making a Claim */}
          <div>
            <h2 className="font-bold text-xl text-[#0f1117] mb-4">Making a Warranty Claim</h2>
            <ul className="flex flex-col gap-3">
              {[
                "Written notice of any malfunction or defect must be given within 14 days of the time the defect is discovered.",
                "The original proof of purchase receipt must accompany any written notification.",
                "Freight to and from Active Covers Australia is to be paid by the purchaser only if the defect is confirmed to be covered by the warranty after inspection.",
                "Upon inspection, if the defect is determined to be covered, the cover will be repaired or replaced at our discretion.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fcaf3b] flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div>
            <h2 className="font-bold text-xl text-[#0f1117] mb-4">Exclusions</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              This warranty does not cover damage due to improper use, accidents, wind, normal wear and tear, or any of the following:
            </p>
            <ul className="flex flex-col gap-3">
              {exclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div>
            <h2 className="font-bold text-xl text-[#0f1117] mb-4">Limitations</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This Limited Warranty applies solely to the original purchaser for residential, non-commercial use only. The warranty is non-transferable and is in effect only at the original installation site. All warranty service must be performed by the manufacturer or its designated representative.
            </p>
          </div>

          {/* Disclaimers */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="font-bold text-base text-[#0f1117] mb-3">Disclaimers</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Active Covers Australia Pty Ltd and its representatives shall not be liable for any injury, loss, cost, or other damage — whether incidental, consequential, or economic — arising out of any defect covered by this Limited Warranty, including loss of use of the spa or spa cover, business interruption, or costs for removal or reinstallation. The liability of Active Covers Australia Pty Ltd under this warranty, if any, shall not exceed the original amount paid for the defective product. Any dispute pertaining to this warranty shall be resolved through binding arbitration or mediation in the state of NSW and subject to its laws.
            </p>
          </div>

        </div>

        {/* Related docs */}
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-xs">
            <a href="/terms-conditions" className="text-[#fcaf3b] hover:underline">Terms &amp; Conditions</a>
            <span className="text-gray-300">·</span>
            <a href="/privacy-policy" className="text-[#fcaf3b] hover:underline">Privacy Policy</a>
            <span className="text-gray-300">·</span>
            <a href="/operating-procedure" className="text-[#fcaf3b] hover:underline">Operating Procedure</a>
            <span className="text-gray-300">·</span>
            <a href="mailto:info@activecovers.com.au" className="text-[#fcaf3b] hover:underline">info@activecovers.com.au</a>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
