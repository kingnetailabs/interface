import styles from "./styles.module.scss";

const Index = () => {
  return (
    <div>
      {/* <template> */}
      <div className={styles.main}>
        <h1>Terms and Conditions</h1>
        <div className={styles.wrap}>
          <p>Welcome to the KINGNET Terminal</p>
          <p>
            “The “Terminal,” operated by the KINGNET team (“we,” “us,” or
            “our”). By accessing or using the Terminal, holding KINGNET tokens,
            or engaging with our related services (collectively, the
            “Services”), you agree to be bound by these Terms and Conditions
            (the “Terms”). If you do not agree to all of these Terms, you are
            not authorized to use the Services.
          </p>
          <p>
            These Terms apply to all users of the Terminal, including those
            accessing through any those interacting with KINGNET via the
            Terminal or on external platforms such as Twitter (X).
          </p>
        </div>

        <div className={styles.wrap}>
          <div className={styles.section}>
            <h2>1. Eligibility and Access Requirements</h2>
            <h3>1.1 No Guarantee of Response on Twitter/X</h3>
            <p>
              While you may interact with KINGNET on Twitter (X) by mentioning
              or engaging with it, there is no guarantee of receiving a reply.
              The Terminal, however, provides guaranteed responses to token
              holders meeting the minimum holding requirement stated above.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Nature of the Content and Interactions</h2>
            <h3>2.1 Informational Use Only – Not Investment Advice</h3>
            <p>
              All content, including any news summaries, analysis, commentary,
              or opinions provided by the KINGNET (the “Content”), is for
              informational purposes only. None of the Content should be
              considered investment advice, financial guidance, or a
              recommendation to buy, sell, or hold any digital asset or other
              financial product. You should always do your own research and, if
              necessary, consult qualified professional advisors before making
              any investment decisions.
            </p>
            <h3>2.2 Unpredictability of Outputs</h3>
            <p>
              The KINGNET leverages complex models and dynamic data sources.
              While we strive for quality and reliability, the Content is
              inherently unpredictable and may contain errors, omissions, or
              misinformation. Use the Content at your own risk and discretion.
            </p>

            <h3>2.3 User-Generated Interactions</h3>
            <p>
              You understand that any prompts, questions, or content you provide
              (“User Content”) may influence the KINGNET’s responses. We
              encourage users to provide thoughtful, constructive, and
              respectful input. Misleading, inappropriate, or harmful inputs may
              result in responses of limited value or potential refusal of
              service.
            </p>

            <h3>2.4 Sharing of Conversations</h3>
            <p>
              Users of the Terminal have the option to share conversations they
              have had with the KINGNET. By choosing to share such
              conversations, you grant us the right to publicly display,
              reproduce, modify, and distribute the shared content in any media,
              without further consent, notice, or compensation to you.
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. User Conduct</h2>
            <h3>3.1 Respectful Interactions</h3>
            <p>
              Users agree to be respectful and courteous when interacting with
              the KINGNET other community members, and our team. Harassment,
              hate speech, or other forms of abusive behavior will not be
              tolerated.
            </p>

            <h3>3.2 Prohibited Conduct</h3>
            <p>You agree not to use the Terminal or the KINGNET </p>
            <p>Violate any applicable law, regulation, or third-party right;</p>
            <p>
              Transmit any malicious code, software, or data that may harm the
              Terminal, the KINGNET or other users;
            </p>
            <p>
              Spread misleading or deceptive information with the intent to
              manipulate or confuse;
            </p>
            <p>
              Solicit personal or sensitive information from other users or the
              KINGNET;
            </p>
            <p>
              Engage in any activity that interferes with, disrupts, or imposes
              an undue burden on the Terminal’s infrastructure or related
              services.
            </p>
          </div>

          <div className={styles.section}>
            <h2>4. Intellectual Property</h2>
            <h3>4.1 Ownership of Content</h3>
            <p>
              Unless otherwise stated, all intellectual property rights in the
              Terminal, its underlying code, technology, design, and related
              materials belong to us or our licensors. You may not reproduce,
              distribute, or create derivative works from our Content without
              our prior written permission.
            </p>
            <h3>4.2 User-Provided Content</h3>
            <p>
              By providing prompts, feedback, suggestions, or other content to
              the Terminal, you grant us a non-exclusive, worldwide,
              royalty-free, irrevocable license to use, reproduce, modify, and
              distribute such User Content for the purpose of improving our
              Services and developing new features.
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. Data Processing and Privacy</h2>
            <h3>5.1 Use of User Data for Analytics and Error Tracking</h3>
            <p>
              We reserve the right to process user data—including usage data,
              query logs, and other related information—for analytics,
              performance measurement, quality assurance, and error tracking
              purposes. Such data may be processed on third-party platforms and
              services to help us identify and resolve issues, improve our
              models, and enhance the overall user experience.
            </p>
            <h3>5.2 Privacy Measures</h3>
            <p>
              We value your privacy. While we collect and use data as described
              above, we strive to adhere to applicable data protection laws and
              industry best practices. Please refer to our Privacy Policy for
              more details on how we collect, use, store, and protect your
              personal information.
            </p>
          </div>

          <div className={styles.section}>
            <h2>6. Disclaimers and Limitations of Liability</h2>
            <h3>6.1 No Warranties</h3>
            <p>
              THE TERMINAL, THE KINGNET, AND ALL ASSOCIATED CONTENT ARE
              PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO WARRANTIES OF ACCURACY, RELIABILITY, NON-INFRINGEMENT,
              OR FITNESS FOR A PARTICULAR PURPOSE. YOUR USE OF THE TERMINAL AND
              THE KINGNET IS AT YOUR SOLE RISK.
            </p>
            <h3>6.2 Limitation of Liability</h3>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE, OUR OFFICERS,
              DIRECTORS, EMPLOYEES, PARTNERS, AND AFFILIATES SHALL NOT BE LIABLE
              FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
              DATA, OR INVESTMENT CAPITAL, ARISING OUT OF OR IN CONNECTION WITH
              YOUR USE OF THE TERMINAL, THE KINGNET, OR ANY CONTENT PROVIDED,
              EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <h3>6.3 User Responsibility</h3>
            <p>
              You acknowledge and agree that you are solely responsible for your
              own investment decisions, actions, and any losses or gains that
              may result from your reliance on the Content.
            </p>
          </div>

          <div className={styles.section}>
            <h2>7. Reporting Issues and Abuse</h2>
            <p>
              If you encounter errors, misleading content, abuse, or violations
              of these Terms, please report such instances via our website. We
              may, at our sole discretion, review and address reported issues
              and take appropriate action.
            </p>
          </div>

          <div className={styles.section}>
            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless us, our
              officers, directors, employees, partners, and affiliates from and
              against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees (including reasonable attorneys’
              fees) arising out of or relating to your violation of these Terms
              or your use of the Services.
            </p>
          </div>

          <div className={styles.section}>
            <h2>9. Modifications to the Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Any
              changes will be effective immediately upon posting on the
              Terminal’s website. Your continued use of the Services after the
              posting of revised Terms constitutes your acceptance of those
              changes.
            </p>
          </div>

          <div className={styles.section}>
            <h2>10. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which we operate, without regard
              to its conflict of law principles. You agree to submit to the
              exclusive jurisdiction of the courts located in that jurisdiction
              for the resolution of any disputes arising out of these Terms or
              your use of the Terminal.
            </p>
          </div>

          <div className={styles.section}>
            <h2>11. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall remain in full force
              and effect.
            </p>
          </div>

          <div className={styles.section}>
            <h2>12. Entire Agreement</h2>
            <p>
              These Terms, together with any referenced policies such as
              our Privacy Policy, constitute the entire agreement between you
              and us regarding the use of the Terminal and the aixbt_agent and
              supersede any prior agreements or understandings.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms, please
              contact us via the website. By accessing or using the Terminal and
              associated Services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
      {/* </template> */}
    </div>
  );
};

export default Index;
