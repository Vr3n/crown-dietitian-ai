from enum import Enum


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "OTHER"


class MealType(str, Enum):
    FIRST_MEAL = "first_meal"
    BREAKFAST = "breakfast"
    MORNING_SNACK = "morning_snack"
    LUNCH = "lunch"
    AFTERNOON_SNACK = "afternoon_snack"
    EVENING_SNACK = "evening_snack"
    DINNER = "dinner"
    PRE_WORKOUT = "pre_workout"
    POST_WORKOUT = "post_workout"
    IN_WORKOUT = "in_workout"
    BEFORE_SLEEP = "before_sleep"
