from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import json


app = Flask(__name__)


@app.route('/recommend_page/', methods=['POST'])
def makecalc():
    data = request.get_json()
    print(data)
    # prediction = np.array2string(model.predict(data))

    return jsonify(data)

if __name__ == '__main__':
    modelfile = '../../models/clfRF100.sav'
    model = p.load(open(modelfile, 'rb'))
    app.run(port=5001)
