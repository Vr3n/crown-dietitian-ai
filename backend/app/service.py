from typing import Any, Dict, Generic, Sequence, Type, TypeVar
from uuid import UUID
from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

T = TypeVar('T')

class BaseService(Generic[T]):
    """
    Base service class providing common CRUD operations for all models.

    This generic class serves as the foundation for all specific service
    classes, implementing common database operations and error handling.

    Attributes:
        model_class (Type[T]): The SQLModel class this service operates on.
        session (AsyncSession): The SQLAlchemy async session for database operations.
    """

    def __init__(self, model_class: Type[T], session: AsyncSession):
        """
        Initializing the base service with model class and database session.

        Args:
            model_class (Type[T]): The SQLModel class this service will operate on.
            session (AsyncSession): The SQLAlchemy async session for database operations.
        """
        self.model_class = model_class
        self.session = session

    async def create(self, data: Dict[str, Any]) -> T:
        """
        Create a new record in the database.

        Args:
            data (Dict[str, Any]): Dictionary containing the model fields
                and values.

        Raises:
            HTTPException: If There's a database integrity error during
                creation.
        """
        try:
            # Create a new instance of the model with the provided data
            instance = self.model_class(**data)

            # Add the instance to the session and commit the transaction
            self.session.add(instance)
            await self.session.commit()

            # Refresh the instance to get any database-generated values
            await self.session.refresh(instance)

            return instance
        except IntegrityError as e:
            # Roll back the transaction if there's an integrity error
            await self.session.rollback()

            # Raise an HTTP exception with appropriate status code and message
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Database integrity error: {str(e)}"
            )

    async def get_by_id(self, id: UUID) -> T | None:
        """
        Retrieve a record by its ID.

        Args:
            id (UUID): The unique identifier of the record.

        Returns:
            T: The found model instance.

        Raises:
            HTTPException: If the record with the given ID doesn't exist.
        """
        # Ensure the model has an 'id' attribute.
        if not hasattr(self.model_class, 'id'):
            raise ValueError(
                f"{self.model_class.__name__} does not have an 'id' attribute"
            )

        # Create a select statement filtering by ID
        statement = select(self.model_class).where(
            self.model_class.id == id)  # type: ignore

        # Execute the statement and get the first result
        result = await self.session.exec(statement)
        instance = result.first()

        # Raise a 404 exception if no record was found
        if not instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"{self.model_class.__name__} with id {id} not found"
            )

        return instance

    async def get_all(self, skip: int = 0, limit: int = 100) -> Sequence[T]:
        """
        Retrieve all records with pagination.

        Args:
            skip (int, optional): Number of records to skip. Defaults to 0.
            limit (int, optional): Maximum number of records to return. Defaults to 100.

        Returns:
            Sequence[T]: A Sequence of model instances.
        """
        # Create a select statement with pagination
        statement = select(self.model_class).offset(skip).limit(limit)

        # Execute the statement and return all results
        result = await self.session.exec(statement)
        return result.all()

    async def update(self, id: UUID, data: Dict[str, Any]) -> T | None:
        """
        Update an existing record.

        Args:
            id (UUID): The unique identifier of the record to update.
            data (Dict[str, Any]): Dictionary containing the fields to update.

        Returns:
            T: The updated model instance.

        Raises:
            HTTPException: If the record with the given ID doesn't exist.
        """
        # Get the existing instance or raise a 404 if not found
        instance = await self.get_by_id(id)

        # Update the updated_at timestamp to track modification time
        data["updated_at"] = datetime.now()

        # Update each field in the instance with the provided data
        for key, value in data.items():
            if hasattr(instance, key):
                setattr(instance, key, value)

        # Save the changes to the database
        self.session.add(instance)
        await self.session.commit()
        await self.session.refresh(instance)

        return instance

    async def delete(self, id: UUID) -> bool:
        """
        Delete a record from the database.

        Args:
            id (UUID): The unique identifier of the record to delete.

        Returns:
            bool: True if deletion was successful.

        Raises:
            HTTPException: If the record with the given ID doesn't exist.
        """
        # Get the existing instance or raise a 404 if not found
        instance = await self.get_by_id(id)

        # Delete the instance and commit the transaction
        await self.session.delete(instance)
        await self.session.commit()

        return True