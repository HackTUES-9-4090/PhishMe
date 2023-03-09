from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from sys import argv
import subprocess
from urllib.parse import urlparse
from html.parser import HTMLParser
import re
import codecs

if(len(argv) < 2):
    exit()

dep = open('dependencies.txt', 'w+')
URL = argv[1]
PARSED_URL = urlparse(URL)


class IndexingParser(HTMLParser):
    def handle_starttag(self, tag, args):
        print(tag)
        for i in range(0, len(args)):
            if(args[i][0] == 'href' and args[i][1]):
                url_id = PARSED_URL.scheme + "://" + PARSED_URL.netloc + (PARSED_URL.path if args[i][1][0] != '/' else '') + args[i][1]
                print(url_id)
                subprocess.run(["node", "./main_downloader.js", url_id, "." + args[i][1]])
                dep.write(args[i][1] + "\n") 



chrome_options = Options()
chrome_options.add_argument("--headless")
index = IndexingParser()

def document_initialised(driver):
    return driver.execute_script("return document.readyState == 'complete'")

driver = webdriver.Chrome(options=chrome_options)
driver.get(argv[1])
WebDriverWait(driver, timeout=10).until(document_initialised)
index.feed(driver.page_source)


replaced_source = re.sub('href="/', 'href="', driver.page_source)
replaced_source = re.sub('integrity=".*"', '', replaced_source)
#replaced_source = re.sub('link rel="prefetch" as="script" href=', 'script src=', replaced_source)
#replaced_source = re.sub('href="')
#print(replaced_source)
with codecs.open('index.html', 'w+', 'utf-8') as f:
    f.write(replaced_source)

