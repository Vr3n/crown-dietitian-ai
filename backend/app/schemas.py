
from datetime import date
from typing import Any, Dict
from uuid import UUID
from pydantic import EmailStr, field_validator
from sqlalchemy import JSON, VARCHAR, Column
from sqlmodel import Field, SQLModel

from app.enums import Gender


class CustomerBase(SQLModel):
    """
    Represents a Client Receving Nutritionist Guidance.
    """

    name: str
    date_of_birth: date
    gender: Gender
    email: EmailStr | None = Field(
        sa_column=Column('email', VARCHAR, nullable=True, unique=True,
                         default=None))
    alternate_email: str | None = Field(
        sa_column=Column('alternate_email', VARCHAR, nullable=True, unique=True,
                         default=None))
    mobile_number: str | None = None
    alternate_mobile_number: str | None = None

    preferences: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    allergies: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))

    @property
    def age(self) -> int:
        today = date.today()
        return round(today.year - self.date_of_birth.year - (
            (today.month, today.day) < (
                self.date_of_birth.month, self.date_of_birth.day)
        ), 2)

    @field_validator('mobile_number')
    def mobile_validator(cls, v: str) -> str:
        if not v.isdigit() or len(v) != 10:
            raise ValueError("Mobile number must be exactly 10 digits.")
        return v

    @field_validator('alternate_mobile_number')
    def alternate_mobile_validator(cls, v: str | None) -> str | None:
        if type(v) == str:
            if not v.isdigit() or len(v) != 10:
                raise ValueError("Mobile number must be exactly 10 digits.")
            return v


class BodyMeasurementBase(SQLModel):
    """
    Tracks client body measurements.
    """

    customer_id: UUID = Field(foreign_key="customermaster.id")
    measured_on: date = Field(default_factory=date.today)

    height: float  # in CM
    weight: float  # in Kg

    # Additional Measurements.
    body_fat_percentage: float | None = None
    waist_circumference: float | None = None
    hip_circumference: float | None = None
    chest_circumference: float | None = None
    arm_circumference: float | None = None
    thigh_circumference: float | None = None

    @property
    def bmi(self) -> float:
        """
        Calculate BMI (Body Mass Index)
        """

        height_m = self.height / 100
        return round(self.weight / (height_m * height_m), 2)

    @property
    def bmi_category(self) -> str:
        """
        Category based on BMI value.
        """

        bmi = self.bmi

        if bmi < 18.5:
            return "Under Weight"
        elif bmi < 25:
            return "Normal Weight"
        elif bmi < 30:
            return "Over Weight"
        else:
            return "Obese"


class BodyMeasurementAIAnalysisBase(SQLModel):
    bodymeasurement_id: UUID = Field(foreign_key="bodymeasurementmaster.id")
    notes: str | None = None
    ai_analysis: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))


class HealthConditionBase(SQLModel):
    customer_id: UUID = Field(foreign_key="customermaster.id")
    name: str
    description: str | None = None
    from_date: date = Field(default_factory=date.today)
    to_date: date | None = None

    # Ai Integration Fields.
    severity: str | None = None

    @property
    def is_active(self) -> bool:
        """Check if condition is currently active"""
        return self.to_date is None or self.to_date >= date.today()

    @property
    def duration_days(self) -> int | None:
        """Calculating Duration of the Condition in days."""
        if self.to_date is None:
            if self.is_active:
                return (date.today() - self.from_date).days
            return None

        return (self.to_date - self.from_date).days


class InjuryBase(HealthConditionBase):
    """
    Customer going through injury.
    """

    injury_type: str | None = None
    affected_body_part: str | None = None
    impact_on_diet: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))


class DiseaseBase(HealthConditionBase):
    """
    Customer going through Disease.
    """

    diagnosis_date: date | None = None
    medications: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    impact_on_diet: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
