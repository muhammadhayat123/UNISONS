import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from datetime import datetime
from src.backend.config.db import Base


class Designation(str, enum.Enum):
    admin = "admin"
    seller = "seller"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    designation = Column(
        Enum(Designation, name="designation_enum"),
        nullable=False,
        default=Designation.seller,
        server_default=Designation.seller.value,
    )
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)