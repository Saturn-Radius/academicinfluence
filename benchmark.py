import requests
import time
import json
from bs4 import BeautifulSoup

for line in open('./urls.txt'):
    before = time.time()
    for _ in range(10):
        response = requests.get('http://localhost:3000' + line.strip())
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        data = json.loads(soup.find(id = '__NEXT_DATA__').text)
        if 'err' in data:
            print("ERROR")
            break
    after = time.time()

    print(line.strip(), (after - before) / 10)
