from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        database_url = os.getenv('DATABASE_URL')
        self.engine = create_engine(database_url)

    def execute_query(self, query, params=None, fetch_one=False):
        try:
            with self.engine.connect() as connection:
                result = connection.execute(text(query), params or {})
                if fetch_one:
                    return result.scalar()  # Pobiera pojedynczą wartość (np. ID)
                elif query.strip().lower().startswith('select'):
                    return result.fetchall()
                return None
        except Exception as e:
            print(e)
            return None

    def close(self):
        self.engine.dispose()

    def add_product(self, name, price, description, stock):
        try:
            query = """
                INSERT INTO products (opis, nazwa, cena, stan) 
                VALUES (:description, :name, :price, :stock) 
                RETURNING id;
            """
            with self.engine.connect() as connection:
                transaction = connection.begin()  
                result = connection.execute(text(query), {'description': description, 'name': name, 'price': price, 'stock': stock})
                new_id = result.scalar()  
                transaction.commit() 
                return new_id
        except Exception as e:
            print(e)
            return None

    def get_products(self):
        query = """
            SELECT * FROM products;
        """
        return self.execute_query(query);

    def edit_product(self, nazwa, cena, opis, stan, id):
        query = """
            UPDATE products
            SET nazwa = :nazwa, cena = :cena, opis = :opis, stan = :stan
            WHERE id = :id;
        """
        with self.engine.connect() as connection:
            transaction = connection.begin()
            connection.execute(text(query), {'nazwa': nazwa, 'cena': cena, 'opis': opis, 'stan': stan, 'id': id})
            transaction.commit()


    def get_mail_list(self):
        query = """
            SELECT email FROM newsletter_subscribers;
        """
        return self.execute_query(query)