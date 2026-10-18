export const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  hero{
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
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  theExperience{
    eyebrow,
    title
  },
  experienceCards[]{
    key,
    title,
    lineOne,
    lineTwo,
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
  "logoSvgUrl": logoSvg.asset->url
}
`;
export const SITE_APPEARANCE_QUERY = `
*[_type == "siteAppearance"][0]{
  "globalBackgroundImage": globalBackgroundImage.asset->url
}
`;
