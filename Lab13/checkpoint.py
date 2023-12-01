import BTrees._OOBTree
import ZODB
import ZODB.FileStorage
import persistent

class Course(persistent.Persistent):
    def __init__(self, course_id, name=" ", credit=0, grade_scheme=None):
        self.course_id = course_id
        self.name = name
        self.credit = credit
        self.grade_scheme = grade_scheme or [
            {"Grade": "A", "min": 80, "max": 100},
            {"Grade": "B", "min": 70, "max": 79},
            {"Grade": "C", "min": 60, "max": 69},
            {"Grade": "D", "min": 50, "max": 59},
            {"Grade": "F", "min": 0, "max": 49}
        ]

    def __str__(self):
        return f"ID: \t{str(self.course_id)}  Course Name: {self.name:<30}, Credit: {self.credit}"

    def set_name(self, name):
        self.name = name

    def get_credit(self):
        return self.credit

    def print_detail(self):
        print(self.__str__())

    def score_grading(self, score):
        for grade in self.grade_scheme:
            if grade["min"] <= score <= grade["max"]:
                return grade["Grade"]
        return "F"

    def set_grade_scheme(self, scheme):
        for grade in scheme:
            if "Grade" not in grade or "min" not in grade or "max" not in grade:
                return False
            else:
                self.grade_scheme = scheme


class Enrollment(persistent.Persistent):
    def __init__(self, student, course, score=0):
        self.student = student
        self.course = course
        self.score = score

    def get_course(self):
        return self.course

    def get_grade(self):
        return self.course.score_grading(self.score)

    def set_score(self, score):
        self.score = score

    def __str__(self):
        return f"     ID: {self.course.course_id}   Course Name: {self.course.name:<30} Credit: {self.course.credit} Score: {self.score} Grade: {self.course.score_grading(self.score)}"

    def print_detail(self):
        print(self.__str__())


class Student(persistent.Persistent):
    def __init__(self, enrolls, student_id,password, name=" "):
        self.enrolls = enrolls
        self.student_id = student_id
        self.name = name
        self.password=password

    def enroll_course(self, course, grade):
        enrollment = Enrollment(self, course, grade)
        self.enrolls.append(enrollment)
        return enrollment

    def get_enrollment(self):
        if len(self.enrolls) > 0:
            return self.enrolls
        return None

    def __str__(self):
        return f"ID: \t{self.student_id} Name: {self.name}"
    
    def login(self,student_id,password):
        if self.student_id==student_id and self.password==password:
            return True
        else:
            return False        
        
    def print_transcript(self):
        print("\tTranscript")
        print(self.__str__())

        grade_total = 0
        credit_total = 0

        for e in self.enrolls:
            e.print_detail()

            cred = e.course.credit
            credit_total += cred

            gpa_mapping = {"A": 4, "B+": 3.5, "B": 3, "C+": 2.5, "C": 2, "D+": 1.5, "D": 1, "F": 0}
            g_score = gpa_mapping.get(e.get_grade(), 0)

            grade_total += g_score * cred

        gpa = grade_total / credit_total

        print(f"Total GPA is: {gpa:.2f}")


storage = ZODB.FileStorage.FileStorage("mydata.fs")
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

root.courses = BTrees.OOBTree.BTree()
root.courses[101] = Course(101, "Computer Programming", 4)
root.courses[201] = Course(201, "Web Programming", 4)
root.courses[202] = Course(202, "Software Engineering Principle", 5)
root.courses[301] = Course(301, "Artificial Intelligent", 3)

root.students = BTrees.OOBTree.BTree()
root.students[1100] = Student([], 1101, "Mr. Christian de Neuvillette")

root.students[1100].enroll_course(root.courses[101], 75)
root.students[1100].enroll_course(root.courses[201], 81)
root.students[1100].enroll_course(root.courses[202], 81)
root.students[1100].enroll_course(root.courses[301], 57)

if __name__ == "__main__":
    courses = root.courses
    for c in courses:
        course = courses[c]
        course.print_detail()
    print()

    students = root.students
    for s in students:
        student = students[s]
        student.print_transcript()
        print()
