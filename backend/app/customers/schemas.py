
from typing import List
from app.schemas import CustomerBase
from app.models import (
    BaseModelMixin, BodyMeasurementMaster, DiseaseMaster, InjuryMaster,)


class CustomerPublicResponse(CustomerBase):
    body_measurements: List["BodyMeasurementMaster"] = []
    injuries: List["InjuryMaster"] = []
    diseases: List["DiseaseMaster"] = []


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModelMixin, CustomerBase):
    pass
