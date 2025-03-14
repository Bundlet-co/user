import Footer from "@/components/Footer";
import { BsEnvelope, BsPhone, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";


const Privacy = () =>
{
  const contacts = [
    {
      name: "Email",
      link: "mailto:contact@bundlet.co",
      content:"contact@bundlet.co",
      icon:<BsEnvelope/>
    },
    {
      name: "Phone (call Only)",
      link: "tel:+2348083637436",
      content:"+2348083637436",
      icon: <BsPhone/>
    },
    {
      name: "Whatsapp chat",
      content:"https://wa.me/message/YL7S5D4KR4OOC1",
      link: "https://wa.me/message/YL7S5D4KR4OOC1",
      icon:<BsWhatsapp/>
    }
  ]
  return (
    <main className="h-full overflow-y-auto">
      <p className="text-2xl font-bold capitalize text-primary">privacy policy</p>
      <p className="my-4 text-black text-lg font-semibold">Introduction</p>
      <p className="mb-4">At Bundlet.co, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy explains the types of data we collect, how we use and protect it, and the measures we take to ensure confidentiality and security. By using our website and services, you agree to the terms outlined in this policy. Please review it carefully.</p>
      <p className="mb-4 text-black text-lg font-semibold">Information We Collect</p>
      <p className="mb-4">When you register an account or interact with Bundlet.co, we may collect personal information, including but not limited to:</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Full Name</li>
        <li >Age & Gender</li>
        <li >Contact Information (Phone Number, Email Address, Postal Address)</li>
        <li >Transaction Details</li>
        <li >Browsing and purchase ­</li>
      </ul>
      <p className="mb-4">Certain details may be stored for future reference, used during transactions, or shared with third-party partners to facilitate service delivery.</p>

      <p className="mb-4 text-black text-lg font-semibold">How We Use Your Information</p>
      <p className="mb-4">The information collected is used to enhance your experience and provide our services effectively. Specifically, we may use your data for:</p>

      <ul className="mb-4 list-disc pl-5">
        <li>Processing and fulfilling your orders</li>
        <li>Sending order confirmations and status updates</li>
        <li>Addressing customer service requests, complaints, or enquiries</li>
        <li>Providing personalised shopping experiences</li>
        <li>Informing you about promotions, offers, and updates</li>
        <li>Detecting and preventing fraud or unauthorised activities</li>
        <li>Conducting research and analysis to improve our services</li>
      </ul>

      <p className="mb-4">If you wish to opt out of promotional messages, you may request to do so at any time. However, essential service-related communications may still be sent as they are necessary for fulfilling your orders.</p>

      <p className="mb-4 text-black text-lg font-semibold">Data Security</p>
      <p className="mb-4">We implement strict security measures to protect your personal data from unauthorised access, use, or disclosure. Sensitive information, such as payment details, is handled securely by our payment providers, following industry-standard encryption and security protocols. <br />
      While we take all reasonable precautions to protect your data, it is important to remember that no method of transmission over the internet is entirely secure. We encourage users to keep their account credentials confidential and report any suspicious activity immediately.</p>

      <p className="mb-4 text-black text-lg font-semibold">Cookies and Tracking Technologies</p>
      <p className="mb-4">Bundlet.co uses cookies to enhance your browsing experience. Cookies help store relevant data such as your login details, preferences, and frequently used shipping addresses to streamline future interactions. <br />
      You can choose to accept or decline cookies through your browser settings. However, disabling cookies may limit your access to certain features and services on our website.</p>

      <p className="mb-4 text-black text-lg font-semibold">Third-Party Services</p>
      <p className="mb-4">We may partner with third-party logistics providers, payment processors, and marketing services to facilitate transactions, deliveries, and promotional activities. These partners are obligated to maintain data security and confidentiality in accordance with applicable regulations.</p>

      <p className="mb-4 text-black text-lg font-semibold">Your Rights & Choices</p>
      <p className="mb-">As a Bundlet.co user, you have the right to:</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Access, update, or modify your personal information</li>
        <li >Request the deletion of your data, where legally applicable</li>
        <li >Opt out of marketing communications</li>
        <li >Restrict certain data-processing activities</li>
      </ul>
      <p className="mb-">To exercise these rights or raise concerns regarding your data, please contact our support team at customer@bundlet.co</p>

      <p className="mb-4 text-black text-lg font-semibold">Changes to This Privacy Policy</p>
      <p className="mb-4">Bundlet.co reserves the right to update or modify this Privacy Policy as needed. Any significant changes will be communicated through our website or direct notifications. Your continued use of our services after such updates constitutes acceptance of the revised terms.</p>

      <p className="mb-4 text-black text-lg font-semibold">Contact Information</p>
      <p className="mb-4">For questions or support, reach us via:</p>
      { contacts.map( ( item, index ) => (
        <div className="flex space-x-1 text-tiny" key={ index }>
          { item.icon }
          <p>{ item.name }:</p>
          <Link to={ item.link }>{ item.content }</Link>
        </div>
      ))}

      <Footer/>
    </main>
  )
}

export default Privacy