from typing import Any, Dict, Optional

def make_response(message: str, result: Optional[Any] = None, error: Optional[str] = None) -> Dict[str, Any]:
    return {"message": message, "result": result, "error": error}
