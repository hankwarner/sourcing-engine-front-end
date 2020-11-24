#!make

login:
	az login

set-subscription-dev:
	az account set --subscription="b54f955a-67c4-4680-888e-17bf609fe9c2"

set-subscription-test:
	az account set --subscription="1084d747-ad39-4069-9688-5eaf736f555c"

set-subscription-prod:
	az account set --subscription="1f864241-e4d1-4891-8d32-549becc4c6ad"

init:
	terraform init

apply:
	terraform apply

import-app-service-dev:
	terraform import azurerm_app_service.ferguson-sourcing-app-dev /subscriptions/b54f955a-67c4-4680-888e-17bf609fe9c2/resourceGroups/feideu2-supplysourcingengine-rg-001/providers/Microsoft.Web/sites/ferguson-sourcing-app-dev
