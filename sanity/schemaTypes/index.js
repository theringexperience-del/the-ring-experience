import preferredResources from './preferredResources';
import editorialPage, { pageSection } from './editorialPage';
import journalPost from './journalPost';
import homepage from './homepage';
import footer from './footer';
import navbar from './navbar';
import aboutUs from './aboutUs';
import social from './social';
import gemstonesPage from './gemstonesPage';
import clientGallery from './clientGallery';
import pageCta from './pageCta';
import offersPage from './offersPage';
import bookingPage from './bookingPage';
import contactForm from './contactForm';
import siteAppearance from './siteAppearance';
import faqPage from './faqPage';

const string = (name, title) => ({ name, title, type: 'string' });
const homepageFields = {
  hero: [string('eyebrow','Location and workshop subtitle'), string('imageAlt','Photo description'), string('reviewsLabel','Google reviews label'), string('directionsLabel','Directions label'), string('scrollLabel','Scroll link label')],
  aMoment: [string('caption','Photo caption'), string('imageAlt','Photo description'), { name:'links',title:'Links',type:'array',of:[{type:'object',fields:[string('label','Label'),string('href','Destination')]}] }],
  theExperience: [{name:'description',title:'Description',type:'text'}],
  values: [string('eyebrow','Subtitle'),string('imageAlt','Photo description')],
};
const editableHomepage = { ...homepage, fields: homepage.fields.map(field => field.name === 'experienceCards' ? {...field, of: field.of.map(item => ({...item,fields:[...item.fields,string('imageAlt','Photo description')]}))} : homepageFields[field.name] ? {...field, fields:[...field.fields,...homepageFields[field.name]]} : field) };
const editableBooking = {...bookingPage, fields:[...bookingPage.fields,string('locationLinkLabel','Map link label')]};
export const schemaTypes = [preferredResources, editorialPage, journalPost, editableHomepage, footer, navbar, aboutUs, social, gemstonesPage, clientGallery, pageCta, offersPage, editableBooking, faqPage, contactForm, siteAppearance].map(schema => ['homepage', 'bookingPage', 'gemstonesPage'].includes(schema.name)
    ? { ...schema, fields: [...schema.fields, { name: 'sections', title: 'Additional page sections', type: 'array', of: [pageSection] }] }
    : schema);
