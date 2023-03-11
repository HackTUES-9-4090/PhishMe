from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from sys import argv
from bs4 import BeautifulSoup
import subprocess
from urllib.parse import urlparse
import re
from os import mkdir, path
import codecs

if (len(argv) < 3):
    print("Usage ", argv[0], " <URL> <FILENAME>")
    exit()

ROOT_DIR_NAME = '../api/staticfiles'
URL = argv[1]
PARSED_URL = urlparse(URL)
FILENAME = argv[2]
WORKING_DIR = ROOT_DIR_NAME + '/' + FILENAME

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

if (not (path.exists(ROOT_DIR_NAME))):
    mkdir(ROOT_DIR_NAME)
if (not (path.exists(WORKING_DIR))):
    mkdir(WORKING_DIR)
dep = open(WORKING_DIR + '/' + 'dependencies.txt', 'w+')


def document_initialised(driver):
    return driver.execute_script("return document.readyState == 'complete'")


def fetch_index_and_refactor():
    driver.get(URL)
    WebDriverWait(driver, timeout=10).until(document_initialised)
    replaced_source = re.sub(r'href="/', 'href="./', driver.page_source)
    replaced_source = re.sub(r'src="/', 'src="./', replaced_source)
    replaced_source = re.sub(r'integrity=".*"', '', replaced_source)
    replaced_source = re.sub(
        r'<form ', '<form method="POST" action="/" ', replaced_source)
    # Matches all characters in a group until meeting a (? and more characters until a ") or a "
    replaced_source = re.sub(r'href="(.*?)(?:\?.*?"|")',
                             r'href="\1"', replaced_source)
    with codecs.open(ROOT_DIR_NAME + '/' + FILENAME + '/' + FILENAME + '.html', 'w+', 'utf-8') as f:
        f.write(replaced_source)


def fetch_static():
    soup = BeautifulSoup(driver.page_source, 'html.parser')
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
        if (parsed_val.scheme):
            continue
        url_id = PARSED_URL.scheme + "://" + PARSED_URL.netloc + \
            (PARSED_URL.path if val[0] != '/' else '') + val
        print(url_id)
        val = re.sub(r'\?.*', '', val)
        dep.write(WORKING_DIR +
                  ('/' if val[0] != '/' else '') + val + '\t' + url_id + "\n")
        subprocess.run(["node", "./fetch.js", url_id, val, WORKING_DIR])


def main():
    fetch_index_and_refactor()
    fetch_static()


main()
