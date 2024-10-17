from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates


db = SQLAlchemy()

class Recipe(db.Model):
    __tablename__='recipies'

    id = db.Column(db.Integer, primary_key=True)    
    title = db.Column(db.String,nullable=False)
    description = db.Column(db.String(250),nullable=False)
    instructions = db.Column(db.String,nullable=False)
    created_at = db.Column(db.DateTime,default=db.func.current_timestamp)
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    
    category = db.relationship('Category',back_populates='recipies') 
 
class Category(db.Model):
    __tablename__='categories'
    
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String(250))

    recipe = db.relationship('Recipe',back_populates='category')


class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    
    id = db.Column(db.Integer,primary_key=True)
