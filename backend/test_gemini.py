from gemini_service import generate_questions


context="""

Flutter Widgets

State Management

Flutter Projects

"""


questions=generate_questions(

context,

"Flutter Developer",

"Medium"

)


print(

questions

)