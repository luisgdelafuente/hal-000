import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | HAL149',
  description: 'HAL149 Terms of Service - The legal agreement between you and HAL149.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 15, 2025</p>
        
        <div className="prose max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you and HAL149 ("we," "us," or "our"), 
            concerning your access to and use of our website and services.
          </p>
          <p>
            You agree that by accessing our website and/or services, you have read, understood, and agree to be bound by all of these 
            Terms of Service. If you do not agree with all of these terms, you are prohibited from using our website and services and 
            must discontinue use immediately.
          </p>
          
          <h2>Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, our website and services, including its content, features, and functionality, are owned by HAL149, 
            its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual 
            property or proprietary rights laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, 
            store, or transmit any of the material on our website and services, except as follows:
          </p>
          <ul>
            <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
            <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
            <li>You may print or download one copy of a reasonable number of pages for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
          </ul>
          
          <h2>User Representations</h2>
          <p>
            By using our website and services, you represent and warrant that:
          </p>
          <ul>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity to enter into these Terms of Service.</li>
            <li>You will not access our website and services through automated or non-human means, except as permitted for legitimate API usage.</li>
            <li>You will not use our website and services for any illegal or unauthorized purpose.</li>
            <li>Your use of our website and services will not violate any applicable law or regulation.</li>
          </ul>
          
          <h2>Prohibited Activities</h2>
          <p>
            You may not access or use our website and services for any purpose other than that for which we make them available. Our website 
            and services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved 
            by us.
          </p>
          <p>
            As a user of our website and services, you agree not to:
          </p>
          <ul>
            <li>Systematically retrieve data or other content from our website and services to create or compile, directly or indirectly, a collection, database, or directory without written permission from us.</li>
            <li>Make any unauthorized use of our website and services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
            <li>Use our website and services in a manner inconsistent with any applicable laws or regulations.</li>
            <li>Engage in unauthorized framing of or linking to our website and services.</li>
            <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming, that interferes with any party's uninterrupted use and enjoyment of our website and services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of our website and services.</li>
          </ul>
          
          <h2>Limitation of Liability</h2>
          <p>
            In no event will we, our affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for 
            damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, our website and 
            services, including any direct, indirect, special, incidental, consequential, or punitive damages, including but not limited to, 
            personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, 
            loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, 
            even if foreseeable.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These Terms of Service and your use of our website and services are governed by and construed in accordance with the laws of the 
            State of California applicable to agreements made and to be entirely performed within the State of California, without regard to 
            its conflict of law principles.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about these Terms of Service, please contact us at:
          </p>
          <p>
            HAL149<br />
            123 AI Boulevard<br />
            San Francisco, CA 94107<br />
            United States<br />
            legal@hal149.com
          </p>
        </div>
      </div>
    </div>
  );
}