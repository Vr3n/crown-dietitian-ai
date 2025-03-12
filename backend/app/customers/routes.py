
import asyncio
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.customers.service import CustomerService
from app.database import get_session
from app.models import CustomerMaster
from app.customers.schemas import CustomerCreate, CustomerPublicResponse, CustomerUpdate


router = APIRouter(
    prefix="/customers",
    tags=['customers']
)


# Dependency to get the CustomerService
async def get_customer_service(session: AsyncSession = Depends(get_session)) -> CustomerService:
    """
    Dependency that provides a CustomerService instance.

    Args:
        session (AsyncSession): The database session dependency.

    Returns:
        CustomerService: An instance of the CustomerService.
    """
    return CustomerService(CustomerMaster, session)


@router.get("/", response_model=List[CustomerPublicResponse])
async def get_all_customers(skip: int = Query(0, ge=0, description="Number of customers to skip."),
                            limit: int = Query(
                                100, ge=1, le=100, description="Maximum number of customers to return."),
                            service: CustomerService = Depends(get_customer_service)):
    """
    Fetch all customers with pagination.

    Args:
        skip (int): Number of customers to skip.
        limit (int): Maximum number of customers to return.
        service (CustomerService): The customer service dependency.

    Returns:
        List[CustomerPublic]: List of customers.
    """

    result = await service.get_all(skip=skip, limit=limit)
    return result


@router.post("/", response_model=CustomerPublicResponse,
             status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer: CustomerCreate,
    service: CustomerService = Depends(get_customer_service)
):
    """
    Create a new customer.

    Args:
        customer (CustomerCreate): The customer data to create.
        service (CustomerService): The customer service dependency.

    Returns:
        CustomerPublicResponse: The created customer.

    Raises:
        HTTPException: If a customer with the same email or mobile already exists.
    """
    if customer.mobile_number:
        existing_customer = await service.get_by_mobile(customer.mobile_number)
        if existing_customer:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Customer with mobile number {customer.mobile_number} already exists."
            )

    # Check if a customer with the same email already exists
    if customer.email:
        existing_customer = await service.get_by_email(customer.email)
        if existing_customer:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Customer with email {customer.email} already exists"
            )

    return await service.create(customer.model_dump())


@router.put("/{customer_id}", response_model=CustomerPublicResponse)
async def update_customer(
    customer_id: UUID,
    customer: CustomerUpdate,
    service: CustomerService = Depends(get_customer_service)
):
    """
    Update a specific customer.

    Args:
        customer_id (UUID): The ID of the customer to update.
        customer (CustomerUpdate): The updated customer data.
        service (CustomerService): The customer service dependency.

    Returns:
        CustomerPublicResponse: The updated customer.

    Raises:
        HTTPException: If the customer is not found or if updating the email/mobile
                      would conflict with an existing customer.
    """
    # Check if the customer exists
    current_customer = await service.get_by_id(customer_id)

    # If updating email, check if it would conflict with another customer
    if current_customer:
        if customer.email and customer.email != current_customer.email:
            existing_customer = await service.get_by_email(customer.email)
            if existing_customer and existing_customer.id != customer_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"Customer with email {customer.email} already exists"
                )

        # If updating mobile, check if it would conflict with another customer
        if customer.mobile_number and customer.mobile_number != current_customer.mobile_number:
            existing_customer = await service.get_by_mobile(customer.mobile_number)
            if existing_customer and existing_customer.id != customer_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"Customer with mobile number {customer.mobile_number} already exists"
                )
        # Update the customer
        return await service.update(customer_id,
                                    customer.model_dump(exclude_unset=True))
    else:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer not found!"
        )


@router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_customer(
    customer_id: UUID,
    service: CustomerService = Depends(get_customer_service)
):
    """
    Delete a specific customer.

    Args:
        customer_id (UUID): The ID of the customer to delete.
        service (CustomerService): The customer service dependency.

    Raises:
        HTTPException: If the customer is not found.
    """
    await service.delete(customer_id)
    return None


@router.get("/{customer_id}", response_model=CustomerPublicResponse)
async def get_customer(
    customer_id: UUID,
    service: CustomerService = Depends(get_customer_service)
):
    """
    Fetch a specific customer by ID.

    Args:
        customer_id (UUID): The ID of the customer to fetch.
        service (CustomerService): The customer service dependency.

    Returns:
        CustomerPublicResponse: The requested customer.

    Raises:
        HTTPException: If the customer is not found.
    """
    return await service.get_by_id(customer_id)


@router.get("/email/{email}", response_model=CustomerPublicResponse)
async def get_customer_by_email(
    email: str,
    service: CustomerService = Depends(get_customer_service)
):
    """
    Fetch a customer by email address.

    Args:
        email (str): The email of the customer to fetch.
        service (CustomerService): The customer service dependency.

    Returns:
        CustomerPublicResponse: The requested customer.

    Raises:
        HTTPException: If the customer is not found.
    """
    customer = await service.get_by_email(email)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with email {email} not found"
        )
    return customer


@router.get("/mobile/{mobile_number}", response_model=CustomerPublicResponse)
async def get_customer_by_mobile(
    mobile_number: str,
    service: CustomerService = Depends(get_customer_service)
):
    """
    Fetch a customer by mobile number.

    Args:
        mobile_number (str): The mobile number of the customer to fetch.
        service (CustomerService): The customer service dependency.

    Returns:
        CustomerPublicResponse: The requested customer.

    Raises:
        HTTPException: If the customer is not found.
    """
    customer = await service.get_by_mobile(mobile_number)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with mobile number {mobile_number} not found"
        )
    return customer


@router.get("/age-range/", response_model=List[CustomerPublicResponse])
async def get_customers_by_age_range(
    min_age: int = Query(..., ge=0, description="Minimum age"),
    max_age: int = Query(..., ge=0, description="Maximum age"),
    service: CustomerService = Depends(get_customer_service)
):
    """
    Fetch customers within a specific age range.

    Args:
        min_age (int): The minimum age in the range.
        max_age (int): The maximum age in the range.
        service (CustomerService): The customer service dependency.

    Returns:
        List[CustomerPublicResponse]: List of customers within the specified age range.

    Raises:
        HTTPException: If the min_age is greater than max_age.
    """
    if min_age > max_age:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="min_age cannot be greater than max_age"
        )

    return await service.get_customers_by_age_range(min_age, max_age)
