from pydantic import BaseModel


class BusinessRequest(BaseModel):
    name: str
    phone_number: str
    email: str
    organization: str
    organization_url: str
    marketing: bool
