#!make

login:
	az login

set-dev-subscription:
	az account set --subscription="b54f955a-67c4-4680-888e-17bf609fe9c2"

set-test-subscription:
	az account set --subscription="1084d747-ad39-4069-9688-5eaf736f555c"

set-prod-subscription:
	az account set --subscription="1f864241-e4d1-4891-8d32-549becc4c6ad"

init:
	terraform init

apply:
	terraform apply
