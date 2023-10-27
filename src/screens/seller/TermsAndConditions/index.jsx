import { textTypes} from '@/app-globals';
import { Card, Text } from '@/components';

import styles from './styles.module.scss';

function TermsAndConditions() {

  return (
    <div className={styles.TermsAndConditions}>
      
      <Text type={textTypes.HEADING.XS}>
        Terms and Conditions
      </Text>

      <Card className={styles.TermsAndConditions_card}>
        Welcome to Keepscape, the unparalleled platform dedicated to helping tourists and local artisans in Region 7 connect and find the perfect souvenir. To maintain the high standards of our platform, we have established these Terms and Conditions for Sellers (hereinafter referred to as "Terms") to govern your participation as a seller on Keepscape. Please read these Terms carefully and ensure that you understand and agree to abide by them.
        
        <br/>
        <br/>
        <b>Definitions</b>
        <br/>
        <br/>

        Keepscape Platform: The online platform provided by Keepscape for the purpose of connecting sellers with tourists and facilitating the sale of souvenirs.<br/>

        Seller: Refers to any individual or entity who offers souvenirs for sale on the Keepscape Platform.<br/>

        Souvenirs: Handcrafted items, products, or artwork offered for sale on the Keepscape Platform.<br/>

        <br/>
        <b>Registration and Eligibility</b>
        <br/>
        <br/>

        To become a seller on Keepscape, you must meet the following criteria:<br/>
        <ul>
          <li>You must be a legitimate artisan or a business located in Region 7.</li>
          <li>You must provide accurate and complete information during the registration process.</li>
          <li>You must comply with all applicable local laws and regulations, including tax laws.</li>
          <li>You must adhere to the Keepscape seller application process, which may include a review of your souvenirs.</li>
        </ul>
        
        <b>Souvenir Listings</b>
        <br/>
        <br/>

        As a seller on Keepscape, you agree to:<br/>

        <ul>
          <li>Provide accurate and detailed descriptions of your souvenirs, including their materials, size, and any other relevant information.</li>
          <li>Upload high-quality images of your souvenirs.</li>
          <li>Clearly indicate the price of each souvenir.</li>
          <li>Keep your souvenir listings up to date, including marking items as "sold" or "out of stock" if they are no longer available.</li>
        </ul>
        
        <b>Pricing and Payments</b>
        <br/>
        <br/>

        You have the freedom to set your own prices for your souvenirs. Keepscape does not dictate pricing.
        Keepscape will process payments on your behalf and transfer your earnings to your designated account, less any applicable fees or commissions.
        
        <br/>
        <br/>
        <b>Shipping and Returns</b>
        <br/>
        <br/>

        You are responsible for ensuring the timely and safe delivery of sold souvenirs to the buyers.
        In the event of a return or dispute, Keepscape will follow its established refund and return policies to address the issue.
        
        <br/>
        <br/>
        <b>Quality and Authenticity</b>
        <br/>
        <br/>

        As a seller, you are expected to provide high-quality and authentic souvenirs that represent the essence of Region 7.
        Keepscape reserves the right to remove any listings or suspend sellers who provide counterfeit or low-quality items.
        
        <br/>
        <br/>
        <b>Customer Interaction</b>
        <br/>
        <br/>

        Sellers must maintain a high level of professionalism and responsiveness when communicating with buyers.
        You agree to address customer inquiries, issues, and requests in a timely and courteous manner.

        <br/>
        <br/>
        <b>Privacy and Data</b>
        <br/>
        <br/>

        You agree to handle customer data in accordance with all relevant privacy laws and Keepscape's privacy policy.
        
        <br/>
        <br/>
        <b>Compliance with Keepscape's Vision</b>
        <br/>
        <br/>

        Sellers must align with Keepscape's vision of providing tourists with authentic and enriching souvenirs that capture the essence of Region 7.
        
        <br/>
        <br/>
        <b>Termination</b>
        <br/>
        <br/>

        Keepscape reserves the right to terminate the seller account of any individual or entity that violates these Terms, engages in fraudulent or malicious activities, or does not meet the platform's quality and authenticity standards.

        <br/>
        <br/>
        <b>Changes to Terms</b>
        <br/>
        <br/>

        Keepscape may update these Terms at any time. Sellers will be notified of changes, and it is their responsibility to review and agree to the updated Terms to continue selling on the platform.

        <br/>
        <br/>
        <b>Conclusion</b>
        <br/>
        <br/>

        By becoming a seller on Keepscape, you agree to abide by these Terms and Conditions. This agreement constitutes a legally binding contract between you and Keepscape. We are excited to have you as part of our platform and look forward to your contributions in making souvenir selection effortless and enriching for tourists and local artisans in Region 7.
      </Card>

    </div>
  )
}
export default TermsAndConditions;
