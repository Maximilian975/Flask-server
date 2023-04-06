from app import create_app
import logging

gunicorn_logger = logging.getLogger('gunicorn.error')

application = create_app(logger_override=gunicorn_logger)