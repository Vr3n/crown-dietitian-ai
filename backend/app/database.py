from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine

from app.config import settings

engine = create_async_engine(settings.DATABASE_URL,
                             echo=True,
                             future=True)


async_session = AsyncSession(engine,)


async def get_session() -> AsyncSession: # type: ignore
    async with async_session as session:
        yield session # type: ignore
