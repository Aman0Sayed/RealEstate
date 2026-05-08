
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen professional-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-600">
              Please read these terms carefully
            </p>
          </div>

          <Card className="property-card">
            <CardHeader>
              <CardTitle>PropertyPulse Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Acceptance of Terms</h3>
                  <p className="text-slate-600">
                    By accessing and using PropertyPulse, you accept and agree to be bound by the 
                    terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Use License</h3>
                  <p className="text-slate-600 mb-4">
                    Permission is granted to temporarily download one copy of PropertyPulse materials 
                    for personal, non-commercial transitory viewing only.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>This is the grant of a license, not a transfer of title</li>
                    <li>You may not modify or copy the materials</li>
                    <li>You may not use the materials for commercial purposes</li>
                    <li>You may not reverse engineer any software</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">User Accounts</h3>
                  <p className="text-slate-600">
                    When you create an account, you must provide accurate and complete information. 
                    You are responsible for safeguarding your account credentials.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Property Listings</h3>
                  <p className="text-slate-600">
                    Users who list properties must ensure all information is accurate and up-to-date. 
                    False or misleading listings may result in account suspension.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Prohibited Uses</h3>
                  <p className="text-slate-600 mb-4">
                    You may not use our service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations</li>
                    <li>To transmit or procure the sending of advertising or promotional material</li>
                    <li>To impersonate or attempt to impersonate the company or other users</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                  <p className="text-slate-600">
                    PropertyPulse shall not be liable for any damages arising from the use or 
                    inability to use our services.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                  <p className="text-slate-600">
                    Questions about the Terms of Service should be sent to us at 
                    legal@propertypulse.com or call us at +1 (555) 123-4567.
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

export default TermsOfService;
