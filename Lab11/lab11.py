import ZODB, ZODB.FileStorage
import persistent
import BTrees.OOBTree
import transaction

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

class Course(persistent.Persistent):
    def __init__(self, id,name="", gradeScheme=[], credit = 0):
        self.name = name
        self.id = id
        self.credit = credit
        self.gradeScheme = gradeScheme
        gradeScheme = [{"Grade":"A", "min":80, "max":100},
                       {"Grade":"B", "min":70, "max":79},
                       {"Grade":"C", "min":60, "max":69},
                       {"Grade":"D", "min":50, "max":59},
                       {"Grade":"F", "min":0, "max":49}]

    def __str__(self):
        return "ID: %8s Course Name: %s, Credit: %d" % (str(self.id), self.name, self.credit)
    
    def setName(self, name):
        self.name = name
        
    def printDetail(self):
        print(self.__str__())
        
    def scoreGrading(self,score):
        for i in self.gradeScheme:
            if score >= i["min"] and score <= i["max"]:
                return i["Grade"]
        return "Unknown"
    
    def GradeScheme(self,scheme):
        if (scheme != None & isinstance(scheme, list) and all(isinstance(entry, dict) for entry in scheme==True)):
            self.gradeScheme = scheme
        else:
            pass
    
        
def retrieveCourse(course_id):
    return root.courses[course_id]

class Enrollment(persistent.Persistent):
    def __init__(self, credit, course, score=0):
        self.credit = credit
        self.course = course
        self.score = score
        
    def __str__(self):
        return "credit: %s Course Name: %s, Grade: %d" % (str(self.credit), self.course, self.score)
    
    def getCourse(self):
        return self.course
    
    def getGrade(self,score):
        return Course.scoreGrading(score)
    
    def getScore(self):
        return self.score 
     
    def setScore(self, score):
        self.score = score
        
    def printDetail(self):
        print(self.__str__())
        
class Student(persistent.Persistent):
    def __init__(self, id, name=""):
        self.name = name
        self.id = id
        self.enrolls = []
        
    def __str__(self):
        output = ""
        output += "ID: %8s , Name: %s\n" % (str(self.id), self.name)
        return output
    
    def enrollCourse(self, course):
        enroll = Enrollment(1, course)
        self.enrolls.append(enroll)
    
    def getEnrollment(self, course):
        if self.enrolls[course] == None:
            return None
        else:
            return self.enrolls[course]
        
    def setName(self, name):
        self.name = name
        
    def printTranscript(self):
        print(self.__str__())
        for e in self.enrolls:
            e.printDetail()
        
root.courses = BTrees.OOBTree.BTree()
root.courses[101] = Course(101, "Computer Programming")
root.courses[201] = Course(201, "Web Programming")

root.enrolls = BTrees.OOBTree.BTree()
root.enrolls[1] = Enrollment(1, root.courses[101], 90)
root.enrolls[2] = Enrollment(1, root.courses[201], 80)
root.enrolls[3] = Enrollment(2, root.courses[101], 70)

root.students = BTrees.OOBTree.BTree()
root.students[1] = Student(1, "John")
root.students[1].enrollCourse(root.courses[101])
root.students[1].enrollCourse(root.courses[201])
root.students[2] = Student(2, "Mary")
root.students[2].enrollCourse(root.courses[201])
c = root.courses[101]
c.setName("Computer Programming with Python")
transaction.commit()

connection.close()
db.close()



