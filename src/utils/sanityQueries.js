export const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  atAGlance,
  hero{
    eyebrow, imageAlt, reviewsLabel, directionsLabel, scrollLabel,
    headline,
    subheadline,
    buttonLabel,
    buttonLink,
    secondaryButtonLabel,
    secondaryButtonLink,
    mediaType,
    "image": image.asset->url,
    "video": video.asset->url
  },
  aMoment{
    caption, imageAlt, links[]{label,href},
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  theExperience{
    description,
    eyebrow,
    title
  },
  experienceCards[]{
    key,
    title,
    lineOne,
    lineTwo, imageAlt,
    "image": image.asset->url
  },
  packagesPreview{
    enabled,
    eyebrow,
    heading,
    description,
    ctaLabel,
    ctaLink
  },
  values{
    eyebrow, imageAlt,
    heading,
    "backgroundImage": backgroundImage.asset->url,
    items[]{
      title,
      text
    }
  },
  reviews{
    enabled,
    eyebrow,
    heading,
    description,
    sourceLabel,
    sourceUrl,
    sourceType,
    maxItems,
    items[]{
      author,
      rating,
      text,
      dateLabel
    }
  }
}
`;
export const SOCIAL_QUERY = `
*[_type == "social"][0]{
  eyebrow,
  heading,
  description,
  "backgroundImage": backgroundImage.asset->url,
  whatsappDmUrl,
  instagramDmUrl,
  links[]{
    label,
    href
  }
}
`;
export const ABOUT_US_QUERY = `
*[_type == "aboutUs"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  approach{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  origin{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  reasonToExist{
    eyebrow,
    heading,
    description
  }
}
`;
export const OFFERS_PAGE_QUERY = `
*[_type == "offersPage"][0]{
  pricingExplanation,
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  packagesSection{
    eyebrow,
    heading,
    description
  },
  packages[]{
    key,
    isVisible,
    tag,
    name,
    duration,
    summary,
    fullDescription,
    idealFor,
    highlights[],
    buttonLabel
  },
  gemstonesLink{
    enabled,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink
  }
}
`;
export const GEMSTONES_PAGE_QUERY = `
*[_type == "gemstonesPage"][0]{
  intro{
    eyebrow,
    heading,
    description
  },
  gemstones[]{
    key,
    name,
    isVisible,
    origin,
    tone,
    cut,
    meaning,
    description,
    "image": image.asset->url
  }
}
`;
export const CLIENT_GALLERY_QUERY = `
*[_type == "clientGallery"][0]{
  intro{
    eyebrow,
    heading,
    description
  },
  photos[]{
    "image": image.asset->url,
    isVisible,
    displaySize,
    caption,
    story,
    dateLabel
  }
}
`;
export const BOOKING_PAGE_QUERY = `
*[_type == "bookingPage"][0]{
  locationLinkLabel,
  hero{
    eyebrow,
    title,
    description
  },
  calendly{
    enabled,
    eyebrow,
    heading,
    description,
    link
  }
}
`;
export const FAQ_PAGE_QUERY = `
*[_type == "faqPage"][0]{
  hero{
    eyebrow,
    title,
    description
  },
  homepageSection{
    enabled,
    eyebrow,
    heading,
    ctaLabel,
    ctaLink
  },
  items[]|order(coalesce(homepageOrder, 999) asc){
    question,
    answer,
    showOnHomepage,
    homepageOrder
  }
}
`;
export const CONTACT_FORM_QUERY = `
*[_type == "contactForm"][0]{
  enabled,
  eyebrow,
  heading,
  description,
  submitLabel,
  privacyNote,
  newsletterConsentLabel
}
`;
export const PAGE_CTA_QUERY = `
*[_type == "pageCta"][0]{
  home{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  about{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  gemstones{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  gallery{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  offers{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  book{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  }
}
`;
export const FOOTER_QUERY = `
*[_type == "footer"][0]{
  studioLinks[]{label,to},
  subtitle,
  title,
  text,
  phone,
  phoneLabel,
  email
}
`;
export const NAVBAR_QUERY = `
*[_type == "navbar"][0]{
  primaryLinks[]{label,to}, studioLinks[]{label,to}, bookingLabel, bookingLink,
  "logoSvgUrl": logoSvg.asset->url
}
`;
export const SITE_APPEARANCE_QUERY = `
*[_type == "siteAppearance"][0]{
  contactLinks{googleMapsUrl,whatsappUrl,instagramUrl},
  "globalBackgroundImage": globalBackgroundImage.asset->url
}
`;

export const JOURNAL_POSTS_QUERY = `*[_type == "journalPost"] | order(published desc){
  title, "slug": slug.current, description, category, readingTime, published, intro,
  sections[]{heading, paragraphs, source{label, href}}, "related": related[]->slug.current
}`;

export const EDITORIAL_PAGES_QUERY = `*[_type in ["editorialPage", "homepage", "bookingPage", "gemstonesPage"]]{
  _type, title, seoTitle, description, choices[]{key, label, options},
  "path": select(_type == "homepage" => "/", _type == "bookingPage" => "/bookexperience", _type == "gemstonesPage" => "/gemstones", path),
  sections[]{key, eyebrow, heading, body, "image": image.asset->url, imageAlt, caption, links[]{label, href}}
}`;

export const RESOURCE_LINKS_QUERY = `*[_type == "preferredResources"][0]{eyebrow, heading, links[]{label,href}}`;
