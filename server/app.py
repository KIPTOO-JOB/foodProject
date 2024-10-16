from flask import Flask,request,make_response,jsonify
from flask_migrate import Migrate
from model import *


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///kitchen.db"

migrate = Migrate(app ,db)

db.init_app(app)



@app.route('/')
def index():
    return "<h1>hello</h1>"