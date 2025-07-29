import Link from "next/link";

export default function Page() {
  return (
    <article className="prose mx-auto py-24">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> 2025-07-13
      </p>

      <p>
        Welcome to <Link href="/">anicolors.com</Link> ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you
        visit our website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We do not collect personal information unless you voluntarily provide it. However, we may collect non-personal information automatically, including:</p>
      <ul>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Referring URLs</li>
        <li>Pages visited and time spent</li>
        <li>Anonymous analytics data (via Google Analytics or similar tools)</li>
      </ul>

      <h2>2. Use of Information</h2>
      <p>The information we collect is used to:</p>
      <ul>
        <li>Improve user experience</li>
        <li>Monitor website performance and usage patterns</li>
        <li>Identify popular color palettes and features</li>
      </ul>
      <p>We do not sell, rent, or share your personal information with third parties.</p>

      <h2>3. Cookies</h2>
      <p>Our website may use cookies to enhance functionality and user experience. You can disable cookies in your browser settings if you prefer.</p>

      <h2>4. Third-Party Services</h2>
      <p>We may use third-party services (e.g., Google Analytics, advertising networks) that may collect anonymous usage data. These services are governed by their own privacy policies.</p>

      <h2>5. Links to Other Sites</h2>
      <p>Our website may contain links to external websites. We are not responsible for the content or privacy practices of those sites.</p>

      <h2>6. Children's Privacy</h2>
      <p>Our website is not intended for children under 13. We do not knowingly collect personal information from children.</p>

      <h2>7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p>
        📧 <Link href="mailto:meetqy@icloud.com">meetqy@icloud.com</Link>
      </p>
    </article>
  );
}
