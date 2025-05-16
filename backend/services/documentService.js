//handles business logic like processing and keyword matching
//token refers to the extracted word from the document after preprocessing
//query refers to the user's input
//TF-IDF (Term Frequency-Inverse Document Frequency)

const TextProcessor = require('../utils/textProcessor');
const DocumentModel = require('../models/documentModel');
const Cache = require('../utils/cache'); //cache module to store previous queries
const fs = require('fs').promises;      //file system module to read files

const invertedIndex = new Map();       //maps each token to the set of doc ids
const docTermFrequency = new Map();    //maps each doc id to the set of tokens in that document, used to calculate the word frequency
const idf = {};     //maps each token to the inverse document frequency

let totalDocuments =0;

class DocumentService{
    static async addDocument(title, content){
        const count = await DocumentModel.getDocumentCount();
        if (count >= 20) {
            throw new Error('Document storage limit reached');
        }

        const doc = await DocumentModel.insertDocument(title, content);
        const terms = TextProcessor.preprocess(content);
        const frequency = TextProcessor.getTermFrequencies(tokens); //TF for each term
        this.docTermFrequency.set(doc.id, frequency);

        for(const term of Object.keys(frequency)){
            if(!invertedIndex.has(term)) this.invertedIndex.set(term, new Set());{
                this.invertedIndex.get(term).add(doc.id);
            }
        }

        return doc;
    }

    static async addFromFile(file) {
        const content = await fs.readFile(file.path, 'utf8');
        return await this.addDocument(file.originalname, content);
    }

    
    static async getAllDocuments(){
        return await DocumentModel.getAllDocuments();
    }    

    //keyword search logic
    static async searchDocument(text){
        const cached = Cache.get(text);
        if (cached) {
            return cached;
        }

        const allDocs = await DocumentModel.getAllDocuments();
        const queryTerms = TextProcessor.preprocess(text);
        const results = [];

        for (const docs of allDocs){
            const docTerms = TextProcessor.preprocess(docs.content);
            const tf = TextProcessor.getTermFrequencies(docTerms);
        }

        let score = 0;
        for (const term of queryTerms) {
            if(tf[term]) {
                const df = this.invertedIndex.get(term)?.size || 1; // Avoid division by zero
                const idf = Math.log(allDocs.length / df);
                score += tf[term] * idf;
            }
        }

        if(score > 0) {
            results.push({
                id: docs.id,
                title: docs.title,
                snippet: docs.content.substring(0, 200),
                score: score.toFixed(3)
            });
        }

        results.sort((a, b) => b.score - a.score); // Sort by score in descending order
        Cache.set(text, results); // Cache the results
        return results;
    }
}

//         // Fetch all documents from the database
//         const documents = await DocumentModel.getAllDocuments();
        
//         // Filter and collect titles of matching documents
//         const matchingDocs = [];
//         for(const doc of documents){
//             if(docIdsSet.has(doc.id)) 
//                 {
//                     matchingDocs.push(doc.title);
//                 };

//             // const tokens = documentTokenMap[doc.id];    
//             // const frequencyMap = TextProcessor.getTermFrequencies(tokens);      //TF for each term

//             // let count = 0;
//             // for(const token of queryTokens){
//             //     const tf = frequencyMap[token] || 0;
//             //     count += tf * (idf[token] || 0);    
//             //     //TF-IDF score calculation (It highlights terms that are frequent in one document but rare across others)
//             // }

//             // if(count>0){
//             //     matchingDocs.push({
//             //         id: doc.id,
//             //         title: doc.title,
//             //         snippet: doc.content.substring(0,200),
//             //         count
//             //     });
//             // }
//         }

//         //const sorted = matchingDocs.sort((a,b) => b.count - a.count);
//         //sort the results array in descending order based on the count
        
//         queryCache.set(text, matchingDocs);
        
//         return matchingDocs;
//     }



module.exports = DocumentService;