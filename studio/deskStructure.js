const singletonItem = (S, { schemaType, title, id }) =>
    S.listItem()
        .title(title)
        .id(id || schemaType)
        .child(
            S.document()
                .schemaType(schemaType)
                .documentId(schemaType)
        );

export const deskStructure = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Pages')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            singletonItem(S, { schemaType: 'homepage', title: 'Homepage' }),
                            singletonItem(S, { schemaType: 'aboutUs', title: 'About Us' }),
                            singletonItem(S, { schemaType: 'offersPage', title: 'Our Offers' }),
                            singletonItem(S, { schemaType: 'bookingPage', title: 'Book Experience' }),
                            singletonItem(S, { schemaType: 'gemstonesPage', title: 'Gemstones' }),
                            singletonItem(S, { schemaType: 'clientGallery', title: 'Gallery' })
                        ])
                ),
            S.listItem()
                .title('Shared Sections')
                .child(
                    S.list()
                        .title('Shared Sections')
                        .items([
                            singletonItem(S, { schemaType: 'social', title: 'Social Section' }),
                            singletonItem(S, { schemaType: 'pageCta', title: 'Page CTA' }),
                            singletonItem(S, { schemaType: 'contactForm', title: 'Contact Form' })
                        ])
                ),
            S.listItem()
                .title('Layout & Settings')
                .child(
                    S.list()
                        .title('Layout & Settings')
                        .items([
                            singletonItem(S, { schemaType: 'navbar', title: 'Navbar' }),
                            singletonItem(S, { schemaType: 'footer', title: 'Footer' }),
                            singletonItem(S, { schemaType: 'siteAppearance', title: 'Site Appearance' })
                        ])
                )
        ]);
