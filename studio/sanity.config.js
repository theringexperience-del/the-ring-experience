import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '../sanity/schemaTypes';
import { deskStructure } from './deskStructure';

const singletonTypes = new Set(['homepage', 'footer', 'navbar', 'aboutUs', 'social', 'gemstonesPage', 'clientGallery', 'pageCta', 'offersPage', 'bookingPage', 'contactForm', 'siteAppearance']);

export default defineConfig({
    name: 'default',
    title: 'The Ring Experience CMS',
    projectId: 'a65qlod9',
    dataset: 'production',
    apiVersion: '2024-01-01',
    basePath: '/admin',
    plugins: [structureTool({ structure: deskStructure })],
    document: {
        actions: (prev, context) => (
            singletonTypes.has(context.schemaType)
                ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
                : prev
        )
    },
    schema: {
        types: schemaTypes
    }
});
