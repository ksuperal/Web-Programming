import ZODB, ZODB.FileStorage, transaction
import persistent
from lab11 import * # import classes

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

if __name__ == "__main__" :
    courses = root.courses
    for c in courses:
        course = courses[c]
        course.printDetail()
    print()
    
    students = root.students
    for s in students:
        student = students[s]
        student.printTranscript()
        print()
        