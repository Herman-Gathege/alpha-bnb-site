#backend/modules/ai_readiness/utils.py
def calculate_score(answers: dict):
    """
    answers example:
    {
      "1": 1,
      "2": 0,
      "3": 1
    }
    """
    total_questions = len(answers)
    score = sum(answers.values())
    percentage = round((score / total_questions) * 100)
    return score, percentage


def readiness_status(percentage: int):
    if percentage >= 70:
        return "Ready to Start"
    elif percentage >= 40:
        return "Needs Some Preparation"
    else:
        return "Not Ready – Needs Support"


def cta_message(percentage: int):
    if percentage >= 70:
        return "You’re well positioned to start using AI. Book a strategy call to identify quick wins."
    elif percentage >= 40:
        return "You have opportunities for improvement. A short call can help you prioritise automation."
    else:
        return "Your business would benefit from foundational systems before AI adoption. Let’s talk."
