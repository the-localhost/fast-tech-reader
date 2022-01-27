import nltk
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
#from nltk.corpus import webtext
#from nltk.metrics import BigramAssocMeasures
#from nltk.collocations import BigramCollocationFinder
import requests
from bs4 import BeautifulSoup
import pdftotext
import codecs
import json,sys

'''
1.	CC	Coordinating conjunction
2.	CD	Cardinal number
3.	DT	Determiner
4.	EX	Existential there
5.	FW	Foreign word
6.	IN	Preposition or subordinating conjunction
7.	JJ	Adjective
8.	JJR	Adjective, comparative
9.	JJS	Adjective, superlative
10.	LS	List item marker
11.	MD	Modal
12.	NN	Noun, singular or mass
13.	NNS	Noun, plural
14.	NNP	Proper noun, singular
15.	NNPS	Proper noun, plural
16.	PDT	Predeterminer
17.	POS	Possessive ending
18.	PRP	Personal pronoun
19.	PRP$	Possessive pronoun
20.	RB	Adverb
21.	RBR	Adverb, comparative
22.	RBS	Adverb, superlative
23.	RP	Particle
24.	SYM	Symbol
25.	TO	to
26.	UH	Interjection
27.	VB	Verb, base form
28.	VBD	Verb, past tense
29.	VBG	Verb, gerund or present participle
30.	VBN	Verb, past participle
31.	VBP	Verb, non-3rd person singular present
32.	VBZ	Verb, 3rd person singular present
33.	WDT	Wh-determiner
34.	WP	Wh-pronoun
35.	WP$	Possessive wh-pronoun
36.	WRB	Wh-adverb
'''
# BeautifulSoup part
def webS():
    url = 'http://ccl.pku.edu.cn/doubtfire/nlp/Lexical_Analysis/Word_Lemmatization/Introduction/Computational%20Morphology.htm'
    page = requests.get(url)
    cont = page.content
    soup = BeautifulSoup(cont)
    text = soup.find_all('p')
    para = []
    for i in text:
        para.append(i.text.replace('\n',''))

def pdfT(file):
    return pdftotext.PDF(file)

lemmitizer = WordNetLemmatizer()

def nltkP(page):
    default_stopwords = set(stopwords.words("english"))
    stopwords_file = 'custom_stop.txt'
    custom_stopwords = set(codecs.open(stopwords_file, 'r', 'utf-8').read().splitlines())
    all_stopwords = default_stopwords | custom_stopwords

    print(len(all_stopwords))
    words = nltk.word_tokenize(page)
    words = [word.lower() for word in words]
    words = [word for word in words if not word[0].isnumeric()]
    words = [word for word in words if len(word) > 5]
    a = []
    print(len(words))
    for word in words:
        if word not in all_stopwords:
            a.append(word)
    #words = [word for word in words if word not in all_stopwords]
    #words = [lemmitizer.lemmatize(word) for word in a]
    #fdist = nltk.FreqDist(words)
    #print(dir(fdist))
    words_s = []
    [words_s.append(x) for x in words if x not in words_s]
    words_pos = nltk.pos_tag(words_s)
    imp_w = []
    [imp_w.append(i[0]) for i in words_pos if i[1][0] == "N"]
    print(len(imp_w))
    return imp_w
    #for word, frequency in fdist.most_common(50):
        #print(u'{};{}'.format(word, frequency))

file = open(sys.argv[1],'rb')
pdf_text = pdfT(file)

page_words = {}
l = 1
for i in pdf_text:
    p = 'page' + str(l)
    page_words[p] = nltkP(i)
    l += 1
#text = [w.lower() for w in webtext.words('pirates.txt')]

with open("pdf.json",'w') as f:
    json.dump(page_words,f)
