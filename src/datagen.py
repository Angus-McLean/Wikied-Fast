#!/usr/bin/env python

# Imports
import wiki
import csv
import random

# Get a csv file to store our data
with open('./../data/scores.csv', 'w') as fp:
    fn = ['sourceID', 'targetID', 'score']
    w = csv.DictWriter(fp, fieldnames=fn)
    w.writeheader()
    
    # Get 5000 articles, for 2500 data points (Subject to upscaling)
    for i in range(0,10):
        rnd_arts = wiki.get_random_pages("max")
        random.shuffle(rnd_arts)

        sum = wiki.query_summaries([d['id'] for d in rnd_arts])

        # Make source/target pairings with scores
        for j in range(0, len(rnd_arts), 2):
            source = rnd_arts[j]
            target = rnd_arts[j+1]
            dist = wiki.get_smallest_degree(source["title"], target["title"])
            row = {"sourceID":source["id"], "targetID":target['id'], "score":dist}
            w.writerow(row)
            fs = open("./../data/" + str(source["id"]) + ".txt", 'w')
            fs.write(sum[str(source["id"])]["extract"])
            fs.close()
            ft = open("./../data/" + str(source["id"]) + ".txt", 'w')
            ft.write(sum[str(target["id"])]["extract"])
            ft.close()
