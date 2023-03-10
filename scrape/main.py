from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from sys import argv
from bs4 import BeautifulSoup
import subprocess
from urllib.parse import urlparse
from html.parser import HTMLParser
import re
from os import mkdir, path
import codecs

if(len(argv) < 3):
    print("Usage ", argv[0], " <URL> <FILENAME>")
    exit()

URL = argv[1]
PARSED_URL = urlparse(URL)
FILENAME = argv[2]


dep = open('dependencies.txt', 'w+')
if(not(path.exists(FILENAME))):
    mkdir(FILENAME)


class IndexingParser(HTMLParser):
    def handle_starttag(self, tag, args):
        print(tag)
        if(tag != 'a'):
            for arg in args:
                par = arg[0]
                val = arg[1]
                if((par == 'href' or par == 'src') and val):
                    parsed_val = urlparse(val)
                    print(val)
                    if(parsed_val.scheme):
                        return
                    url_id = PARSED_URL.scheme + "://" + PARSED_URL.netloc + (PARSED_URL.path if val[0] != '/' else '') + val
                    print(url_id)
                    dep.write(FILENAME + '/' + val + "\n") 
                    subprocess.run(["node", "./main_downloader.js", url_id, "." + val])



chrome_options = Options()
chrome_options.add_argument("--headless")
index = IndexingParser()

def document_initialised(driver):
    return driver.execute_script("return document.readyState == 'complete'")

driver = webdriver.Chrome(options=chrome_options)
driver.get(URL)
WebDriverWait(driver, timeout=10).until(document_initialised)
#index.feed(driver.page_source)
soup = BeautifulSoup(driver.page_source, 'html.parser')
def main():
    for tag in soup.find_all(['script', 'link', 'img', 'iframe']):
        print(tag.name)

        if (tag.get('href')):
            val = tag['href']
        elif (tag.get('src')):
            val = tag['src']
        else:
            continue
        parsed_val = urlparse(val)
        print(val)
        if(parsed_val.scheme):
            continue
        url_id = PARSED_URL.scheme + "://" + PARSED_URL.netloc + (PARSED_URL.path if val[0] != '/' else '') + val
        print(url_id)
        val = re.sub(r'\?.*', '', val)
        dep.write(FILENAME + '/' + val + "\n") 
        subprocess.run(["node", "./main_downloader.js", url_id, val, FILENAME])

main()

replaced_source = re.sub(r'href="/', 'href="', driver.page_source)
replaced_source = re.sub(r'src="/', 'src="', replaced_source)
replaced_source = re.sub(r'integrity=".*"', '', replaced_source)
#Matches all characters in a group until meeting a (? and more characters until a ") or a " 
replaced_source = re.sub(r'href="(.*?)(?:\?.*?"|")', r'href="\1"', replaced_source)
#replaced_source = re.sub('link rel="prefetch" as="script" href=', 'script src=', replaced_source)
#replaced_source = re.sub('href="')
#print(replaced_source)
with codecs.open(FILENAME + '/' + FILENAME + '.html', 'w+', 'utf-8') as f:
    f.write(replaced_source)
