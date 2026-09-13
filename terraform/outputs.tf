output "nameservers" {
  value = aws_route53_zone.main.name_servers
}

output "api_gateway_url" {
  description = "Invoke URL for form submissions"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/submit"
}

output "llm_api_url" {
  description = "Invoke URL for recruiter chat endpoint"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/ask"
}

output "llm_lambda_hash" {
  description = "Hash of the LLM Lambda zip file to force updates when it changes"
  value       = filebase64sha256("${path.module}/../etc/llm_lambda.zip")
}
