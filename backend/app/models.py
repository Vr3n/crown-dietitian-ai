from typing import Any, Dict
from uuid import UUID, uuid4
from datetime import date, datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, Relationship, SQLModel

from app.enums import Gender


class BaseModelMixin(SQLModel):
    """
    The fields that will be reused in all models.
    """

    id: UUID = Field(default_factory=uuid4, primary_key=True,
                     index=True, nullable=False)
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.now, nullable=False)


class CustomerBase(SQLModel):
    """
    Represents a Client Receving Nutritionist Guidance.
    """

    name: str
    date_of_birth: date
    gender: Gender
    email: str | None = None
    alternate_email: str | None = None
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


class CustomerMaster(BaseModelMixin, CustomerBase, table=True):
    """
    Customer SQL Table.
    """
    pass


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


class BodyMeasurementMaster(BaseModelMixin, BodyMeasurementBase, table=True):
    customer: CustomerMaster = Relationship(back_populates="body_measurements", sa_relationship_kwargs={
        'lazy': 'selectin'
    })


class BodyMeasurementAIAnalysisBase(SQLModel):
    bodymeasurement_id: UUID = Field(foreign_key="bodymeasurementmaster.id")
    notes: str | None = None
    ai_analysis: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))


class BodyMeasurementAIAnalysisMaster(BaseModelMixin, BodyMeasurementAIAnalysisBase, table=True):
    body_measurement: BodyMeasurementMaster = Relationship(
        back_populates="bm_ai_analysis", sa_relationship_kwargs={
            'lazy': 'selectin'
        })


class HealthConditionBase(SQLModel):
    customer_id: UUID = Field(foreign_key="customermaster.id")
    name: str
    description: str | None = None
    from_date: date = Field(default_factory=date.today)
    to_date: date | None = None

    # Ai Integration Fields.
    severity: str | None = None
    impact_on_diet: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))

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


class InjuryMaster(BaseModelMixin, InjuryBase, table=True):
    customer: CustomerMaster = Relationship(back_populates="injuries", sa_relationship_kwargs={
        'lazy': 'selectin'
    })


class DiseaseBase(HealthConditionBase):
    """
    Customer going through Disease.
    """

    diagnosis_date: date | None = None
    medications: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))


class DiseaseMaster(BaseModelMixin, DiseaseBase, table=True):
    customer: CustomerMaster = Relationship(back_populates='diseases', sa_relationship_kwargs={
        'lazy': 'selectin'
    })
