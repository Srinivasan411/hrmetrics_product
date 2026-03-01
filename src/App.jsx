import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CancellationAndRefundPolicyPage from "./pages/CancellationAndRefundPolicyPage";
import TermsAndConditionPage from "./pages/TermsAndConditionPage";
import RequestDemoPage from "./pages/RequestDemoPage";
import PricingPage from "./pages/PricingPage";
import ShippingDeliveryPolicyPage from "./pages/ShippingDeliveryPolicyPage";
import FeedPage from "./pages/FeedPage";
import CommentsFeedPage from "./pages/CommentsFeedPage";
import WpJsonPage from "./pages/WpJsonPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cancellation-and-refund-policy" element={<CancellationAndRefundPolicyPage />} />
        <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
        <Route path="/request-demo" element={<RequestDemoPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/shipping-delivery-policy" element={<ShippingDeliveryPolicyPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/comments/feed" element={<CommentsFeedPage />} />
        <Route path="/wp-json" element={<WpJsonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
