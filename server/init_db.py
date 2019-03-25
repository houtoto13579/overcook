import pymysql
import json

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

def createTables():
    createUsers = "CREATE TABLE `Users`( \
        `name` varchar(255), \
        `password` varchar(255), \
        PRIMARY KEY (`name`)) \
        ENGINE=InnoDB DEFAULT CHARSET=utf8;"

    cursor.execute(createUsers)

    createIngredients = "CREATE TABLE `Ingredients`( \
      `id` int(10) NOT NULL AUTO_INCREMENT, \
      `owner` varchar(255), \
      `ingredient` varchar(255), \
      `quantity` int(5), \
      PRIMARY KEY (`id`), \
      FOREIGN KEY (`owner`) references overcook.Users(`name`) \
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;"

    cursor.execute(createIngredients)

    createReceipt = "CREATE TABLE `Recripts`( \
      `title` varchar(255), \
      `ingredients` varchar(255), \
      `quantity` int(5) \
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"

    cursor.execute(createReceipt)
    

def dropTables():
    tables = ['Users', 'Ingredients', 'Recripts']
    for tableName in tables:
        sql = "DROP TABLE IF EXISTS `{}`;".format(tableName)
        cursor.execute(sql)

def insertUsersRows():
    users = [
        {'name':'test', 'password':'test123'}
    ]
    for u in users:
        sql = "INSERT INTO Users (name, password) VALUES ({}, {});".format(u['name'], u['password'])
        cursor.execute(sql)

def showTables():
    sql = "SHOW TABLES;"
    cursor.execute(sql)
    rows = cursor.fetchall()
    for row in rows:
        print(row)

if __name__ == '__main__':
    dropTables()
    createTables()
    insertUsersRows()
    showTables()