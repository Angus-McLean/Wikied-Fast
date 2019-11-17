#!/usr/bin/env python

# Imports
import requests as req

def query_summaries(id_list):
    """Query the wikiMedia API"""
    # Set url and parameters
    URL = "http://en.wikipedia.org/w/api.php"
    PARAMS = {"action": "query", "format":"json", "prop":"extracts", "exintro":"", "explaintext":""}

    # Iteratively build a dictionary of summaries
    summary_dict = {}
    for i in range(0, len(id_list), 20):
        ids = '|'.join(str(elem) for elem in id_list[i:i+20])
        PARAMS["pageids"] = ids
        resp = req.get(url=URL, params=PARAMS)
        data = resp.json()
        summary_dict.update(data["query"]["pages"])
    return summary_dict

def get_link_ids(id):
    """Get the ID of the links from a wikipedia page"""
    URL = "http://en.wikipedia.org/w/api.php"
    PARAMS = {"action":"query", "format":"json", "generator":"links", "pageids":id, "gpllimit":"max", "gplnamespace":0, "prop":"info"}
    resp = req.get(url=URL, params=PARAMS)
    data = resp.json()
    return list(data["query"]["pages"].keys())

def get_random_pages(n):
    """Get n random pages from wikipedia"""
    URL = "http://en.wikipedia.org/w/api.php"
    PARAMS = {"action":"query", "format":"json", "list":"random", "rnnamespace":0, "rnlimit":n}
    resp = req.get(url=URL, params=PARAMS)
    data = resp.json()
    return data["query"]["random"]

def get_smallest_degree(source, target):
    """Use SDOW to get the length of the shortest path between two pages"""
    resp = req.post('https://api.sixdegreesofwikipedia.com/paths', json={'source':source, 'target':target})
    if resp.status_code == 200:
        data = resp.json()
        if data["paths"]:
            return len(data["paths"][0]) - 1
        else:
            return "6+"
    else:
        return "6+"
