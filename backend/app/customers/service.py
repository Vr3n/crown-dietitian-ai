from datetime import date
from typing import Optional, Sequence

from fastapi import Depends

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.service import BaseService
from app.database import get_session
from app.models import CustomerMaster


class CustomerService(BaseService["CustomerMaster"]):
    """
    Service class for Customer-related database operations.

    Extends the BaseService with Customer-specific query methods.

    Attributes:
        Inherits all attributes from BaseService.
    """

    async def get_by_email(self, email: str) -> Optional["CustomerMaster"]:
        """
        Retrieve a customer by their email address.

        Args:
            email (str): The email address to search for.

        Returns:
            Optional[CustomerMaster]: The customer if found, None otherwise.
        """
        # Create a select statement filtering by email
        statement = select(self.model_class).where(
            self.model_class.email == email)

        # Execute the statement and return the first result
        result = await self.session.exec(statement)
        return result.first()

    async def get_by_mobile(self, mobile_number: str) -> Optional["CustomerMaster"]:
        """
        Retrieve a customer by their mobile number.

        Args:
            mobile_number (str): The mobile number to search for.

        Returns:
            Optional[CustomerMaster]: The customer if found, None otherwise.
        """
        # Create a select statement filtering by mobile number
        statement = select(self.model_class).where(
            self.model_class.mobile_number == mobile_number)

        # Execute the statement and return the first result
        result = await self.session.exec(statement)
        return result.first()

    async def get_customers_by_age_range(self, min_age: int, max_age: int) -> Sequence["CustomerMaster"]:
        """
        Retrieve customers within a specific age range.

        Args:
            min_age (int): The minimum age in the range.
            max_age (int): The maximum age in the range.

        Returns:
            List[CustomerMaster]: List of customers matching the age criteria.
        """
        today = date.today()

        # Calculate date range based on age
        # For max_age, we want people born at least max_age years ago
        # For min_age, we want people born at most min_age years ago
        max_date = date(today.year - min_age, today.month, today.day)
        min_date = date(today.year - max_age, today.month, today.day)

        # Create a select statement filtering by birth date range
        statement = select(self.model_class).where(
            self.model_class.date_of_birth <= max_date,  # Born before or on max_date
            self.model_class.date_of_birth >= min_date   # Born after or on min_date
        )

        results = await self.session.exec(statement)

        return results.all()
