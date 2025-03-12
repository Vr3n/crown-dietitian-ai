from typing import List
from uuid import UUID, uuid4
from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel

from app.schemas import (BodyMeasurementAIAnalysisBase,
                         BodyMeasurementBase, CustomerBase,
                         DiseaseBase, InjuryBase,)


class BaseModelMixin(SQLModel):
    """
    The fields that will be reused in all models.
    """

    id: UUID = Field(default_factory=uuid4, primary_key=True,
                     index=True, nullable=False)
    created_at: datetime = Field(default_factory=datetime.now, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.now, nullable=False)


class CustomerMaster(BaseModelMixin, CustomerBase, table=True):
    """
    Customer SQL Table.
    """

    body_measurements: List["BodyMeasurementMaster"] = Relationship(
        back_populates="customer",
        sa_relationship_kwargs={'lazy': 'selectin'}
    )

    injuries: List["InjuryMaster"] = Relationship(
        back_populates="customer",
        sa_relationship_kwargs={'lazy': 'selectin'}
    )

    diseases: List["DiseaseMaster"] = Relationship(
        back_populates="customer",
        sa_relationship_kwargs={'lazy': 'selectin'}
    )


class BodyMeasurementMaster(BaseModelMixin, BodyMeasurementBase, table=True):
    customer: CustomerMaster = Relationship(back_populates="body_measurements", sa_relationship_kwargs={
        'lazy': 'selectin'
    })

    ai_report: "BodyMeasurementAIAnalysisMaster" = Relationship(back_populates='body_measurements', sa_relationship_kwargs={
        'lazy': 'selectin'
    })


class BodyMeasurementAIAnalysisMaster(BaseModelMixin, BodyMeasurementAIAnalysisBase, table=True):
    body_measurements: BodyMeasurementMaster = Relationship(
        back_populates="ai_report", sa_relationship_kwargs={
            'lazy': 'selectin'
        })


class InjuryMaster(BaseModelMixin, InjuryBase, table=True):
    customer: CustomerMaster = Relationship(back_populates="injuries", sa_relationship_kwargs={
        'lazy': 'selectin'
    })


class DiseaseMaster(BaseModelMixin, DiseaseBase, table=True):
    customer: CustomerMaster = Relationship(back_populates='diseases', sa_relationship_kwargs={
        'lazy': 'selectin'
    })
