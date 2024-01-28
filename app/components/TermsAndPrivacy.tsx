import React from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, ScrollView } from 'react-native';
import TermsLogo from '../assets/images/TermsLogo.svg'
import PrivacyLogo from "../assets/images/privacy-policy.svg"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ribbon from "../assets/images/ribbon-icon.svg"
import { FONTFAMILY } from '../config/font-config'
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../assets/images/Back.svg'
import AppHeader from '../components/CommonInput/appHeader';

export default function TermsAndPrivacy({ logo, text, title = "welcome", theme, navigation, showPrivacy, setShowPrivacy, setShowTerms }: any) {
  const styles = Style(theme);

  const contentTerms = () => {
    return (
      <Text style={{ color: "#8A9099", lineHeight: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#5C6572" }}>Welcome to ZenHeal Wellness Private Limited</Text> {'\n'}  {'\n'}

        These terms and conditions outline the rules and regulations for the use of ZenHeal Wellness Private Limited's Website.
        {'\n'}
        {'\n'}

        ZenHeal Wellness Private Limited is located at: 46, Behind BDA Complex, HSR Layout, Bengaluru
        {'\n'}
        {'\n'}
        By accessing this website we assume you accept these terms and conditions in full.Do not continue to use ZenHeal Wellness Private Limited's website if you do not accept all of the terms and conditions stated on this page.
        {'\n'}
        {'\n'}
        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements:
        {'\n'}
        {'\n'}
        "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services/products, in accordance with and subject to, prevailing law of . Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.
        {'\n'}
        {'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#5C6572", color: "#5C6572" }}>Authorization to Contact</Text> {'\n'} {'\n'}

        By visiting this website and providing your contact information on any form or chatbot on the website or on any communication channel used by ZenOnco.io, you hereby authorize and give consent to ZenOnco.io to send you, either through itself or through any third party service provider, from time to time various information / alert / SMS / other messages or calls or commercial communication, and other services on the provided emaild id and contact numbers, whether registered with National Do Not Call Registry / listed in National Customer Preference Register or not.You also confirm that by sending any of such messages / calls, you will not hold ZenOnco.io and / or its third party service providers liable / institute complaint under the Telecom Commercial Communications Customer Preference(TRAI) Regulations, 2010 or such other applicable regulations including any amendment thereof, as may be applicable from time to time.
        {'\n'} {'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Cookies</Text>
        {'\n'} {'\n'}
        We employ the use of cookies.By using ZenHeal Wellness Private Limited's website you consent to the use of cookies in accordance with ZenHeal Wellness Private Limited's privacy policy.Most of the modern day interactive websites use cookies to enable us to retrieve user details for each visit.Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting.Some of our affiliate / advertising partners may also use cookies.
        {'\n'} {'\n'}

        <Text style={{ fontWeight: "bold", fontSize: 18 }}>License</Text> {'\n'} {'\n'}

        Unless otherwise stated, ZenHeal Wellness Private Limited and / or it's licensors own the intellectual property rights for all material on ZenHeal Wellness Private Limited. All intellectual property rights are reserved. You may view and/or print pages from https://zenonco.io for your own personal use subject to restrictions set in these terms and conditions.
        {'\n'}
        {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>You must not:</Text>
        {'\n'}  {'\n'}
        <Ribbon width="15" height="15" />  Republish material from https://zenonco.io {'\n'}
        <Ribbon width="15" height="15" />  Sell, rent or sub - license material from https://zenonco.io {'\n'}
        <Ribbon width="15" height="15" /> Reproduce, duplicate or copy material from https://zenonco.io {'\n'}
        <Ribbon width="15" height="15" /> Redistribute content from ZenHeal Wellness Private Limited(unless content is specifically made for redistribution) {'\n'}
        <Ribbon width="15" height="15" /> Hyperlinking to our Content
        {'\n'}  {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>The following organizations may link to our Web site without prior written approval:</Text>
        {'\n'}  {'\n'}
        <Ribbon width="15" height="15" />  Government agencies {'\n'}
        <Ribbon width="15" height="15" />  Search engines {'\n'}
        <Ribbon width="15" height="15" />  News organizations {'\n'}
        <Ribbon width="15" height="15" />  Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses
        {'\n'}
        <Ribbon width="15" height="15" /> Systemwide Accredited Businesses except soliciting non - profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>These organizations may link to our home page, to publications or to other Web site information so long as the link:
        </Text>
        {'\n'}  {'\n'}
        a. is not in any way misleading; {'\n'}
        b. does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and
        {'\n'}
        c. fits within the context of the linking party's site.
        {'\n'}d. We may consider and approve in our sole discretion other link requests from the following types of organizations: commonly - known consumer and / or business information sources such as Chambers of Commerce, American Automobile Association, AARP and Consumers Union; dot.com community sites; associations or other groups representing charities, including charity giving sites, online directory distributors; internet portals; accounting, law and consulting firms whose primary clients are businesses; and educational institutions and trade associations.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>
          We will approve link requests from these organizations if we determine that:</Text>
        {'\n'} {'\n'}
        a. The link would not reflect unfavorably on us or our accredited businesses(for example, trade associations or other organizations representing inherently suspect types of business, such as work - at - home opportunities, shall not be allowed to link);
        {'\n'}b. The organization does not have an unsatisfactory record with us;
        {'\n'}c. The benefit to us from the visibility associated with the hyperlink outweighs the absence of;
        {'\n'}d.  where the link is in the context of general resource information or is otherwise consistent with editorial content in a newsletter or similar product furthering the mission of the organization.
        {'\n'}e. These organizations may link to our home page, to publications or to other Web site information so long as the link:
        {'\n'}
        a. is not in any way misleading;
        {'\n'}b. does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services; and
        fits within the context of the linking party's site.
        {'\n'}c. If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must notify us by sending an e - mail to care @zenonco.io.
        {'\n'} {'\n'}
        Please include your name, your organization name, contact information(such as a phone number and / or e - mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link.Allow 2 - 3 weeks for a response.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>
          Approved organizations may hyperlink to our Web site as follows:</Text>
        {'\n'} {'\n'}
        a. By use of our corporate name; or {'\n'}
        b. By use of the uniform resource locator(Web address) being linked to; or
        {'\n'}c. By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party's site.
        {'\n'}d. No use of ZenHeal Wellness Private Limited's logo or other artwork will be allowed for linking absent a trademark license agreement.
        {'\n'}e. Iframes Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>Reservation of Rights</Text> {'\n'} {'\n'}

        We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Website.You agree to immediately remove all links to our Web site upon such request.We also reserve the right to amend these terms and conditions and its linking policy at any time.By continuing to link to our Website, you agree to be bound to and abide by these linking terms and conditions.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>Removal of links from our website</Text> {'\n'} {'\n'}

        If you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this.We will consider requests to remove links but will have no obligation to do so or to respond directly to you.Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>Content Liability</Text>
        {'\n'} {'\n'}
        We shall have no responsibility or liability for any content appearing on your Web site.You agree to indemnify and defend us against all claims arising out of or based upon your Website.No link(s) may appear on any page on your Website or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>Disclaimer</Text>
        {'\n'} {'\n'}
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website(including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and / or the use of reasonable care and skill).Nothing in this disclaimer will: limit or exclude our or your liability for death or personal injury resulting from negligence; limit or exclude our or your liability for fraud or fraudulent misrepresentation; limit any of our or your liabilities in any way that is not permitted under applicable law; or exclude any of our or your liabilities that may not be excluded under applicable law.The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and(b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort(including negligence) and for breach of statutory duty.To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>Indemnity</Text>
        {'\n'} {'\n'}
        Delivery and shipping policy - We don't have any products to deliver. It is only a service model. The diagnosis/advice/recommendations or any other suggestions given by the doctor/service provider will be independent of ZenHeal Wellness Private Limited and the company shall have no liability regarding the same. The reports shared by the patients are at the sole discretion of the patient to share a particular report or entire summary saved in the account. The service providers on the platform are not bound to confirm the appointment without giving any advance notice. In such cases, the payment will be refunded within 30 days of communication The appointment can be rescheduled only once in extreme cases. No fee/ charges are refunded. Any refund will be the sole discretion of the company.
        {'\n'} {'\n'}

        <Text style={{ fontSize: 14, color: "#5C6572" }}>Payment Gateway and Refunds</Text>
        {'\n'} {'\n'}

        Third party payment gateway Razor Pay is used to process transactions.The Company is not liable for any failed transaction.In the event of a failed transaction, the amount(if debited from a User account) will be refunded to the User's account as per the payment gateway's refund policy.For services provided directly by the Company through its employees on payroll, the Company may initiate a refund corresponding to full amount collected or partial amount collected if the Company is unable to serve the Patient due to reasons beyond the control of the Company, including the following: untimely death of the patient, incomplete data provided, unavailability of the doctors.
        {'\n'} {'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}>Contact Information</Text>
        {'\n'} {'\n'}

        If you have any queries regarding any of our terms, please contact us at care @zenonco.io
      </Text>)
  }
  const contentPrivacy = () => {
    return (
      <Text style={{ color: "#8A9099", lineHeight: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Introduction</Text>{'\n'}{'\n'}

        Welcome to www.zenonco.io (including the related mobile site and the application) (hereinafter collectively referred to as "Platform"). Your usage of the Platform shall be subject to the guidelines, terms and conditions set out herein. This Privacy Policy constitutes an electronic record within the meaning of the applicable law. This electronic record is generated by a computer system and does not require any physical or digital signatures.
        {'\n'}{'\n'}
        By using or continuing to use the Platform, you agree to our use of your information (including sensitive personal information) in accordance with this Privacy Policy, as may be amended from time to time by the Platform in its discretion. You also agree and consent to us collecting, storing, processing, transferring, and sharing information (including sensitive personal information) related to you with third parties or service providers for the purposes as set out in this Privacy Policy.
        {'\n'}{'\n'}
        <Text style={{ fontSize: 14, color: "#5C6572" }}> This Privacy Policy is published in compliance with inter alia:</Text>
        {'\n'}{'\n'}

        <Ribbon width="15" height="15" />  Section 43A of the Information Technology Act, 2000 ("IT Act"); and
        {"\n"}<Ribbon width="15" height="15" /> Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules").
        {'\n'}<Ribbon width="15" height="15" />  Rule 3 of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>IMPORTANT DISCLAIMER</Text>
        {'\n'}{'\n'}

        The Platform cares how information about you is used and shared and appreciates your trust in the Platform to do that carefully and sensibly. Access of the Platform shall be deemed to be your acceptance of the guidelines, terms and conditions set out herein and that we may process and use your personal information in accordance with the terms and conditions of this Privacy Policy. Please read the Privacy Policy carefully before using the Platform. If you do not wish to be bound by this Privacy Policy, then you should not access this Platform. Please note that usage of the Platform without reading this Privacy Policy shall be at your own risk.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}> Age Restriction</Text>
        {'\n'}{'\n'}
        The activity on the Platform is not intended for use by minors. If you are a minor i.e. under the age of 18 years, you may use the Platform only with involvement of a parent or guardian. Platform and its affiliates reserve the right to refuse service, terminate accounts, or remove or edit content in their sole discretion. The use of this Platform is only available to persons who can form a legally binding contract under the Indian Contract Act, 1872.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Collection of Information</Text>
        {'\n'}{'\n'}
        We store the information collected from the Platform and may use it to:
        {'\n'}{'\n'}
        <Ribbon width="15" height="15" />  Allow a visitor to download information, products and take advantage of certain other features of Zenheal's website.
        {'\n'}<Ribbon width="15" height="15" />  To provide information or interactive services through this website, to the visitor's e-mail address or, where the visitor wishes it to be sent by post, to the visitor's postal address.
        {'\n'} <Ribbon width="15" height="15" />   To seek the visitor's feedback or to contact the visitor in relation to the services offered on Zenheal's website.
        {'\n'}<Ribbon width="15" height="15" />  To process orders or applications submitted by the visitor.
        {'\n'}<Ribbon width="15" height="15" />  To administer or otherwise carry out Zenheal's obligations in relation to any agreement that the visitor may have with Zenheal.
        {'\n'}<Ribbon width="15" height="15" />  To anticipate and resolve problems with any goods or services supplied to the visitor.
        {'\n'}<Ribbon width="15" height="15" />  To create products or services that may meet the visitor's needs, or
        {'\n'}<Ribbon width="15" height="15" />  To process and respond to requests, improve Zenheal's operations, and communicate with visitor/s about Zenheal's products, services and businesses.
        {'\n'}<Ribbon width="15" height="15" />   Zenheal shall collect only minimum Information required to meet the purposes mentioned in this policy. Neither Zenheal nor its representatives shall be responsible for the authenticity of such Information provided by the visitor/s. As normal business practice, Zenheal may collect Information in order to enable the secure online authentication, interaction and transaction with natural persons. This may include the installation of cookies and the collection of other session data.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Types of information collected</Text>
        {'\n'}{'\n'}

        We may store information you enter on the Platform or give us in any other way.
        {'\n'}

        {'\n'}
        SPDI, which is such personal information that is collected, received, stored, transmitted or processed by Zenheal, consisting of:
        {'\n'}
        {'\n'}<Ribbon width="15" height="15" />  Password
        {'\n'}<Ribbon width="15" height="15" />  Financial information such as bank account or credit card or debit card or other payment instrument details.
        {'\n'}<Ribbon width="15" height="15" />  Physical, physiological and mental health condition.
        {'\n'}<Ribbon width="15" height="15" />  Sexual orientation
        {'\n'}<Ribbon width="15" height="15" />   Medical records and history
        {'\n'}<Ribbon width="15" height="15" />   Biometric information
        {'\n'}<Ribbon width="15" height="15" />  Any detail relating to the above personal information categories as provided to Zenheal for providing service; and
        {'\n'}<Ribbon width="15" height="15" />  Any of the personal information received by Zenheal for processing, stored or processed under lawful contract or otherwise.
        {'\n'}{'\n'} Further information that may be collected, include: the Internet protocol (IP) address used to connect your computer to the Internet; login; e-mail address; password; computer and connection information such as browser type and version; operating system and platform; user history; the full Uniform Resource Locators (URL) clickstream to, through and from the Platform (including date and time); cookie number; any phone number used to call our customer service etc.
        {'\n'}{'\n'}
        The information that we collect from you depends on how you use the Platform. In the event you contact us through the Platform, we will collect your name and contact information, including your e-mail address and company's name.
        {'\n'}{'\n'}
        We may also use browser data such as cookies, Flash cookies (also known as Flash Local Shared Objects), or similar data for fraud prevention and other purposes. During some visits we may use software tools to measure and collect session information, including page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page.
        {'\n'}{'\n'}
        You can choose not to provide certain information but then you might not be able to take advantage of many of the features provided on the Platform. We use the information that you provide for purposes such as responding to your requests, customising user experience for you, improving the Platform, and communicating with you.
        {'\n'}{'\n'}
        In addition, we may receive and store certain types of information whenever you interact with us. It may include information about your location and your mobile device, including a unique identifier for your device. We may use this information for internal analysis and to provide you with location-based services, such as advertising, search results, and other personalized content.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Preventing your browser from accepting cookies</Text>
        {'\n'}{'\n'}

        The Help menu on the menu bar of most internet browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie and how to disable cookies altogether. Additionally, you can disable or delete similar data used by browser add-ons, such as Flash cookies, by changing the add-on's settings or visiting the website of its manufacturer.
        {'\n'}{'\n'}
        If you do leave cookies turned on, be sure to sign off when you finish using a shared computer.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Security of Information</Text>{'\n'}{'\n'}

        The Platform strives to take all reasonable efforts to protect the security of your information during transmission by using <Text style={{ fontWeight: "bold", color: "#5C6572" }}>("Secure Sockets Layer (SSL) software")</Text>, which encrypts information you input in addition to maintaining security of your information as per the International Standard IS/ISO/IEC 27001 on "Information Technology Security Techniques Information Security Management System-Requirements" and/or other security measures as provided under Rule 8 of the SPDI Rules.
        {'\n'}{'\n'}
        We strive to maintain physical, electronic and procedural safeguards in connection with the collection, storage and disclosure of personal information (including sensitive personal information). Our security procedures mean that we may occasionally request proof of identity before we disclose personal information to you.
        {'\n'}{'\n'}
        It is important for you to protect against unauthorised access to your password and to your computer. Be sure to sign off when you finish using a shared computer.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Legitimate Interests</Text>{'\n'}{'\n'}

        The Platform has carried out balancing tests for all the data processing used by the Platform on the basis of our legitimate interests.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Withdrawing consent or otherwise objecting to direct marketing/profiling
        </Text>{'\n'}{'\n'}
        Wherever the Platform relies on the user consent, the user will always be able to withdraw that consent, however, please note, the Platform may have other legal grounds for processing your data for other purposes, such as those set out above. In some cases, we may be able to send you direct marketing without your consent, where we rely on our legitimate interests. You have an absolute right to opt-out of direct marketing, or profiling we carry out for direct marketing, at any time. You can do this by contacting us.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Notices and Revisions</Text>{'\n'}{'\n'}

        If you have any concern about privacy or grievances at the Platform, please contact us with a thorough description and we will try to resolve the issue for you.
        {'\n'}{'\n'}
        Our Privacy Policy may change from time to time. We may e-mail periodic reminders of our notices and conditions, unless you have instructed us not to, but you should check our website frequently to see recent changes.
        {'\n'}{'\n'}
        Unless stated otherwise, our current Privacy Policy applies to all information that we have about you.
        {'\n'}{'\n'}
        Other than as set out above, you will receive notice when information about you might go to third parties and you will have an opportunity to choose not to share the information.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>User Rights</Text>
        {'\n'}{'\n'}
        As discussed above, you can always choose not to provide information, even though it might be needed to avail features on the Platform.
        {'\n'}{'\n'}
        You can add or update certain information on pages where your personal details are stored. When you update information, we usually keep a copy of the previous version for our records.
        {'\n'}{'\n'}
        The user has the right to request a copy of their personal information; to correct, delete or restrict (stop any active) processing of their personal information; and to obtain the personal information you provide to the Platform for a contract or with your consent in a structured, machine readable format, and to request the Platform to share/ port this data to another controller.
        {'\n'}{'\n'}
        In addition, you can object to the processing of your personal information in some circumstances (in particular, where we don't have to process the data to meet a contractual or other legal requirement, or where we are using the data for direct marketing).
        {'\n'}{'\n'}
        These rights may be limited, for example if fulfilling your request would reveal personal information about another person, where they would infringe the rights of a third party (including our rights) or if you ask us to delete information which we are required by law to keep or have compelling legitimate interests in keeping. Relevant exemptions are included in applicable data protection laws. We will inform you of relevant exemptions we rely upon when responding to any request you make.
        {'\n'}{'\n'}
        If you have unresolved concerns, you have the right to inf in to an applicable data protection authority where you live, work or where you believe a breach may have occurred.
        {'\n'}{'\n'}
        Before we can respond to a request to exercise the rights listed in this section, you may be required to verify your identity or your account details. We shall have duration of 1 month to respond to any or all of such exercising of your rights.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Third-Party Advertisers and Links to other Websites</Text>
        {'\n'}{'\n'}
        The Platform may include third-party advertising and links to other Websites.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Sharing of Information</Text>
        {'\n'}{'\n'}

        Information about our customers is an important part and we are not in the business of selling it to others. The Platform shares customer information only as per this Privacy Policy and follows all reasonable practices to ensure protection of data.
        {'\n'}{'\n'}
        The Platform may have affiliated businesses and may provide services jointly with or on behalf of these businesses. You can tell when a third party is involved in your transactions and we share customer information related to those transactions with that third party.
        {'\n'}{'\n'}
        The Platform may associate with other companies and individuals to perform certain functions on its behalf. Examples include sending postal mail and e-mail, removing repetitive information from customer lists, analysing data, providing marketing assistance, providing search results and links, processing credit card payments and providing customer service. They will have access to personal information needed to perform their functions but may not use it for other purposes. Further, they must process the personal information in accordance with this Privacy Policy and as permitted by applicable law.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Retention of Data</Text>{'\n'}{'\n'}

        Where we process your financial information, ordinarily, the information will be retained for as long as necessary for the purpose/s for which it is collected
        {'\n'}{'\n'}
        In relation to all your other data including registration data, the Platform will not retain the users data for longer than required under the applicable law, and will delete data if they are no longer necessary for the purposes for which they are collected or otherwise processed, unless they are required to keep the data to comply with applicable legal obligations.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Disclosure</Text>{'\n'}{'\n'}

        In some cases, we may be required to disclose your personal information to comply with legal requirements and requests from government agencies, if mandated by law or if required for the legal protection of the Platform's legitimate interests in compliance with applicable laws. We may also disclose your personal information to our group companies or to third parties:
        {'\n'}
        {'\n'}<Ribbon width="15" height="15" />  Who provide us with payment related, data management and profiling, analytics, advertising or other services in order to process your bookings, provide information about tailored and individualized services/offers including on social media, and provide you with any information that you have requested
        {'\n'} <Ribbon width="15" height="15" />  Where we consider necessary to in order to comply with any law or regulation, where we suspect that any criminal offence may have been committed, to protect our rights, property or safety or that of others and in any circumstances where we consider that we are permitted to do so by law or regulation, and
        {'\n'} <Ribbon width="15" height="15" />  Where that third party is a professional adviser to us or any of our group companies.
        {'\n'} <Ribbon width="15" height="15" />  For purposes directly related to your care and treatment, or in ways that you would reasonably expect that we may use it for your ongoing care and treatment. For example, the disclosure of blood test results to your specialist or requests for x-rays.
        {'\n'} {'\n'}In the event that the business is sold or integrated with another business, your details will be disclosed to our advisers and any prospective purchaser's adviser and will be passed to the new owners of the business.
        {'\n'}{'\n'}
        The Platform may contain links to other websites belonging to third parties. We do not control the privacy practices of these other websites. The user should therefore ensure that the said website's privacy policy has been read and conformed to.
        {'\n'}{'\n'}
        As we continue to develop our business, we might sell or buy stores, subsidiaries or business units. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing privacy policy. Also, in the event that the Platform or substantially all of its assets are acquired, customer information will of course be one of the transferred assets.
        {'\n'}{'\n'}
        We release account and other personal information when we believe release is appropriate to comply with applicable law; or protect the rights, property or safety of Platform, our users or others. This includes exchanging information with other companies, organisations, government or regulatory authorities for fraud protection and credit risk reduction. Obviously, however, this does not include selling, renting, sharing or otherwise disclosing personally identifiable information from customers for commercial purposes in a way that is contrary to the commitments made in this Privacy Policy.
        {'\n'}{'\n'}
        We might receive information about you from other sources and add it to our account information.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Data Quality and Security</Text>
        {'\n'}{'\n'}
        We will take reasonable steps to ensure that your personal information is accurate, complete, up to date and relevant. For this purpose our staff may ask you to confirm that your contact details are correct when you attend a consultation. We request that you let us know if any of the information we hold about you is incorrect or out of date.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Copyright, Trademarks and Licenses</Text>{'\n'}{'\n'}

        Copyright is applicable to all content included on the Platform, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, and is the property of the Platform or its affiliates or its content suppliers and protected by jurisdictional laws of India. The compilation of all content on this Platform is the exclusive property of the Platform or its affiliates and protected by the Indian and international copyright laws.
        {'\n'}{'\n'}
        The Platform grants you a limited license to access and make personal use and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of Platform and / or its affiliates, as may be applicable. We may deny access to your medical records in certain circumstances permitted by law, for example, if disclosure may cause a serious threat to your health or safety. We will always tell you why access is denied and the options you have to respond to our decision.
        {'\n'}{'\n'}
        This Platform or any portion of this Platform may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of Platform and / or its affiliates.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Disclaimer of warranties and limitation of liabilities</Text>
        {'\n'}{'\n'}
        The Platform is provided on an "as is" and "as available" basis. The Platform makes no representations or warranties of any kind, express or implied, as to its operation or the information, content, materials, or products included. You expressly agree that your use of the Platform is at your sole risk. The Platform reserves the right to withdraw or delete any information at any time in its discretion.
        {'\n'}{'\n'}
        To the full extent permissible by applicable law, Platform disclaims all warranties, express or implied, including, but not limited to, implied warranties of fitness for a particular purpose. The Platform does not warrant that its servers, or e-mail sent are free of viruses or other harmful components. The Platform will not be liable for any damages of any kind arising from the use of this Platform, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
        {'\n'}{'\n'}
        The Platform and its affiliates attempt to keep the content description be as accurate as possible. However, the Platform does not warrant that description of content is accurate, complete, reliable, current, or error-free. Also, your access to the Platform may also be occasionally suspended or restricted to allow for repairs, maintenance, or the introduction of new facilities or at any time without prior notice. We will attempt to limit the frequency and duration of any such suspension or restriction. The Platform may provide links to other sites over which the Platform has no control and is not responsible for the availability of such external sites or resources and does not endorse and is not responsible or liable for any content, advertising, products or other material on or available from such sites or resources.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Modification and Severability</Text>
        {'\n'}{'\n'}
        The Platform reserves the right to make changes to the policies at any time. If any of these conditions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed severable and shall not affect the validity and enforceability of any remaining conditions.
        {'\n'}{'\n'}
        If you have any queries or complaints regarding this Privacy Policy or use of your personal information please contact our data protection manager using the contact details set out below, listed as Grievance Officer.
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Grievance Officer</Text>
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Name:</Text> Mr. Kishan Shah
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Email:</Text> care@zenonco.io
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Address:</Text> B-601, Lata CHS Ltd, Kulupwadi Road, Near SGNP, Borivali East, Mumbai, Maharashtra, India, 400066
        {'\n'}{'\n'}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Contact:</Text> 9930709000`
        {'\n'}{'\n'}
      </Text>)
  }

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const privacyTitle = `Privacy Policy`
  const termsTitle = `Terms & Conditions`
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        {/* Header */}
        <AppHeader
          theme={theme}
          onBackPress={() => {
            setShowTerms(false)
            setShowPrivacy(false)
          }}
          headerTitle={showPrivacy ? privacyTitle : termsTitle}
          isRightComponent={false} />

        {showPrivacy ?
          <PrivacyLogo width={width} height={height * 0.3} />
          :
          <TermsLogo
            width={width}
            height={height * 0.3}
          />
        }

        {/* <Text style={styles.titleText}>Wellness Private Limited</Text> */}
        <Text style={styles.contentText}>{showPrivacy ? contentPrivacy() : contentTerms()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}


const Style = (theme: any) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY
    },
    headerTitle: {
      fontFamily: FONTFAMILY.BOLD,
      color: theme.MEDIUM_GRAY,
      fontSize: 16,
      alignSelf: "center"
    },
    titleText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 24,
      marginLeft: width * 0.04,
      marginRight: width * 0.08
    },
    contentText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 12,
      textAlign: 'justify',
      marginLeft: width * 0.04,
      marginRight: width * 0.04,
      marginTop: width * 0.01
    }
  });
};