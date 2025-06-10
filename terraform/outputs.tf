output "nameservers" {
    value = aws_route53_zone.main.name_servers
}

output "api_gateway_url" {
  description = "Invoke URL for form submissions"
  value = "${aws_api_gateway_rest_api.form_api.execution_arn}/prod"
}
