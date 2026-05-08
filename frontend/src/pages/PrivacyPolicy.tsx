
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen professional-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-600">
              Your privacy is important to us
            </p>
          </div>

          <Card className="property-card">
            <CardHeader>
              <CardTitle>PropertyPulse Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
                  <p className="text-slate-600 mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    list a property, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>Personal information (name, email, phone number)</li>
                    <li>Property information and preferences</li>
                    <li>Usage data and analytics</li>
                    <li>Communication records</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
                  <p className="text-slate-600 mb-4">
                    We use the information we collect to provide, maintain, and improve our services.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>To provide and maintain our services</li>
                    <li>To process transactions and send notifications</li>
                    <li>To communicate with you about our services</li>
                    <li>To improve our platform and user experience</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Information Sharing</h3>
                  <p className="text-slate-600">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Data Security</h3>
                  <p className="text-slate-600">
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                  <p className="text-slate-600">
                    If you have any questions about this Privacy Policy, please contact us at 
                    privacy@propertypulse.com or call us at +1 (555) 123-4567.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
