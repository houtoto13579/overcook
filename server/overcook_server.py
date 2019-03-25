from flask import Flask, jsonify, request, make_response, render_template, abort, redirect
from flask_api import status
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource, reqparse
import pymysql
import json

app = Flask(__name__)
cor = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)
'''
{ 'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods' : 'PUT,GET' }
'''


with open('./credential.json', 'r') as f:
    cred = json.load(f)

connection = pymysql.connect(host='localhost',
                             user=cred['user'],
                             password=cred['password'],
                             db='overcook',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor,
                             autocommit=True)
cursor = connection.cursor()

@app.route('/test_api', methods=['POST'])
def test():
    if request.is_json:
        l = [{'id':1, 'name':'egg'}, {'id':2, 'name':'potato'}]
        return make_response(jsonify({'data':l, 'method':request.method}))

@app.route('/', methods=['GET'])
def get_index_page():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        if not check_user(data['name']):
            return make_response(jsonify({'Error':e}))
        else:
            return make_response(jsonify({'Error msg':e}))

class IngredientsAPI(Resource):
    def __init__(self):
        # self.reqparse = reqparse.RequestParser()
        # self.reqparse.add_argument('ingredient', type=str, location='json')
        # self.reqparse.add_argument('quantity', type=int, location='json')
        # self.reqparse.add_argument("shopping_cart", type=dict, action="append")
        super(IngredientsAPI, self).__init__()

    def get(self, name):
        return make_response(jsonify({'msg':'get method'}))
        try:
            sql = "SELECT id, ingredient, quantity FROM Ingredients WHERE owner={};".format(name)
            cursor.execute(sql)
            rows = cursor.fetchall()
            return make_response(jsonify({'data':rows}))
        except Exception as e:
            print(e)
            return make_response(jsonify({'msg':'error', 'Error':e}))

    def post(self, name):
        if request.is_json:
            data = request.get_json()
        return make_response(jsonify({'msg':'post method', 'data':data}))
        try:
            sql = "INSERT INTO Ingredients (owner, ingredient, quantity) VALUES ({}, {}, {});".format(name, data['ingredient'], data['quantity'])
            cursor.execute(sql)
            return make_response(jsonify({'msg':'success'}))
        except Exception as e:
            print(e)
            return make_response(jsonify({'msg':'error', 'Error':e}))

    def put(self, name):
        l = []
        if request.is_json:
            l = request.get_json()
        return make_response(jsonify({'msg':'put method', 'data':l}))
        try:
            sql = "UPDATE Ingredients SET ingredient={}, quantity={} WHERE owner={};".format(data['ingredient'], data['quantity'], name)
            cursor.execute(sql)
            return make_response(jsonify({'msg':'success'}))
        except Exception as e:
            print(e)
            return make_response(jsonify({'msg':'error', 'Error':e}))

    def delete(self, name):
        l = []
        if request.is_json:
            l = request.get_json()
        return make_response(jsonify({'msg':'delete method', 'data':l}))
        try:
            sql = "DELETE FROM Ingredients WHERE owner={} and ingredient={};".format(name, data['ingredient'])
            cursor.execute(sql)
            return make_response(jsonify({'msg':'success'}))
        except Exception as e:
            print(e)
            return make_response(jsonify({'msg':'error', 'Error':e}))


def check_user(name):
    sql = "SELECT * FROM Users WHERE name={};".format(name)
    cursor.execute(sql)
    rows = cursor.fetchall()
    return len(rows) == 0


if __name__ == '__main__':
    api.add_resource(IngredientsAPI, '/ingredients/<string:name>', endpoint='ingredients')
    app.run(host='0.0.0.0', port=8000, debug=True)