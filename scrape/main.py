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

if(len(argv) < 2):
    exit()

dep = open('dependencies.txt', 'w+')
if(not(path.exists('app'))):
    mkdir('app')
URL = argv[1]
PARSED_URL = urlparse(URL)


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
                    dep.write("app/" + val + "\n") 
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
for tag in soup.find_all(['script', 'link', 'img']):
    if(tag.href):
        


replaced_source = re.sub('href="/', 'href="', driver.page_source)
replaced_source = re.sub('src="/', 'src="', replaced_source)
replaced_source = re.sub('integrity=".*"', '', replaced_source)
#replaced_source = re.sub('link rel="prefetch" as="script" href=', 'script src=', replaced_source)
#replaced_source = re.sub('href="')
#print(replaced_source)
with codecs.open('app/index.html', 'w+', 'utf-8') as f:
    f.write(replaced_source)

