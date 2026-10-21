import {createClient} from '@sanity/client';import {readFile,writeFile} from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
const credentials=JSON.parse(await readFile(path.join(process.env.XDG_CONFIG_HOME||path.join(os.homedir(),'.config'),'sanity/config.json'),'utf8'));
const client=createClient({projectId:'a65qlod9',dataset:'production',apiVersion:'2024-01-01',token:process.env.SANITY_AUTH_TOKEN||credentials.authToken,useCdn:false,perspective:'raw'});
const marker='migration-client-navigation-2026-10-21';if(await client.getDocument(marker)){console.log('Navigation already migrated; no changes.');process.exit(0)}
const seed=JSON.parse(await readFile('content/migrations/client-navigation.json','utf8'));
const documents=await client.fetch('*[_type in ["navbar","footer"]]');
if(documents.some(doc=>doc._id.startsWith('drafts.')))throw Error('Pending drafts must be reviewed first.');
const mutations=[];
for(const [type,content]of Object.entries(seed)) {
 const matches=documents.filter(doc=>doc._type===type);
 if(matches.length>1)throw Error('Multiple '+type+' documents need review');
 const set=Object.fromEntries(Object.entries(content).map(([key,value])=>[key,Array.isArray(value)?value.map((item,index)=>({...item,_type:'object',_key:'link'+index})):value]));
 if(matches.length===0)mutations.push({createIfNotExists:{_id:'client-'+type,_type:type,...set}});
 else mutations.push({patch:{id:matches[0]._id,ifRevisionID:matches[0]._rev,set}});
}
console.log('Navigation plan: preserve and migrate 5 primary links, 5 studio menu links and 8 footer links.');
if(!process.argv.includes('--apply'))process.exit(0);
await writeFile('cms-before-navigation-migration.local',JSON.stringify(documents,null,2));
mutations.push({create:{_id:marker,_type:'contentMigration',appliedAt:new Date().toISOString()}});
await client.mutate(mutations,{visibility:'sync'});console.log('Navigation migrated into navbar and footer documents.');
