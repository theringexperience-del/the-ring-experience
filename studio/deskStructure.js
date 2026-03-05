const collectionItem = (S, { schemaType, title, id }) =>
    S.listItem()
        .title(title)
        .id(id || schemaType)
        .child(S.documentTypeList(schemaType).title(title));

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
                            collectionItem(S, { schemaType: 'homepage', title: 'Homepage' }),
                            collectionItem(S, { schemaType: 'aboutUs', title: 'About Us' }),
                            collectionItem(S, { schemaType: 'offersPage', title: 'Our Offers' }),
                            collectionItem(S, { schemaType: 'bookingPage', title: 'Book Experience' }),
                            collectionItem(S, { schemaType: 'gemstonesPage', title: 'Gemstones' }),
                            collectionItem(S, { schemaType: 'clientGallery', title: 'Gallery' })
                        ])
                ),
            S.listItem()
                .title('Shared Sections')
                .child(
                    S.list()
                        .title('Shared Sections')
                        .items([
                            collectionItem(S, { schemaType: 'social', title: 'Social Section' }),
                            collectionItem(S, { schemaType: 'pageCta', title: 'Page CTA' }),
                            collectionItem(S, { schemaType: 'contactForm', title: 'Contact Form' })
                        ])
                ),
            S.listItem()
                .title('Layout & Settings')
                .child(
                    S.list()
                        .title('Layout & Settings')
                        .items([
                            collectionItem(S, { schemaType: 'navbar', title: 'Navbar' }),
                            collectionItem(S, { schemaType: 'footer', title: 'Footer' }),
                            collectionItem(S, { schemaType: 'siteAppearance', title: 'Site Appearance' })
                        ])
                )
        ]);
