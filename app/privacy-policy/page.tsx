import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | Active Covers Australia",
  description: "Privacy Policy for Active Covers Australia Pty Ltd (ACN 654 070 381).",
};

const sections = [
  {
    heading: "Overview",
    content: `Active Covers Australia Pty Ltd (ACN 654 070 381) has established a privacy policy compliant with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). We are committed to protecting the personal information of our customers, suppliers, and other individuals we deal with.`,
  },
  {
    heading: "Personal Information We Collect",
    content: `We collect various types of information including names, contact details, product and service information, browser and device data, website usage statistics, demographic information, and other details voluntarily provided to us. We aim to collect only information that is reasonably necessary for a specific purpose.`,
  },
  {
    heading: "How We Collect and Use Your Information",
    content: `Personal information is gathered through forms, surveys, emails, phone calls, social media, and face-to-face interactions. We use this information for:\n\n• Communication and contact purposes\n• Administrative record-keeping\n• Analytics and business development\n• Competition management\n• Responding to queries\n• Marketing communications\n• Service improvement\n• Legal compliance`,
  },
  {
    heading: "Sensitive Information",
    content: `We may collect sensitive information (such as health information, political opinions, religious beliefs, or criminal history) when reviewing employment applications or handling complaints. Such information is handled with the highest level of care and only used for the purpose for which it was collected.`,
  },
  {
    heading: "Third-Party Collection",
    content: `Information may be collected indirectly from publicly available sources or third parties, such as employment referees. Any third party providing personal information to us must have obtained prior consent from the relevant individual before doing so.`,
  },
  {
    heading: "Website Data & Cookies",
    content: `Our website uses cookies, web beacons, and analytics tools including Google Analytics. These help us understand how visitors use our site and improve our services. You can adjust your browser settings to reject cookies, though this may affect some website functionality. Most internet browsers allow you to choose whether to accept cookies or not.`,
  },
  {
    heading: "Disclosure of Your Information",
    content: `Personal information may be shared with our employees, contractors, business partners, service providers, and regulatory authorities where required. Where personal information is disclosed overseas, we take steps to ensure recipients maintain substantially similar privacy protections to those required under Australian law.`,
  },
  {
    heading: "Storage & Security",
    content: `Your data is stored in private cloud storage with appropriate security measures in place. However, please be aware that no method of transmission over the internet is completely secure. We cannot guarantee the security of any information transmitted to or by us over the internet.`,
  },
  {
    heading: "Access & Corrections",
    content: `You may request access to the personal information we hold about you and we will respond within 30 days. We may refuse access in limited circumstances, such as where providing access would pose a safety risk, violate another person's privacy, or is subject to legal proceedings. If your information is inaccurate, please contact us and we will correct it promptly.`,
  },
  {
    heading: "Complaints",
    content: `If you have a complaint about how we have handled your personal information, please email us at info@activecovers.com.au. We will respond within a reasonable timeframe. If you remain unsatisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au.`,
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-white/50 text-sm">
              Active Covers Australia Pty Ltd (ACN 654 070 381) &nbsp;·&nbsp; Effective 1 January 2023
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-bold text-xl text-[#0f1117] mb-3">{s.heading}</h2>
                <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                  {s.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-xs text-gray-400">
            For privacy enquiries, contact us at{" "}
            <a href="mailto:info@activecovers.com.au" className="text-[#fcaf3b] hover:underline">
              info@activecovers.com.au
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
