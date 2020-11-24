provider "azurerm" {
	version = "2.14.0"
	subscription_id = var.azure-dev-subscription-id
	features {}
	skip_provider_registration = true
}

provider "azurerm" {
	alias = "test"
	version = "2.14.0"
	subscription_id = var.azure-test-subscription-id
	features {}
	skip_provider_registration = true
}

provider "azurerm" {
	alias = "prod"
	version = "2.14.0"
	subscription_id = var.azure-prod-subscription-id
	features {}
	skip_provider_registration = true
}

provider "github" {
	token        = var.github-auth
	organization = "SUPPLYcom"
}


terraform {
	backend "azurerm" {
		resource_group_name = "feideu2-supplysourcingengine-rg-001"
		storage_account_name = "supplysourcingterraf"
		container_name = "sourcing-app"
		key = "sourcing-data-front-end.tfstate"
	}
}

data azurerm_resource_group dev-rg {
	name = "feideu2-supplysourcingengine-rg-001"
}

data azurerm_resource_group test-rg {
	provider = azurerm.test
	name = "feiteu2-supplysourcingengine-rg-001"
}

data azurerm_resource_group prod-rg {
	provider = azurerm.prod
	name = "feipeu2-supplysourcingengine-rg-001"
}


