import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms & Conditions | Active Covers Australia",
  description: "General Terms & Conditions of Sale and Security Agreement — Active Covers Australia Pty Ltd (ACN 654 070 381).",
};

const sections = [
  {
    number: "1",
    heading: "Definitions",
    items: [
      { term: "Customer", def: "The person or entity purchasing Goods or Services from Active Covers Australia Pty Ltd." },
      { term: "Goods", def: "Custom-made products, components, or materials supplied by the Company." },
      { term: "Services", def: "Engineering, design, fabrication, installation, commissioning, or related works performed by the Company." },
      { term: "Contract", def: "The agreement between the parties, including the quotation, these Terms, and any agreed written variations." },
      { term: "Price", def: "The total amount payable for the Goods and Services as set out in the Contract." },
    ],
  },
  {
    number: "2",
    heading: "Application of Terms",
    clauses: [
      "2.1 — These Terms override any terms proposed by the Customer unless expressly agreed in writing by a director of the Company.",
      "2.2 — No employee, agent, or subcontractor may vary these Terms without written confirmation from an authorised representative.",
      "2.3 — These Terms operate alongside any non-excludable rights under Australian Consumer Law.",
    ],
  },
  {
    number: "3",
    heading: "Pricing and Payment",
    clauses: [
      "3.1 — All prices exclude GST unless stated otherwise.",
      "3.2 — Quotations are valid for 30 days unless a different period is specified.",
      "3.3 — Payment milestones — including deposits, fabrication instalments, and final balances — are as specified in the Contract.",
      "3.4 — The Company may suspend work for non-payment.",
      "3.5 — Overdue amounts incur interest at 2% per month calculated daily, plus any reasonable recovery costs.",
    ],
  },
  {
    number: "4",
    heading: "Finance, Payments, and Commencement of Work",
    clauses: [
      "4.1 — Where third-party finance is involved, work commences only after cleared funds are received by the Company.",
      "4.2 — Finance approval or conditional approval does not authorise commencement of work.",
      "4.3 — Direct payments will be refunded within 5 business days if finance is subsequently approved for that amount.",
      "4.4 — Payments remain valid and binding if finance is rejected, delayed, or withdrawn.",
      "4.5 — Nothing in this clause limits any rights the Customer has under Australian Consumer Law.",
      "4.6 — Finance information is provided independently; the Company is not a credit provider or broker.",
      "4.7 — The Company does not recommend, endorse, or guarantee any finance products, and does not receive commissions unless expressly stated.",
      "4.8 — Finance agreements are separate contracts; the Company bears no responsibility for approvals, rejections, or disputes relating to finance.",
      "4.9 — The Company provides no financial, credit, or tax advice.",
    ],
  },
  {
    number: "5",
    heading: "Variations",
    clauses: [
      "5.1 — The Company may vary the scope of work and adjust pricing where site conditions differ from those expected.",
      "5.2 — Variations may address structural integrity, safety, compliance, or performance requirements.",
      "5.3 — The Company will notify the Customer of any variation before proceeding; where urgent work is required, the Company may proceed without prior approval.",
    ],
  },
  {
    number: "6",
    heading: "Site Conditions and Installation",
    clauses: [
      "6.1 — The Customer must provide safe, clear, and unrestricted site access with suitable foundations prior to installation.",
      "6.2 — The Company is not responsible for defects in existing site structures or third-party works.",
      "6.3 — Any additional work arising from site defects will be treated as a variation under Clause 5.",
    ],
  },
  {
    number: "7",
    heading: "Delivery, Risk, and Delays",
    clauses: [
      "7.1 — Risk in the Goods passes to the Customer upon delivery to the site.",
      "7.2 — The Company is not liable for delays caused by transport, weather, restricted access, or third parties.",
      "7.3 — The Customer is liable for any storage, re-handling, or return visit costs where installation is delayed due to the Customer's circumstances.",
    ],
  },
  {
    number: "8",
    heading: "Claims and Liability",
    clauses: [
      "8.1 — Claims for defects must be made in writing within 48 hours of delivery or installation.",
      "8.2 — The Company's liability is limited to repair, replacement, or refund at its discretion.",
      "8.3 — The Company is not liable for indirect or consequential loss, except where Australian Consumer Law applies.",
    ],
  },
  {
    number: "9",
    heading: "Title and Security",
    clauses: [
      "9.1 — Title in the Goods remains with the Company until full payment has been received.",
      "9.2 — The Company reserves the right to repossess unpaid Goods.",
    ],
  },
  {
    number: "10",
    heading: "Warranty",
    clauses: [
      "10.1 — Goods and Services are supplied with guarantees that cannot be excluded under Australian Consumer Law.",
      "10.2 — Any additional warranty will be provided in writing with stated conditions.",
    ],
  },
  {
    number: "11",
    heading: "No Returns on Custom-Made Goods",
    clauses: [
      "11.1 — All Goods are custom-made to the Customer's specifications and site conditions.",
      "11.2 — Custom Goods are not returnable, refundable, or exchangeable once fabrication or procurement has commenced.",
      "11.3 — This clause does not limit the Customer's rights in relation to defective or non-compliant Goods.",
    ],
  },
  {
    number: "12",
    heading: "Subcontracting",
    clauses: [
      "12.1 — The Company may subcontract any part of the work without notice to the Customer.",
    ],
  },
  {
    number: "13",
    heading: "Dispute Resolution",
    clauses: [
      "13.1 — The parties will attempt to resolve any dispute through good-faith discussions in the first instance.",
      "13.2 — If a dispute remains unresolved after 14 days, the parties must proceed to mediation before commencing any legal action.",
    ],
  },
  {
    number: "14",
    heading: "Privacy",
    clauses: [
      "14.1 — The Company collects and uses Customer information in accordance with applicable Australian privacy laws.",
      "14.2 — Third-party services manage data under their own policies; the Company is not responsible for third-party data handling.",
    ],
  },
  {
    number: "15",
    heading: "Governing Law",
    clauses: [
      "15.1 — These Terms are governed by the laws of New South Wales. Both parties submit to the jurisdiction of the courts of that state.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-[#0f1117] pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-4">
              Legal
            </p>
            <h1 className="font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/50 text-sm">
              General Terms &amp; Conditions of Sale and Security Agreement &nbsp;·&nbsp; Active Covers Australia Pty Ltd (ACN 654 070 381)
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.number}>
                <h2 className="font-bold text-xl text-[#0f1117] mb-4">
                  <span className="text-[#fcaf3b] mr-2">{s.number}.</span>
                  {s.heading}
                </h2>

                {/* Definition list */}
                {"items" in s && s.items && (
                  <div className="flex flex-col gap-3">
                    {s.items.map((item) => (
                      <div key={item.term} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                        <span className="font-bold text-[#0f1117] flex-shrink-0 w-28">{item.term}</span>
                        <span>{item.def}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Clause list */}
                {"clauses" in s && s.clauses && (
                  <ul className="flex flex-col gap-3">
                    {s.clauses.map((clause) => (
                      <li key={clause} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#fcaf3b] flex-shrink-0 mt-1.5" />
                        {clause}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Related docs */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-xs">
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
