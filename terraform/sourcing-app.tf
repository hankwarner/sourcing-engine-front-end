data azurerm_app_service ferguson-sourcing-app-dev {
	name = "ferguson-sourcing-app-dev"
	resource_group_name = data.azurerm_resource_group.dev-rg.name
}

data azurerm_app_service_plan ferguson-sourcing-app-plan-dev {
	name = "ASP-feideu2supplysourcingenginerg00-af74"
	resource_group_name = data.azurerm_resource_group.dev-rg.name
}

resource azurerm_app_service_slot ferguson-sourcing-app-dev-slot {
	name = "ferguson-sourcing-app-dev-slot"
	app_service_name = data.azurerm_app_service.ferguson-sourcing-app-dev.name
	app_service_plan_id = data.azurerm_app_service_plan.ferguson-sourcing-app-plan-dev.id
	location = data.azurerm_app_service.ferguson-sourcing-app-dev.location
	resource_group_name = data.azurerm_app_service.ferguson-sourcing-app-dev.resource_group_name
}

resource github_actions_secret dev-publish-profile {
	repository = "sourcing-data-front-end"
	secret_name = "AZUREAPPSERVICE_PUBLISHPROFILE_FERG_DEV"
	plaintext_value = "${file("dev-pub-profile.xml")}"
}
