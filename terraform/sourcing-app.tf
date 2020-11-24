//data azurerm_app_service ferguson-sourcing-app-dev {
//	name = "ferguson-sourcing-app-dev"
//	resource_group_name = data.azurerm_resource_group.dev-rg.name
//}

data azurerm_app_service_plan ferguson-sourcing-app-plan-dev {
	name = "ASP-feideu2supplysourcingenginerg00-af74"
	resource_group_name = data.azurerm_resource_group.dev-rg.name
}

resource azurerm_app_service ferguson-sourcing-app-dev {
	name = "ferguson-sourcing-app-dev"
	resource_group_name = data.azurerm_resource_group.dev-rg.name
	location = "eastus"
	app_service_plan_id = data.azurerm_app_service_plan.ferguson-sourcing-app-plan-dev.id
	app_settings = {
		"APPINSIGHTS_INSTRUMENTATIONKEY"             = "8181ed3d-984f-4371-8867-dbfe1972abf3"
		"APPLICATIONINSIGHTS_CONNECTION_STRING"      = "InstrumentationKey=8181ed3d-984f-4371-8867-dbfe1972abf3;IngestionEndpoint=https://eastus-0.in.applicationinsights.azure.com/"
		"ApplicationInsightsAgent_EXTENSION_VERSION" = "~2"
		"WEBSITE_NODE_DEFAULT_VERSION"               = "12.13.0"
		"XDT_MicrosoftApplicationInsights_Mode"      = "default"
	}
	auth_settings {
		additional_login_params = {}
		allowed_external_redirect_urls = []
		enabled = false
		token_refresh_extension_hours = 0
		token_store_enabled = false
	}
	client_affinity_enabled = true
	client_cert_enabled = false
	site_config {
		always_on = true
		default_documents = [
			"Default.htm",
			"Default.html",
			"Default.asp",
			"index.htm",
			"index.html",
			"iisstart.htm",
			"default.aspx",
			"index.php",
			"hostingstart.html"
		]
		dotnet_framework_version = "v4.0"
		ftps_state = "AllAllowed"
		http2_enabled = false
		local_mysql_enabled = false
		managed_pipeline_mode = "integrated"
		min_tls_version = "1.2"
		remote_debugging_enabled = false
		scm_type = "None"
		use_32_bit_worker_process = true
		websockets_enabled = false
	}
	timeouts {}
	tags = merge(var.common-tags)
}

resource azurerm_app_service_slot ferguson-sourcing-app-dev-slot {
	name = "ferguson-sourcing-app-dev-slot"
	app_service_name = azurerm_app_service.ferguson-sourcing-app-dev.name
	app_service_plan_id = data.azurerm_app_service_plan.ferguson-sourcing-app-plan-dev.id
	location = azurerm_app_service.ferguson-sourcing-app-dev.location
	resource_group_name = azurerm_app_service.ferguson-sourcing-app-dev.resource_group_name

	tags = merge(var.common-tags)
}

resource github_actions_secret dev-publish-profile {
	repository = "sourcing-data-front-end"
	secret_name = "AZUREAPPSERVICE_PUBLISHPROFILE_FERG_DEV"
	plaintext_value = "${file("dev-pub-profile.xml")}"
}
