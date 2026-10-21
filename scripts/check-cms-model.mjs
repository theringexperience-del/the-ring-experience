import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {currentWorkshopPackages} from '../src/content/workshopPackages.js';
import {mergeWorkshopFaqs} from '../src/content/workshopFaqs.js';
const pkg={key:'essential',name:'Editable offer',tag:'LKR 123',summary:'Edited in CMS'};
assert.deepEqual(currentWorkshopPackages([pkg,{key:'hidden',isVisible:false}]),[pkg]);
assert.deepEqual(mergeWorkshopFaqs([{question:'Can I add a gemstone to my handmade ring?',answer:'An editor changed this answer.'}]),[{question:'Can I add a gemstone to my handmade ring?',answer:'An editor changed this answer.'}]);
const server=await createServer({configFile:false,server:{middlewareMode:true},optimizeDeps:{noDiscovery:true,entries:[]}});
try{
 const {schemaTypes}=await server.ssrLoadModule('/sanity/schemaTypes/index.js');
 assert.equal(new Set(schemaTypes.map(type=>type.name)).size,schemaTypes.length);
 const check=fields=>{assert.equal(new Set(fields.map(f=>f.name)).size,fields.length,'Duplicate CMS fields');for(const field of fields){if(field.fields)check(field.fields);for(const member of field.of||[])if(member.fields)check(member.fields)}};
 for(const schema of schemaTypes)check(schema.fields);
 assert.ok(schemaTypes.some(schema=>schema.name==='journalPost'));
 assert.ok(schemaTypes.some(schema=>schema.name==='editorialPage'));
 console.log('CMS checks passed: unique schema fields, editable prices and FAQ answers, journal and page models.');
}finally{await server.close()}
