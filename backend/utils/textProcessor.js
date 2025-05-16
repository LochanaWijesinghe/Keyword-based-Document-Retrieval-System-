//process document content

class TextProcessor{

    static stopWords = new Set(['the', 'is', 'are','at', 'with', 'in', 'on', 'a', 'an', 'and', 'or', 'but']);
    //set is faster than array for checking if a word exists

    //method to clean and split a string of text
    static preprocess(text){
        return text
            .toLowerCase()
            .replace(/[\w\s]/,'')   //clean the string of any characters that are not whitespaces, letters and digits
            .split(/\s+/)   //splits the cleaned string into words
            .filter(word => word && !TextProcessor.stopWords.has(word));  //remove empty string and stopwords
    }

    //to calculate the number of times each words(tokens) appears
    static getTermFrequencies(tokens){
        const frequencyMap = {};
        
        for(const token of tokens){
            frequencyMap[token] = (frequencyMap[token] || 0)+ 1;
        }
        return frequencyMap;
    }

}

module.exports = TextProcessor;