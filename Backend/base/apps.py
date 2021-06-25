from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'

    # Cái này giúp khi thay đổi user email thì username cũng thay đổi chạy qua signals
    def ready(self):
        import base.signals
