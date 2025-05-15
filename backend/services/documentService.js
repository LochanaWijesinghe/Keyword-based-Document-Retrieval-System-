//handles business logic like processing and keyword matching
//token refers to the extracted word from the document after preprocessing
//query refers to the user's input
//TF-IDF (Term Frequency-Inverse Document Frequency)

const TextProcessor = require('../utils/textProcessor');
const DocumentModel = require('../models/documentModel');

const invertedIndex = {};       //maps each token to the set of doc ids
const documentTokenMap = {};    //maps each doc id to the set of tokens in that document, used to calculate the word frequency
const queryCache = new Map();   //Storing previous queries to avoid recomputation for repeated user inputs
const idf = {};

let totalDocuments =0;

class DocumentService{
    static async addDocument(title, content){
        const doc = await DocumentModel.insertDocument(title, content);

        const tokens = TextProcessor.preprocess(content);
        documentTokenMap[doc.id] = tokens;

        const seen = new Set();
        //update inverted index
        for(const token of new Set(tokens)){
            if(!invertedIndex[token]){
                invertedIndex[token] = new Set();
            }
            if(!seen.has(token)){
                invertedIndex[token].add(doc.id);
                seen.add(token);
            }
        }

        await this.updateIDF();
        return doc;
    }

    static async updateIDF(){
        const totalDocuments = Object.keys(documentTokenMap).length;
        for(const term in invertedIndex){
            const docCount = invertedIndex[term].size;
            idf[term] = Math.log(totalDocuments) / (1+ docCount);
        }
    }

    //keyword search logic
    static async searchDocument(text){
        if(queryCache.has(text)) return queryCache.get(text);

        const queryTokens = TextProcessor.preprocess(text);
        const docIdsSet = new Set();

        for (const token of queryTokens){
            const docIds = invertedIndex[token] || [];
            docIds.forEach(id => docIdsSet.add(id));
        }

        const documents = await DocumentModel.getAllDocuments();
        const results = [];
        for(const doc of documents){
            if(!docIdsSet.has(doc.id)) continue;

            const tokens = documentTokenMap[doc.id];    
            const frequencyMap = TextProcessor.getTermFrequencies(tokens);      //TF for each term

            let count = 0;
            for(const token of queryTokens){
                const tf = frequencyMap[token] || 0;
                count += tf * (idf[token] || 0);    
                //TF-IDF score calculation (It highlights terms that are frequent in one document but rare across others)
            }

            if(count>0){
                results.push({
                    id: doc.id,
                    title: doc.title,
                    snippet: doc.content.substring(0,200),
                    count
                });
            }
        }

        const sorted = results.sort((a,b) => b.count - a.count);
        //sort the results array in descending order based on the count
        
        queryCache.set(text, sorted);
        
        return sorted;
    }
    
}

module.exports = DocumentService;