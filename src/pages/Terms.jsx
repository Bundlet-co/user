import Footer from "@/components/Footer";
import { BsEnvelope, BsPhone, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";


const Terms = () =>
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
      <p className="text-2xl font-bold capitalize text-primary">Bundlet.co Terms & Conditions</p>

      <p className="my-4 text-black text-lg font-semibold">1. Introduction</p>
      <p className="mb-4">These Terms and Conditions govern the use of the services offered by Bundlet.co (“Bundlet”) on the Bundlet.co website (the &ldquo;Website&ldquo;). Please read these Terms & Conditions along with our Privacy Policy carefully before using our website and services. <br />
        By accessing or using Bundlet.co, you agree to comply with these Terms & Conditions and confirm that you are either at least eighteen (18) years old or are using the website under the supervision of a parent or legal guardian.</p>
      
      <p className="mb-4 text-black text-lg font-semibold">2. Use of Website</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Bundlet.co grants you a non-transferable and revocable licence to use the website for shopping and related services.</li>
        <li >Any breach of these Terms & Conditions may result in the immediate revocation of your access without notice.</li>
        <li >Some features may require registration or subscription, and you agree to provide accurate and updated information.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">3. User Account</p>
      <ul className="mb-4 list-disc pl-5">
        <li >You are solely responsible for all activities under your Bundlet.co account.</li>
        <li >You must keep your login credentials confidential and notify us immediately of unauthorised access.</li>
        <li >By providing your phone number and email, you consent to receiving order updates, promotions, and other relevant information. You may opt out at any time.</li>
        <li >Bundlet.co may suspend or cancel your account for security concerns or violations of these Terms & Conditions.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">4. User Submission</p>
      <p className="mb-4">Users may submit comments, reviews, photos, and videos. However, submissions must not:</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Violate copyrights, privacy, or third-party rights.</li>
        <li >Contain illegal, obscene, defamatory, or offensive content.</li>
        <li >Impersonate another person or damage Bundlet.co’s reputation.</li>
      </ul>
      <p className="mb-4">Bundlet.co reserves the right to remove inappropriate content and disclaims responsibility for user-generated content.</p>

      <p className="mb-4 text-black text-lg font-semibold">5. Website Content & Pricing</p>
      <ul className="mb-4 list-disc pl-5">
        <li >While we strive for accuracy, errors in product details, images, or pricing may occur.</li>
        <li >Weighed items (e.g., fruits, meat) may have estimated prices. You will only be billed for the actual weight purchased, and any price difference will be credited or debited to your Bundlet.co Wallet.</li>
        <li >We reserve the right to cancel or refuse orders with incorrect pricing or product details.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">6. Order Acceptance & Cancellation</p>
      <p className="mb-4">Bundlet.co reserves the right to:</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Accept or decline orders at its discretion.</li>
        <li >Cancel orders and communicate cancellations in a timely manner.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">7. Orders Including Alcoholic Beverages</p>
      <p className="mb-4">Alcoholic products can only be purchased by users aged 18 and above. Buyers must:</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Provide valid identification upon delivery.</li>
        <li >Accept that failure to show valid ID may result in order cancellation.</li>
      </ul>
      <p className="mb-4">Bundlet.co and its delivery agents reserve the right to refuse delivery if an ID appears fake or falsified.</p>

      <p className="mb-4 text-black text-lg font-semibold">8. Delivery</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Delivery times vary based on location and courier service.</li>
        <li >Customers must provide accurate shipping details to avoid delays.</li>
        <li >Bundlet.co uses third-party couriers, and customers agree to abide by their terms & conditions.</li>
        <li >Customs procedures & delays are beyond Bundlet.co’s control.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">9. Insurance & Liability</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Bundlet.co offers optional insurance (at an extra cost) for high-value items through third-party providers.</li>
        <li >We are not responsible for customs fees, taxes, or delivery delays caused by external factors.</li>
        <li >Customers must ensure their details are correct before placing an order.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">10. Third-Party Websites</p>
      <p className="mb-4">Bundlet.co may link to external websites but is not responsible for their content or services.</p>

      <p className="mb-4 text-black text-lg font-semibold">11. Intellectual Property Rights</p>
      <ul className="mb-4 list-disc pl-5">
        <li >All website materials (content, images, layout, etc.) belong to Bundlet.co.</li>
        <li >Users may not copy, modify, or redistribute content without permission.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">12. Territorial Use</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Bundlet.co primarily operates in Nigeria.</li>
        <li >Users outside Nigeria must ensure compliance with local laws before accessing the website.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">13. Governing Law</p>
      <p className="mb-4">These Terms & Conditions are governed by the laws of Nigeria, and disputes will be resolved in Nigerian courts.</p>

      <p className="mb-4 text-black text-lg font-semibold">14. Limitation of Liability</p>
      <p className="mb-4">Bundlet.co is not liable for any:</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Direct, indirect, or incidental damages arising from website use.</li>
        <li >Losses exceeding the amount paid by a user for services.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">15. Indemnity</p>
      <p className="mb-4">Users agree to indemnify Bundlet.co against any claims, penalties, or legal fees arising from violations of these Terms & Conditions.</p>

      <p className="mb-4 text-black text-lg font-semibold">16. Termination of Services</p>
      <ul className="mb-4 list-disc pl-5">
        <li >Bundlet.co may suspend or terminate accounts without notice.</li>
        <li >Upon termination, users must cease all access to the website.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">17. Delivery Policies</p>
      <p className="">Delivery Windows: Users may select a preferred delivery window, but delivery times are not guaranteed. <br />
      Communication During Order Processing: Customers must respond within 15 minutes to calls/emails regarding order changes. <br />
      Access & Delivery Restrictions</p>
      <ul className=" list-disc pl-5">
        <li >If access to your location is restricted (e.g., bad roads, flooding), you must notify us in advance.</li>
        <li >Drivers will only walk up to the 4th floor of buildings without elevators (2nd floor for heavy items).</li>
      </ul>
      <p>Meeting the Delivery Driver</p>
      <ul className=" list-disc pl-5 mb-4">
        <li >Drivers will wait for only 5 minutes at the delivery location.</li>
        <li >If a customer is unavailable, the order may be rescheduled at an additional cost.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">18. Delivery Policies</p>
      <p className="">Order Cancellations:</p>
      <ul className=" list-disc pl-5">
        <li >Once an order is paid for, it cannot be cancelled or refunded unless an incorrect or damaged item is delivered.</li>
      </ul>
      <p>Returns</p>
      <ul className=" list-disc pl-5">
        <li >If Bundlet.co delivers the wrong or damaged item, it will be replaced at no extra cost.</li>
        <li >Customers must report issues at the time of delivery before signing for the order.</li>
      </ul>
      <p>Refunds</p>
      <ul className=" list-disc pl-5 mb-4">
        <li >Refunds for out-of-stock items will be credited to your Bundlet.co Wallet (not bank accounts).</li>
        <li >If your address is outside our delivery zones, a refund may be issued minus bank charges.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">19.  Bundlet.co Wallet Terms of Use</p>
      <ul className="mb-4 list-disc pl-5">
        <li >The Bundlet.co Wallet is a digital wallet for seamless payments and refunds.</li>
        <li >Deposits are made via bank transfer, Pepsa Wallet, crypto, or card payments.</li>
        <li >Withdrawals can only be made to Naira bank accounts, and fees may apply.</li>
        <li >Wallet funds cannot be transferred to other users or used outside Bundlet.co.</li>
      </ul>

      <p className="mb-4 text-black text-lg font-semibold">20.  Contact Information</p>
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

export default Terms