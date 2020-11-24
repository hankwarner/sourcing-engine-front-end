variable azure-dev-subscription-id {
	default = "b54f955a-67c4-4680-888e-17bf609fe9c2"
}

variable azure-test-subscription-id {
	default = "1084d747-ad39-4069-9688-5eaf736f555c"
}

variable azure-prod-subscription-id {
	default = "1f864241-e4d1-4891-8d32-549becc4c6ad"
}

variable common-tags {
	default = {
		"ClassOfService"  = "DEV",
		"CostCenter"      = "3377",
		"Criticality"     = "Bronze",
		"Description"     = "FEI-Supply-Sourcing Engine-DEV",
		"ProjectID"       = "NA",
		"Reference"       = "RITM2326724",
		"SecurityProfile" = "STD",
		"Service"         = "Supply",
		"System"          = "Supply-Sourcing Engine",
		"group"           = "supplyteam",
	}
}
