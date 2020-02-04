import requests
import time

for line in open('./urls.txt'):
    before = time.time()
    for _ in range(10):
        requests.get('http://localhost:3000' + line.strip()).raise_for_status()
    after = time.time()

    print(line.strip(), (after - before) / 10)
