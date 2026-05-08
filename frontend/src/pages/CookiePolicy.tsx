
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen professional-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Cookie Policy
            </h1>
            <p className="text-xl text-slate-600">
              How we use cookies on our website
            </p>
          </div>

          <Card className="property-card">
            <CardHeader>
              <CardTitle>PropertyPulse Cookie Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">What Are Cookies</h3>
                  <p className="text-slate-600">
                    Cookies are small text files that are placed on your computer by websites that you visit. 
                    They are widely used to make websites work more efficiently and provide information to website owners.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">How We Use Cookies</h3>
                  <p className="text-slate-600 mb-4">
                    PropertyPulse uses cookies for several purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>To remember your preferences and settings</li>
                    <li>To analyze website traffic and usage patterns</li>
                    <li>To provide personalized content and recommendations</li>
                    <li>To ensure security and prevent fraud</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800">Essential Cookies</h4>
                      <p className="text-slate-600">
                        These cookies are necessary for the website to function properly and cannot be disabled.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Analytics Cookies</h4>
                      <p className="text-slate-600">
                        These cookies help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Functional Cookies</h4>
                      <p className="text-slate-600">
                        These cookies enable enhanced functionality and personalization.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Managing Cookies</h3>
                  <p className="text-slate-600">
                    You can control and/or delete cookies as you wish. You can delete all cookies 
                    that are already on your computer and you can set most browsers to prevent them 
                    from being placed.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Third-Party Cookies</h3>
                  <p className="text-slate-600">
                    We may use third-party services such as Google Analytics that may set cookies 
                    on your device. These services have their own privacy policies.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Updates to This Policy</h3>
                  <p className="text-slate-600">
                    We may update this Cookie Policy from time to time. We will notify you of any 
                    changes by posting the new policy on this page.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                  <p className="text-slate-600">
                    If you have any questions about our use of cookies, please contact us at 
                    cookies@propertypulse.com or call us at +1 (555) 123-4567.
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

export default CookiePolicy;
